"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type CaseStudy = {
  _id: string;
  client: string;
  slug: string;
  metric: string;
  category: string;
  image: string;
};

export default function WorkInteractive({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [hoveredProject, setHoveredProject] = useState<CaseStudy>(caseStudies[0]);

  return (
    // Removed the top padding from the main wrapper so the sticky right side hits the top of the browser perfectly
    <main className="min-h-screen bg-[#050505] text-white w-full flex flex-col md:flex-row relative">
      
      {/* LEFT SIDE: Intro Text + Scrolling List */}
      <div className="w-full md:w-[60%] px-6 md:px-12 pt-32 md:pt-48 pb-32 z-10">
        
        {/* --- NEW: The Massive Intro Section --- */}
        <div className="mb-24 md:mb-40">
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-medium tracking-tighter leading-[0.9] mb-8">
            The Problems <br className="hidden md:block" /> We Solve.
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-400 max-w-xl leading-relaxed">
            Clients globally come to us to drive search demand and discovery. We engineer digital footprints for brands with ambitions to be category leaders.
          </p>
        </div>
        {/* -------------------------------------- */}

        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-16 border-b border-gray-800 pb-8">
          The Proof
        </h2>

        <div className="flex flex-col">
          {caseStudies.map((work) => (
            <Link 
              href={`/work/${work.slug}`} 
              key={work._id}
              onMouseEnter={() => setHoveredProject(work)}
              className="group py-12 md:py-16 border-b border-gray-800/50 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 cursor-none transition-colors hover:border-[#A855F7]/50"
            >
              <h3 className="text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter leading-none group-hover:text-[#A855F7] transition-colors duration-500">
                {work.metric}
              </h3>
              
              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <h4 className="text-3xl font-light tracking-tight group-hover:text-white text-gray-400 transition-colors duration-500">
                  {work.client}
                </h4>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-600 group-hover:text-gray-400">
                  {work.category}
                </p>
              </div>

              {/* Mobile Only Image */}
              {work.image && (
                <div className="md:hidden w-full h-[300px] relative rounded-2xl overflow-hidden mt-8">
                  <Image src={work.image} alt={work.client} fill className="object-cover" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: The Sticky Hover Reveal (Hidden on Mobile) */}
      <div className="hidden md:block w-[40%] h-screen sticky top-0 right-0 overflow-hidden bg-[#050505] p-6">
        <div className="w-full h-full relative rounded-3xl overflow-hidden border border-gray-800 mt-24">
          
          <AnimatePresence mode="wait">
            {hoveredProject?.image && (
              <motion.div
                key={hoveredProject._id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image 
                  src={hoveredProject.image} 
                  alt={hoveredProject.client} 
                  fill 
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent opacity-40" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="absolute bottom-8 right-8 bg-[#A855F7] text-black rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest z-20 shadow-2xl">
            View Project ↗
          </div>

        </div>
      </div>

    </main>
  );
}