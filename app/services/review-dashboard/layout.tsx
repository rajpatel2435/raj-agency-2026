import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Review Dashboard",
  description: "Protected internal review system.",
  pathname: "/services/review-dashboard",
  noIndex: true,
});

export default function ReviewDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
