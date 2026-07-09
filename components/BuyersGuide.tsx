import Link from "next/link";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { SITE_URL } from "@/app/seo";

export type GuideConfig = {
  city: string;
  region: string;
  slug: string;
  serviceLabel: string; // "SEO Agencies" / "Digital Agencies"
  intro: string;
  faqs: FaqItem[];
};

const CRITERIA = [
  { title: "Proven local results", desc: "Ask for real case studies and rankings in your city, not generic global stats." },
  { title: "Technical + marketing under one roof", desc: "The best results come from teams that can both build fast sites and rank them." },
  { title: "Transparent reporting", desc: "You should see live dashboards tying work to real revenue, not vanity metrics." },
  { title: "No long lock-in traps", desc: "Confident agencies earn your business monthly instead of trapping you in contracts." },
  { title: "AI & modern search ready", desc: "Your agency should optimize for ChatGPT, Perplexity, and Google AI — not just 2015-era SEO." },
];

const COMPARISON = [
  { feature: "Custom-engineered fast website", typical: "Template or page builder", lad: "Custom Next.js, sub-second loads" },
  { feature: "Technical + local SEO", typical: "Keywords only", lad: "Full technical, local & content SEO" },
  { feature: "AI search optimization", typical: "Not offered", lad: "Schema, llms.txt, entity SEO" },
  { feature: "Live revenue reporting", typical: "Monthly PDF", lad: "24/7 ROI dashboards" },
  { feature: "Contract lock-in", typical: "6–12 month lock-in", lad: "Earn it monthly" },
];

export default function BuyersGuide({ config }: { config: GuideConfig }) {
  const pageUrl = `${SITE_URL}/${config.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}/#article`,
    headline: `Best ${config.serviceLabel} in ${config.city} (2026 Guide)`,
    description: config.intro,
    url: pageUrl,
    author: { "@type": "Organization", name: "Launch at Dawn", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Launch at Dawn",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#F95D0A] selection:text-black font-sans overflow-x-hidden mt-24 md:mt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="pt-24 pb-20 px-6 lg:px-12 border-b border-white/5">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-[#F95D0A] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
              2026 Buyer&apos;s Guide // {config.city}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] uppercase mb-8">
            Best {config.serviceLabel} in {config.city}
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">{config.intro}</p>
        </div>
      </section>

      {/* CRITERIA */}
      <section className="py-20 px-6 lg:px-12 bg-[#080808] border-b border-white/5">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-10">What to look for</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CRITERIA.map((c, i) => (
              <div key={i} className="border border-white/10 p-8 bg-[#111]">
                <span className="text-[#F95D0A] font-black text-2xl italic block mb-3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold uppercase mb-2">{c.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 px-6 lg:px-12 border-b border-white/5">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-10">Typical agency vs Launch at Dawn</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">What matters</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Typical Agency</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-widest text-[#F95D0A]">Launch at Dawn</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="p-4 font-bold">{row.feature}</td>
                    <td className="p-4 text-zinc-500">{row.typical}</td>
                    <td className="p-4 text-[#F95D0A] font-medium">{row.lad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#F95D0A]">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">See where you stand</h2>
          <p className="text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
            Get a free, no-obligation teardown of your current site and rankings in {config.city}.
          </p>
          <Link href="/case-study-teardown" className="inline-block bg-black text-white font-black uppercase tracking-widest px-12 py-6 text-sm hover:scale-105 transition-all">
            Get My Free Teardown
          </Link>
        </div>
      </section>

      <FaqSection faqs={config.faqs} eyebrow={`${config.city} Agency FAQ`} />
    </main>
  );
}
