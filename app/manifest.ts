import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Launch at Dawn",
    short_name: "LaunchAtDawn",
    description: "Technical SEO, conversion architecture, and growth engineering.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#F95D0A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.svg",
        sizes: "32x32",
        type: "image/svg+xml",
      },
    ],
    scope: "/",
    id: SITE_URL,
  };
}
