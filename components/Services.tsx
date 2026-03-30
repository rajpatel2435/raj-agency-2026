"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- CUSTOM TECH ICONS ---
const ArrowUpRight = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const TerminalIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

// Replaces the ugly blue emoji with a crisp, scalable vector arrow
const TechArrow = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// --- RAW DATA MODULES ---
const services = [
  {
    id: "01",
    sysName: "SYS.SEO_ARCH",
    title: "Enterprise SEO",
    desc: "Bypassing generic audits. I provide deep crawl efficiency logs, complex schema architectures, and indexation control for million-page domains.",
    metrics: ["Log File Analysis", "Crawl Budget Sync", "JS Rendering"],
    status: "ONLINE",
    slug: "/services/seo"
  },
  {
    id: "02",
    sysName: "SYS.NEXT_JS",
    title: "Frontend Architecture",
    desc: "Stop using monolithic systems. I engineer decoupled, serverless architectures built purely for speed and total frontend control.",
    metrics: ["Next.js 14+", "Bun Runtime", "Edge Caching"],
    status: "OPTIMIZED",
    slug: "/services/strategy"
  },
  {
    id: "03",
    sysName: "SYS.AUTHORITY",
    title: "Digital PR & Links",
    desc: "Programmatic link building at an enterprise level. We secure high-DR global publication placements to force immediate algorithmic trust.",
    metrics: ["DR 80+ Targets", "Zero Toxicity", "Manual Outreach"],
    status: "ACTIVE",
    slug: "/services/pr"
  },
  {
    id: "04",
    sysName: "SYS.CONVERSION",
    title: "Data & Funnels",
    desc: "Server-side tracking, advanced attribution models, and edge A/B testing designed to capture revenue, not just vanity traffic metrics.",
    metrics: ["Server-Side GTM", "Edge A/B Testing", "ROAS Modeling"],
    status: "TRACKING",
    slug: "/services/data"
  }
];

export default function Services() {
  const [activeBlade, setActiveBlade] = useState<number>(0);

  return (
    <section className="w-full py-32 px-6 md:px-12 bg-[#020202] text-white z-20 relative border-t border-gray-900 overflow-hidden font-sans selection:bg-[#FF3300] selection:text-black">
      
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '2rem 2rem',
        }}
      />

      <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-[#FF3300] rounded-full animate-pulse" />
              <span className="text-[#FF3300] text-[10px] font-bold uppercase tracking-[0.3em]">
                System Architecture
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter">
              Core Modules.
            </h2>
          </div>
          
          <div className="hidden md:flex text-right flex-col items-end">
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Capacity</span>
            <span className="text-2xl font-medium tracking-tighter text-white">100<span className="text-[#FF3300]">%</span></span>
          </div>
        </div>

        {/* --- THE "SERVER BLADE" INTERACTIVE LAYOUT --- */}
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 h-[800px] md:h-[600px]">
          
          {services.map((service, index) => {
            const isActive = activeBlade === index;

            return (
              <motion.div
                key={service.id}
                layout
                onMouseEnter={() => setActiveBlade(index)}
                animate={{ flex: isActive ? 5 : 1 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                className={`relative flex flex-col bg-[#0a0a0a] border border-gray-800 rounded-3xl overflow-hidden cursor-pointer transition-colors duration-300 ${
                  isActive ? "bg-[#111] border-gray-700 shadow-[0_0_50px_rgba(255,51,0,0.05)]" : "hover:border-gray-600"
                }`}
              >
                
                {/* --- COMPRESSED STATE (Visible when NOT active) --- */}
                <motion.div 
                  initial={false}
                  animate={{ opacity: isActive ? 0 : 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-between py-8 pointer-events-none"
                >
                  <span className="text-gray-600 font-bold text-sm tracking-widest">{service.id}</span>
                  
                  <div className="flex-1 flex items-center justify-center w-full">
                    <span className="hidden md:block text-xl font-medium tracking-widest text-gray-400 -rotate-90 whitespace-nowrap uppercase">
                      {service.title}
                    </span>
                    <span className="md:hidden text-lg font-medium tracking-widest text-gray-400 uppercase text-center px-4">
                      {service.title}
                    </span>
                  </div>
                  
                  <span className="w-2 h-2 rounded-full bg-gray-700" />
                </motion.div>

                {/* --- EXPANDED STATE (Visible when ACTIVE) --- */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex flex-col p-6 md:p-10 z-10 bg-[#111]"
                    >
                      {/* Top Bar inside Blade */}
                      <div className="flex justify-between items-start mb-8 border-b border-gray-800 pb-6">
                        <div className="flex flex-col gap-2">
                           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF3300] flex items-center gap-2">
                             <TerminalIcon /> {service.sysName}
                           </span>
                           {/* FIX: Added leading-tight and py-1 to prevent typography clipping */}
                           <h3 className="text-3xl md:text-5xl font-medium tracking-tighter text-white uppercase leading-tight py-1">
                             {service.title}
                           </h3>
                        </div>
                        <span className="hidden md:block text-[6rem] font-medium tracking-tighter text-gray-800 leading-none select-none opacity-50">
                          {service.id}
                        </span>
                      </div>

                      {/* Main Content Area */}
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl mb-12">
                          {service.desc}
                        </p>

                        {/* Raw Tech Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                          {service.metrics.map((metric, i) => (
                            <div key={i} className="bg-black/50 border border-gray-800 p-4 rounded-2xl flex flex-col justify-center group/metric transition-colors hover:border-gray-600">
                              {/* FIX: Replaced blue emoji with crisp custom SVG */}
                              <TechArrow className="text-[#FF3300] w-4 h-4 mb-2 opacity-80 group-hover/metric:translate-x-1 transition-transform" />
                              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300">
                                {metric}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Footer & CTA inside Blade */}
                      <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#FF3300] animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            Status: <span className="text-white">{service.status}</span>
                          </span>
                        </div>
                        
                        <Link 
                          href={service.slug}
                          className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#FF3300] hover:text-white transition-colors flex items-center gap-2 group w-full md:w-auto justify-center"
                        >
                          Execute Logic <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}