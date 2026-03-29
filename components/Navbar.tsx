"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // NEW: Track menu state

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 ${
        scrolled 
          ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4" 
          : "bg-transparent border-b border-transparent py-7"
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="text-2xl font-black tracking-tighter flex items-center group relative z-[70]">
            <span className="text-white">launchat</span>
            <span className="text-[#F95D0A] group-hover:translate-x-0.5 transition-transform duration-300">dawn</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-100 hover:text-[#F95D0A] transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F95D0A] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA & MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            <Link 
              href="/contact" 
              className="hidden md:flex bg-[#F95D0A] text-black px-7 py-3 rounded-full font-mono text-[11px] font-black uppercase tracking-widest hover:bg-white hover:scale-[1.03] transition-all duration-300 items-center gap-2 group shadow-[0_0_25px_rgba(249,93,10,0.2)]"
            >
              Say Hi 
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* NEW: Functional Mobile Toggle Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-[70] flex flex-col gap-1.5 p-2 focus:outline-none"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1.5px] bg-white block origin-center transition-all" 
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[1.5px] bg-white block transition-all" 
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1.5px] bg-white block origin-center transition-all" 
              />
            </button>
          </div>
        </div>
      </nav>

      {/* NEW: MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-[#050505] flex flex-col items-start justify-center px-10 gap-8"
          >
            {/* Background Accent for Menu */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F95D0A]/5 blur-[120px] pointer-events-none" />
            
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-mono">Navigation</span>
              {navLinks.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  key={item.name}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-black tracking-tighter text-white hover:text-[#F95D0A] transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 w-full"
            >
               <Link 
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between w-full border-b border-white/10 pb-6 group"
              >
                <span className="text-xl font-mono uppercase tracking-widest">Start a Project</span>
                <ArrowUpRight className="w-8 h-8 text-[#F95D0A] group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}