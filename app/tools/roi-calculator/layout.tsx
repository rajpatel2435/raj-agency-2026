import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Marketing ROI Calculator",
  description:
    "Calculate the return on your marketing spend. See your ROI, cost per lead, and profit from any campaign in seconds. Free calculator by Launch at Dawn.",
  pathname: "/tools/roi-calculator",
  keywords: ["marketing ROI calculator", "ROAS calculator", "cost per lead", "ad spend calculator"],
});

export default function RoiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
