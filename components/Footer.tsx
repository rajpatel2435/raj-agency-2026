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
            Need more leads this month? <br/> <span className="text-[#F95D0A]">Book a growth call.</span>
          </h3>

          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            In one 20-minute call, we will map your current growth bottlenecks and show you the fastest path to qualified inbound leads.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Link
              href="/contact/hello"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F95D0A] px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-black hover:bg-white transition-colors"
            >
              Book a 20-min Call
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white hover:border-white transition-colors"
            >
              View Results
            </Link>
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
               <Link href="/tools" className="text-sm font-medium text-white hover:text-[#F95D0A] transition-colors">Free Tools</Link>
               <Link href="/local" className="text-sm font-medium text-white hover:text-[#F95D0A] transition-colors">Areas We Serve</Link>
             </div>
           </div>

           <div className="flex flex-col gap-5">
             <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Operational</h4>
             <div className="flex flex-col gap-3">
               <Link href="/montreal-seo-agency" className="text-sm font-medium text-white hover:text-[#F95D0A] transition-colors">Montreal, QC</Link>
               <Link href="/vancouver-digital-agency" className="text-sm font-medium text-white hover:text-[#F95D0A] transition-colors">Vancouver, BC</Link>
             </div>
             <Link href="https://www.instagram.com/launchatdawn/" target="_blank" className="text-sm font-medium text-white/40 hover:text-[#F95D0A] transition-colors">Instagram</Link>
  <Link href="https://linkedin.com/company/launchatdawn" target="_blank" className="text-sm font-medium text-white/40 hover:text-[#F95D0A] transition-colors">LinkedIn</Link>

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