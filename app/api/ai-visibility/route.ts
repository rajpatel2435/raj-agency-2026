import { NextResponse } from "next/server";
import dns from "node:dns/promises";
import net from "node:net";

// --- SSRF protection: block private / internal address ranges ---
function isBlockedIp(ip: string): boolean {
  if (net.isIP(ip) === 4) {
    const p = ip.split(".").map(Number);
    if (p[0] === 10) return true;
    if (p[0] === 127) return true;
    if (p[0] === 0) return true;
    if (p[0] === 169 && p[1] === 254) return true;
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
    if (p[0] === 192 && p[1] === 168) return true;
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true;
    return false;
  }
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower === "::") return true;
  if (lower.startsWith("fe80") || lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("::ffff:")) return isBlockedIp(lower.replace("::ffff:", ""));
  return false;
}

async function assertPublicUrl(raw: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("Please enter a valid URL (including https://).");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http and https URLs are supported.");
  }
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".internal")) {
    throw new Error("That host is not allowed.");
  }
  const candidates: string[] = [];
  if (net.isIP(host)) {
    candidates.push(host);
  } else {
    const records = await dns.lookup(host, { all: true });
    for (const r of records) candidates.push(r.address);
  }
  if (candidates.length === 0) throw new Error("Could not resolve that domain.");
  for (const ip of candidates) {
    if (isBlockedIp(ip)) throw new Error("That host is not allowed.");
  }
  return url;
}

async function safeFetchText(target: string, signal: AbortSignal, maxBytes = 512 * 1024): Promise<string | null> {
  try {
    const res = await fetch(target, {
      redirect: "follow",
      signal,
      headers: { "User-Agent": "LaunchAtDawn-AI-Visibility/1.0 (+https://www.launchatdawn.com)" },
    });
    if (!res.ok) return null;
    const reader = res.body?.getReader();
    if (!reader) return await res.text();
    const decoder = new TextDecoder();
    let text = "";
    let received = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      text += decoder.decode(value, { stream: true });
      if (received > maxBytes) break;
    }
    return text;
  } catch {
    return null;
  }
}

type Check = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
};

const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const input = String(body?.url ?? "").trim();
    if (!input) {
      return NextResponse.json({ error: "Please enter a URL." }, { status: 400 });
    }

    const normalized = /^https?:\/\//i.test(input) ? input : `https://${input}`;
    const url = await assertPublicUrl(normalized);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    let html: string | null;
    let robots: string | null;
    let llms: string | null;
    try {
      const origin = `${url.protocol}//${url.host}`;
      [html, robots, llms] = await Promise.all([
        safeFetchText(url.toString(), controller.signal, 2 * 1024 * 1024),
        safeFetchText(`${origin}/robots.txt`, controller.signal),
        safeFetchText(`${origin}/llms.txt`, controller.signal),
      ]);
    } finally {
      clearTimeout(timeout);
    }

    if (html === null) {
      return NextResponse.json(
        { error: "Couldn't read that site. It may be down or blocking automated requests." },
        { status: 200 }
      );
    }

    // --- Extract AI-relevant signals ---
    const jsonLdBlocks = html.match(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) ?? [];
    const schemaText = jsonLdBlocks.join(" ");
    const hasSchema = jsonLdBlocks.length > 0;
    const hasOrg = /"@type"\s*:\s*"(Organization|ProfessionalService|LocalBusiness)"/i.test(schemaText);
    const hasFaq = /"@type"\s*:\s*"FAQPage"/i.test(schemaText);
    const hasArticleOrProduct = /"@type"\s*:\s*"(Article|BlogPosting|Product|Service)"/i.test(schemaText);
    const metaDesc =
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i.test(html);
    const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
    const headingCount = (html.match(/<h[1-3][\s>]/gi) ?? []).length;
    const hasSemantic = /<(article|section|main|nav|header|footer)[\s>]/i.test(html);
    const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
    const wordCount = textOnly.split(/\s+/).filter(Boolean).length;

    // robots.txt AI crawler access
    const aiBlocked: string[] = [];
    if (robots) {
      const lower = robots.toLowerCase();
      for (const bot of AI_CRAWLERS) {
        // crude: look for "User-agent: bot" followed by "Disallow: /"
        const idx = lower.indexOf(`user-agent: ${bot.toLowerCase()}`);
        if (idx !== -1) {
          const block = lower.slice(idx, idx + 200);
          if (/disallow:\s*\/\s*(\n|$)/.test(block)) aiBlocked.push(bot);
        }
      }
    }

    const checks: Check[] = [];
    const add = (c: Check) => checks.push(c);

    add({
      id: "schema",
      label: "Structured data (Schema.org)",
      status: hasSchema ? "pass" : "fail",
      detail: hasSchema
        ? `Found ${jsonLdBlocks.length} structured-data block(s). AI models use this to understand your business.`
        : "No structured data found. AI assistants can't reliably identify who you are or what you offer.",
    });
    add({
      id: "org",
      label: "Business identity schema",
      status: hasOrg ? "pass" : "warn",
      detail: hasOrg
        ? "Organization / LocalBusiness schema present — AI knows your name, location, and contact."
        : "No Organization or LocalBusiness schema. Add it so AI can recommend you by name.",
    });
    add({
      id: "faq",
      label: "FAQ structured data",
      status: hasFaq ? "pass" : "warn",
      detail: hasFaq
        ? "FAQPage schema found — AI can quote your answers directly."
        : "No FAQ schema. Q&A content is exactly what AI assistants pull into answers.",
    });
    add({
      id: "entity",
      label: "Content type schema (Article / Service / Product)",
      status: hasArticleOrProduct ? "pass" : "warn",
      detail: hasArticleOrProduct
        ? "Your key content is marked up so AI understands what it is."
        : "Add Article, Service, or Product schema so AI understands your core content.",
    });
    add({
      id: "llms",
      label: "llms.txt AI guidance file",
      status: llms ? "pass" : "warn",
      detail: llms
        ? "llms.txt found — you're giving AI crawlers a curated map of your site."
        : "No llms.txt. This emerging standard tells AI models what matters most on your site.",
    });
    add({
      id: "crawlers",
      label: "AI crawler access (robots.txt)",
      status: aiBlocked.length === 0 ? "pass" : "fail",
      detail:
        aiBlocked.length === 0
          ? "AI crawlers like GPTBot and ClaudeBot are allowed to read your site."
          : `You are blocking: ${aiBlocked.join(", ")}. These AI models can't see your content.`,
    });
    add({
      id: "description",
      label: "Meta description",
      status: metaDesc ? "pass" : "warn",
      detail: metaDesc
        ? "Meta description present — a clean summary AI can use."
        : "No meta description. Add a concise summary of the page.",
    });
    add({
      id: "headings",
      label: "Clear heading structure",
      status: h1Count === 1 && headingCount >= 3 ? "pass" : "warn",
      detail:
        h1Count === 1 && headingCount >= 3
          ? "Clean heading hierarchy helps AI parse your content."
          : `Found ${h1Count} H1 and ${headingCount} headings. Use one H1 and clear sub-headings.`,
    });
    add({
      id: "semantic",
      label: "Semantic HTML",
      status: hasSemantic ? "pass" : "warn",
      detail: hasSemantic
        ? "Semantic tags (article, section, main) help machines understand layout."
        : "Little semantic HTML found. Use article/section/main tags.",
    });
    add({
      id: "depth",
      label: "Content depth",
      status: wordCount >= 400 ? "pass" : wordCount >= 150 ? "warn" : "fail",
      detail: `Roughly ${wordCount} words on the page. AI favors substantive, informative content (400+ words).`,
    });

    const passes = checks.filter((c) => c.status === "pass").length;
    const warns = checks.filter((c) => c.status === "warn").length;
    const score = Math.round(((passes + warns * 0.5) / checks.length) * 100);

    let grade = "Needs Work";
    if (score >= 85) grade = "AI-Ready";
    else if (score >= 65) grade = "Good";
    else if (score >= 45) grade = "Fair";

    return NextResponse.json({
      url: url.toString(),
      score,
      grade,
      summary: `${passes} passed, ${warns} to improve, ${checks.length - passes - warns} failing.`,
      checks,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
