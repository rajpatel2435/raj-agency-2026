import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Start Your Growth Plan",
  description:
    "Answer 4 quick questions and get a tailored growth plan from Launch at Dawn. Technical SEO, conversion websites, and data systems for Montreal & Vancouver businesses.",
  pathname: "/start",
  ogEyebrow: "Get Started",
  keywords: [
    "get a growth plan",
    "SEO consultation Montreal",
    "digital agency quote Vancouver",
    "free growth strategy call",
  ],
});

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
