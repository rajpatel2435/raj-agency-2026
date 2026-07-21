import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";
import { auditSite, auditToPrompt, type SiteAudit } from "@/lib/urlAudit";

export const runtime = "nodejs";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const URL_RE = /\b((?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?)\b/i;

const resend = new Resend(process.env.RESEND_API_KEY);

type ChatMsg = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are "Dawn", the AI Growth Agent for Launch at Dawn — a technical SEO, web/software development, and digital marketing agency based in Montreal and Vancouver, serving clients across Canada and the USA.

YOUR GOALS, in order:
1. Give the visitor genuine, specific value fast (especially if a website audit is provided below).
2. Understand their business and what they want to grow.
3. Naturally qualify them: collect their NAME, EMAIL, main GOAL, rough BUDGET, and TIMELINE — one or two questions at a time, never as an interrogation.
4. Guide them to book a free 20-minute growth call at /contact/hello.

STYLE:
- Warm, sharp, confident. Sound like a smart strategist, not a chatbot.
- Keep replies SHORT (2-4 sentences). Use plain language, no jargon dumps.
- Never invent audit data. Only cite the audit facts provided below.
- If you have audit data, lead with the 1-2 most important, concrete issues and what they cost the business.
- Once you have their name AND email, warmly confirm a strategist will follow up within 24 hours and invite them to book a call now.
- You represent a real agency. Be honest: you cannot guarantee #1 rankings; you build the systems that earn results over time.

You are Launch at Dawn's live demonstration of AI capability — be impressive, useful, and human.`;

function extractName(messages: ChatMsg[]): string | undefined {
  for (const m of messages) {
    if (m.role !== "user") continue;
    const patterns = [
      /\b(?:i am|i'm|my name is|this is|it's|its)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$/,
    ];
    for (const re of patterns) {
      const match = m.content.match(re);
      if (match?.[1] && !EMAIL_RE.test(match[1])) return match[1].trim();
    }
  }
  return undefined;
}

async function sendLeadEmail(name: string, email: string, transcript: string, audit?: SiteAudit) {
  const auditBlock = audit?.ok
    ? `<pre style="background:#0a0a0a;color:#ddd;padding:12px;border-radius:8px;white-space:pre-wrap;font-size:12px;">${auditToPrompt(
        audit
      ).replace(/</g, "&lt;")}</pre>`
    : "";
  await resend.emails.send({
    from: "Launch at Dawn <system@launchatdawn.com>",
    to: "r4jp47e1@gmail.com",
    replyTo: EMAIL_RE.test(email) ? email : undefined,
    subject: `🤖 AI AGENT LEAD: ${name}`,
    html: `
      <div style="background:#050505;color:#fff;padding:30px;border:1px solid #F95D0A;font-family:sans-serif;max-width:600px;">
        <h2 style="color:#F95D0A;text-transform:uppercase;letter-spacing:2px;">AI Growth Agent Lead</h2>
        <p><strong style="color:#F95D0A;">Name:</strong> ${name.replace(/</g, "&lt;")}</p>
        <p><strong style="color:#F95D0A;">Email:</strong> ${email.replace(/</g, "&lt;")}</p>
        ${audit?.url ? `<p><strong style="color:#F95D0A;">Website:</strong> ${String(audit.url).replace(/</g, "&lt;")}</p>` : ""}
        ${auditBlock}
        <hr style="border:0;border-top:1px solid #222;margin:20px 0;" />
        <p style="color:#F95D0A;font-weight:bold;">Conversation:</p>
        <pre style="background:#0a0a0a;color:#ccc;padding:12px;border-radius:8px;white-space:pre-wrap;font-size:12px;">${transcript.replace(
          /</g,
          "&lt;"
        )}</pre>
      </div>`,
  });

  if (EMAIL_RE.test(email)) {
    await resend.emails.send({
      from: "Launch at Dawn <hello@launchatdawn.com>",
      to: email,
      subject: `Thanks ${name.split(" ")[0]} — your growth notes are on the way`,
      html: `
        <div style="background:#050505;color:#fff;font-family:sans-serif;padding:40px;border-top:4px solid #F95D0A;max-width:560px;">
          <h1 style="text-transform:uppercase;letter-spacing:2px;">Launch at Dawn</h1>
          <p style="color:#F95D0A;font-weight:bold;text-transform:uppercase;">You just met our AI agent</p>
          <hr style="border:0;border-top:1px solid #222;margin:20px 0;" />
          <p>Hi ${name.split(" ")[0].replace(/</g, "&lt;")},</p>
          <p>Thanks for the chat. A human strategist is reviewing your conversation and will follow up within 24 hours with a clear next step.</p>
          <p>Want to move faster? <a href="https://launchatdawn.com/contact/hello" style="color:#F95D0A;">Book a free 20-minute growth call</a>.</p>
          <p style="margin-top:24px;">— The Launch at Dawn Team</p>
        </div>`,
    });
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Agent is not configured." }, { status: 503 });
    }

    const body = await req.json().catch(() => ({}));
    const messages: ChatMsg[] = Array.isArray(body?.messages) ? body.messages.slice(-20) : [];
    let audit: SiteAudit | undefined = body?.audit || undefined;
    const leadAlreadySaved: boolean = body?.leadSaved === true;

    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Sanitize + cap message sizes.
    const clean = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    // Run a live audit the first time a URL appears in the conversation.
    if (!audit) {
      const lastUserWithUrl = [...clean].reverse().find(
        (m) => m.role === "user" && URL_RE.test(m.content) && !EMAIL_RE.test(m.content.match(URL_RE)?.[0] || "")
      );
      const candidate = lastUserWithUrl?.content.match(URL_RE)?.[0];
      if (candidate) {
        audit = await auditSite(candidate);
      }
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction =
      SYSTEM_PROMPT + (audit ? `\n\n--- LIVE WEBSITE AUDIT (use these real facts) ---\n${auditToPrompt(audit)}` : "");

    const contents = clean.map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    }));

    const result = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    const reply =
      result.text?.trim() ||
      "Sorry, I didn't quite catch that. Could you rephrase — or tell me your website URL and I'll take a look?";

    // Lead capture: once we have an email (and a name), notify the team once.
    let leadSaved = leadAlreadySaved;
    if (!leadAlreadySaved) {
      const allUserText = clean.filter((m) => m.role === "user").map((m) => m.content).join("\n");
      const email = allUserText.match(EMAIL_RE)?.[0];
      const name = extractName(clean);
      if (email && name) {
        const transcript = clean.map((m) => `${m.role === "user" ? "Visitor" : "Dawn"}: ${m.content}`).join("\n");
        try {
          await sendLeadEmail(name, email, transcript, audit);
          leadSaved = true;
        } catch (e) {
          console.error("Agent lead email failed:", e);
        }
      }
    }

    return NextResponse.json({ reply, audit: audit ?? null, leadSaved });
  } catch (error) {
    console.error("Agent API error:", error);
    return NextResponse.json(
      { error: "The agent hit a snag. Please try again in a moment." },
      { status: 500 }
    );
  }
}
