"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// --- SLEEK CUSTOM SVG ARROW ---
const ArrowUpRight = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function AboutPage() {
  
  // --- PARALLAX SCROLL SETUP ---
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 350]);

  // --- STATE FOR SLIDER ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const dragStartX = useRef(0);
  const dragThreshold = 100;

  // --- DATA: TESTIMONIALS ---
  const testimonials = [
    {
      id: 0,
      client: "PointSpreads",
      quote: "Raj re-engineered our core vitals and helped us capture massive organic volume in the most competitive niche.",
      author: "Sarah Jenkins",
      role: "Head of Growth",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 1,
      client: "BetUS",
      quote: "A rare combination of developer and marketer. He understands the code that drives the ranking.",
      author: "Michael Ross",
      role: "CTO, BetUS",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=c0aede`,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      client: "PointSpreads",
      quote: "The technical execution was flawless. We saw immediate lift in indexation rates within weeks.",
      author: "David Miller",
      role: "Product Lead",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Dave&backgroundColor=d1d4f7`,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 3,
      client: "BetUS",
      quote: "Scalable architecture that handled our Super Bowl traffic spikes without a hitch.",
      author: "James Chen",
      role: "VP Engineering",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=ffdfbf`,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  const len = testimonials.length;
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % len);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + len) % len);

  // --- DRAG HANDLERS ---
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsPaused(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX.current;
    if (deltaX > dragThreshold) handlePrev(); 
    else if (deltaX < -dragThreshold) handleNext();
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isPaused) timeoutRef.current = setTimeout(() => handleNext(), 5000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused]);

  // --- UNIQUE MARQUEE DATA ---
  const skillMarquee = [
    { type: "text", value: "Code." },
    { type: "image", src: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop" },
    { type: "text", value: "Strategy." },
    { type: "text", value: "Execution." },
    { type: "image", src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=600&auto=format&fit=crop" },
    { type: "text", value: "Scale." },
    { type: "text", value: "Revenue." },
  ];

  // --- CAPABILITIES DATA ---
  const capabilities = [
    {
      title: "Enterprise Technical SEO",
      desc: "Deep architectural audits, log file analysis, and complex schema implementation designed for high-volume sites."
    },
    {
      title: "Next.js & React Development",
      desc: "Lightning-fast frontend architectures that ace Core Web Vitals and convert traffic instantly."
    },
    {
      title: "Custom CMS & Headless",
      desc: "Sanity, Contentful, and bespoke WordPress builds engineered for editorial speed and total scalability."
    },
    {
      title: "High-Intent Growth Strategy",
      desc: "Targeting bottom-of-funnel revenue queries instead of chasing meaningless vanity traffic metrics."
    },
    {
      title: "Digital PR & Link Building",
      desc: "Data-driven campaigns that secure powerful placements on top-tier global publications to drive authority."
    },
    {
      title: "Web3 & Blockchain Integration",
      desc: "Future-proofing brands with secure, decentralized technologies and smart contract integrations."
    }
  ];

  // --- UNIQUE INSIGHTS (Blog) ---
  const insightsItems = [
    {
      title: "Why Your Next.js Migration Killed Your Traffic (And How to Fix It)",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      tag: "Technical SEO",
      time: "8 min read"
    },
    {
      title: "Stop Paying Agencies for Automated Audits: The Case for Custom Strategy",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      tag: "Consulting",
      time: "5 min read"
    },
    {
      title: "The ROI of Server-Side Rendering in the iGaming Sector",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      tag: "Development",
      time: "10 min read"
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 md:px-12">
        <motion.div style={{ y: y1 }} className="absolute top-24 left-[10%] w-32 h-40 md:w-48 md:h-64 rounded-2xl overflow-hidden hidden md:block opacity-40 hover:opacity-100 transition-opacity z-10 border border-gray-800">
          <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop" alt="Server" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-32 left-[20%] w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden hidden md:block opacity-40 hover:opacity-100 transition-opacity z-10 border border-gray-800">
          <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop" alt="Data" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute top-48 right-[15%] w-40 h-56 md:w-56 md:h-72 rounded-2xl overflow-hidden hidden md:block opacity-40 hover:opacity-100 transition-opacity z-10 border border-gray-800">
          <Image src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=400&auto=format&fit=crop" alt="Code" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </motion.div>

        <div className="text-center relative z-20">
          <h1 className="text-6xl md:text-[8rem] font-medium tracking-tighter leading-[0.9] mb-8">
            Engineering <br/>
            Search <span className="inline-block w-24 h-16 md:w-48 md:h-28 relative rounded-full overflow-hidden align-middle mx-2 border border-gray-700 bg-[#111]">
              <Image 
                src="https://images.unsplash.com/photo-1620455776850-293c66070622?q=80&w=400&auto=format&fit=crop" 
                alt="Tech" 
                fill 
                className="object-cover grayscale" 
              />
            </span> Dominance.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mt-12">
            I am <strong className="text-white">Raj</strong>. I build the technical infrastructure behind the world's most aggressive, high-traffic industries.
          </p>
        </div>
      </div>

      {/* --- WHO I AM --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32 border-t border-gray-800 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
           <div className="lg:col-span-4">
              <h3 className="text-[#FF3300] font-bold uppercase tracking-widest text-sm mb-4">The Philosophy</h3>
           </div>
           <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter leading-tight">
                A specialized consultancy engineered for high-stakes organic growth. Zero bloat. Pure execution.
              </h2>
           </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center border-b border-gray-800 pb-24">
          <div>
            <span className="block text-6xl md:text-8xl font-medium text-white tracking-tighter mb-2">5+</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Years Enterprise Exp</span>
          </div>
          <div>
            <span className="block text-6xl md:text-8xl font-medium text-[#FF3300] tracking-tighter mb-2">100%</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Founder Led</span>
          </div>
          <div>
            <span className="block text-6xl md:text-8xl font-medium text-white tracking-tighter mb-2">0</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Middlemen</span>
          </div>
          <div>
            <span className="block text-6xl md:text-8xl font-medium text-white tracking-tighter mb-2">£10M+</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Revenue Driven</span>
          </div>
        </div>
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
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...skillMarquee, ...skillMarquee, ...skillMarquee].map((item, i) => (
              <div key={i} className="shrink-0 flex items-center">
                {item.type === "text" ? (
                  <span className="text-6xl md:text-9xl font-medium tracking-tighter text-white whitespace-nowrap">
                    {item.value}
                  </span>
                ) : (
                  <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-gray-800 rotate-[3deg]">
                    <Image src={item.src!} alt="Work" fill sizes="(max-width: 768px) 160px, 256px" className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- RE-ENGINEERED CAPABILITIES SECTION --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <div className="flex flex-col justify-center sticky top-32">
            <h3 className="text-[#FF3300] font-bold uppercase tracking-widest text-sm mb-6">Capabilities</h3>
            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter leading-[1] mb-8">
              Execution <br/> over theory.
            </h2>
            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed mb-10">
              <p>
                Most agencies sell you an "A-Team" but hand your account to a junior learning on your dime. I operate differently.
              </p>
              <p>
                As a solo technical consultant, I bridge the gap between complex code and aggressive marketing. You get direct access to the architect building your growth engine.
              </p>
            </div>
            
            {/* UPDATED: Clean SVG Arrow on the button */}
            <button className="self-start bg-white text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#FF3300] transition-colors flex items-center gap-2 group">
               Start a Project <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-gray-800 rounded-[2.5rem] p-8 md:p-14 shadow-2xl">
              <div className="flex flex-col">
                 {capabilities.map((cap, idx) => (
                   <div 
                     key={idx} 
                     className="group relative border-b border-gray-800 py-8 first:pt-0 last:border-0 last:pb-0 cursor-pointer"
                   >
                     <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <h4 className="text-2xl md:text-3xl font-medium text-white group-hover:text-[#FF3300] transition-colors mb-3 flex items-center gap-4">
                             <span className="w-2 h-2 bg-gray-700 group-hover:bg-[#FF3300] transition-colors rounded-full shrink-0" />
                             {cap.title}
                          </h4>
                          <p className="text-gray-400 font-light text-base md:text-lg pl-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                             {cap.desc}
                          </p>
                        </div>
                        
                        {/* UPDATED: Clean SVG Arrow here as well */}
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-[#FF3300]">
                          <ArrowUpRight className="w-8 h-8" />
                        </div>
                     </div>
                   </div>
                 ))}
              </div>
          </div>
        </div>
      </div>

      {/* --- THE SLIDER SECTION --- */}
      <section className="bg-[#0a0a0a] py-32 mb-32 relative overflow-hidden border-t border-b border-gray-800">
        <div className="text-center mb-16 px-6">
          <div className="flex justify-center gap-1 mb-6 text-[#FF3300] text-xl tracking-[0.2em] uppercase font-bold">
            ★★★★★
          </div>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-white flex flex-col items-center justify-center">
            <span>Trusted by</span>
            <span className="flex items-center gap-4 mt-2">
              category leaders
            </span>
          </h2>
        </div>

        <div 
            className="relative w-full h-[550px] md:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.map((t, index) => {
            let position = 0; 
            if (index === currentIndex) position = 0;
            else if (index === (currentIndex + 1) % len) position = 1;
            else if (index === (currentIndex - 1 + len) % len) position = -1;
            else position = 2;

            return (
              <motion.div
                key={t.id}
                initial={false}
                animate={{
                  x: position === 0 ? 0 : position === 1 ? "105%" : position === -1 ? "-105%" : "200%",
                  scale: position === 0 ? 1 : 0.9,
                  opacity: position === 2 ? 0 : position === 0 ? 1 : 0.4,
                  zIndex: position === 0 ? 10 : position === 2 ? 0 : 5
                }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => {
                   if (position === 1) handleNext();
                   if (position === -1) handlePrev();
                }}
                className={`absolute top-0 w-[90vw] max-w-[950px] h-full flex flex-col md:flex-row bg-[#111] border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]`}
              >
                <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative select-none">
                   <blockquote className="text-xl md:text-2xl font-medium leading-snug tracking-tight text-white mt-4 mb-10 relative z-10">
                     <span className="text-[#FF3300] font-serif pr-1 opacity-50">“</span>{t.quote}<span className="text-[#FF3300] font-serif pl-1 opacity-50">”</span>
                   </blockquote>
                   <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-800">
                     <div className="w-12 h-12 rounded-full bg-gray-800 relative overflow-hidden shrink-0 border border-gray-700">
                        <Image src={t.avatar} alt={t.author} fill sizes="48px" className="object-cover" />
                     </div>
                     <div>
                       <p className="font-bold uppercase tracking-widest text-[11px] text-white mb-1">{t.author}</p>
                       <p className="text-[#FF3300] text-[10px] font-bold uppercase tracking-widest">{t.client}</p>
                     </div>
                   </div>
                </div>
                <div className="w-full md:w-1/2 relative h-[200px] md:h-full bg-[#050505] select-none pointer-events-none">
                   <Image src={t.image} alt="Technology" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80 mix-blend-overlay contrast-125" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-16 relative z-20">
            {testimonials.map((t, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                    currentIndex === index ? "bg-[#FF3300] border border-[#FF3300] px-6 py-3 scale-105 text-black" : "bg-transparent border border-gray-800 px-4 py-3 hover:border-white text-gray-500 hover:text-white"
                  }`}
                >
                  <span className="uppercase font-bold tracking-[0.2em] text-[10px]">{t.client}</span>
                </button>
            ))}
        </div>
      </section>

      {/* --- TECHNICAL INSIGHTS --- */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32">
        <div className="flex justify-between items-end mb-12 border-b border-gray-800 pb-8">
           <h2 className="text-4xl md:text-6xl font-medium tracking-tighter">
             Technical <span className="inline-block w-12 h-10 bg-[#FF3300] rounded-xl align-middle mx-2 overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=100&h=100" fill alt="icon" className="object-cover opacity-50 mix-blend-overlay"/></span> Insights
           </h2>
           
           {/* UPDATED: Clean SVG Arrow on the button */}
           <button className="hidden md:flex text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border border-gray-800 px-6 py-3 rounded-full hover:border-white items-center gap-2 group">
             Read the Blog <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insightsItems.map((news, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-[#111]">
                 <div className="absolute top-4 left-4 bg-[#FF3300] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10 text-black shadow-lg">
                   {news.tag}
                 </div>
                 <Image src={news.image} alt={news.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                 ⏱ {news.time}
              </div>
              <h3 className="text-xl md:text-2xl font-medium leading-snug group-hover:text-[#FF3300] transition-colors">
                {news.title}
              </h3>
            </div>
          ))}
        </div>
        
        {/* UPDATED: Clean SVG Arrow on the mobile button */}
        <button className="md:hidden mt-12 w-full text-xs font-bold uppercase tracking-widest text-gray-400 border border-gray-800 px-6 py-4 rounded-full flex justify-center items-center gap-2 group">
           Read the Blog <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

    </main>
  );
}