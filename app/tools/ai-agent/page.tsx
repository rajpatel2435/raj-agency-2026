import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, SITE_URL } from "@/app/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import AIAgentPanel from "@/components/AIAgentPanel";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Growth Agent — Live Website Audit & Strategy",
  description:
    "Meet Dawn, Launch at Dawn's live AI growth agent. Drop your website URL for an instant audit, get real answers, and a tailored plan to grow your traffic and leads.",
  pathname: "/tools/ai-agent",
  ogEyebrow: "AI Growth Agent",
  keywords: [
    "AI growth agent",
    "AI SEO audit",
    "AI marketing agent",
    "website audit AI",
    "AI agent for business",
    "AI chatbot agency",
  ],
});

const features = [
  {
    title: "Live Website Audit",
    desc: "Paste your URL and Dawn analyzes your real on-page SEO — titles, meta, structure, mobile-readiness and schema — in seconds.",
  },
  {
    title: "Plain-English Answers",
    desc: "No jargon. Dawn explains what's costing you traffic and leads, and what to fix first for the fastest impact.",
  },
  {
    title: "A Tailored Plan",
    desc: "Based on your goals, budget and timeline, Dawn maps the next steps and connects you to a human strategist.",
  },
];

export default function AIAgentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/tools/ai-agent/#app`,
        name: "Dawn — AI Growth Agent",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: `${SITE_URL}/tools/ai-agent`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
        provider: { "@type": "Organization", name: "Launch at Dawn", url: SITE_URL },
        description:
          "A live AI agent that audits your website, answers marketing questions, and builds a tailored growth plan.",
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/tools/ai-agent/#service`,
        name: "AI Agents & Automation",
        serviceType: "AI Agent Development",
        provider: { "@type": "Organization", name: "Launch at Dawn", url: SITE_URL },
        description:
          "Launch at Dawn designs and builds custom AI agents, chatbots, and automations for businesses — like the live demo on this page.",
        areaServed: [
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United States" },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#F95D0A] selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools" },
          { name: "AI Growth Agent", href: "/tools/ai-agent" },
        ]}
      />

      {/* HERO + LIVE AGENT */}
      <section className="px-6 md:px-12 pt-8 pb-20 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Pitch */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-[#F95D0A] rounded-full animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
                Live AI Demo
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Meet <span className="text-[#F95D0A] italic">Dawn</span>. Our AI does the first audit.
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 leading-snug font-medium mb-8 max-w-xl">
              This isn't a scripted chatbot. Dawn reads your live website, tells you what's
              really holding back your traffic, and builds a plan — right here, right now.
              It's proof of the AI systems we build for clients.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact/hello"
                className="inline-block bg-[#F95D0A] text-black font-black uppercase tracking-widest px-8 py-4 text-xs hover:scale-105 transition-transform shadow-[8px_8px_0px_0px_rgba(249,93,10,0.3)]"
              >
                Want an agent like this? Talk to us
              </Link>
            </div>
          </div>

          {/* Live agent panel */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#F95D0A]/10 blur-[80px] -z-10" />
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#080808] shadow-[0_20px_70px_rgba(0,0,0,0.6)] h-[600px] flex flex-col">
              <div className="bg-gradient-to-r from-[#F95D0A] to-[#ff7a33] px-5 py-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center">
                  <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                </span>
                <div>
                  <p className="text-black font-black text-sm leading-tight">Dawn · AI Growth Agent</p>
                  <p className="text-black/70 text-[11px] leading-tight">Live audits · instant answers</p>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <AIAgentPanel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="py-24 px-6 md:px-12 bg-[#080808] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-12">What Dawn does</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {features.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 hover:border-[#F95D0A] transition-colors">
                <span className="text-[#F95D0A] font-mono text-xs block mb-4 italic">0{i + 1}</span>
                <h3 className="text-xl font-bold uppercase mb-3">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELL THE SERVICE */}
      <section className="py-32 px-6 bg-[#F95D0A] text-black text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black uppercase leading-[0.85] mb-8 italic">
            We build agents like this for you.
          </h2>
          <p className="text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
            Custom AI agents, chatbots, and automations wired into your website, support, and
            sales — trained on your business. Dawn is just the demo.
          </p>
          <Link
            href="/contact/hello"
            className="inline-block bg-black text-white px-12 py-6 font-black uppercase tracking-widest text-lg hover:scale-105 transition-transform shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)]"
          >
            Book a Free AI Strategy Call
          </Link>
        </div>
      </section>
    </main>
  );
}
