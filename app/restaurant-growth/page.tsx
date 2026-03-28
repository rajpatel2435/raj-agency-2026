"use client";

import { useEffect, useRef, useState } from "react";

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-2 h-2 bg-[#F95D0A] rounded-full animate-pulse" />
    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#F95D0A]">{text}</span>
  </div>
);

export default function RestaurantEnginePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => console.log("Video waiting..."));
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      restaurantName: formData.get('restaurantName'),
      name: formData.get('name'),
      email: formData.get('email'),
      formType: 'restaurant_growth'
    };

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) setSubmitted(true);
    } catch (e) { console.error(e); }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#F95D0A] selection:text-black font-sans overflow-x-hidden">
      
      {/* --- 1. HERO: CLEAR VALUE --- */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-12 border-b border-white/5">
        <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className={`lg:col-span-7 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <SectionLabel text="For Restaurant Owners" />
            <h1 className="text-[10vw] lg:text-[7vw] font-black tracking-[-0.05em] leading-[0.9] uppercase mb-8">
              MORE DINERS. <br /> <span className="text-[#F95D0A]">LESS STRESS.</span> <br /> EVERY NIGHT.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-xl leading-snug mb-10 font-medium">
              We handle the digital side so you can focus on the kitchen. No "marketing fluff"—just a system that fills your empty tables.
            </p>
            <a href="#get-started" className="inline-block bg-[#F95D0A] text-black font-black uppercase tracking-widest px-10 py-5 text-sm hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(249,93,10,0.3)]">
              See How We Grow Your Sales
            </a>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] border border-white/10 bg-[#080808] p-8 overflow-hidden">
              <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale">
                <source src="/videos/culinary-engine-loop.mp4" type="video/mp4" />
              </video>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="bg-black/80 border border-white/10 p-4 font-mono text-[10px] text-[#F95D0A]">
                  {'>'} ANALYZING MONTREAL DINING TRENDS...
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 border-l-2 border-[#F95D0A]">
                    <p className="text-[10px] font-mono text-white/40 uppercase mb-1">Your Growth Goal</p>
                    <p className="text-2xl font-black uppercase tracking-tighter">40% More Tuesday Covers</p>
                  </div>
                  <div className="bg-[#F95D0A] text-black p-4 font-black uppercase text-center text-xs tracking-widest">
                    SYSTEM STATUS: ACTIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. SIMPLE 3-STEP PROCESS --- */}
      <section className="py-24 px-6 bg-[#080808] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto text-center mb-20">
          <SectionLabel text="The Simple Path to Success" />
          <h2 className="text-4xl md:text-6xl font-black uppercase">How it works for you</h2>
        </div>
        
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Targeted Hunger", desc: "We show your most delicious dishes to locals right when they're deciding where to eat." },
            { step: "02", title: "Instant Booking", desc: "We make it impossible for them to miss your 'Reserve' button. No friction, just confirmed diners." },
            { step: "03", title: "Scale Revenue", desc: "Watch your slow nights disappear as our system automatically fills the gaps in your floor plan." }
          ].map((item, i) => (
            <div key={i} className="border border-white/5 p-10 bg-[#111] hover:border-[#F95D0A] transition-all group">
              <span className="text-[#F95D0A] font-black text-4xl mb-6 block italic">{item.step}</span>
              <h3 className="text-2xl font-black uppercase mb-4">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. THE "WHY US" SECTION --- */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-black uppercase text-[#F95D0A] mb-4">You're a Chef, Not a Coder.</h3>
              <p className="text-zinc-400 text-lg">We don't send you spreadsheets full of numbers. We send you customers. You'll see the results exactly where it matters: in a busy dining room.</p>
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase text-[#F95D0A] mb-4">No Long-Term Traps.</h3>
              <p className="text-zinc-400 text-lg">Our work speaks for itself. We grow your revenue month-over-month, or we haven't done our job. Simple.</p>
            </div>
          </div>
          <div className="bg-[#111] border border-white/10 p-12">
            <blockquote className="text-2xl italic font-medium leading-relaxed mb-8 text-zinc-300">
              "The best marketing decision we made. We went from half-empty Tuesdays to a full house every single week."
            </blockquote>
            <p className="font-bold uppercase tracking-widest text-sm">— Owner, Local Grill House</p>
          </div>
        </div>
      </section>

      {/* --- 4. THE CONVERSION FORM (STAYS THE SAME) --- */}
      <section id="get-started" className="py-32 px-6 bg-[#F95D0A]">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.8] mb-12">Ready for a <br /> Full House?</h2>
          <div className="bg-black p-10 text-left shadow-[20px_20px_0px_0px_rgba(0,0,0,0.2)]">
            {submitted ? (
              <div className="text-center py-12 text-white font-black uppercase italic text-3xl">We'll contact you in 24 hours.</div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="restaurantName" required placeholder="RESTAURANT NAME" className="bg-white/5 border border-white/10 p-5 text-white uppercase font-mono text-xs focus:border-[#F95D0A] outline-none" />
                <input type="text" name="name" required placeholder="YOUR NAME" className="bg-white/5 border border-white/10 p-5 text-white uppercase font-mono text-xs focus:border-[#F95D0A] outline-none" />
                <input type="email" name="email" required placeholder="EMAIL ADDRESS" className="bg-white/5 border border-white/10 p-5 text-white uppercase font-mono text-xs focus:border-[#F95D0A] outline-none md:col-span-2" />
                <button type="submit" className="bg-[#F95D0A] text-black font-black uppercase tracking-widest text-xs p-5 hover:bg-white transition-all md:col-span-2">Get My Growth Plan</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}