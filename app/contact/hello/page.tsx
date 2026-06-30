"use client";

import { useState } from "react";
import Link from "next/link";

export default function HelloPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_FORM_KEY || ""); 

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-6 md:px-12 w-full selection:bg-[#F95D0A] selection:text-black font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Left Side - Big Text & Back Button */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <Link href="/contact" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-[#F95D0A] transition-colors mb-12 inline-block">
              ← Back to options
            </Link>
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8] uppercase italic">
              Book Your <br/> <span className="text-[#F95D0A] not-italic">Growth Call.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-md leading-tight">
              Share your goals in 2 minutes. We will reply within 24 hours with the next best step for leads and revenue growth.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="text-[10px] uppercase tracking-[0.2em] border border-zinc-700 px-4 py-2 hover:border-[#F95D0A] transition-colors">
                View Packages
              </Link>
              <Link href="mailto:hello@launchatdawn.com" className="text-[10px] uppercase tracking-[0.2em] border border-zinc-700 px-4 py-2 hover:border-[#F95D0A] transition-colors">
                Email Direct
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Functional Premium Form */}
        <div className="w-full md:w-1/2">
          
          {status === "success" ? (
             <div className="h-full flex flex-col justify-center items-start border border-[#F95D0A] p-12 bg-[#080808]">
                <h3 className="text-4xl font-black tracking-tighter text-[#F95D0A] mb-4 uppercase italic">Transmission Received.</h3>
                <p className="text-xl font-medium text-zinc-400">We have received your brief. A technical strategist will contact you shortly to discuss the roadmap.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-12 text-xl md:text-2xl font-light">
              
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">01. What's your name?</label>
                <input 
                  type="text" 
                  id="name" 
                  name="Client Name"
                  required
                  placeholder="John Doe *"
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-800 text-white font-medium uppercase"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">02. What's your email?</label>
                <input 
                  type="email" 
                  id="email" 
                  name="Client Email"
                  required
                  placeholder="john@company.com *"
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-800 text-white font-medium uppercase"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="website" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">03. Website URL</label>
                <input
                  type="url"
                  id="website"
                  name="Website"
                  placeholder="https://yourdomain.com"
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-800 text-white font-medium"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="budget" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">04. Estimated Monthly Budget?</label>
                <select 
                  id="budget" 
                  name="Estimated Budget"
                  required
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors text-white appearance-none cursor-pointer font-medium uppercase"
                >
                  <option value="" className="bg-[#050505]">Select a range...</option>
                  <option value="500-1000" className="bg-[#050505]">$500 - $1000</option>
                  <option value="1000-3000" className="bg-[#050505]">$1000 - $3000</option>
                  <option value="3000-5000" className="bg-[#050505]">$3000 - $5000</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="timeline" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">05. Ideal Timeline</label>
                <select
                  id="timeline"
                  name="Timeline"
                  required
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors text-white appearance-none cursor-pointer font-medium uppercase"
                >
                  <option value="" className="bg-[#050505]">Select timeline...</option>
                  <option value="ASAP" className="bg-[#050505]">ASAP</option>
                  <option value="2-4 weeks" className="bg-[#050505]">2-4 Weeks</option>
                  <option value="1-2 months" className="bg-[#050505]">1-2 Months</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">06. What result do you want most?</label>
                <textarea 
                  id="message" 
                  name="Project Details"
                  required
                  rows={3}
                  placeholder="We need to dominate the search results for..."
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-800 text-white font-medium uppercase resize-none"
                ></textarea>
              </div>

  {/* Status Messages */}
{status === "error" && (
  <p className="text-[#F95D0A] text-[10px] font-black uppercase tracking-widest animate-pulse">
    !! System Error. Request Failed.
  </p>
)}

<button 
  type="submit" 
  disabled={status === "loading"}
  className="mt-8 bg-[#F95D0A] text-black px-12 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all self-start disabled:opacity-50 disabled:cursor-not-allowed shadow-[8px_8px_0px_0px_rgba(249,93,10,0.2)] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-4 group"
>
  <span>{status === "loading" ? "Processing..." : "Book My 20-min Growth Call"}</span>
  
  {/* Custom SVG Arrow - Replaces the blue emoji */}
  {status !== "loading" && (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="square" 
      strokeLinejoin="round" 
      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  )}
</button>
              
            </form>
          )}
        </div>

      </div>
    </main>
  );
}