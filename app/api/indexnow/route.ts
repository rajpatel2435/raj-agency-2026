import { NextResponse } from "next/server";
import { SITE_URL } from "@/app/seo";

// IndexNow key. The matching file must exist at /<KEY>.txt (see public/).
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "8f4e2a9c1b7d43e6a05f9c8e2d1b7a3f";
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function host(): string {
  return new URL(SITE_URL).hostname;
}

// Pull every <loc> URL from the live sitemap.
async function getSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${SITE_URL}/sitemap.xml`, {
    headers: { "User-Agent": "LaunchAtDawn-IndexNow/1.0" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Could not read sitemap (status ${res.status}).`);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/gi)).map((m) => m[1].trim());
  return Array.from(new Set(urls));
}

async function submit(urlList: string[]) {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: host(),
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });
  return { status: res.status, ok: res.ok };
}

function authorized(req: Request): boolean {
  const secret = process.env.INDEXNOW_TRIGGER_SECRET;
  if (!secret) return false; // must be configured to use
  const url = new URL(req.url);
  const provided = url.searchParams.get("secret") || req.headers.get("x-indexnow-secret");
  return provided === secret;
}

// GET /api/indexnow?secret=... -> submit the entire sitemap
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  try {
    const urls = await getSitemapUrls();
    if (urls.length === 0) {
      return NextResponse.json({ error: "No URLs found in sitemap." }, { status: 200 });
    }
    const result = await submit(urls);
    return NextResponse.json({ submitted: urls.length, indexnow: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/indexnow  { urls: string[] }  (secret via ?secret= or x-indexnow-secret header)
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => ({}));
    const raw = Array.isArray(body?.urls) ? body.urls : [];
    // Only accept URLs that belong to this site.
    const urls = raw
      .map((u: unknown) => String(u))
      .filter((u: string) => u.startsWith(SITE_URL));
    if (urls.length === 0) {
      return NextResponse.json({ error: "Provide a non-empty 'urls' array of same-site URLs." }, { status: 400 });
    }
    const result = await submit(urls);
    return NextResponse.json({ submitted: urls.length, indexnow: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
