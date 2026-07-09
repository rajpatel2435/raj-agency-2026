import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://www.launchatdawn.com";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, "");
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Launch at Dawn";

export function absoluteUrl(pathname: string = "/"): string {
  if (!pathname || pathname === "/") return SITE_URL;
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function buildPageMetadata({
  title,
  description,
  pathname = "/",
  images,
  noIndex = false,
  keywords,
  ogEyebrow,
}: {
  title: string;
  description: string;
  pathname?: string;
  images?: string[];
  noIndex?: boolean;
  keywords?: string[];
  ogEyebrow?: string;
}): Metadata {
  const canonical = absoluteUrl(pathname);

  const ogImages =
    images ??
    [
      `${SITE_URL}/api/og?title=${encodeURIComponent(title)}${
        ogEyebrow ? `&eyebrow=${encodeURIComponent(ogEyebrow)}` : ""
      }`,
    ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
