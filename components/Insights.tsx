"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/lib/image"; // Ensure this import matches your sanity setup

// --- CUSTOM TECH ARROW ---
const ArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function Insights({ data }: { data: any[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Function to format Sanity Date (e.g., "2026-03-25" -> "MAR 2026")
  const formatDate = (dateString: string) => {
    if (!dateString) return "2026";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
  };

  return (
    <section className="w-full py-32 px-6 md:px-12 bg-[#050505] border-t border-gray-900 font-sans selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-20">
        
        {/* --- LEFT SIDE: THE INDEX LIST --- */}
        <div className="w-full lg:w-3/5">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-2 h-2 bg-[#F95D0A] rounded-full" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
              INTEL.INDEX // {data?.length.toString().padStart(3, '0') || "000"}
            </h2>
          </div>

          <div className="flex flex-col border-t border-gray-800">
            {data?.map((item, idx) => (
              <Link 
                key={item._id} 
                href={`/blog/${item.slug?.current || item.slug}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-gray-900 hover:border-gray-600 transition-colors"
              >
                {/* Number & Category */}
                <div className="flex items-center gap-8 mb-4 md:mb-0">
                  <span className="text-gray-700 font-medium text-sm">{(idx + 1).toString().padStart(2, '0')}</span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#F95D0A] bg-[#F95D0A]/5 px-3 py-1 rounded-sm">
                    {item.category || "TECHNICAL"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-5xl font-medium tracking-tighter text-white group-hover:text-white group-hover:translate-x-4 transition-all duration-500 flex-1 md:px-12">
                  {item.title}
                </h3>

                {/* Date / Arrow */}
                <div className="flex items-center gap-6 mt-6 md:mt-0">
                  <span className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                    {formatDate(item.publishedAt)}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center group-hover:bg-[#F95D0A] group-hover:border-[#F95D0A] transition-all">
                    <ArrowUpRight className="text-gray-500 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <Link href="/blog" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#F95D0A] transition-colors border-b border-gray-800 pb-1">
              View All Intelligence
            </Link>
          </div>
        </div>

        {/* --- RIGHT SIDE: THE DYNAMIC PREVIEW WINDOW --- */}
        <div className="hidden lg:flex w-2/5 sticky top-32 h-[600px] flex-col justify-center">
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-gray-800 bg-[#0a0a0a]">
            
            <div className="absolute inset-0 z-10 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <AnimatePresence mode="wait">
              {hoveredIndex !== null && data[hoveredIndex]?.mainImage ? (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={urlFor(data[hoveredIndex].mainImage).url()} 
                    alt="Preview" 
                    fill 
                    className="object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                </motion.div>
              ) : (
                <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   className="absolute inset-0 flex items-center justify-center text-gray-800 px-12 text-center"
                >
                   <span className="font-mono text-[10px] uppercase tracking-[0.5em] -rotate-90">WAITING FOR INPUT</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tactical Corners */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-gray-700" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-gray-700" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-gray-700" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-gray-700" />
          </div>
        </div>

      </div>
    </section>
  );
}