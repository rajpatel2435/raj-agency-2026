"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- SLEEK CUSTOM SVG ARROWS ---
const ArrowUpRight = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const ChevronDown = ({ className = "w-3 h-3" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CloseIcon = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  const services = [
    { name: "Enterprise Technical SEO", href: "/services/technical-seo" },
    { name: "Custom CMS Development", href: "/services/cms-development" },
    { name: "Digital PR & Link Building", href: "/services/digital-pr" },
    { name: "Next.js / React Development", href: "/services/web-development" },
    { name: "High-Intent Keyword Strategy", href: "/services/seo-strategy" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 border-b font-sans ${
          isScrolled
            ? "bg-[#050505]/90 backdrop-blur-xl border-gray-800 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
          
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white relative group">
            AGENCY<span className="text-[#FF3300] group-hover:text-white transition-colors">.</span>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-10">
            
            <div 
              className="relative h-full flex items-center py-2 cursor-pointer"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link
                href="/services" 
                className={`text-[12px] font-bold uppercase tracking-[0.15em] transition-colors flex items-center gap-2 ${
                  isServicesOpen || pathname.includes('/services') ? "text-[#FF3300]" : "text-white hover:text-gray-400"
                }`}
              >
                Services 
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? "rotate-180 text-[#FF3300]" : "text-gray-400"}`} />
              </Link>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[850px] bg-[#0a0a0a] border border-gray-800 rounded-3xl shadow-[0px_40px_80px_rgba(0,0,0,0.8)] overflow-hidden grid grid-cols-12"
                  >
                    <div className="col-span-7 p-10 flex flex-col justify-center relative z-10">
                      <p className="text-[#FF3300] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border-b border-gray-800 pb-4">
                        Core Capabilities
                      </p>
                      <ul className="flex flex-col gap-4">
                        {services.map((service) => (
                          <li key={service.name}>
                            <Link 
                              href={service.href}
                              className="text-lg font-medium tracking-tight text-gray-300 hover:text-white hover:translate-x-2 transition-all flex items-center group"
                            >
                              <ArrowUpRight className="w-4 h-4 mr-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#FF3300] transition-all" />
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col-span-5 relative border-l border-gray-800 p-8 flex flex-col justify-end bg-[#111] overflow-hidden group">
                      <Image 
                        src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop"
                        alt="Code"
                        fill
                        className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                      
                      <div className="relative z-10">
                        <h4 className="text-xl font-medium tracking-tight text-white mb-2 leading-tight">Need a custom <br/> infrastructure?</h4>
                        <Link 
                          href="/contact" 
                          className="inline-flex items-center gap-2 mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF3300] hover:text-white transition-colors"
                        >
                          Book a Consultation <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[12px] font-bold uppercase tracking-[0.15em] transition-colors ${
                  pathname === link.href ? "text-[#FF3300]" : "text-white hover:text-gray-400"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* --- UPDATED: SOLID ORANGE BUTTON --- */}
            <Link
              href="/contact"
              className="ml-4 bg-[#FF3300] text-black px-7 py-3 rounded-full text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all flex items-center gap-2 group"
            >
              Say Hi <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* --- HAMBURGER BUTTON --- */}
          {!isMobileMenuOpen && (
            <button 
              className="md:hidden relative z-[60] w-10 h-10 flex flex-col justify-center items-end gap-1.5 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="block w-8 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-8 h-0.5 bg-white" />
            </button>
          )}
        </div>
      </nav>

      {/* --- FULLSCREEN MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] bg-[#050505] flex flex-col pt-8 px-6 pb-12 overflow-y-auto font-sans"
          >
            <div className="flex justify-between items-center w-full mb-12">
               <span className="text-2xl font-bold tracking-tighter text-white">
                 AGENCY<span className="text-[#FF3300]">.</span>
               </span>
               <button 
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="p-2 text-white hover:text-[#FF3300] transition-colors"
               >
                 <CloseIcon />
               </button>
            </div>

            <div className="flex flex-col h-full justify-between">
              <ul className="flex flex-col gap-6">
                <li className="border-b border-gray-800 pb-6 mb-2">
                  <span className="text-[#FF3300] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Capabilities</span>
                  <div className="flex flex-col gap-4">
                    {services.map((service) => (
                      <Link 
                        key={service.name} 
                        href={service.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg text-gray-300 font-medium tracking-tight hover:text-white flex items-center gap-3"
                      >
                        <ArrowUpRight className="w-4 h-4 text-gray-600" /> {service.name}
                      </Link>
                    ))}
                  </div>
                </li>

                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-5xl font-medium tracking-tighter text-white hover:text-[#FF3300] transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-[#FF3300] text-black hover:bg-white transition-colors px-8 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                >
                  Say Hi <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}