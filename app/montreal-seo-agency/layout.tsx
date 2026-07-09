import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "SEO & Digital Marketing Agency in Montreal | Launch at Dawn",
  description:
    "Montreal SEO and web development agency. We rank local businesses in Google, optimize your Google Business Profile, and build fast Next.js websites that convert.",
  pathname: "/montreal-seo-agency",
  keywords: [
    "Montreal SEO agency",
    "SEO Montreal",
    "digital marketing Montreal",
    "web development Montreal",
    "local SEO Montreal",
    "Google Business Profile Montreal",
  ],
});

export default function MontrealLayout({ children }: { children: React.ReactNode }) {
  return children;
}
