import type { Metadata } from "next";
import { Manrope } from "next/font/google"; // 1. Import the new font
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 2. Configure the font
const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope", // This creates a CSS variable for Tailwind
});

export const metadata: Metadata = {
  title: "launchatdawn | Technical SEO & Development",
  description: "Engineering search dominance — built to launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Apply the font variable and base classes to the HTML tag
    <html lang="en" className={`${manrope.variable} font-sans bg-[#050505] text-white`}>
      <body className="antialiased selection:bg-[#FF3300] selection:text-black overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}