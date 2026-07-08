import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Meta Tag & Schema Generator",
  description:
    "Generate SEO meta tags, Open Graph tags and JSON-LD structured data for your website. Copy-paste ready code for your <head>. Free tool by Launch at Dawn.",
  pathname: "/tools/meta-generator",
  keywords: ["meta tag generator", "open graph generator", "schema generator", "JSON-LD generator", "SEO tags"],
});

export default function MetaGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
