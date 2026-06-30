import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Explore open roles at Launch at Dawn across SEO engineering, growth strategy, and development.",
  pathname: "/careers",
});

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
