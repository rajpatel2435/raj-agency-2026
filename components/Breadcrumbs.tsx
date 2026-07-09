import Link from "next/link";
import { SITE_URL } from "@/app/seo";

export type Crumb = {
  name: string;
  href: string;
};

/**
 * Renders visible breadcrumbs plus BreadcrumbList JSON-LD for rich results.
 * Always prepends a "Home" crumb. The last item is rendered as plain text
 * (current page) and is not linked.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-2"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-[#F95D0A]" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-zinc-700">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
