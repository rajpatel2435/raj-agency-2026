import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Studio",
  description: "Protected content studio.",
  pathname: "/studio",
  noIndex: true,
});

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
