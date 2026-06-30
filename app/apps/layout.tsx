import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Internal Apps",
  description: "Internal tools dashboard.",
  pathname: "/apps",
  noIndex: true,
});

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
