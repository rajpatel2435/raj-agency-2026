import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SITE_URL, SITE_NAME } from "@/app/seo";
import Image from "next/image";

type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  result?: string;
  avatar?: unknown;
};

const TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true] | order(order asc, _createdAt desc) {
  _id, quote, name, role, company, result, avatar
}`;

/**
 * Real client testimonials, managed in Sanity. Renders nothing until at least
 * one real, permission-granted testimonial is added — no placeholder quotes.
 */
export default async function Testimonials({
  heading = "What clients say",
}: {
  heading?: string;
}) {
  let testimonials: Testimonial[] = [];
  try {
    testimonials = await client.fetch(TESTIMONIALS_QUERY);
  } catch {
    testimonials = [];
  }

  if (!testimonials || testimonials.length === 0) return null;

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: {
        "@type": "Person",
        name: t.name,
        ...(t.company ? { worksFor: { "@type": "Organization", name: t.company } } : {}),
      },
    })),
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] border-t border-white/5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 bg-[#F95D0A] rounded-full animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">
            {heading}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {testimonials.map((t) => (
            <figure
              key={t._id}
              className="bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:border-[#F95D0A]/50 transition-all"
            >
              {t.result && (
                <p className="text-3xl font-black text-[#F95D0A] italic mb-6 leading-none">
                  {t.result}
                </p>
              )}
              <blockquote className="text-zinc-300 text-lg leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-4 mt-auto">
                {t.avatar ? (
                  <Image
                    src={urlFor(t.avatar).width(96).height(96).url()}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <span className="w-12 h-12 rounded-full bg-[#F95D0A]/15 border border-[#F95D0A]/30 flex items-center justify-center font-black text-[#F95D0A]">
                    {t.name.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="block font-bold uppercase tracking-tight text-sm">
                    {t.name}
                  </span>
                  {(t.role || t.company) && (
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      {[t.role, t.company].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
