import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where new leads / applications are delivered.
const NOTIFY_TO = "r4jp47e1@gmail.com";
const FROM_SYSTEM = "Launch at Dawn <system@launchatdawn.com>";
const FROM_HELLO = "Launch at Dawn <hello@launchatdawn.com>";

type LeadPayload = {
  name?: string;
  email?: string;
  source?: string;
  fields?: Record<string, string>;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const { name, email, source = "Website Lead", fields = {} }: LeadPayload =
      await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const rows = Object.entries(fields)
      .filter(([, v]) => v && String(v).trim().length > 0)
      .map(
        ([k, v]) =>
          `<p style="margin:6px 0;"><strong style="color:#F95D0A;">${escapeHtml(
            k
          )}:</strong> ${escapeHtml(String(v))}</p>`
      )
      .join("");

    // --- 1. Instant notification to the agency (fast follow-up = closed deals) ---
    await resend.emails.send({
      from: FROM_SYSTEM,
      to: NOTIFY_TO,
      ...(validEmail ? { replyTo: email } : {}),
      subject: `🚨 NEW ${source.toUpperCase()}: ${name}`,
      html: `
        <div style="background:#050505;color:#fff;padding:30px;border:1px solid #F95D0A;font-family:sans-serif;">
          <h2 style="color:#F95D0A;text-transform:uppercase;letter-spacing:2px;">${escapeHtml(
            source
          )}</h2>
          <p style="margin:6px 0;"><strong style="color:#F95D0A;">Name:</strong> ${escapeHtml(
            name
          )}</p>
          <p style="margin:6px 0;"><strong style="color:#F95D0A;">Email:</strong> ${escapeHtml(
            email
          )}</p>
          ${rows}
        </div>
      `,
    });

    // --- 2. Auto-reply to the prospect (only when a real email was provided) ---
    if (validEmail) {
      await resend.emails.send({
      from: FROM_HELLO,
      to: email,
      subject: `We've got your request, ${name.split(" ")[0]}`,
      html: `
        <div style="background:#050505;color:#fff;font-family:sans-serif;padding:40px;border-top:4px solid #F95D0A;">
          <h1 style="text-transform:uppercase;letter-spacing:2px;">Launch at Dawn</h1>
          <p style="color:#F95D0A;font-weight:bold;text-transform:uppercase;">Request received</p>
          <hr style="border:0;border-top:1px solid #222;margin:20px 0;" />
          <p>Hi ${escapeHtml(name.split(" ")[0])},</p>
          <p>Thanks for reaching out. Your request is in our queue and a strategist will get back to you within 24 hours with a clear next step for growing your leads and revenue.</p>
          <p style="margin-top:24px;">— The Launch at Dawn Team</p>
        </div>
      `,
    });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
