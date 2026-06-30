import Link from "next/link";

const teardownPoints = [
  "Technical crawl and indexation blockers",
  "Homepage and service-page conversion leaks",
  "Keyword-to-intent gaps versus competitors",
  "A 14-day action map with quick wins",
];

const deliverables = [
  {
    title: "10-Minute Video Breakdown",
    text: "A direct walkthrough showing exactly where rankings and leads are leaking.",
  },
  {
    title: "Priority Fix List",
    text: "A ranked list of technical and content fixes with impact estimates.",
  },
  {
    title: "Execution Roadmap",
    text: "A practical next-step plan your team can run with immediately.",
  },
];

export default function CaseStudyTeardownPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-28 md:pt-36 pb-24 px-6 md:px-12 selection:bg-[#F95D0A] selection:text-black">
      <section className="max-w-[1200px] mx-auto border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 bg-gradient-to-br from-[#0c0c0c] to-[#070707] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#F95D0A]/20 blur-[110px] rounded-full pointer-events-none" />

        <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#F95D0A] mb-6">
          Conversion Landing Offer
        </p>

        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase max-w-4xl">
          Free Case Study Teardown
          <span className="block text-zinc-400 italic mt-2">for brands that want more qualified leads</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg md:text-2xl text-zinc-300 leading-relaxed">
          Send your website. We will audit your SEO and conversion funnel and return a practical teardown you can use right away.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact/hello"
            className="inline-flex items-center justify-center rounded-full bg-[#F95D0A] px-8 py-4 text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            Claim My Free Teardown
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:border-white transition-colors"
          >
            View Real Outcomes
          </Link>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
            What you get
          </h2>
          <ul className="space-y-4">
            {teardownPoints.map((point) => (
              <li key={point} className="text-zinc-300 border-l border-[#F95D0A]/50 pl-4 leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
          <p className="text-sm text-zinc-500 mt-6">
            Best for agencies, local businesses, and growth-stage teams struggling with low visibility or weak lead conversion.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
            Delivery format
          </h2>
          <div className="space-y-5">
            {deliverables.map((item) => (
              <div key={item.title} className="border border-white/10 rounded-2xl p-5 bg-[#0f0f0f]">
                <h3 className="text-base md:text-lg font-black uppercase tracking-[0.08em] text-[#F95D0A] mb-2">{item.title}</h3>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 border border-[#F95D0A]/40 rounded-2xl bg-[#140e0b]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-300">
              Outbound Link:
            </p>
            <p className="mt-2 text-[#F95D0A] break-all text-sm font-mono">
              https://www.launchatdawn.com/case-study-teardown
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
