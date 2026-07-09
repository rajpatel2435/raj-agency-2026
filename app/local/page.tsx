import Link from "next/link";
import { SERVICES, CITIES } from "./data";

export default function LocalHubPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-44 pb-32 px-6 md:px-12 selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
            Areas We Serve
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mt-6 mb-6">
            Local, everywhere.
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
            SEO, web design, and digital marketing built for your city — across Quebec and
            British Columbia.
          </p>
        </div>

        {/* Featured city pages + guides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {[
            { href: "/montreal-seo-agency", label: "Montreal SEO Agency" },
            { href: "/vancouver-digital-agency", label: "Vancouver Digital Agency" },
            { href: "/best-seo-agencies-montreal", label: "Best SEO Agencies in Montreal (Guide)" },
            { href: "/best-digital-agencies-vancouver", label: "Best Digital Agencies in Vancouver (Guide)" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:border-[#F95D0A] transition-colors"
            >
              <span className="font-bold">{c.label}</span>
              <span className="text-[#F95D0A] group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>

        {/* Service x City grid */}
        <div className="space-y-14">
          {SERVICES.map((service) => (
            <div key={service.slug}>
              <h2 className="text-2xl md:text-3xl font-black uppercase mb-6 border-b border-white/10 pb-4">
                {service.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                {CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/local/${service.slug}-${city.slug}`}
                    className="border border-white/10 px-5 py-3 text-sm font-bold text-zinc-300 hover:border-[#F95D0A] hover:text-[#F95D0A] transition-colors"
                  >
                    {service.short} in {city.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
