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

export async function assertPublicUrl(raw: string): Promise<URL> {
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

async function safeFetchText(
  target: string,
  signal: AbortSignal,
  maxBytes = 512 * 1024
): Promise<{ html: string; status: number } | null> {
  try {
    const res = await fetch(target, {
      redirect: "follow",
      signal,
      headers: { "User-Agent": "LaunchAtDawn-Agent/1.0 (+https://launchatdawn.com)" },
    });
    const reader = res.body?.getReader();
    if (!reader) return { html: await res.text(), status: res.status };
    const decoder = new TextDecoder();
    let text = "";
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      text += decoder.decode(value, { stream: true });
      if (received > maxBytes) break;
    }
    return { html: text, status: res.status };
  } catch {
    return null;
  }
}

export type SiteAudit = {
  url: string;
  ok: boolean;
  error?: string;
  https: boolean;
  status?: number;
  title?: string;
  titleLength?: number;
  metaDescription?: string;
  metaDescriptionLength?: number;
  h1Count?: number;
  firstH1?: string;
  hasViewport?: boolean;
  hasCanonical?: boolean;
  hasOpenGraph?: boolean;
  hasStructuredData?: boolean;
  imgCount?: number;
  imgMissingAlt?: number;
  wordCount?: number;
};

function pick(re: RegExp, html: string): string | undefined {
  const m = html.match(re);
  return m ? m[1].trim() : undefined;
}

/**
 * Fetches a public URL (SSRF-guarded) and extracts lightweight, on-page SEO
 * signals. Never throws for network issues — returns { ok: false } instead.
 */
export async function auditSite(raw: string): Promise<SiteAudit> {
  const input = raw.trim();
  const withProto = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  let url: URL;
  try {
    url = await assertPublicUrl(withProto);
  } catch (e) {
    return {
      url: withProto,
      ok: false,
      https: withProto.startsWith("https://"),
      error: e instanceof Error ? e.message : "Invalid URL.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const result = await safeFetchText(url.toString(), controller.signal);
  clearTimeout(timeout);

  if (!result) {
    return { url: url.toString(), ok: false, https: url.protocol === "https:", error: "Could not load the site (it may be down or blocking bots)." };
  }

  const html = result.html;
  const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/i, html);
  const metaDescription =
    pick(/<meta[^>]+name=["']description["'][^>]*content=["']([\s\S]*?)["']/i, html) ||
    pick(/<meta[^>]+content=["']([\s\S]*?)["'][^>]*name=["']description["']/i, html);
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const firstH1 = h1Matches[0]?.replace(/<[^>]+>/g, "").trim();
  const imgMatches = html.match(/<img\b[^>]*>/gi) || [];
  const imgMissingAlt = imgMatches.filter((t) => !/\balt\s*=/.test(t)).length;
  const textOnly = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    url: url.toString(),
    ok: true,
    https: url.protocol === "https:",
    status: result.status,
    title,
    titleLength: title?.length,
    metaDescription,
    metaDescriptionLength: metaDescription?.length,
    h1Count: h1Matches.length,
    firstH1,
    hasViewport: /<meta[^>]+name=["']viewport["']/i.test(html),
    hasCanonical: /<link[^>]+rel=["']canonical["']/i.test(html),
    hasOpenGraph: /<meta[^>]+property=["']og:/i.test(html),
    hasStructuredData: /application\/ld\+json/i.test(html),
    imgCount: imgMatches.length,
    imgMissingAlt,
    wordCount: textOnly ? textOnly.split(" ").length : 0,
  };
}

/** Compact, model-friendly summary of an audit for the agent's context. */
export function auditToPrompt(a: SiteAudit): string {
  if (!a.ok) return `Website audit for ${a.url} FAILED: ${a.error}`;
  const lines = [
    `Website audit for ${a.url}:`,
    `- HTTPS: ${a.https ? "yes" : "NO (insecure)"}`,
    `- HTTP status: ${a.status}`,
    `- Title: ${a.title ? `"${a.title}" (${a.titleLength} chars)` : "MISSING"}`,
    `- Meta description: ${a.metaDescription ? `"${a.metaDescription}" (${a.metaDescriptionLength} chars)` : "MISSING"}`,
    `- H1 tags: ${a.h1Count}${a.firstH1 ? ` (first: "${a.firstH1}")` : ""}`,
    `- Mobile viewport tag: ${a.hasViewport ? "yes" : "NO"}`,
    `- Canonical tag: ${a.hasCanonical ? "yes" : "NO"}`,
    `- Open Graph (social preview) tags: ${a.hasOpenGraph ? "yes" : "NO"}`,
    `- Structured data (schema.org): ${a.hasStructuredData ? "yes" : "NO"}`,
    `- Images: ${a.imgCount} (${a.imgMissingAlt} missing alt text)`,
    `- Approx visible word count: ${a.wordCount}`,
  ];
  return lines.join("\n");
}
