import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Website Authority Checker — Instant Domain Score",
  description:
    "Check any website's authority score in seconds. Built from real trust signals — domain age, HTTPS, indexability, structured data and content depth. Free tool by Launch at Dawn.",
  pathname: "/tools/authority-checker",
  ogEyebrow: "Free Tool",
  keywords: [
    "website authority checker",
    "domain authority checker",
    "free domain authority tool",
    "check website authority",
    "domain age checker",
    "website trust score",
  ],
});

export default function AuthorityCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
