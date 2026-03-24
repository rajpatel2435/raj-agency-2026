"use client";

import { motion } from "framer-motion";

// --- CUSTOM TECH ICONS ---
const TargetIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="4"></circle>
    <line x1="12" y1="2" x2="12" y2="4"></line>
    <line x1="12" y1="20" x2="12" y2="22"></line>
    <line x1="20" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="12" x2="4" y2="12"></line>
  </svg>
);

const DatabaseIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const TerminalIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className={className}>
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

// --- DIRECTIVES DATA ---
const directives = [
  {
    id: "SYS.01",
    title: "Built for Scale.",
    desc: "We bypass vanity metrics entirely. We engineer aggressive, disruptive digital infrastructures designed to break your competitors' rankings and scale your revenue.",
    icon: TargetIcon,
    bgColor: "bg-white",
    textColor: "text-black",
    iconBg: "bg-black",
    iconColor: "text-white",
    protocol: "Execution Protocol",
    stickyTop: "top-[15vh]", // The CSS trick for stacking
  },
  {
    id: "SYS.02",
    title: "Log-File Obsessed.",
    desc: "Every decision is backed by hardcore server data. We track server logs, analyze Core Web Vitals, test dynamically at the edge, and pivot faster than anyone else.",
    icon: DatabaseIcon,
    bgColor: "bg-[#FF3300]",
    textColor: "text-black",
    iconBg: "bg-black",
    iconColor: "text-[#FF3300]",
    protocol: "Data Protocol",
    stickyTop: "top-[20vh]", // Offsets so it overlaps the first card
  },
  {
    id: "SYS.03",
    title: "Execution Pioneers.",
    desc: "We don't follow trends 3 years from now; we write the code that creates the industry narrative today. Next.js, Headless CMS, and programmatic authority.",
    icon: TerminalIcon,
    bgColor: "bg-[#0a0a0a]",
    textColor: "text-white",
    iconBg: "bg-[#111]",
    iconColor: "text-[#FF3300]",
    protocol: "Innovation Protocol",
    stickyTop: "top-[25vh]", // Offsets so it overlaps the second card
    border: "border border-gray-800"
  }
];

export default function Directives() {
  return (
    <section className="w-full pt-32 pb-64 px-6 md:px-12 bg-[#020202] text-white relative font-sans border-t border-gray-900">
      
      {/* Background Tech Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 md:mb-32"
        >
          <span className="text-[#FF3300] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#FF3300] rounded-full animate-pulse" />
            Operational Directives
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9]">
            We don't do fluff. <br />
            <span className="text-gray-600">We execute code.</span>
          </h2>
        </motion.div>

        {/* --- STICKY STACKING CARDS CONTAINER --- */}
        {/* By adding gap-y and pb, we give the user room to scroll so the cards can stick */}
        <div className="flex flex-col gap-y-12 md:gap-y-24 relative w-full">
          
          {directives.map((dir, idx) => {
            const Icon = dir.icon;
            
            return (
              <motion.div
                key={dir.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                // The magic happens here: sticky positioning + dynamic top offset
                className={`sticky ${dir.stickyTop} w-full ${dir.bgColor} ${dir.textColor} ${dir.border || ''} rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden`}
              >
                
                {/* Optional Tech Pattern for the Orange Card */}
                {dir.bgColor === "bg-[#FF3300]" && (
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                )}

                {/* Card Header (Icon & Tag) */}
                <div className="flex justify-between items-start mb-16 relative z-10">
                   <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${dir.iconBg} ${dir.iconColor} flex items-center justify-center shadow-lg border border-white/5`}>
                     <Icon />
                   </div>
                   <span className={`font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold ${dir.textColor} opacity-50`}>
                     {dir.id}
                   </span>
                </div>

                {/* Card Content */}
                <div className="relative z-10 max-w-2xl">
                  <h3 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6">
                    {dir.title}
                  </h3>
                  <p className={`text-lg md:text-xl font-medium leading-relaxed mb-12 ${dir.textColor} opacity-80`}>
                    {dir.desc}
                  </p>
                </div>

                {/* Card Footer */}
                <div className={`flex items-center gap-4 pt-8 border-t border-current opacity-30 relative z-10`}>
                   <span className={`w-2 h-2 rounded-full ${dir.textColor} ${idx === 1 ? 'animate-pulse' : ''}`} />
                   <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">{dir.protocol}</span>
                </div>

              </motion.div>
            )
          })}
          
        </div>
      </div>
    </section>
  );
}