import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Discovery Call",
  description:
    "Share your project details and book a discovery call with Launch at Dawn.",
  pathname: "/contact/hello",
});

export default function ContactHelloLayout({ children }: { children: React.ReactNode }) {
  return children;
}
