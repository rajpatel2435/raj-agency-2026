import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "SEO and Growth Services",
  description:
    "Explore Launch at Dawn services: strategy, technical SEO, digital PR, and analytics systems built for measurable growth.",
  pathname: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
