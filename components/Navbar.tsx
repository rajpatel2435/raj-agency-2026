"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Main Navbar */}
      {/* Removed mix-blend-difference so the white mega-menu colors stay true */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 text-white pointer-events-auto">
        <Link href="/" className="text-2xl font-black uppercase tracking-tighter hover:opacity-70 transition-opacity relative z-50">
          AGENCY.
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-10 font-medium text-sm tracking-widest uppercase relative z-50">
          <Link href="/work" className="hover:text-[#A855F7] transition-colors">Work</Link>

          {/* SERVICES MEGA MENU WRAPPER */}
          <div 
            className="relative py-6" // Padding keeps the mouse from falling off the hover area
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
          >
            <Link href="/services" className="hover:text-[#A855F7] transition-colors flex items-center gap-1">
              Services <span className="text-lg leading-none">+</span>
            </Link>

            {/* The White Dropdown Card */}
            <AnimatePresence>
              {isServicesHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[800px] bg-white text-black rounded-3xl p-8 flex gap-8 shadow-2xl cursor-auto"
                >
                  {/* Left Side: Service Links */}
                  <div className="flex-1">
                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">
                      Core Services
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 normal-case tracking-normal">
                      <Link href="/services/search-and-growth" className="text-xl font-medium hover:text-gray-500 transition-colors">Search & Growth Strategy</Link>
                      <Link href="/services/digital-pr" className="text-xl font-medium hover:text-gray-500 transition-colors">Digital PR</Link>
                      <Link href="/services/onsite-seo" className="text-xl font-medium hover:text-gray-500 transition-colors">Onsite SEO</Link>
                      <Link href="/services/content-experience" className="text-xl font-medium hover:text-gray-500 transition-colors">Content Experience</Link>
                      <Link href="/services/data-insights" className="text-xl font-medium hover:text-gray-500 transition-colors">Data & Insights</Link>
                    </div>
                  </div>

                  {/* Right Side: Featured Image & Button */}
                  <div className="w-[280px] shrink-0 relative rounded-2xl overflow-hidden group">
                    <Image 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" 
                      alt="Agency Team" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay Gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <Link href="/services" className="absolute bottom-4 left-4 right-4 bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex justify-between items-center hover:bg-gray-800 transition-colors">
                      View All Services <span>↗</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/about" className="hover:text-[#A855F7] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#A855F7] transition-colors">Contact</Link>
        </nav>

        {/* Mobile Menu Button (Hidden on Desktop) */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-sm font-bold tracking-widest uppercase hover:text-[#A855F7] transition-colors relative z-50"
        >
          Menu
        </button>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center items-center px-6"
          >
            <button 
              onClick={toggleMobileMenu}
              className="absolute top-6 right-6 text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-white transition-colors"
            >
              Close
            </button>

            <nav className="flex flex-col gap-10 text-center text-5xl md:text-7xl font-black uppercase tracking-tighter">
              <Link href="/work" onClick={toggleMobileMenu} className="text-white hover:text-[#A855F7] transition-colors">Work</Link>
              <Link href="/services" onClick={toggleMobileMenu} className="text-white hover:text-[#A855F7] transition-colors">Services</Link>
              <Link href="/about" onClick={toggleMobileMenu} className="text-white hover:text-[#A855F7] transition-colors">About</Link>
              <Link href="/contact" onClick={toggleMobileMenu} className="text-white hover:text-[#A855F7] transition-colors">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}