"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ServiceType = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

export default function Services({ services }: { services: ServiceType[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="w-full py-20 md:py-32 px-6 md:px-12 bg-[#050505] text-white z-20 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="flex justify-between items-center mb-12 md:mb-24 border-b border-gray-800 pb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Our Expertise
          </h2>
          <Link 
            href="/services" 
            className="bg-[#A855F7] text-black rounded-full px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 cursor-none"
          >
            See all services <span className="text-lg font-light">↗</span>
          </Link>
        </div>

        {/* The Massive Stacked List */}
        <div className="flex flex-col">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div 
                key={service._id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Adjusted padding for mobile to keep the list tight
                className="group border-b border-gray-800 py-6 md:py-12 flex items-center cursor-none w-full transition-colors duration-500"
              >
                
                {/* 1. MOBILE IMAGE (Static Thumbnail, always visible on small screens) */}
                {service.imageUrl && (
                  <div className="md:hidden relative w-16 h-16 rounded-lg overflow-hidden shrink-0 mr-4">
                    <Image 
                      src={service.imageUrl} 
                      alt={service.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                )}

                {/* 2. DESKTOP IMAGE (Animated Expand, hidden on mobile) */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    width: isHovered ? "auto" : 0, 
                    opacity: isHovered ? 1 : 0,
                    marginRight: isHovered ? "24px" : "0px"
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="hidden md:flex overflow-hidden h-32 rounded-xl shrink-0 items-center"
                >
                  {service.imageUrl && (
                    <div className="relative w-48 h-32">
                      <Image 
                        src={service.imageUrl} 
                        alt={service.title} 
                        fill 
                        className="object-cover rounded-xl" 
                      />
                    </div>
                  )}
                </motion.div>

                {/* 3. Text (Now pure white globally) */}
                <h3 className="text-3xl md:text-6xl lg:text-8xl font-medium tracking-tighter text-white">
                  {service.title}
                </h3>

                {/* 4. Floating Neon Icon (Desktop Only Hover) */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    x: isHovered ? 0 : -20 
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="hidden md:flex ml-auto bg-[#A855F7] text-black w-16 h-16 rounded-full items-center justify-center shrink-0"
                >
                  <span className="text-2xl font-light">↗</span>
                </motion.div>

                {/* 5. Static Arrow Icon (Mobile Only) */}
                <div className="md:hidden ml-auto text-gray-500 shrink-0">
                  <span className="text-2xl font-light">↗</span>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  );
}