import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Answers = {
  need?: string;
  business?: string;
  budget?: string;
  timeline?: string;
  url?: string;
  name?: string;
  email?: string;
};

// Simple, transparent fit score so the team can triage hot leads fast.
function scoreLead(a: Answers): { score: number; band: "Hot" | "Warm" | "Cold" } {
  let s = 0;
  const budget = (a.budget || "").toLowerCase();
  if (budget.includes("5k") || budget.includes("5,000") || budget.includes("+")) s += 40;
  else if (budget.includes("2k") || budget.includes("2,000")) s += 25;
  else if (budget.includes("under") || budget.includes("<")) s += 8;

  const timeline = (a.timeline || "").toLowerCase();
  if (timeline.includes("asap") || timeline.includes("now")) s += 35;
  else if (timeline.includes("1-3") || timeline.includes("month")) s += 20;
  else if (timeline.includes("explor")) s += 5;

  if (a.need && a.need.toLowerCase() !== "not sure") s += 15;
  if (a.url) s += 10;

  const band = s >= 65 ? "Hot" : s >= 35 ? "Warm" : "Cold";
  return { score: Math.min(100, s), band };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Answers;
    const name = String(body?.name ?? "").trim().slice(0, 120);
    const email = String(body?.email ?? "").trim().slice(0, 200);
    const url = String(body?.url ?? "").trim().slice(0, 300);
    const need = String(body?.need ?? "").trim().slice(0, 120);
    const business = String(body?.business ?? "").trim().slice(0, 120);
    const budget = String(body?.budget ?? "").trim().slice(0, 60);
    const timeline = String(body?.timeline ?? "").trim().slice(0, 60);

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    const { score, band } = scoreLead({ need, business, budget, timeline, url });
    const bandColor = band === "Hot" ? "#ef4444" : band === "Warm" ? "#fbbf24" : "#60a5fa";

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #1a1a1a;color:#a1a1aa;font-size:13px;text-transform:uppercase;letter-spacing:1px;">${esc(label)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #1a1a1a;color:#fff;font-weight:600;">${esc(value || "—")}</td>
      </tr>`;

    // Qualified-lead notification to the team.
    await resend.emails.send({
      from: "Launch at Dawn <system@launchatdawn.com>",
      to: "r4jp47e1@gmail.com",
      subject: `${band === "Hot" ? "🔥" : band === "Warm" ? "⚡" : "📥"} ${band} lead: ${esc(name)} (${score}/100)`,
      html: `
        <div style="background:#050505;color:#fff;padding:30px;border:1px solid ${bandColor};font-family:Arial,sans-serif;max-width:560px;">
          <p style="color:${bandColor};font-weight:800;text-transform:uppercase;letter-spacing:2px;font-size:12px;margin:0;">${esc(band)} lead · fit ${score}/100</p>
          <h2 style="color:#fff;margin:6px 0 20px;">${esc(name)}</h2>
          <table style="width:100%;border-collapse:collapse;">
            ${row("Email", email)}
            ${row("Website", url)}
            ${row("Needs", need)}
            ${row("Business", business)}
            ${row("Budget", budget)}
            ${row("Timeline", timeline)}
          </table>
          <a href="mailto:${esc(email)}" style="display:inline-block;margin-top:24px;background:#F95D0A;color:#000;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:800;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Reply to ${esc(name)}</a>
        </div>`,
    });

    // Friendly confirmation to the lead.
    await resend.emails.send({
      from: "Launch at Dawn <system@launchatdawn.com>",
      to: email,
      subject: "We got your details — next step inside",
      html: `
        <div style="background:#050505;color:#fff;font-family:Arial,sans-serif;padding:40px;max-width:560px;">
          <h1 style="text-transform:uppercase;letter-spacing:2px;font-size:22px;">launch<span style="color:#F95D0A;">at</span>dawn</h1>
          <p style="color:#a1a1aa;font-size:16px;line-height:1.6;">Hi ${esc(name.split(" ")[0] || "there")}, thanks for sharing where you want to grow. A strategist is reviewing your answers and will reply within 24 hours with a clear, no-pressure next step.</p>
          <p style="color:#a1a1aa;font-size:16px;line-height:1.6;">Want to move faster? Book a free 20-minute growth call now:</p>
          <a href="https://www.launchatdawn.com/contact/hello" style="display:inline-block;margin-top:12px;background:#F95D0A;color:#000;padding:14px 32px;border-radius:999px;text-decoration:none;font-weight:800;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Book a Growth Call</a>
          <p style="font-size:11px;color:#555;margin-top:28px;">Launch at Dawn · Montreal · Vancouver · (514) 699-2435</p>
        </div>`,
    });

    return NextResponse.json({ ok: true, band });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
