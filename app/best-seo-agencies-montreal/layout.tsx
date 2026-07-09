import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Best SEO Agencies in Montreal (2026 Guide) | Launch at Dawn",
  description:
    "An honest 2026 guide to choosing the best SEO agency in Montreal — what to look for, key questions to ask, and how to avoid wasting your budget.",
  pathname: "/best-seo-agencies-montreal",
  ogEyebrow: "Montreal Buyer's Guide",
  keywords: [
    "best SEO agency Montreal",
    "best SEO agencies Montreal",
    "top SEO companies Montreal",
    "SEO agency Montreal reviews",
  ],
});

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
