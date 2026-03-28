"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Reusable SVG Arrow to replace the blue emoji
const LaunchArrow = () => (
  <svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3.5" 
    strokeLinecap="square" 
    strokeLinejoin="round" 
    className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-4 md:px-8 w-full selection:bg-[#F95D0A] selection:text-black font-sans overflow-hidden">
      
      {/* Container for the massive cards */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT CARD: General Enquiries (Orange Branding) */}
        <Link 
          href="/contact/hello" 
          className="bg-[#111111] border border-zinc-800 text-white rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 flex flex-col justify-between min-h-[50vh] md:min-h-[75vh] group transition-all duration-700 hover:scale-[1.01] hover:border-[#F95D0A] relative overflow-hidden"
        >
          {/* Top Text Content */}
          <div className="relative z-10">
            <div className="flex justify-between items-start">
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
                 General <br/> Enquiries
               </h2>
               <div className="text-4xl text-[#F95D0A] opacity-0 group-hover:opacity-100 transition-opacity">
                 <LaunchArrow />
               </div>
            </div>
            <p className="text-2xl md:text-4xl font-medium text-zinc-500 tracking-tight leading-tight">
              Fancy a chat? <br/> Grab a coffee? Pint?
            </p>
          </div>

          {/* Bottom Massive Text */}
          <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-[calc(-0.05em)] leading-[0.8] mt-24 relative z-10 group-hover:text-[#F95D0A] transition-colors duration-500 italic">
            Say Hello
          </h1>

          {/* Subtle Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F95D0A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </Link>

        {/* RIGHT CARD: Careers (Ghost/Dark Card) */}
        <Link 
          href="/careers" 
          className="bg-[#050505] border border-zinc-800 text-white rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 flex flex-col justify-between min-h-[50vh] md:min-h-[75vh] group transition-all duration-700 hover:scale-[1.01] hover:border-zinc-500 relative overflow-hidden"
        >
          {/* Top Text Content */}
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
                Join the <br/> team
              </h2>
              <div className="text-4xl text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <LaunchArrow />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-medium text-zinc-700 tracking-tight group-hover:text-zinc-400 transition-colors leading-tight">
              Find your <br/> dream job
            </p>
          </div>

          {/* Bottom Massive Text */}
          <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-[calc(-0.05em)] leading-[0.8] mt-24 text-zinc-800 group-hover:text-white transition-colors duration-500 italic">
            Work for us
          </h1>
        </Link>

      </div>

      {/* Background Decorative Marquee (Subtle) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
        <p className="text-[20vw] font-black uppercase whitespace-nowrap leading-none">
          Contact // Transmission // Contact // Transmission
        </p>
      </div>

    </main>
  );
}