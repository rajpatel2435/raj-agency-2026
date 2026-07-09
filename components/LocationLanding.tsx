import Link from "next/link";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL } from "@/app/seo";

export type LocationConfig = {
  city: string;
  region: string;
  regionFull: string;
  slug: string;
  eyebrow: string;
  headlineTop: string;
  headlineAccent: string;
  intro: string;
  geo: { lat: number; lng: number };
  neighborhoods: string[];
  services: { title: string; desc: string; href: string }[];
  stats: { value: string; label: string }[];
  faqs: FaqItem[];
};

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-2 h-2 bg-[#F95D0A] rounded-full animate-pulse" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">{text}</span>
  </div>
);

export default function LocationLanding({ config }: { config: LocationConfig }) {
  const pageUrl = `${SITE_URL}/${config.slug}`;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${pageUrl}/#localbusiness`,
    name: `Launch at Dawn — ${config.city} Digital & SEO Agency`,
    url: pageUrl,
    image: `${SITE_URL}/icon.svg`,
    description: config.intro,
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: config.city,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: config.city,
      addressRegion: config.region,
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.geo.lat,
      longitude: config.geo.lng,
    },
    sameAs: [
      "https://www.instagram.com/launchatdawn/",
      "https://linkedin.com/company/launchatdawn",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#F95D0A] selection:text-black font-sans overflow-x-hidden mt-24 md:mt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <Breadcrumbs items={[{ name: config.city, href: `/${config.slug}` }]} />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center px-6 lg:px-12 border-b border-white/5">
        <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <SectionLabel text={config.eyebrow} />
            <h1 className="text-[10vw] lg:text-[6.5vw] font-black tracking-[-0.05em] leading-[0.9] uppercase mb-8">
              {config.headlineTop} <br /> <span className="text-[#F95D0A]">{config.headlineAccent}</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-xl leading-snug mb-10 font-medium">
              {config.intro}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-block bg-[#F95D0A] text-black font-black uppercase tracking-widest px-10 py-5 text-sm hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(249,93,10,0.3)]"
              >
                Get a Free Growth Plan
              </Link>
              <Link
                href="/case-study-teardown"
                className="inline-block border border-white/20 text-white font-black uppercase tracking-widest px-10 py-5 text-sm hover:border-[#F95D0A] hover:text-[#F95D0A] transition-all"
              >
                Free Website Teardown
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] border border-white/10 bg-[#080808] p-8 overflow-hidden">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="bg-black/80 border border-white/10 p-4 font-mono text-[10px] text-[#F95D0A]">
                  {'>'} RANKING {config.city.toUpperCase()} BUSINESSES...
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {config.stats.map((s, i) => (
                    <div key={i} className="bg-white/5 p-4 border-l-2 border-[#F95D0A]">
                      <p className="text-3xl font-black tracking-tighter text-[#F95D0A]">{s.value}</p>
                      <p className="text-[10px] font-mono text-white/40 uppercase mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#F95D0A] text-black p-4 font-black uppercase text-center text-xs tracking-widest">
                  SERVING {config.city.toUpperCase()}, {config.region}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 bg-[#080808] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto text-center mb-20">
          <SectionLabel text={`What we do in ${config.city}`} />
          <h2 className="text-4xl md:text-6xl font-black uppercase">Built to rank & convert</h2>
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.services.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="border border-white/5 p-10 bg-[#111] hover:border-[#F95D0A] transition-all group block"
            >
              <span className="text-[#F95D0A] font-black text-4xl mb-6 block italic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-black uppercase mb-4">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY LOCAL */}
      <section className="py-24 px-6 bg-[#050505] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-black uppercase text-[#F95D0A] mb-4">A {config.city} team that gets local search.</h3>
              <p className="text-zinc-400 text-lg">
                We optimize your Google Business Profile, build local landing pages, and target the exact
                &quot;near me&quot; searches your customers use across {config.regionFull}.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase text-[#F95D0A] mb-4">Engineering + marketing under one roof.</h3>
              <p className="text-zinc-400 text-lg">
                Fast Next.js websites, clean technical SEO, and content that ranks — so you win the map pack
                and the organic results at the same time.
              </p>
            </div>
          </div>
          <div className="bg-[#111] border border-white/10 p-12">
            <p className="text-[10px] font-mono text-white/40 uppercase mb-6">Neighborhoods & areas we serve</p>
            <div className="flex flex-wrap gap-3">
              {config.neighborhoods.map((n, i) => (
                <span
                  key={i}
                  className="border border-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-300"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-[#F95D0A]">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">
            Ready to dominate {config.city} search?
          </h2>
          <p className="text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
            Book a free strategy call and we&apos;ll show you exactly where your site is leaking customers —
            and how to fix it.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white font-black uppercase tracking-widest px-12 py-6 text-sm hover:scale-105 transition-all"
          >
            Start Your Project
          </Link>
        </div>
      </section>

      <FaqSection faqs={config.faqs} eyebrow={`${config.city} FAQ`} />
    </main>
  );
}
