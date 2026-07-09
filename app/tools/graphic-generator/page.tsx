"use client";

import { useMemo, useState } from "react";

type FormatKey = "post" | "story" | "landscape" | "linkedin";
type ThemeKey = "dark" | "orange" | "light" | "glow";

const FORMATS: { key: FormatKey; label: string; dims: string; ratio: string }[] = [
  { key: "post", label: "Instagram Post", dims: "1080 × 1080", ratio: "1 / 1" },
  { key: "story", label: "Story / Reel Cover", dims: "1080 × 1920", ratio: "9 / 16" },
  { key: "landscape", label: "Banner / Twitter", dims: "1200 × 630", ratio: "1200 / 630" },
  { key: "linkedin", label: "LinkedIn Cover", dims: "1584 × 396", ratio: "1584 / 396" },
];

const THEMES: { key: ThemeKey; label: string; swatch: string }[] = [
  { key: "dark", label: "Dark", swatch: "#050505" },
  { key: "glow", label: "Dark Glow", swatch: "#080808" },
  { key: "orange", label: "Orange", swatch: "#F95D0A" },
  { key: "light", label: "Light", swatch: "#ffffff" },
];

export default function GraphicGeneratorPage() {
  const [format, setFormat] = useState<FormatKey>("post");
  const [theme, setTheme] = useState<ThemeKey>("dark");
  const [eyebrow, setEyebrow] = useState("Launch at Dawn");
  const [title, setTitle] = useState("Turn traffic into booked clients.");
  const [subtitle, setSubtitle] = useState("Technical SEO + conversion websites for Montreal & Vancouver.");
  const [cta, setCta] = useState("Book a Free Call");
  const [downloading, setDownloading] = useState(false);

  const src = useMemo(() => {
    const p = new URLSearchParams({ format, theme, eyebrow, title, subtitle, cta });
    return `/api/graphic?${p.toString()}`;
  }, [format, theme, eyebrow, title, subtitle, cta]);

  const activeFormat = FORMATS.find((f) => f.key === format)!;

  async function download() {
    setDownloading(true);
    try {
      const res = await fetch(src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `launchatdawn-${format}-${theme}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      /* ignore */
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-40 pb-32 px-6 md:px-12 selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
            Free Brand Tool
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mt-6 mb-6">
            Social Graphic Generator
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
            Create on-brand posts, story covers, and ad banners in seconds. Type your message,
            pick a format, and download a ready-to-post image.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10">
          {/* CONTROLS */}
          <div className="flex flex-col gap-8">
            {/* Format */}
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Format</p>
              <div className="grid grid-cols-2 gap-2">
                {FORMATS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFormat(f.key)}
                    className={`text-left px-4 py-3 border transition-all ${
                      format === f.key ? "border-[#F95D0A] bg-[#F95D0A]/10" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <span className="block text-sm font-bold uppercase tracking-tight">{f.label}</span>
                    <span className="block font-mono text-[10px] text-white/40">{f.dims}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Style</p>
              <div className="flex gap-2">
                {THEMES.map((th) => (
                  <button
                    key={th.key}
                    onClick={() => setTheme(th.key)}
                    className={`flex-1 flex flex-col items-center gap-2 px-2 py-3 border transition-all ${
                      theme === th.key ? "border-[#F95D0A]" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full border border-white/20"
                      style={{ backgroundColor: th.swatch }}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-tight">{th.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text fields */}
            <div className="flex flex-col gap-5">
              <Field label="Eyebrow" value={eyebrow} onChange={setEyebrow} max={60} />
              <Field label="Headline" value={title} onChange={setTitle} max={140} textarea />
              <Field label="Subtext" value={subtitle} onChange={setSubtitle} max={200} textarea />
              <Field label="Button text (optional)" value={cta} onChange={setCta} max={40} />
            </div>

            <button
              onClick={download}
              disabled={downloading}
              className="bg-[#F95D0A] text-black px-8 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
            >
              {downloading ? "Preparing…" : "Download PNG"}
            </button>
          </div>

          {/* PREVIEW */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-10 flex items-center justify-center">
              <div
                className="w-full max-w-[520px] overflow-hidden rounded-lg shadow-2xl"
                style={{ aspectRatio: activeFormat.ratio }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={src}
                  src={src}
                  alt="Graphic preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mt-4">
              {activeFormat.label} · {activeFormat.dims}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  max,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  max: number;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{label}</label>
        <span className="font-mono text-[10px] text-white/20">
          {value.length}/{max}
        </span>
      </div>
      {textarea ? (
        <textarea
          value={value}
          maxLength={max}
          rows={2}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#F95D0A] transition-colors resize-none"
        />
      ) : (
        <input
          value={value}
          maxLength={max}
          onChange={(e) => onChange(e.target.value)}
          className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[#F95D0A] transition-colors"
        />
      )}
    </div>
  );
}
