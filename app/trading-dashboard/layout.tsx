import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Trading Dashboard",
  description: "Protected internal dashboard.",
  pathname: "/trading-dashboard",
  noIndex: true,
});

export default function TradingDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
