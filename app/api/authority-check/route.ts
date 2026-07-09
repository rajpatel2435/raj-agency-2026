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

function countMatches(regex: RegExp, html: string): number {
  const m = html.match(regex);
  return m ? m.length : 0;
}

// Reduce a hostname like "www.blog.example.co.uk" to the registrable domain
// well enough for an RDAP lookup ("example.co.uk").
function registrableDomain(host: string): string {
  const parts = host.replace(/^www\./, "").split(".");
  if (parts.length <= 2) return parts.join(".");
  const secondLevel = new Set(["co", "com", "net", "org", "gov", "edu", "ac"]);
  const last = parts[parts.length - 1];
  const secondLast = parts[parts.length - 2];
  if (last.length === 2 && secondLevel.has(secondLast)) {
    return parts.slice(-3).join(".");
  }
  return parts.slice(-2).join(".");
}

// Fetch the domain registration date via the free public RDAP registry.
async function fetchDomainAgeYears(host: string): Promise<number | null> {
  try {
    const domain = registrableDomain(host);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6_000);
    let res: Response;
    try {
      res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
        redirect: "follow",
        signal: controller.signal,
        headers: { Accept: "application/rdap+json" },
      });
    } finally {
      clearTimeout(timeout);
    }
    if (!res.ok) return null;
    const data = (await res.json()) as { events?: Array<{ eventAction?: string; eventDate?: string }> };
    const reg = data.events?.find((e) => e.eventAction === "registration");
    if (!reg?.eventDate) return null;
    const created = new Date(reg.eventDate).getTime();
    if (Number.isNaN(created)) return null;
    const years = (Date.now() - created) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.max(0, years);
  } catch {
    return null;
  }
}

// Check whether a same-host path returns a successful response.
async function pathExists(base: URL, path: string): Promise<boolean> {
  try {
    const target = new URL(path, base);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6_000);
    let res: Response;
    try {
      res = await fetch(target.toString(), {
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "LaunchAtDawn-Authority-Checker/1.0 (+https://www.launchatdawn.com)" },
      });
    } finally {
      clearTimeout(timeout);
    }
    return res.ok;
  } catch {
    return false;
  }
}

type Signal = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
  weight: number;
};

function band(score: number): string {
  if (score >= 80) return "Authoritative";
  if (score >= 60) return "Strong";
  if (score >= 40) return "Established";
  if (score >= 20) return "Developing";
  return "Emerging";
}

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
        headers: { "User-Agent": "LaunchAtDawn-Authority-Checker/1.0 (+https://www.launchatdawn.com)" },
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

    // Read up to 2 MB of HTML
    const reader = res.body?.getReader();
    let html = "";
    if (reader) {
      const decoder = new TextDecoder();
      let received = 0;
      const MAX = 2 * 1024 * 1024;
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

    const host = url.hostname.toLowerCase();

    // Run the slower lookups in parallel.
    const [ageYears, hasSitemap] = await Promise.all([
      fetchDomainAgeYears(host),
      pathExists(url, "/sitemap.xml"),
    ]);

    const isHttps = url.protocol === "https:";
    const hsts = res.headers.has("strict-transport-security");
    const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
    const hasSchema = /application\/ld\+json/i.test(html);
    const hasOrgSchema = /"@type"\s*:\s*["'](?:Organization|ProfessionalService|LocalBusiness|Corporation)["']/i.test(html);

    // Social / brand-mention proxy
    const socialPatterns = [
      /facebook\.com\//i,
      /instagram\.com\//i,
      /(?:twitter|x)\.com\//i,
      /linkedin\.com\//i,
      /youtube\.com\//i,
      /tiktok\.com\//i,
    ];
    const socialCount = socialPatterns.filter((re) => re.test(html)).length;

    // Content depth — strip tags and count words
    const textOnly = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const wordCount = textOnly ? textOnly.split(" ").length : 0;

    // Internal linking depth
    const internalLinks = countMatches(
      new RegExp(`<a\\b[^>]*href=["'](?:https?://(?:www\\.)?${host.replace(/^www\./, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}|/)[^"']*["']`, "gi"),
      html
    );

    const signals: Signal[] = [];

    signals.push({
      id: "age",
      label: "Domain age & history",
      status: ageYears === null ? "warn" : ageYears >= 3 ? "pass" : ageYears >= 1 ? "warn" : "fail",
      detail:
        ageYears === null
          ? "Registration date not available for this TLD — age is a major trust signal."
          : ageYears >= 3
          ? `Registered ~${ageYears.toFixed(1)} years ago — aged domains carry more trust.`
          : ageYears >= 1
          ? `Registered ~${ageYears.toFixed(1)} years ago — still building history.`
          : `Registered under a year ago (~${ageYears.toFixed(1)}y) — new domains rank slower.`,
      weight: 3,
    });

    signals.push({
      id: "https",
      label: "HTTPS / SSL security",
      status: isHttps && hsts ? "pass" : isHttps ? "warn" : "fail",
      detail: !isHttps
        ? "No HTTPS — a hard trust and ranking blocker."
        : hsts
        ? "Secure HTTPS with HSTS enabled."
        : "HTTPS on, but no HSTS header — add one to strengthen trust.",
      weight: 2,
    });

    signals.push({
      id: "indexable",
      label: "Search-engine indexable",
      status: noindex ? "fail" : "pass",
      detail: noindex
        ? "Page is set to noindex — it cannot build authority in search."
        : "Page is open to indexing — search engines can rank it.",
      weight: 2,
    });

    signals.push({
      id: "sitemap",
      label: "XML sitemap",
      status: hasSitemap ? "pass" : "warn",
      detail: hasSitemap
        ? "sitemap.xml found — helps search engines discover every page."
        : "No sitemap.xml detected — crawlers may miss pages.",
      weight: 1,
    });

    signals.push({
      id: "schema",
      label: "Structured data & brand entity",
      status: hasOrgSchema ? "pass" : hasSchema ? "warn" : "fail",
      detail: hasOrgSchema
        ? "Organization/LocalBusiness schema present — defines your brand entity."
        : hasSchema
        ? "Some structured data found, but no Organization entity."
        : "No structured data — Google can't confirm your brand identity.",
      weight: 2,
    });

    signals.push({
      id: "social",
      label: "Connected social profiles",
      status: socialCount >= 2 ? "pass" : socialCount === 1 ? "warn" : "fail",
      detail:
        socialCount >= 2
          ? `${socialCount} social profiles linked — reinforces brand authority.`
          : socialCount === 1
          ? "Only one social profile linked — connect more to strengthen your entity."
          : "No social profiles linked from the page.",
      weight: 1,
    });

    signals.push({
      id: "content",
      label: "Content depth",
      status: wordCount >= 600 ? "pass" : wordCount >= 250 ? "warn" : "fail",
      detail:
        wordCount >= 600
          ? `~${wordCount} words — substantial content search engines can rank.`
          : wordCount >= 250
          ? `~${wordCount} words — decent, but more depth builds topical authority.`
          : `~${wordCount} words — thin content struggles to rank or earn links.`,
      weight: 2,
    });

    signals.push({
      id: "internal",
      label: "Internal link structure",
      status: internalLinks >= 15 ? "pass" : internalLinks >= 5 ? "warn" : "fail",
      detail:
        internalLinks >= 15
          ? `${internalLinks} internal links — strong structure that spreads authority.`
          : internalLinks >= 5
          ? `${internalLinks} internal links — add more to distribute ranking power.`
          : `${internalLinks} internal links — weak internal structure.`,
      weight: 1,
    });

    const maxWeight = signals.reduce((s, x) => s + x.weight, 0);
    const gained = signals.reduce((s, x) => {
      const v = x.status === "pass" ? 1 : x.status === "warn" ? 0.5 : 0;
      return s + v * x.weight;
    }, 0);
    const score = Math.round((gained / maxWeight) * 100);

    return NextResponse.json({
      url: url.toString(),
      score,
      band: band(score),
      signals: signals.map(({ weight, ...rest }) => rest),
      summary: {
        pass: signals.filter((s) => s.status === "pass").length,
        warn: signals.filter((s) => s.status === "warn").length,
        fail: signals.filter((s) => s.status === "fail").length,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
