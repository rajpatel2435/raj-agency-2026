"use client";

import { useState } from "react";
import Link from "next/link";

export default function HelloPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    // Grab the form data
    const formData = new FormData(e.currentTarget);
    
    // --- THIS IS WHERE YOUR KEY GOES ---
    formData.append("access_key", process.env.NEXT_FORM_KEY || ""); 

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        e.currentTarget.reset(); // Clear the form after sending
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-6 md:px-12 w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Left Side - Big Text & Back Button */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <Link href="/contact" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-12 inline-block">
              ← Back to options
            </Link>
            <h1 className="text-6xl md:text-9xl font-medium tracking-tighter mb-8 leading-[0.9]">
              Let's <br/> Talk.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-md">
              Ready to scale your organic revenue? Drop your details below and our team will get back to you within 24 hours.
            </p>
          </div>
        </div>

        {/* Right Side - Functional Premium Form */}
        <div className="w-full md:w-1/2">
          
          {status === "success" ? (
             <div className="h-full flex flex-col justify-center items-start border border-[#A855F7] rounded-3xl p-12 bg-[#111]">
                <h3 className="text-4xl font-medium tracking-tighter text-[#A855F7] mb-4">Message Sent.</h3>
                <p className="text-xl font-light text-gray-400">We have received your brief and will be in touch shortly to discuss the roadmap.</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-12 text-xl md:text-2xl font-light">
              
              {/* Note: The 'name' attributes are what show up in your email! */}
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-gray-500">01. What's your name?</label>
                <input 
                  type="text" 
                  id="name" 
                  name="Client Name"
                  required
                  placeholder="John Doe *"
                  className="bg-transparent border-b border-gray-800 pb-4 focus:outline-none focus:border-[#A855F7] transition-colors placeholder:text-gray-700"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-gray-500">02. What's your email?</label>
                <input 
                  type="email" 
                  id="email" 
                  name="Client Email"
                  required
                  placeholder="john@company.com *"
                  className="bg-transparent border-b border-gray-800 pb-4 focus:outline-none focus:border-[#A855F7] transition-colors placeholder:text-gray-700"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="budget" className="text-sm font-bold uppercase tracking-widest text-gray-500">03. Estimated Budget?</label>
                <select 
                  id="budget" 
                  name="Estimated Budget"
                  required
                  className="bg-transparent border-b border-gray-800 pb-4 focus:outline-none focus:border-[#A855F7] transition-colors text-gray-300 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#050505]">Select a range...</option>
                  <option value="10k-50k" className="bg-[#050505]">$500 - $1000</option>
                  <option value="50k-100k" className="bg-[#050505]">$1000 - $3000</option>
                  <option value="100k+" className="bg-[#050505]">$3000 - $5000</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-gray-500">04. Tell us about your project</label>
                <textarea 
                  id="message" 
                  name="Project Details"
                  required
                  rows={3}
                  placeholder="We need to dominate the search results for..."
                  className="bg-transparent border-b border-gray-800 pb-4 focus:outline-none focus:border-[#A855F7] transition-colors placeholder:text-gray-700 resize-none"
                ></textarea>
              </div>

              {/* Status Messages */}
              {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="mt-8 bg-[#A855F7] text-black rounded-full px-12 py-6 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors self-start disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Send Request ↗"}
              </button>
              
            </form>
          )}
        </div>

      </div>
    </main>
  );
}