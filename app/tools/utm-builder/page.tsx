"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const SOURCE_PRESETS = ["google", "instagram", "linkedin", "facebook", "email", "newsletter", "youtube"];

function field(label: string, value: string, setter: (v: string) => void, placeholder: string, required = false) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
        {label} {required && <span className="text-[#F95D0A]">*</span>}
      </span>
      <input
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className="bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#F95D0A] transition-colors placeholder:text-white/25"
      />
    </label>
  );
}

export default function UtmBuilderPage() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!url.trim()) return "";
    let base = url.trim();
    if (!/^https?:\/\//i.test(base)) base = `https://${base}`;
    try {
      const u = new URL(base);
      const params = u.searchParams;
      const set = (k: string, v: string) => v.trim() && params.set(k, v.trim());
      set("utm_source", source);
      set("utm_medium", medium);
      set("utm_campaign", campaign);
      set("utm_term", term);
      set("utm_content", content);
      return u.toString();
    } catch {
      return "";
    }
  }, [url, source, medium, campaign, term, content]);

  async function copy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-44 pb-32 px-6 md:px-12 selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">Free Tool</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mt-6 mb-6">UTM Link Builder</h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
            Build trackable campaign URLs so you know exactly which post, email or ad brought each visitor.
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">{field("Website URL", url, setUrl, "yourwebsite.com/page", true)}</div>
          <div className="flex flex-col gap-2">
            {field("Campaign Source", source, setSource, "google")}
            <div className="flex flex-wrap gap-2">
              {SOURCE_PRESETS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSource(s)}
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md border border-white/10 text-white/40 hover:border-[#F95D0A] hover:text-[#F95D0A] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {field("Campaign Medium", medium, setMedium, "gbp, cpc, email, social")}
          {field("Campaign Name", campaign, setCampaign, "summer_teardown")}
          {field("Campaign Term (optional)", term, setTerm, "seo agency montreal")}
          <div className="md:col-span-2">{field("Campaign Content (optional)", content, setContent, "cta_button")}</div>
        </div>

        <div className="mt-8 bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 md:p-8">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Your tracked URL</span>
          <p className="mt-3 break-all font-mono text-sm md:text-base text-[#F95D0A] min-h-[1.5rem]">
            {result || "Enter a URL above to generate your link."}
          </p>
          <button
            onClick={copy}
            disabled={!result}
            className="mt-6 bg-[#F95D0A] text-black px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-40"
          >
            {copied ? "Copied ✓" : "Copy Link"}
          </button>
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
