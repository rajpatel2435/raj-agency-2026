import Link from "next/link";

const PILLARS = [
  {
    label: "Technical SEO",
    title: "Rankings built on architecture",
    body: "We engineer the technical foundation search engines reward — fast Core Web Vitals, clean crawl paths, structured data, and internal linking that spreads authority across every page. Rankings follow structure, not luck.",
  },
  {
    label: "Web Engineering",
    title: "Sites that load and convert",
    body: "Every build ships on a modern Next.js stack: server-rendered for speed, mobile-first, and wired for conversion. Your website becomes a lead engine, not a brochure that quietly loses customers.",
  },
  {
    label: "Local Growth",
    title: "Found where your customers search",
    body: "From Montreal to Vancouver, we build location-specific pages, Google Business Profile strategy, and local schema so nearby customers find you first — in Google, Maps, and AI search alike.",
  },
];

/**
 * Homepage capability section — real, indexable prose that explains what the
 * agency does, who it serves, and where. Adds genuine content depth (a ranking
 * signal) without fabricated claims.
 */
export default function Capabilities() {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="w-full bg-[#050505] text-white px-6 md:px-12 py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
          What We Do
        </span>
        <h2
          id="capabilities-heading"
          className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mt-6 mb-8 max-w-4xl"
        >
          A digital agency that treats growth as an engineering problem.
        </h2>
        <p className="text-lg md:text-xl text-white/50 font-light max-w-3xl mb-16 leading-relaxed">
          Launch at Dawn is a technical SEO and web engineering agency based in Montreal
          and Vancouver, working with ambitious businesses across Canada and beyond. We
          combine marketing strategy with hard engineering to build websites that rank,
          load fast, and turn organic traffic into booked revenue — for local brands,
          mid-market teams, and enterprise departments.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.label}
              className="border border-white/10 rounded-[1.5rem] p-8 bg-[#0A0A0A] hover:border-[#F95D0A]/40 transition-colors"
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#F95D0A]">
                {pillar.label}
              </span>
              <h3 className="text-2xl font-black tracking-tight mt-4 mb-3">{pillar.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row gap-4">
          <Link
            href="/services"
            className="inline-block bg-[#F95D0A] text-black px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white transition-colors text-center"
          >
            Explore Our Services
          </Link>
          <Link
            href="/start"
            className="inline-block border border-white/20 text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:border-[#F95D0A] transition-colors text-center"
          >
            Get a Growth Plan
          </Link>
        </div>
      </div>
    </section>
  );
}
