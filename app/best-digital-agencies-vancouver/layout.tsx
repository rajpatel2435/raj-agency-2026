import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Best Digital Agencies in Vancouver (2026 Guide) | Launch at Dawn",
  description:
    "An honest 2026 guide to choosing the best digital or SEO agency in Vancouver — what to look for, questions to ask, and how to avoid wasting your budget.",
  pathname: "/best-digital-agencies-vancouver",
  ogEyebrow: "Vancouver Buyer's Guide",
  keywords: [
    "best digital agency Vancouver",
    "best SEO agency Vancouver",
    "top digital agencies Vancouver",
    "web design agency Vancouver",
  ],
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
