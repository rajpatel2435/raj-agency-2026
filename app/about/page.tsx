"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AboutPage() {
  
  // --- STATE FOR TESTIMONIAL SLIDER ---
  const [activeTab, setActiveTab] = useState(0);

  // --- DATA: TESTIMONIALS ---
  const testimonials = [
    {
      id: 0,
      client: "PointSpreads",
      logo: "https://www.pointspreads.com/wp-content/uploads/2022/01/pointspreads-logo.png", // Public logo URL or placeholder
      color: "text-[#FF3300]", // Brand Color
      quote: "Raj re-engineered our core vitals and helped us capture massive organic volume in the most competitive niche.",
      author: "Sarah Jenkins",
      role: "Head of Growth",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" // Data/Analytics Vibe
    },
    {
      id: 1,
      client: "BetUS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/BetUS_Logo.png", // Public logo URL or placeholder
      color: "text-[#1C4696]", // Brand Color
      quote: "A rare combination of developer and marketer. He understands the code that drives the ranking.",
      author: "Michael Ross",
      role: "CTO, BetUS",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" // Tech/Server Vibe
    }
  ];

  // --- MARQUEE DATA ---
  const skillMarquee = [
    { type: "text", value: "Technical SEO." },
    { type: "image", src: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop" },
    { type: "text", value: "Next.js Dev." },
    { type: "text", value: "High Stakes." },
    { type: "image", src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=600&auto=format&fit=crop" },
    { type: "text", value: "Growth." },
    { type: "text", value: "Raj." },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 w-full overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32 text-center">
        <h1 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.9] mb-12">
          The <span className="text-[#FF3300]">Technical</span> <br/>
          Edge.
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
          I am <strong className="text-white">Raj</strong>. For 5+ years, I have been building the infrastructure behind the world's most aggressive industries (Gambling & Sports Betting).
        </p>
      </div>

      {/* --- SKILL MARQUEE --- */}
      <div className="w-full border-t border-b border-gray-800 py-16 bg-[#0a0a0a] overflow-hidden relative mb-32">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <div className="flex">
          <motion.div
            className="flex items-center gap-16 pr-16"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...skillMarquee, ...skillMarquee].map((item, i) => (
              <div key={i} className="shrink-0 flex items-center">
                {item.type === "text" ? (
                  <span className="text-6xl md:text-9xl font-medium tracking-tighter text-white whitespace-nowrap">
                    {item.value}
                  </span>
                ) : (
                  <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-gray-800 rotate-[3deg]">
                    <Image src={item.src!} alt="Work" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- HYBRID ADVANTAGE SECTION --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-gray-800 bg-[#111]">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1000&auto=format&fit=crop" 
              alt="Code and Strategy" 
              fill 
              className="object-cover grayscale opacity-60"
            />
            <div className="absolute bottom-8 left-8 z-20">
               <h3 className="text-5xl font-medium tracking-tighter text-white">5+ Years</h3>
               <p className="text-[#FF3300] font-bold uppercase tracking-widest text-sm">In The Trenches</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-[#FF3300] font-bold uppercase tracking-widest text-sm mb-6">The Hybrid Advantage</h3>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1] mb-8">
              Stop hiring SEOs who <br/> can't write code.
            </h2>
            <div className="space-y-8 text-lg text-gray-400 font-light">
              <p>In high-stakes industries like <strong className="text-white">Gambling & Fintech</strong>, basic content strategies fail. You need speed, schema, and server-side rendering.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                 <li className="flex items-center gap-3 text-white"><span className="w-2 h-2 bg-[#FF3300] rounded-full" /> Full Stack Dev (Next.js)</li>
                 <li className="flex items-center gap-3 text-white"><span className="w-2 h-2 bg-[#FF3300] rounded-full" /> Enterprise Technical SEO</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --- NEW: "RECOMMENDED BY" SECTION (Exact Match Design) --- */}
      <section className="bg-[#050505] py-24 border-t border-gray-800 mb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-6 text-white text-xl">
              ★★★★★
            </div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-white">
              Recommended by <br/> category leaders
            </h2>
            <div className="flex justify-center mt-6">
               <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#050505] relative overflow-hidden bg-[#222]">
                      <Image src={`https://images.unsplash.com/photo-${1500000000000+i}?auto=format&fit=crop&w=100&h=100`} alt="Avatar" fill />
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* THE REVIEW CARD (Dynamic) */}
          <div className="relative w-full max-w-[1400px] mx-auto min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 rounded-[3rem] overflow-hidden shadow-2xl"
              >
                {/* Left: White Text Side */}
                <div className="bg-white text-black p-12 md:p-20 flex flex-col justify-between">
                   <p className="text-2xl md:text-4xl font-medium leading-tight tracking-tight mb-12">
                     "{testimonials[activeTab].quote}"
                   </p>
                   
                   <div className="flex items-center gap-4">
                     {/* Small Avatar of Author */}
                     <div className="w-12 h-12 rounded-full bg-gray-200 relative overflow-hidden">
                        <Image src={`https://images.unsplash.com/photo-${activeTab === 0 ? '1573496359142-b8d87734a5a2' : '1560250097-0b93528c311a'}?auto=format&fit=crop&w=100&h=100`} alt="Author" fill />
                     </div>
                     <div>
                       <p className="font-bold uppercase tracking-widest text-sm">{testimonials[activeTab].author}</p>
                       <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{testimonials[activeTab].role}</p>
                     </div>
                   </div>
                </div>

                {/* Right: Image Side */}
                <div className="relative h-[400px] lg:h-auto bg-[#111]">
                   <Image 
                     src={testimonials[activeTab].image} 
                     alt="Office" 
                     fill 
                     className="object-cover" 
                   />
                   <div className="absolute inset-0 bg-black/20" />
                   {/* Floating Label */}
                   <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                     {testimonials[activeTab].client}
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* THE LOGO CONTROLS (Pill Buttons) */}
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            
            {/* BetUS Button */}
            <button 
              onClick={() => setActiveTab(1)}
              className={`px-8 py-4 rounded-full border transition-all duration-300 flex items-center gap-3 group ${activeTab === 1 ? 'bg-white text-black border-white' : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-500'}`}
            >
              <span className={`font-bold text-lg ${activeTab === 1 ? 'text-[#1C4696]' : 'group-hover:text-white'}`}>BetUS</span>
            </button>

            {/* PointSpreads Button */}
            <button 
              onClick={() => setActiveTab(0)}
              className={`px-8 py-4 rounded-full border transition-all duration-300 flex items-center gap-3 group ${activeTab === 0 ? 'bg-white text-black border-white' : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-500'}`}
            >
               <span className={`font-bold text-lg ${activeTab === 0 ? 'text-[#D52027]' : 'group-hover:text-white'}`}>PointSpreads</span>
            </button>

            {/* Placeholder for future clients */}
            <div className="px-8 py-4 rounded-full border border-gray-800 border-dashed text-gray-600 text-sm font-bold uppercase tracking-widest">
              More coming soon
            </div>

          </div>

        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center border-b border-gray-800 pb-24">
          <div>
            <span className="block text-6xl md:text-8xl font-medium text-[#FF3300] tracking-tighter mb-2">5+</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Years Enterprise Exp</span>
          </div>
          <div>
            <span className="block text-6xl md:text-8xl font-medium text-white tracking-tighter mb-2">100%</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Founder Led</span>
          </div>
          <div>
            <span className="block text-6xl md:text-8xl font-medium text-white tracking-tighter mb-2">2</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Major Operators</span>
          </div>
          <div>
            <span className="block text-6xl md:text-8xl font-medium text-[#FF3300] tracking-tighter mb-2">ROI</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Positive Forever</span>
          </div>
        </div>
      </div>

    </main>
  );
}