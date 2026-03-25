"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Technical Arrow: Scaled for better alignment
const ArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4" 
        : "bg-transparent border-b border-transparent py-7"
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* LOGO: High Contrast & Branded Split */}
        <Link href="/" className="text-2xl font-black tracking-tighter flex items-center group">
          <span className="text-white">launchat</span>
          <span className="text-[#F95D0A] group-hover:translate-x-0.5 transition-transform duration-300">dawn</span>
        </Link>

        {/* DESKTOP LINKS: Technical Typography Fix 
            - font-mono: For the "Code/Architecture" look
            - text-zinc-100: High contrast but softer than pure white
            - tracking-[0.2em]: Premium agency spacing
        */}
        <div className="hidden md:flex items-center gap-12">
          {['Services', 'Work', 'About', 'Blog'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-100 hover:text-[#F95D0A] transition-all duration-300 relative group"
            >
              {item}
              {/* Precision Hover Indicator */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F95D0A] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA BUTTON: High Energy Bold Mono */}
        <div className="flex items-center gap-4">
          <Link 
            href="/contact" 
            className="hidden md:flex bg-[#F95D0A] text-black px-7 py-3 rounded-full font-mono text-[11px] font-black uppercase tracking-widest hover:bg-white hover:scale-[1.03] transition-all duration-300 items-center gap-2 group shadow-[0_0_25px_rgba(249,93,10,0.2)]"
          >
            Say Hi 
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Mobile Toggle: Clean Tech Style */}
          <button className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none">
            <span className="w-6 h-[1.5px] bg-white block" />
            <span className="w-6 h-[1.5px] bg-white block" />
          </button>
        </div>

      </div>
    </nav>
  );
}