import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "My Digital Agency",
  description: "Disruptive marketing and bold design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}