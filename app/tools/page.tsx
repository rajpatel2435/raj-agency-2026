import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free SEO & Web Tools",
  description:
    "A growing collection of free tools from Launch at Dawn — instant SEO audits, meta tag checks and more to help you grow your organic traffic.",
  pathname: "/tools",
  keywords: ["free SEO tools", "website audit tool", "SEO checker", "marketing tools"],
});

const tools = [
  {
    href: "/tools/seo-checker",
    name: "Instant SEO Checker",
    desc: "Paste any URL and get a technical SEO snapshot in seconds — titles, meta, schema, mobile-readiness and more.",
    tag: "Live",
  },
  {
    href: "/tools/meta-generator",
    name: "Meta Tag Generator",
    desc: "Generate SEO meta tags, Open Graph previews and JSON-LD structured data — copy-paste ready for your <head>.",
    tag: "Live",
  },
  {
    href: "/tools/utm-builder",
    name: "UTM Link Builder",
    desc: "Build trackable campaign URLs so you know exactly which post, email or ad brought each visitor.",
    tag: "Live",
  },
  {
    href: "/tools/roi-calculator",
    name: "Marketing ROI Calculator",
    desc: "See the real return on your marketing spend — ROI, ROAS, cost per lead and profit, instantly.",
    tag: "Live",
  },
  {
    href: "/case-study-teardown",
    name: "Free Website Teardown",
    desc: "Request a manual, expert breakdown of your site's speed, rankings and conversion blockers — no charge.",
    tag: "Free",
  },
  {
    href: "/apps/trading",
    name: "Trading Dashboard",
    desc: "Our live market execution and analytics dashboard.",
    tag: "App",
  },
  {
    href: "/apps/crypto-pulse",
    name: "Crypto Pulse",
    desc: "Real-time crypto market signals and sentiment tracking.",
    tag: "App",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-44 pb-32 px-6 md:px-12 selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
            Free Tools
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mt-6 mb-6">
            Tools that grow traffic.
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
            Free, no sign-up utilities built by our engineers. The same checks we run for
            paying clients — open for anyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-[#F95D0A] transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#F95D0A]">
                  {t.tag}
                </span>
                <span className="text-[#F95D0A] opacity-0 group-hover:opacity-100 transition-opacity">
                  ↗
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3 group-hover:text-[#F95D0A] transition-colors">
                {t.name}
              </h2>
              <p className="text-white/50 font-light">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
