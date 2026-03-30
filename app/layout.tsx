import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Insights from "@/components/Insights";
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";

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
    default: "launchatdawn // Digital Architecture & SEO Orchestration",
    template: "%s | launchatdawn"
  },
  description: "Montreal-based digital agency specializing in hyper-local SEO, high-intent conversion funnels, and technical brand deployments.",
  // ADD THIS SECTION:
  verification: {
    google: "GtKa9v21eY7SRL3JEV94r_eZ9VOrPWkT2_g8Wg6n-PA",
  },
  keywords: ["SEO Montreal", "Digital Agency Montreal", "Web Development", "Conversion Rate Optimization"],
  openGraph: {
    title: "launchatdawn",
    description: "Orchestrating digital growth for high-impact brands.",
    url: "https://launchatdawn.com",
    siteName: "launchatdawn",
    images: [
      {
        url: "/og-image.jpg", // Create a cool 1200x630 orange/black image for this
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "launchatdawn",
    description: "Technical SEO and Digital Growth.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  }
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="font-sans bg-[#050505] text-white antialiased selection:bg-[#F95D0A] selection:text-black">
      <Navbar />
        {children}
     
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}