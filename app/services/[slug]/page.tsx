"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";

// --- 1. DUMMY DATA FOR SERVICES ---
// In the future, you will fetch this from Sanity.
const serviceData: Record<string, any> = {
  "strategy": {
    title: "Search & Growth Strategy",
    description: "We don't guess. We use data to build roadmaps that steal market share.",
    marqueeText: ["Data Driven", "Market Share", "Global Scale", "Revenue First"],
    marqueeImages: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop"
    ]
  },
  "digital-pr": {
    title: "Digital PR",
    description: "We build campaigns that the internet can't ignore. Viral by design.",
    marqueeText: ["Viral Moments", "Top Tier Links", "Brand Fame", "Newsjacking"],
    marqueeImages: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
    ]
  },
  "seo": {
    title: "Onsite SEO",
    description: "Technical foundations that make Google fall in love with your brand.",
    marqueeText: ["Technical Excellence", "Core Web Vitals", "Migration Strategy", "Organic Growth"],
    marqueeImages: [
      "https://images.unsplash.com/photo-1504384308090-c54be3852f95?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553877606-3c669550b894?q=80&w=600&auto=format&fit=crop"
    ]
  }
};

// Default fallback if slug doesn't match
const defaultService = serviceData["strategy"];

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params for Next.js 15
  const [slug, setSlug] = useState<string>("");
  const [data, setData] = useState<any>(defaultService);

  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);
      setData(serviceData[p.slug] || defaultService);
    });
  }, [params]);

  // --- MARQUEE CONTENT BUILDER ---
  // We repeat the content 4 times to ensure it's long enough to loop smoothly on big screens
  const marqueeContent = Array(4).fill(null).map((_, i) => (
    <div key={i} className="flex items-center gap-12 shrink-0">
      {/* Text 1 */}
      <span className="text-6xl md:text-8xl font-medium tracking-tighter text-white whitespace-nowrap">
        {data.marqueeText[0]}
      </span>

      {/* Image 1 */}
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden border border-gray-800">
        <Image src={data.marqueeImages[0]} alt="Culture" fill className="object-cover" />
      </div>

      {/* Text 2 */}
      <span className="text-6xl md:text-8xl font-medium tracking-tighter text-transparent stroke-text whitespace-nowrap" style={{ WebkitTextStroke: "1px #555" }}>
        {data.marqueeText[1]}
      </span>

      {/* Image 2 */}
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden border border-gray-800">
        <Image src={data.marqueeImages[1]} alt="Work" fill className="object-cover" />
      </div>
      
       {/* Text 3 (Orange Accent) */}
       <span className="text-6xl md:text-8xl font-medium tracking-tighter text-[#FF3300] whitespace-nowrap">
        {data.marqueeText[2]}
      </span>
    </div>
  ));

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 w-full overflow-hidden">
      
      {/* HERO SECTION */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-24 text-center">
        <p className="text-[#FF3300] font-bold uppercase tracking-widest text-sm mb-6 border border-[#FF3300] inline-block px-4 py-1 rounded-full">
          Service
        </p>
        <h1 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.9] mb-8">
          {data.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      {/* --- THE INFINITE SLIDER (MARQUEE) --- */}
      <div className="w-full border-t border-b border-gray-800 py-12 bg-[#0a0a0a] overflow-hidden relative mb-24">
        
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <div className="flex">
          <motion.div
            className="flex gap-12 pr-12"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 20, // Adjust speed (Higher = Slower)
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marqueeContent}
          </motion.div>
        </div>
      </div>

      {/* BODY CONTENT (Placeholder) */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <h3 className="text-3xl font-medium mb-8">How we deliver results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="bg-[#111] p-12 rounded-3xl border border-gray-800">
              <h4 className="text-xl text-white font-bold mb-4">01. Audit & Analysis</h4>
              <p className="text-gray-400">We start by tearing down your current strategy and finding the gaps your competitors missed.</p>
           </div>
           <div className="bg-[#111] p-12 rounded-3xl border border-gray-800">
              <h4 className="text-xl text-white font-bold mb-4">02. Execution</h4>
              <p className="text-gray-400">We don't just plan; we build links, write code, and publish content that ranks.</p>
           </div>
        </div>
      </div>

    </main>
  );
}