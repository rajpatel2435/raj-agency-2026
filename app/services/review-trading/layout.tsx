import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Review Trading",
  description: "Protected internal trading review system.",
  pathname: "/services/review-trading",
  noIndex: true,
});

export default function ReviewTradingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
