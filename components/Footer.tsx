"use client";

import Link from "next/link";
import Image from "next/image"; // CRITICAL: This was likely missing and causing a crash!

// --- CUSTOM SVG ICONS ---
const ArrowUpRight = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const SocialPill = ({ label, href }: { label: string, href: string }) => (
  <Link 
    href={href}
    target="_blank"
    className="border border-gray-800 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:border-[#F95D0A] hover:text-[#F95D0A] transition-colors flex items-center gap-2 group"
  >
    {label} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
  </Link>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-white pt-24 md:pt-32 border-t border-gray-900 overflow-hidden font-sans selection:bg-[#F95D0A] selection:text-black">
      
      {/* --- TOP SECTION: NEWSLETTER & LINKS --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 md:mb-32">
        
        {/* Left: Newsletter & Socials */}
        <div className="w-full lg:w-1/2 max-w-lg">
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-8">
            Stay updated with launchatdawn news
          </h3>
          
          <div className="relative flex items-center mb-8">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full bg-transparent border border-gray-800 rounded-full pl-6 pr-16 py-4 text-white text-sm focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-gray-600"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#F95D0A] rounded-full flex items-center justify-center text-black hover:bg-white transition-colors group">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <SocialPill label="Twitter / X" href="#" />
            <SocialPill label="LinkedIn" href="#" />
            <SocialPill label="Instagram" href="#" />
            <SocialPill label="TikTok" href="#" />
          </div>
        </div>

        {/* Right: Site Architecture Links */}
        <div className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
           <div className="flex flex-col gap-4">
             <Link href="/services" className="text-gray-400 hover:text-[#F95D0A] transition-colors text-sm font-light">Services</Link>
             <Link href="/work" className="text-gray-400 hover:text-[#F95D0A] transition-colors text-sm font-light">Work</Link>
             <Link href="/about" className="text-gray-400 hover:text-[#F95D0A] transition-colors text-sm font-light">About</Link>
             <Link href="/contact" className="text-gray-400 hover:text-[#F95D0A] transition-colors text-sm font-light">Contact</Link>
           </div>
           <div className="flex flex-col gap-4">
             <Link href="/blog" className="text-gray-400 hover:text-[#F95D0A] transition-colors text-sm font-light">Blog / Insights</Link>
             <Link href="/about#testimonials" className="text-gray-400 hover:text-[#F95D0A] transition-colors text-sm font-light">Testimonials</Link>
           </div>
           <div className="flex flex-col gap-4">
             <span className="text-white text-sm font-light">Montreal</span>
             <span className="text-gray-600 text-sm font-light">Vancouver</span>
           </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: THE KINETIC LOGO --- */}
      <div className="w-full border-t border-gray-900 pt-12 md:pt-20 text-center pb-6 md:pb-8 group cursor-default select-none overflow-hidden">
        
        {/* Using inline-flex for the pill so it behaves exactly like a text character */}
        <h2 className="text-[12vw] font-black tracking-tighter leading-[0.75] whitespace-nowrap">
          <span className="text-white">launch</span>
          
          {/* THE ANIMATED IMAGE PILL */}
          <span className="relative inline-flex items-center justify-center w-[14vw] h-[9vw] mx-[0.5vw] rounded-full overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-[35vw] border border-gray-800 align-middle bg-[#111]">
             
             {/* Background Image */}
             <Image 
               src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop" 
               alt="Core Architecture" 
               fill 
               className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
             />
             
             {/* Orange Tint (Disappears on hover) */}
             <div className="absolute inset-0 bg-[#F95D0A] mix-blend-overlay opacity-50 group-hover:opacity-0 transition-opacity duration-700" />
             <div className="absolute inset-0 bg-black/40" />

             {/* Text inside the pill */}
             <span className="relative z-10 text-white translate-y-[2%]">at</span>
          </span>

          <span className="text-[#F95D0A]">dawn</span>
        </h2>

      </div>

    </footer>
  );
}