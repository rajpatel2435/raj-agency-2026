import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Get Your “Built by Launch at Dawn” Badge",
  description:
    "Add a free Launch at Dawn badge to your website footer. Show your visitors your site was built by a top digital agency.",
  pathname: "/tools/badge",
  ogEyebrow: "Client Badge",
});

export default function BadgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
