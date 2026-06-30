import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Case Study Teardown",
  description:
    "Get a free teardown of your website, SEO structure, and conversion flow. See exactly what is blocking your growth and what to fix first.",
  pathname: "/case-study-teardown",
});

export default function CaseStudyTeardownLayout({ children }: { children: React.ReactNode }) {
  return children;
}
