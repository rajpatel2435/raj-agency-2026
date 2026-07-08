import { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

const PRIVATE_PATHS = [
  "/studio/",
  "/admin/",
  "/api/",
  "/trading-dashboard",
  "/services/review-dashboard",
  "/services/review-trading",
  "/apps",
];

// AI assistant crawlers — explicitly allowed so ChatGPT, Claude,
// Perplexity, Gemini etc. can index and cite the site.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "cohere-ai",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
