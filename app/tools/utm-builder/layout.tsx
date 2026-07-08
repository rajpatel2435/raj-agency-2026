import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free UTM Link Builder — Campaign URL Generator",
  description:
    "Build trackable campaign URLs in seconds. Add UTM parameters for Google Business Profile, email, social and ads so you know exactly what drives traffic.",
  pathname: "/tools/utm-builder",
  keywords: ["UTM builder", "campaign URL builder", "UTM link generator", "UTM parameters"],
});

export default function UtmBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
