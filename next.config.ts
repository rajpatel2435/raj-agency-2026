import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // This keeps your Sanity images working
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // This allows the new header image
      },
    ],
  },
};

export default nextConfig;