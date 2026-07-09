import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Visibility Checker — Is Your Site Ready for ChatGPT & AI Search?",
  description:
    "Free tool: check if ChatGPT, Claude, Perplexity, and Google AI can find, understand, and recommend your business. Get an instant AI-readiness score and fixes.",
  pathname: "/tools/ai-visibility-checker",
  ogEyebrow: "Free AI Tool",
  keywords: [
    "AI visibility checker",
    "ChatGPT SEO",
    "AI search optimization",
    "generative engine optimization",
    "llms.txt checker",
    "is my website AI ready",
  ],
});

export default function AiVisibilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
