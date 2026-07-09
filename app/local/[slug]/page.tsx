import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "@/app/seo";
import FaqSection from "@/components/FaqSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getComboBySlug, getAllCombos } from "../data";

export function generateStaticParams() {
  return getAllCombos().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const combo = getComboBySlug(slug);

  if (!combo) {
    return buildPageMetadata({
      title: "Page Not Found",
      description: "The requested page was not found.",
      pathname: `/local/${slug}`,
      noIndex: true,
    });
  }

  const { service, city } = combo;
  return buildPageMetadata({
    title: `${service.name} in ${city.name} | Launch at Dawn`,
    description: service.intro(city.name),
    pathname: `/local/${slug}`,
    ogEyebrow: `${service.short} · ${city.name}, ${city.region}`,
    keywords: [
      `${service.name} ${city.name}`,
      `${service.name.toLowerCase()} agency ${city.name}`,
      `${city.name} ${service.name.toLowerCase()}`,
      `best ${service.name.toLowerCase()} ${city.name}`,
    ],
  });
}

export default async function LocalServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const combo = getComboBySlug(slug);
  if (!combo) notFound();

  const { service, city } = combo;
  const pageUrl = `${SITE_URL}/local/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        name: `${service.name} in ${city.name}`,
        serviceType: service.name,
        description: service.intro(city.name),
        url: pageUrl,
        provider: {
          "@type": "ProfessionalService",
          name: "Launch at Dawn",
          url: SITE_URL,
          telephone: "+1-514-699-2435",
          areaServed: { "@type": "City", name: city.name },
          address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressRegion: city.region,
            addressCountry: "CA",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: city.geo.lat,
            longitude: city.geo.lng,
          },
        },
      },
    ],
  };

  const faqs = [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`,
      answer: `It depends on your goals and competition, but most ${city.name} businesses start with a focused monthly program. Book a free call and we'll give you a clear, no-obligation quote for your market.`,
    },
    {
      question: `How long until I see results from ${service.name.toLowerCase()} in ${city.name}?`,
      answer: `Local work often shows movement within a few weeks, with stronger, compounding results over 3 to 6 months as your authority in the ${city.name} market grows.`,
    },
    {
      question: `Do you work with small businesses in ${city.name}?`,
      answer: `Yes. We work with local ${city.name} businesses of every size, from independent shops to multi-location brands, and tailor the strategy and budget to fit.`,
    },
    {
      question: `Where is Launch at Dawn based?`,
      answer: `We're based in Montreal and Vancouver and serve ${city.name}, ${city.regionFull}, and clients across Canada and the USA. Call us at (514) 699-2435.`,
    },
  ];

  const otherCities = getAllCombos()
    .filter((c) => c.service.slug === service.slug && c.city.slug !== city.slug)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#F95D0A] selection:text-black font-sans overflow-x-hidden mt-24 md:mt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs
        items={[
          { name: "Areas We Serve", href: "/local" },
          { name: `${service.short} in ${city.name}`, href: `/local/${slug}` },
        ]}
      />

      {/* HERO */}
      <section className="relative min-h-[80vh] flex items-center px-6 lg:px-12 border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F95D0A]/5 blur-[120px] -z-10" />
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-[#F95D0A] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
              {service.short} // {city.name}, {city.region}
            </span>
          </div>
          <h1 className="text-[9vw] lg:text-[6vw] font-black tracking-[-0.05em] leading-[0.9] uppercase mb-10">
            {service.short} in <br /> <span className="text-[#F95D0A]">{city.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-snug mb-10 font-medium">
            {service.intro(city.name)}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#F95D0A] text-black font-black uppercase tracking-widest px-10 py-5 text-sm hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(249,93,10,0.3)]"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/case-study-teardown"
              className="inline-block border border-white/20 text-white font-black uppercase tracking-widest px-10 py-5 text-sm hover:border-[#F95D0A] hover:text-[#F95D0A] transition-all"
            >
              Free Website Teardown
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 px-6 lg:px-12 bg-[#080808] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
              Why {service.short} matters in {city.name}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">{service.why(city.name)}</p>
            <p className="text-zinc-500 text-base leading-relaxed">{city.blurb}</p>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {service.steps.map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 hover:border-[#F95D0A] transition-all group">
                <span className="text-[#F95D0A] font-mono text-xs block mb-3 italic">PHASE_0{i + 1}</span>
                <h3 className="text-xl font-bold uppercase mb-2">{step.label}</h3>
                <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS SERVED */}
      <section className="py-24 px-6 lg:px-12 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[10px] font-mono text-white/40 uppercase mb-6 tracking-[0.3em]">
            Areas we serve in {city.name}
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {city.neighborhoods.map((n, i) => (
              <span key={i} className="border border-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-300">
                {n}
              </span>
            ))}
          </div>
          <Link href={service.relatedHref} className="inline-block border-b-2 border-[#F95D0A] pb-1 font-black uppercase tracking-widest text-sm hover:text-[#F95D0A] transition-colors">
            Explore our {service.name} service in depth
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 bg-[#F95D0A]">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">
            Grow your {city.name} business
          </h2>
          <p className="text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
            Book a free strategy call and we&apos;ll show you exactly how to win more customers with {service.name.toLowerCase()}.
          </p>
          <Link href="/contact" className="inline-block bg-black text-white font-black uppercase tracking-widest px-12 py-6 text-sm hover:scale-105 transition-all">
            Start Your Project
          </Link>
        </div>
      </section>

      <FaqSection faqs={faqs} eyebrow={`${service.short} · ${city.name} FAQ`} />

      {/* INTERNAL LINKS to other cities */}
      <section className="py-20 px-6 lg:px-12 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[10px] font-mono text-white/40 uppercase mb-8 tracking-[0.3em]">
            {service.name} in other cities
          </p>
          <div className="flex flex-wrap gap-3">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/local/${c.slug}`}
                className="border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 hover:border-[#F95D0A] hover:text-[#F95D0A] transition-colors"
              >
                {c.service.short} in {c.city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
