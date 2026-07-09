import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Areas We Serve — Local SEO & Web Services | Launch at Dawn",
  description:
    "Launch at Dawn provides SEO, web design, and digital marketing across Montreal, Vancouver, and surrounding cities. Find your city and service.",
  pathname: "/local",
  ogEyebrow: "Areas We Serve",
  keywords: ["local SEO Canada", "web design Montreal Vancouver", "digital marketing near me"],
});

export default function LocalHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
