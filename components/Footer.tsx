"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
  </svg>
);

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (logoRef.current) observer.observe(logoRef.current);
    return () => observer.disconnect();
  }, []);

  // MATCHING CONTENT ARRAY: Label vs Slug
  const services = [
    { label: "Growth Strategy", slug: "strategy" },
    { label: "Local Visibility", slug: "seo" },
    { label: "Premium Experience", slug: "design" },
    { label: "Reliable Systems", slug: "engineering" }
  ];

  return (
    <footer className="w-full bg-[#050505] text-white pt-16 md:pt-24 border-t border-white/5 overflow-hidden font-sans selection:bg-[#F95D0A] selection:text-black">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 md:mb-20">
        
        {/* Newsletter Section */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase leading-[1.1] text-white">
            Stay updated with <br/> <span className="text-[#F95D0A]">launchatdawn</span> news
          </h3>
          
          <div className="relative flex items-center max-w-sm">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-14 py-3.5 text-white text-sm focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-white/30"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#F95D0A] rounded-full flex items-center justify-center text-black hover:bg-white transition-all group">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Links: High Contrast White, Standard Size */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 border-l border-white/10 pl-8 md:pl-16">
           <div className="flex flex-col gap-5">
             <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Service Divisions</h4>
             <div className="flex flex-col gap-3">
               {services.map((service) => (
                 <Link 
                   key={service.slug} 
                   href={`/services/${service.slug}`} 
                   className="text-sm font-medium text-white hover:text-[#F95D0A] transition-colors"
                 >
                   {service.label}
                 </Link>
               ))}
             </div>
           </div>

           <div className="flex flex-col gap-5">
             <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Resources</h4>
             <div className="flex flex-col gap-3">
               <Link href="/blog" className="text-sm font-medium text-white hover:text-[#F95D0A] transition-colors">Digital Archive</Link>
               <Link href="/about" className="text-sm font-medium text-white hover:text-[#F95D0A] transition-colors">Client Outcomes</Link>
             </div>
           </div>

           <div className="flex flex-col gap-5">
             <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Operational</h4>
             <div className="flex flex-col gap-3">
               <span className="text-sm font-medium text-white">Montreal, QC</span>
               <span className="text-sm font-medium text-white/20">Vancouver, BC</span>
             </div>
           </div>
        </div>
      </div>

      {/* FOOTER LOGO */}
      <div ref={logoRef} className="w-full border-t border-white/5 pt-12 text-center pb-8 group cursor-default select-none overflow-hidden px-4">
        <h2 className={`text-[13vw] font-black tracking-tighter leading-[0.7] flex items-center justify-center uppercase whitespace-nowrap transition-all duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <span className="text-white">launch</span>
          <span className="relative inline-flex items-center justify-center w-[10vw] h-[8vw] mx-[0.3vw] rounded-full overflow-hidden transition-all duration-[800ms] border border-white/10 bg-[#111] group-hover:w-[24vw]">
             <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200" alt="System" fill className="object-cover grayscale opacity-50 group-hover:grayscale-0 transition-all duration-700" />
             <span className="relative z-10 text-white text-[4vw] lowercase font-light italic">at</span>
          </span>
          <span className="text-[#F95D0A]">dawn</span>
        </h2>
        
        <div className="mt-8 flex justify-between items-center px-6 md:px-12 opacity-20">
           <p className="font-mono text-[8px] uppercase tracking-[0.5em]">© 2026 // Revenue Engineering</p>
           <p className="font-mono text-[8px] uppercase tracking-[0.5em]">MTL // YVR // INTERNATIONAL</p>
        </div>
      </div>

    </footer>
  );
}