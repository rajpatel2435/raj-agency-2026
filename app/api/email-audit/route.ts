import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Check = { label: string; status: "pass" | "warn" | "fail"; detail: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim();
    const url = String(body?.url ?? "").trim();
    const score = Number(body?.score);
    const checks: Check[] = Array.isArray(body?.checks) ? body.checks.slice(0, 30) : [];
    const source = String(body?.source ?? "SEO Checker").slice(0, 40);

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!url) {
      return NextResponse.json({ error: "Missing report data." }, { status: 400 });
    }

    const dot = (s: Check["status"]) => (s === "pass" ? "#34d399" : s === "warn" ? "#fbbf24" : "#ef4444");
    const rows = checks
      .map(
        (c) => `
        <tr>
          <td style="padding:10px 8px;border-bottom:1px solid #1a1a1a;vertical-align:top;">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${dot(c.status)};margin-right:8px;"></span>
          </td>
          <td style="padding:10px 8px;border-bottom:1px solid #1a1a1a;">
            <strong style="color:#fff;">${esc(c.label)}</strong><br/>
            <span style="color:#a1a1aa;font-size:13px;">${esc(c.detail)}</span>
          </td>
        </tr>`
      )
      .join("");

    // Report to the user
    await resend.emails.send({
      from: "Launch at Dawn <system@launchatdawn.com>",
      to: email,
      subject: `Your website audit for ${esc(url)}`,
      html: `
        <div style="background:#050505;color:#fff;font-family:Arial,sans-serif;padding:40px;">
          <h1 style="text-transform:uppercase;letter-spacing:2px;font-size:22px;">launch<span style="color:#F95D0A;">at</span>dawn</h1>
          <p style="color:#F95D0A;font-weight:bold;text-transform:uppercase;font-size:12px;letter-spacing:2px;">${esc(source)} Report</p>
          <p style="color:#a1a1aa;">Site analyzed: <strong style="color:#fff;">${esc(url)}</strong></p>
          <div style="font-size:56px;font-weight:800;color:#F95D0A;margin:10px 0;">${Number.isFinite(score) ? score : "—"}<span style="font-size:18px;color:#555;"> / 100</span></div>
          <table style="width:100%;border-collapse:collapse;margin-top:20px;">${rows}</table>
          <div style="margin-top:30px;padding:24px;background:#F95D0A;border-radius:12px;text-align:center;">
            <p style="color:#000;font-weight:800;font-size:18px;margin:0 0 12px;">Want us to fix these for you?</p>
            <a href="https://www.launchatdawn.com/contact" style="display:inline-block;background:#000;color:#fff;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:800;text-transform:uppercase;font-size:12px;letter-spacing:1px;">Book a Free Call</a>
          </div>
          <p style="font-size:11px;color:#555;margin-top:24px;">Launch at Dawn · Montreal · Vancouver · (514) 699-2435</p>
        </div>`,
    });

    // Lead notification to the team
    await resend.emails.send({
      from: "Launch at Dawn <system@launchatdawn.com>",
      to: "r4jp47e1@gmail.com",
      subject: `🔔 Tool lead: ${esc(email)} (${esc(source)})`,
      html: `
        <div style="background:#050505;color:#fff;padding:30px;border:1px solid #F95D0A;font-family:sans-serif;">
          <h2 style="color:#F95D0A;">NEW TOOL LEAD</h2>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Analyzed:</strong> ${esc(url)}</p>
          <p><strong>Score:</strong> ${Number.isFinite(score) ? score : "—"}/100</p>
          <p><strong>Source:</strong> ${esc(source)}</p>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("email-audit error:", error);
    return NextResponse.json({ error: "Could not send the report. Please try again." }, { status: 500 });
  }
}
