import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Restaurant Growth System",
  description:
    "A focused growth program for restaurant owners to increase bookings, fill weak nights, and scale local visibility.",
  pathname: "/restaurant-growth",
});

export default function RestaurantGrowthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
