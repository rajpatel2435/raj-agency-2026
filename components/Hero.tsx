"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- SLEEK CUSTOM SVG ARROW ---
const ArrowUpRight = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden pt-20">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      {/* Deep, subtle orange glow in the center to create depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#FF3300] rounded-full blur-[250px] opacity-[0.06] pointer-events-none" />
      
      {/* Subtle grid to keep the technical feel */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 100%)' }} 
      />

      {/* --- HUD CORNER ELEMENTS (Desktop Only) --- */}
      {/* Top Left */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden md:flex absolute top-32 left-8 flex-col gap-1 z-20"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 flex items-center gap-2">
           <span className="w-1.5 h-1.5 bg-[#FF3300] rounded-full animate-pulse" /> Sys.Online
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Montreal, QC</span>
      </motion.div>

      {/* Bottom Left */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden md:flex absolute bottom-12 left-8 flex-col gap-2 z-20 max-w-[200px]"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FF3300]">Target Sectors</span>
        <span className="text-xs font-medium text-gray-300 leading-relaxed uppercase tracking-widest">
          Gambling, Sports Betting & iGaming.
        </span>
      </motion.div>


      {/* --- MAIN CENTERPIECE: KINETIC TYPOGRAPHY --- */}
      <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center mt-12 md:mt-0">
        
        <h1 className="flex flex-col items-center text-center font-black tracking-tighter leading-[0.85] w-full">
          
          {/* LINE 1: OUTLINE TEXT */}
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] md:text-[9vw] text-transparent uppercase"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}
          >
            Architecture
          </motion.span>

          {/* LINE 2: TEXT + INLINE ANIMATED IMAGE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 md:gap-6 uppercase text-white text-[13vw] md:text-[9vw]"
          >
            <span>Dictates</span>
            
            {/* The Animated Capsule */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "20vw", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "circOut" }}
              className="relative h-[10vw] md:h-[6.5vw] rounded-full overflow-hidden border border-gray-700 shadow-[0_0_30px_rgba(255,51,0,0.15)] flex-shrink-0"
            >
              <Image 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop" 
                alt="Server Core" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110" 
              />
              {/* Internal glow for the image */}
              <div className="absolute inset-0 bg-[#FF3300] mix-blend-overlay opacity-20" />
            </motion.div>
          </motion.div>

          {/* LINE 3: SOLID ACCENT COLOR */}
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] md:text-[9vw] text-[#FF3300] uppercase"
          >
            Rankings.
          </motion.span>

        </h1>

        {/* --- SUBTITLE & CTA --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex flex-col items-center max-w-2xl text-center"
        >
          <p className="text-lg md:text-xl font-light text-gray-400 leading-relaxed mb-10">
            Disruptive marketing is dead. In high-stakes niches, traffic is won in the codebase. I engineer the Next.js infrastructure that forces Google to pay attention.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Link
              href="/contact"
              className="bg-[#FF3300] text-black px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 group w-full sm:w-auto"
            >
              Initialize Project <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link
              href="/work"
              className="bg-transparent text-white border border-gray-800 px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:border-white transition-all w-full sm:w-auto text-center"
            >
              View Case Studies
            </Link>
          </div>
        </motion.div>

      </div>

      {/* --- BOTTOM RIGHT: FLOATING PERFORMANCE METRIC --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden md:flex absolute bottom-12 right-12 z-20"
      >
        <div className="bg-[#111]/80 backdrop-blur-xl border border-gray-800 p-5 rounded-3xl flex items-center gap-6 shadow-2xl">
           <div>
             <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Core Web Vitals</p>
             <p className="text-2xl font-medium tracking-tighter text-white">100<span className="text-[#FF3300] text-lg">/100</span></p>
           </div>
           <div className="w-12 h-12 rounded-full border-2 border-[#FF3300] flex items-center justify-center relative">
             <span className="text-[10px] font-bold text-[#FF3300]">LCP</span>
             {/* Spinning dashed ring for tech effect */}
             <div className="absolute inset-[-4px] border border-dashed border-gray-600 rounded-full animate-[spin_10s_linear_infinite]" />
           </div>
        </div>
      </motion.div>

    </div>
  );
}