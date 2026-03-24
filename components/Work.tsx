"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type CaseStudyType = {
  _id: string;
  title: string;
  client: string;
  slug: string;
  imageUrl: string;
  summary: string;
};

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

export default function Work({ caseStudies }: { caseStudies: CaseStudyType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStudy = caseStudies[activeIndex] || caseStudies[0];

  return (
    <section id="work" className="relative w-full bg-[#050505] text-white font-sans selection:bg-[#FF3300] selection:text-black">
      
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />

      <div className="flex flex-col md:flex-row w-full max-w-[1600px] mx-auto relative z-10">

        {/* --- LEFT SIDE: Sticky System HUD (Hidden on Mobile) --- */}
        <div className="hidden md:flex flex-col w-[45%] lg:w-1/2 sticky top-0 h-screen justify-center pl-6 md:pl-12 pr-8 pointer-events-none border-r border-gray-900">
          
          <div className="absolute top-24 left-6 md:left-12 flex items-center gap-3">
            <span className="w-2 h-2 bg-[#FF3300] animate-pulse rounded-full" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              SYS.ARCHIVE // DEPLOYED
            </h2>
          </div>
          
          <div className="flex flex-col gap-4 mt-12">
            {caseStudies.map((study, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={`text-${study._id}`} className="relative flex items-center transition-all duration-500">
                  <motion.h3
                    animate={{
                      scale: isActive ? 1 : 0.95,
                      x: isActive ? 0 : -10,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-5xl lg:text-7xl xl:text-[6rem] font-black tracking-tighter leading-[0.85] uppercase transition-colors duration-500 ${
                      isActive ? "text-[#FF3300]" : "text-white/10"
                    }`}
                  >
                    {study.client || study.title}
                  </motion.h3>
                </div>
              );
            })}
          </div>

          {/* Dynamic Console Output Panel */}
          <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl">
               <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                 <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                   <TerminalIcon className="w-3 h-3 text-[#FF3300]" /> Output Log
                 </span>
                 <span className="text-[9px] text-gray-600 font-mono">STATUS: 200 OK</span>
               </div>
               
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeIndex}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                 >
                   <p className="text-sm font-bold text-white mb-2 uppercase tracking-widest">{activeStudy?.title}</p>
                   <p className="text-gray-400 text-sm leading-relaxed font-light">{activeStudy?.summary}</p>
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: The Scrolling Image Nodes --- */}
        {/* Added py-12 for mobile to give the grid top/bottom breathing room */}
        <div className="w-full md:w-[55%] lg:w-1/2 flex flex-col z-20 py-12 md:py-0 bg-[#020202]/50 backdrop-blur-3xl md:bg-transparent md:backdrop-blur-none">
          {caseStudies.map((study, index) => (
            <motion.div
              key={`img-${study._id}`}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.5 }} 
              // FIX: Removed universal `h-screen`. 
              // Now it uses `py-8` on mobile (stacking nicely) and `md:h-screen` on desktop (for the sticky scroll)
              className="w-full py-6 md:py-0 md:h-screen flex items-center justify-center px-6 md:px-16"
            >
              
              {/* Encased Image Node */}
              <Link href={`/work/${study.slug}`} className="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/3] relative rounded-2xl md:rounded-[2rem] overflow-hidden group border border-gray-800 bg-[#0a0a0a] cursor-pointer">
                
                {/* Tech Corners (Crosshairs) */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#FF3300] opacity-50 z-20 pointer-events-none" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#FF3300] opacity-50 z-20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#FF3300] opacity-50 z-20 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#FF3300] opacity-50 z-20 pointer-events-none" />

                {study.imageUrl && (
                  <Image
                    src={study.imageUrl}
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 pointer-events-none" />

                {/* Mobile Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 md:hidden z-20 pointer-events-none">
                   <p className="text-[#FF3300] text-[10px] font-bold uppercase tracking-widest mb-1">{study.client}</p>
                   <h3 className="text-2xl font-medium tracking-tighter text-white">{study.title}</h3>
                </div>

                {/* Kinetic Double Arrow (Center Hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm z-30">
                  <div className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-full">
                    <span className="font-bold uppercase tracking-[0.2em] text-[10px]">Execute File</span>
                    <div className="relative w-4 h-4 overflow-hidden">
                       <ArrowUpRight className="absolute inset-0 w-4 h-4 text-gray-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-hover:-translate-y-full" />
                       <ArrowUpRight className="absolute inset-0 w-4 h-4 text-[#FF3300] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}