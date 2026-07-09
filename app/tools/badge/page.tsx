"use client";

import { useState } from "react";

const SITE = "https://www.launchatdawn.com";

function snippet(theme: "dark" | "light") {
  return `<a href="${SITE}?ref=badge" target="_blank" rel="noopener">
  <img src="${SITE}/api/badge?theme=${theme}"
       alt="Built by Launch at Dawn" width="200" height="52" loading="lazy" />
</a>`;
}

export default function BadgePage() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(theme: "dark" | "light") {
    try {
      await navigator.clipboard.writeText(snippet(theme));
      setCopied(theme);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-44 pb-32 px-6 md:px-12 selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
            For Our Clients & Partners
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mt-6 mb-6">
            Show off your build.
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
            Add this badge to your website footer. It tells visitors your site was engineered
            by Launch at Dawn — and links back to us.
          </p>
        </div>

        {/* Previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {(["dark", "light"] as const).map((theme) => (
            <div key={theme} className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 flex flex-col items-center gap-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{theme} theme</p>
              <div className={theme === "light" ? "p-6 rounded-2xl bg-white" : "p-6 rounded-2xl bg-[#050505] border border-white/5"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/badge?theme=${theme}`} alt="Built by Launch at Dawn" width={200} height={52} />
              </div>
              <button
                onClick={() => copy(theme)}
                className="w-full bg-[#F95D0A] text-black px-6 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                {copied === theme ? "Copied!" : "Copy embed code"}
              </button>
            </div>
          ))}
        </div>

        {/* Code */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
            Paste into your footer HTML
          </p>
          <pre className="text-sm text-emerald-300 font-mono overflow-x-auto whitespace-pre-wrap break-all bg-black/40 p-6 rounded-2xl">
{snippet("dark")}
          </pre>
        </div>
      </div>
    </main>
  );
}
