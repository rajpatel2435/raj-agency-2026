"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const ArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      scrolled ? "bg-[#050505]/80 backdrop-blur-md border-gray-900 py-4" : "bg-transparent border-transparent py-6"
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* LOGO: Space Grotesk (font-sans) */}
        <Link href="/" className="text-2xl font-black tracking-tighter flex items-center">
          <span className="text-white">launchat</span>
          <span className="text-[#F95D0A]">dawn</span>
        </Link>

        {/* DESKTOP LINKS: Space Mono (font-mono) */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/services" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            Services
          </Link>
          <Link href="/work" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            Work
          </Link>
          <Link href="/about" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/blog" className="font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            Blog
          </Link>
        </div>

        {/* CTA BUTTON */}
        <div className="flex items-center gap-4">
          <Link 
            href="/contact" 
            className="hidden md:flex bg-[#F95D0A] text-black px-6 py-2.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors items-center gap-2 group"
          >
            Say Hi <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <button className="md:hidden flex flex-col gap-1.5 p-2">
            <span className="w-6 h-0.5 bg-white block" />
            <span className="w-6 h-0.5 bg-white block" />
          </button>
        </div>

      </div>
    </nav>
  );
}