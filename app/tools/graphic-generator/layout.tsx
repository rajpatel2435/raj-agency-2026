import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Social Graphic & Banner Generator",
  description:
    "Create on-brand Instagram posts, story covers, ad banners, and LinkedIn covers in seconds. Free tool by Launch at Dawn — type your message, pick a format, download a PNG.",
  pathname: "/tools/graphic-generator",
  ogEyebrow: "Free Brand Tool",
  keywords: [
    "free social media graphic generator",
    "banner maker",
    "instagram post generator",
    "story cover maker",
    "free ad banner tool",
  ],
});

export default function GraphicGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
