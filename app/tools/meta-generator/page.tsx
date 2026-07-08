"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function field(label: string, value: string, setter: (v: string) => void, placeholder: string, hint?: string) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">{label}</span>
      <input
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#F95D0A] transition-colors placeholder:text-white/25"
      />
      {hint && <span className="text-[10px] text-white/30">{hint}</span>}
    </label>
  );
}

export default function MetaGeneratorPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [siteName, setSiteName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => {
    const lines: string[] = [];
    if (title) {
      lines.push(`<title>${esc(title)}</title>`);
      lines.push(`<meta property="og:title" content="${esc(title)}" />`);
      lines.push(`<meta name="twitter:title" content="${esc(title)}" />`);
    }
    if (desc) {
      lines.push(`<meta name="description" content="${esc(desc)}" />`);
      lines.push(`<meta property="og:description" content="${esc(desc)}" />`);
      lines.push(`<meta name="twitter:description" content="${esc(desc)}" />`);
    }
    if (url) {
      lines.push(`<link rel="canonical" href="${esc(url)}" />`);
      lines.push(`<meta property="og:url" content="${esc(url)}" />`);
    }
    if (image) {
      lines.push(`<meta property="og:image" content="${esc(image)}" />`);
      lines.push(`<meta name="twitter:image" content="${esc(image)}" />`);
    }
    if (siteName) lines.push(`<meta property="og:site_name" content="${esc(siteName)}" />`);
    lines.push(`<meta property="og:type" content="website" />`);
    lines.push(`<meta name="twitter:card" content="summary_large_image" />`);
    if (twitter) lines.push(`<meta name="twitter:site" content="${esc(twitter.startsWith("@") ? twitter : "@" + twitter)}" />`);

    // JSON-LD
    const jsonLd: Record<string, unknown> = { "@context": "https://schema.org", "@type": "WebSite" };
    if (title) jsonLd.name = title;
    if (url) jsonLd.url = url;
    if (desc) jsonLd.description = desc;
    const ld = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;

    return lines.join("\n") + "\n\n" + ld;
  }, [title, desc, url, image, siteName, twitter]);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-44 pb-32 px-6 md:px-12 selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">Free Tool</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mt-6 mb-6">Meta Tag Generator</h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
            Generate SEO meta tags, social share previews and structured data — copy-paste ready for your{" "}
            <code className="text-[#F95D0A]">&lt;head&gt;</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col gap-5">
            {field("Page Title", title, setTitle, "Best SEO Agency in Montreal | Launch at Dawn", `${title.length} chars — aim for 15–60`)}
            {field("Meta Description", desc, setDesc, "We build high-performance websites…", `${desc.length} chars — aim for 50–160`)}
            {field("Canonical URL", url, setUrl, "https://www.example.com/page")}
            {field("Share Image URL", image, setImage, "https://www.example.com/og-image.png", "1200×630 PNG/JPG recommended")}
            {field("Site Name", siteName, setSiteName, "Launch at Dawn")}
            {field("Twitter Handle", twitter, setTwitter, "@launchatdawn")}
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Generated Code</span>
              <button
                onClick={copy}
                className="bg-[#F95D0A] text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <pre className="flex-1 overflow-auto text-xs md:text-sm text-emerald-300/90 font-mono whitespace-pre-wrap break-all leading-relaxed">
              {code}
            </pre>
          </div>
        </div>

        <p className="text-center mt-10">
          <Link href="/tools" className="text-white/40 hover:text-[#F95D0A] transition-colors text-sm font-mono">
            ← All free tools
          </Link>
        </p>
      </div>
    </main>
  );
}
