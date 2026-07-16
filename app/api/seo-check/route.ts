import { NextResponse } from "next/server";
import dns from "node:dns/promises";
import net from "node:net";

// --- SSRF protection: block private / internal address ranges ---
function isBlockedIp(ip: string): boolean {
  if (net.isIP(ip) === 4) {
    const p = ip.split(".").map(Number);
    if (p[0] === 10) return true; // 10.0.0.0/8
    if (p[0] === 127) return true; // loopback
    if (p[0] === 0) return true;
    if (p[0] === 169 && p[1] === 254) return true; // link-local + cloud metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true; // 172.16/12
    if (p[0] === 192 && p[1] === 168) return true; // 192.168/16
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    return false;
  }
  // IPv6: block loopback, link-local, unique-local
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
  // If the host is already an IP, check directly; otherwise resolve it.
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

function pick(regex: RegExp, html: string): string | null {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

function countMatches(regex: RegExp, html: string): number {
  const m = html.match(regex);
  return m ? m.length : 0;
}

type Check = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
};

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
    const timeout = setTimeout(() => controller.abort(), 10_000);

    let res: Response;
    try {
      res = await fetch(url.toString(), {
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "LaunchAtDawn-SEO-Checker/1.0 (+https://launchatdawn.com)" },
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: `The site responded with status ${res.status}. It may be blocking automated requests.` },
        { status: 200 }
      );
    }

    // Limit how much HTML we read (2 MB)
    const reader = res.body?.getReader();
    let html = "";
    if (reader) {
      const decoder = new TextDecoder();
      let received = 0;
      const MAX = 2 * 1024 * 1024;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        html += decoder.decode(value, { stream: true });
        if (received > MAX) break;
      }
    } else {
      html = await res.text();
    }

    const isHttps = url.protocol === "https:";
    const title = pick(/<title[^>]*>([^<]*)<\/title>/i, html);
    const metaDesc = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i, html)
      ?? pick(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i, html);
    const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i, html);
    const viewport = pick(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']*)["']/i, html);
    const h1Count = countMatches(/<h1[\s>]/gi, html);
    const ogTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
    const ogImage = /<meta[^>]+property=["']og:image["']/i.test(html);
    const hasSchema = /application\/ld\+json/i.test(html);
    const imgTotal = countMatches(/<img\b/gi, html);
    const imgWithAlt = countMatches(/<img\b[^>]*\balt=/gi, html);
    const langSet = /<html[^>]+lang=/i.test(html);

    const checks: Check[] = [];
    const add = (c: Check) => checks.push(c);

    add({
      id: "https",
      label: "HTTPS secure connection",
      status: isHttps ? "pass" : "fail",
      detail: isHttps ? "Served securely over HTTPS." : "Site is not using HTTPS — a ranking and trust signal.",
    });
    add({
      id: "title",
      label: "Title tag",
      status: !title ? "fail" : title.length < 15 || title.length > 65 ? "warn" : "pass",
      detail: !title
        ? "No <title> tag found."
        : `“${title}” (${title.length} chars). Aim for 15–60 characters.`,
    });
    add({
      id: "description",
      label: "Meta description",
      status: !metaDesc ? "fail" : metaDesc.length < 50 || metaDesc.length > 165 ? "warn" : "pass",
      detail: !metaDesc
        ? "No meta description — Google will guess your snippet."
        : `${metaDesc.length} chars. Aim for 50–160 characters.`,
    });
    add({
      id: "h1",
      label: "Single H1 heading",
      status: h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "warn",
      detail: h1Count === 1 ? "Exactly one H1 — ideal." : `Found ${h1Count} H1 tags. Use exactly one.`,
    });
    add({
      id: "canonical",
      label: "Canonical URL",
      status: canonical ? "pass" : "warn",
      detail: canonical ? "Canonical tag present." : "No canonical tag — can cause duplicate-content issues.",
    });
    add({
      id: "viewport",
      label: "Mobile viewport",
      status: viewport ? "pass" : "fail",
      detail: viewport ? "Responsive viewport set." : "No viewport meta — page won't be mobile-friendly.",
    });
    add({
      id: "og",
      label: "Social share tags (Open Graph)",
      status: ogTitle && ogImage ? "pass" : ogTitle || ogImage ? "warn" : "fail",
      detail:
        ogTitle && ogImage
          ? "og:title and og:image present."
          : "Missing Open Graph tags — links won't preview well when shared.",
    });
    add({
      id: "schema",
      label: "Structured data (Schema.org)",
      status: hasSchema ? "pass" : "warn",
      detail: hasSchema
        ? "JSON-LD structured data found."
        : "No structured data — you're missing rich results and AI visibility.",
    });
    add({
      id: "alt",
      label: "Image alt text",
      status: imgTotal === 0 ? "warn" : imgWithAlt / imgTotal >= 0.8 ? "pass" : "warn",
      detail:
        imgTotal === 0
          ? "No images detected."
          : `${imgWithAlt}/${imgTotal} images have alt text.`,
    });
    add({
      id: "lang",
      label: "HTML lang attribute",
      status: langSet ? "pass" : "warn",
      detail: langSet ? "Language declared." : "No lang attribute on <html>.",
    });

    const weights: Record<Check["status"], number> = { pass: 1, warn: 0.5, fail: 0 };
    const score = Math.round(
      (checks.reduce((s, c) => s + weights[c.status], 0) / checks.length) * 100
    );

    return NextResponse.json({
      url: url.toString(),
      score,
      checks,
      summary: {
        pass: checks.filter((c) => c.status === "pass").length,
        warn: checks.filter((c) => c.status === "warn").length,
        fail: checks.filter((c) => c.status === "fail").length,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
