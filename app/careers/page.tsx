"use client";

import { useState } from "react";
import Link from "next/link";

export default function CareersPage() {
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
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-6 md:px-12 w-full selection:bg-[#F95D0A] selection:text-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Left Side - Recruitment Context */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <Link href="/contact" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-[#F95D0A] transition-colors mb-12 inline-block">
              ← Back to options
            </Link>
            <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter mb-8 leading-[0.8] uppercase italic">
              Join <br/> <span className="text-[#F95D0A] not-italic text-6xl md:text-[7rem]">The Squad.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-md leading-tight">
              We don't hire "staff." We hire engineers, growth hackers, and visionaries ready to dominate the MTL & YVR markets.
            </p>
          </div>
        </div>

        {/* Right Side - Recruitment Form */}
        <div className="w-full md:w-1/2">
          
          {status === "success" ? (
             <div className="h-full flex flex-col justify-center items-start border border-[#F95D0A] p-12 bg-[#080808]">
                <h3 className="text-4xl font-black tracking-tighter text-[#F95D0A] mb-4 uppercase italic">Application Logged.</h3>
                <p className="text-xl font-medium text-zinc-400">Your profile has been ingested into our talent engine. If there's a match, we'll transmit a meeting request.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-12 text-xl md:text-2xl font-light">
              
              {/* 01. Name */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 text-left">01. Full Name</label>
                <input 
                  type="text" 
                  name="Applicant Name"
                  required
                  placeholder="Your Name *"
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-800 text-white font-medium uppercase"
                />
              </div>

              {/* 02. Role Selection */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 text-left">02. Desired Position</label>
                <select 
                  name="Position"
                  required
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors text-white appearance-none cursor-pointer font-medium uppercase"
                >
                  <option value="" className="bg-[#050505]">Select Role...</option>
                  <option value="SEO-ENGINEER" className="bg-[#050505]">SEO Engineer</option>
                  <option value="STRATEGY-LEAD" className="bg-[#050505]">Strategy Lead</option>
                  <option value="WEB-DEVELOPER" className="bg-[#050505]">Web Developer</option>
                  <option value="CREATIVE-DIRECTOR" className="bg-[#050505]">Creative Director</option>
                </select>
              </div>

              {/* 03. Links */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 text-left">03. Portfolio / LinkedIn Link</label>
                <input 
                  type="url" 
                  name="Portfolio Link"
                  required
                  placeholder="https:// *"
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-800 text-white font-medium"
                />
              </div>

              {/* 04. Pitch */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 text-left">04. Why Launch at Dawn?</label>
                <textarea 
                  name="Cover Letter / Pitch"
                  required
                  rows={3}
                  placeholder="Tell us what you bring to the machine..."
                  className="bg-transparent border-b border-zinc-800 pb-4 focus:outline-none focus:border-[#F95D0A] transition-colors placeholder:text-zinc-800 text-white font-medium uppercase resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="mt-8 bg-[#F95D0A] text-black px-12 py-6 text-xs font-black uppercase tracking-widest hover:bg-white transition-all self-start flex items-center gap-4 group shadow-[10px_10px_0px_0px_rgba(249,93,10,0.2)]"
              >
                <span>{status === "loading" ? "Uploading..." : "Submit Application"}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
              
            </form>
          )}
        </div>
      </div>
    </main>
  );
}