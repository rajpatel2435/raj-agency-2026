"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

export default function Work({ caseStudies }: { caseStudies: CaseStudyType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
<section id="work" className="relative w-full bg-[#050505] text-white">
      <div className="flex flex-col md:flex-row w-full max-w-[100vw] mx-auto">

        {/* LEFT SIDE: The Sticky Text */}
        <div className="hidden md:flex flex-col w-1/2 sticky top-0 h-screen justify-center pl-6 md:pl-12 pr-8 z-10 pointer-events-none">
          <h2 className="text-sm font-bold uppercase tracking-widest absolute top-32 text-white">
            Featured Work
          </h2>
          
          <div className="flex flex-col gap-2">
            {caseStudies.map((study, index) => (
              <div key={`text-${study._id}`} className="relative flex items-center">
                <motion.h3
                  animate={{
                    opacity: activeIndex === index ? 1 : 0.2, 
                    scale: activeIndex === index ? 1 : 0.95, 
                    x: activeIndex === index ? 0 : -20, 
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  // Removed whitespace-nowrap and slightly adjusted the size so long names wrap nicely!
                  className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] max-w-[90%]"
                >
                  {study.client || study.title} 
                </motion.h3>
                
                <motion.span
                  animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  className="text-xs ml-4 tracking-widest text-gray-500 font-mono hidden lg:block"
                >
                  [2026]
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: The Scrolling Images */}
        {/* Removed the gap and padding, added a wrapper that takes up the full screen height! */}
        <div className="w-full md:w-1/2 flex flex-col z-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={`img-${study._id}`}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.5 }} // Triggers exactly when the image is halfway up the screen
              // This wrapper forces each image section to be exactly the height of your monitor (h-screen)
              className="w-full h-screen flex items-center justify-center px-6 md:pr-12 md:pl-0"
            >
              <Link href={`/work/${study.slug}`} className="w-full aspect-square lg:aspect-[4/3] relative rounded-3xl overflow-hidden group cursor-none border border-gray-800">
                {study.imageUrl && (
                  <Image
                    src={study.imageUrl}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                )}
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-sm">
                  <span className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Case Study
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}