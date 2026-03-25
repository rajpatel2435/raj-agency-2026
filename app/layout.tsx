import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Insights from "@/components/Insights";

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

export const metadata = {
  title: "Launch at Dawn | Enterprise Architecture",
  description: "Technical SEO and Next.js Infrastructure.",
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
      </body>
    </html>
  );
}