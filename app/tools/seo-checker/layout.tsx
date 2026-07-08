import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free SEO Checker — Instant Website Audit",
  description:
    "Paste any URL and get an instant SEO snapshot: title tags, meta descriptions, structured data, mobile-readiness and more. Free tool by Launch at Dawn.",
  pathname: "/tools/seo-checker",
  keywords: [
    "free SEO checker",
    "website SEO audit",
    "SEO analyzer",
    "meta tag checker",
    "technical SEO tool",
  ],
});

export default function SeoCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
