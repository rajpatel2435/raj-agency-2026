import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "SEO & Digital Marketing Agency in Vancouver | Launch at Dawn",
  description:
    "Vancouver SEO and web development agency. We rank local businesses in Google, optimize your Google Business Profile, and build fast Next.js websites that convert.",
  pathname: "/vancouver-digital-agency",
  keywords: [
    "Vancouver SEO agency",
    "SEO Vancouver",
    "digital marketing Vancouver",
    "web development Vancouver",
    "local SEO Vancouver",
    "Google Business Profile Vancouver",
  ],
});

export default function VancouverLayout({ children }: { children: React.ReactNode }) {
  return children;
}
