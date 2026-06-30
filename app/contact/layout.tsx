import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Launch at Dawn",
  description:
    "Get in touch with Launch at Dawn to discuss SEO growth, development strategy, and conversion-focused digital execution.",
  pathname: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
