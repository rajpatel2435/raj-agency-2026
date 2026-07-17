import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConversionCTA from "@/components/ConversionCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Insights from "@/components/Insights";
import AIStructure from "@/components/AIStructure";
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from "next";
import { SITE_NAME, SITE_URL } from "./seo";

// The Primary Brand Font (Engineered, Geometric, Modern)
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space"
});

// The Technical Accent Font (For tags, logs, and SYS.ONLINE text)
const spaceMono = Space_Mono({ 
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono"
});

// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Launch at Dawn | Digital Architecture and SEO Orchestration",
    template: "%s | Launch at Dawn"
  },
  description: "Montreal-based digital agency specializing in technical SEO, conversion architecture, and full-stack growth systems.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "GtKa9v21eY7SRL3JEV94r_eZ9VOrPWkT2_g8Wg6n-PA",
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
      ? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_YAHOO_VERIFICATION
      ? { yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
  keywords: ["SEO Montreal", "Digital Agency Montreal", "Web Development", "Conversion Rate Optimization", "Technical SEO"],
  openGraph: {
    title: "Launch at Dawn",
    description: "Orchestrating digital growth for high-impact brands.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Digital Architecture & SEO Orchestration")}`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launch at Dawn",
    description: "Technical SEO and Digital Growth.",
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent("Digital Architecture & SEO Orchestration")}`],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "32x32" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F95D0A",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="font-sans bg-[#050505] text-white antialiased selection:bg-[#F95D0A] selection:text-black">
        <AIStructure />
      <Navbar />
        {children}
     
        <Footer />
        <ConversionCTA />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}