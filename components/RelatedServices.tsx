import Link from "next/link";
import ArrowUpRight from "@/components/icons/ArrowUpRight";

type ServiceLink = {
  slug: string;
  title: string;
  blurb: string;
};

// Canonical catalog of service divisions (mirrors app/services/[slug]/page.tsx).
const SERVICES: ServiceLink[] = [
  { slug: "strategy", title: "Growth Strategy", blurb: "Architect revenue systems that win your market." },
  { slug: "seo", title: "Local Visibility", blurb: "Own the search intent behind every booking." },
  { slug: "pr", title: "Digital PR & Social", blurb: "Earn authority mentions that move the culture." },
  { slug: "data", title: "Data & Insights", blurb: "Connect every click to real-world revenue." },
  { slug: "design", title: "Premium Experience", blurb: "Design high-trust journeys that convert." },
  { slug: "engineering", title: "Reliable Systems", blurb: "Fast, stable infrastructure built to scale." },
];

/**
 * "You might also need" internal-linking block. Renders every service except
 * the current one to deepen crawl paths and pass link equity across pages.
 */
export default function RelatedServices({
  currentSlug,
  heading = "Explore More Divisions",
}: {
  currentSlug?: string;
  heading?: string;
}) {
  const related = SERVICES.filter((s) => s.slug !== currentSlug);

  return (
    <section className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 bg-[#F95D0A] rounded-full" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
            {heading}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {related.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white/5 border border-white/10 p-8 hover:border-[#F95D0A] transition-all flex flex-col justify-between min-h-[180px]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">
                  {service.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 shrink-0 text-zinc-600 group-hover:text-[#F95D0A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors mt-6">
                {service.blurb}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
