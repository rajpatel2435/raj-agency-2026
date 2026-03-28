"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// --- REUSABLE COMPONENTS ---

const ArrowUpRight = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="square" 
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);

const ServiceRow = ({ id, title, desc, tags, slug }: any) => (
  <div className="group border-b border-white/5 py-16 md:py-24 hover:bg-white/[0.02] transition-colors relative z-10">
    <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-1 font-mono text-[#F95D0A] text-sm font-bold opacity-50">{id}</div>
      <div className="lg:col-span-7">
        <h2 className="text-[clamp(2.2rem,6vw,5rem)] font-black uppercase tracking-tighter leading-[0.9] mb-6 group-hover:italic transition-all duration-500">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-zinc-500 max-w-xl mb-8 leading-snug font-medium">
          {desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-widest text-white/40 group-hover:border-[#F95D0A]/30 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="lg:col-span-4 flex lg:justify-end items-center h-full">
        <Link 
          href={`/services/${slug}`} 
          className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#F95D0A] group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(249,93,10,0)] group-hover:shadow-[0_0_30px_rgba(249,93,10,0.3)]"
        >
          <ArrowUpRight />
        </Link>
      </div>
    </div>
  </div>
);

export default function ServicesHub() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  const packageItems = [
    { title: "Dedicated Strategy Lead", img: "/services/lead.png", desc: "A human expert assigned to bridge your business and our engine." },
    { title: "Everything is Data Backed", img: "/services/inn.png", desc: "Zero speculation. Every decision is hard-coded into performance metrics." },
    { title: "Innovation Budget", img: "/services/budget.png", desc: "We test new tech to keep your brand ahead of the competition." },
    { title: "Full System Training", img: "/services/fst.png", desc: "We don't keep the keys. We teach your team how to drive the machine." }
  ];

  const doublePackageItems = [...packageItems, ...packageItems];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#F95D0A] selection:text-black overflow-x-hidden relative">
      
      {/* --- REVENUE ENGINE BACKGROUND --- */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23F95D0A' stroke-width='1'%3E%3Cpath d='M0 58.59V0h1.41v58.59H60v1.41H0v-1.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />
      
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="fixed left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F95D0A]/40 to-transparent z-0 pointer-events-none"
      />

      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#F95D0A]/5 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* --- CONTENT --- */}
      <header className="pt-48 pb-20 px-6 border-b border-white/5 relative z-10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-[1px] bg-[#F95D0A]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#F95D0A]">Core Capabilities</span>
          </div>
          <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-black uppercase leading-[0.8] tracking-tighter mb-10">
            OUR <br /> <span className="text-[#F95D0A] italic">SERVICES</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 max-w-2xl leading-tight font-medium border-l-2 border-[#F95D0A] pl-8">
            We bridge the gap between people seeing your brand and people booking your tables through technical dominance.
          </p>
        </div>
      </header>

      <section className="bg-black/40 relative z-10">
        <ServiceRow id="01" slug="strategy" title="Search & Growth Strategy" desc="We identify exactly where your customers are searching and build a technical roadmap to capture them before your competitors do." tags={["Revenue Audits", "Market Intelligence", "Competitor Gaps"]} />
        <ServiceRow id="02" slug="seo" title="Onsite SEO & Experience" desc="Building a digital foundation that Google loves and customers find easy to use. No lag. No friction. Just reservations." tags={["Technical SEO", "Speed Optimization", "Content Structure"]} />
        <ServiceRow id="03" slug="pr" title="Digital PR & Social" desc="We put your brand IN the conversation, not just ON the screen. We earn high-quality mentions that drive authority and trust." tags={["Link Building", "Viral Strategy", "Social Discovery"]} />
        <ServiceRow id="04" slug="data" title="Data & Insights" desc="We track every dollar spent. Our reporting shows you exactly how your digital presence is turning into real-world revenue." tags={["ROI Tracking", "Live Dashboards", "AI Analytics"]} />
      </section>

      {/* --- INFINITE AUTO-SCROLLING SLIDER --- */}
      <section className="py-32 bg-[#080808]/80 border-b border-white/5 overflow-hidden relative z-10 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 mb-16">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic">Part of <br /> <span className="text-[#F95D0A]">the package</span></h2>
        </div>

        <div className="relative flex">
          <motion.div 
            className="flex gap-6 pr-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {doublePackageItems.map((item, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[450px] group">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 mb-6 shadow-2xl">
                  <Image src={item.img} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-[#F95D0A] transition-colors">{item.title}</h4>
                <p className="text-zinc-500 font-medium text-sm max-w-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- THE STORY SECTION --- */}
      <section className="py-32 px-6 relative z-10 bg-black/40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10 shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200" fill alt="The Team" className="object-cover" />
          </div>
          <div>
            <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.8] mb-10 tracking-tighter">Everything <br /> built off <br /> <span className="text-[#F95D0A]">Revenue.</span></h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed font-medium">
              Most agencies focus on clicks and vanity metrics. We realized early on that restaurant owners and clinic founders don't care about clicks—they care about customers. 
            </p>
            <Link href="/contact" className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 font-black uppercase tracking-widest text-xs hover:bg-[#F95D0A] transition-colors shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)] group">
              <span>Let's Get A Call Booked In</span>
              <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <ArrowUpRight />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-32 px-6 bg-[#080808]/80 relative z-10 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto">
           <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-20">Common <br /> <span className="text-[#F95D0A]">Questions</span></h2>
           <div className="divide-y divide-white/5">
              {[
                { q: "What does Launch at Dawn actually do?", a: "We build digital pipelines that move people from a Google search straight into your reservation book." },
                { q: "Do you work with small businesses?", a: "We work with businesses ready to scale. If you have the capacity for more customers, we have the system to find them." },
                { q: "How much does this cost?", a: "Engagements are tailored to your goals. We focus on ROI—the system should pay for itself multiple times over." }
              ].map((faq, i) => (
                <div key={i} className="py-10 group cursor-pointer">
                  <div className="flex justify-between items-center group-hover:text-[#F95D0A] transition-colors">
                    <h4 className="text-xl md:text-3xl font-black uppercase">{faq.q}</h4>
                    <span className="text-3xl group-hover:rotate-45 transition-transform">+</span>
                  </div>
                  <p className="mt-6 text-zinc-500 max-w-2xl font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {faq.a}
                  </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-40 px-6 bg-[#F95D0A] text-black text-center relative overflow-hidden z-10">
        <motion.div 
           animate={{ x: [0, -1000] }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute top-0 whitespace-nowrap opacity-10 font-black text-[25vh] leading-none pointer-events-none"
        >
          GROWTH GROWTH GROWTH GROWTH GROWTH GROWTH
        </motion.div>
        <div className="relative z-10">
          <h2 className="text-[clamp(3rem,12vw,10rem)] font-black uppercase leading-[0.8] mb-12 tracking-tighter italic">CHASING <br /> CONSUMERS.</h2>
          <Link href="/contact" className="inline-block bg-black text-white px-12 py-6 md:px-20 md:py-10 font-black uppercase tracking-widest text-sm md:text-xl hover:bg-white hover:text-black transition-all shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
            Book My Revenue Audit
          </Link>
        </div>
      </section>

    </main>
  );
}