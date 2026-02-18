"use client";

import Link from "next/link";
import Image from "next/image"; // Added Image import
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  // Detect scroll to make navbar distinct when moving down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Search & Growth Strategy", href: "/services/strategy" },
    { name: "Digital PR", href: "/services/digital-pr" },
    { name: "Onsite SEO", href: "/services/seo" },
    { name: "Content Experience", href: "/services/content" },
    { name: "Data & Insights", href: "/services/data" },
    { name: "Paid Media", href: "/services/paid" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#050505]/80 backdrop-blur-md border-gray-800 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white z-50 relative">
          AGENCY<span className="text-[#FF3300]">.</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-12">
          
          {/* Services Dropdown Trigger */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button 
              className={`text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-1 ${
                isServicesOpen ? "text-[#FF3300]" : "text-white hover:text-[#FF3300]"
              }`}
            >
              Services <span className="text-[10px] opacity-70">▼</span>
            </button>

            {/* THE DARK MEGA MENU */}
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-[-100px] mt-6 w-[800px] bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-[0px_20px_40px_rgba(0,0,0,0.8)] overflow-hidden grid grid-cols-12"
                >
                  {/* Left Column: Links */}
                  <div className="col-span-7 p-10 flex flex-col justify-between relative z-10 bg-[#0a0a0a]">
                    <div>
                      <p className="text-[#FF3300] text-xs font-bold uppercase tracking-widest mb-6">
                        Core Capabilities
                      </p>
                      <ul className="grid grid-cols-1 gap-4">
                        {services.map((service) => (
                          <li key={service.name}>
                            <Link 
                              href={service.href}
                              className="text-lg font-light text-gray-300 hover:text-white hover:pl-2 transition-all block group"
                            >
                              <span className="inline-block w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 text-[#FF3300] transition-all">→</span>
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link href="/services" className="mt-8 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                      View All Services →
                    </Link>
                  </div>

                  {/* Right Column: Featured Image/Card */}
                  <div className="col-span-5 relative border-l border-gray-800 p-8 flex flex-col justify-end overflow-hidden">
                    
                    {/* --- BACKGROUND IMAGE --- */}
                    <div className="absolute inset-0 z-0">
                       <Image 
                         src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                         alt="Strategy Roadmap"
                         fill
                         className="object-cover grayscale contrast-125 opacity-50 mix-blend-overlay"
                       />
                       {/* Subtle Orange Tint Overlay */}
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#FF3300]/20" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h4 className="text-xl font-medium text-white mb-2">Need a custom roadmap?</h4>
                      <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                        We build bespoke strategies for brands ready to dominate their category.
                      </p>
                      <Link 
                        href="/contact" 
                        className="inline-block bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FF3300] transition-colors shadow-[0px_4px_20px_rgba(255,51,0,0.3)] hover:shadow-[0px_4px_25px_rgba(255,51,0,0.6)]"
                      >
                        Book a Strategy Call
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Standard Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                pathname === link.href ? "text-[#FF3300]" : "text-white hover:text-[#FF3300]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button className="md:hidden text-white">
           <div className="w-8 h-0.5 bg-white mb-1.5"></div>
           <div className="w-8 h-0.5 bg-white"></div>
        </button>

      </div>
    </nav>
  );
}