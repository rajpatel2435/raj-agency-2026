import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Launch at Dawn",
  description:
    "Meet Launch at Dawn and learn how we engineer technical SEO and growth systems for high-impact brands.",
  pathname: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
