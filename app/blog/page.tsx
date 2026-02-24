"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", "Technical SEO", "Engineering", "Case Studies", "Web3", "Opinion"
  ];

  // --- UNIQUE CONTENT FOR RAJ (Solo Consultant) ---
  const featuredPost = {
    tag: "ENGINEERING",
    date: "2026.02.19",
    title: "Why Your Next.js Migration Killed Your Traffic (And How to Fix It)",
    excerpt: "Moving to a modern JavaScript framework is supposed to make your site faster. So why did your organic traffic drop 40% overnight? A deep dive into server-side rendering, hydration issues, and log file analysis.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    author: "Raj",
    readTime: "8 MIN READ"
  };

  const trendingPosts = [
    {
      tag: "OPINION",
      title: "Stop Hiring Agencies Who Can't Read Log Files",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200&auto=format&fit=crop",
    },
    {
      tag: "TECHNICAL SEO",
      title: "The ROI of Fixing Your Core Web Vitals Before Peak Season",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop",
    },
    {
      tag: "CASE STUDIES",
      title: "Handling Super Bowl Traffic Spikes in the iGaming Sector",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=200&auto=format&fit=crop",
    }
  ];

  const archivePosts = [
    {
      tag: "WEB3",
      title: "Decentralized Architecture: SEO Implications for Web3 Brands",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f4fc286?q=80&w=800&auto=format&fit=crop",
      author: "Raj",
      readTime: "6 MIN READ"
    },
    {
      tag: "ENGINEERING",
      title: "Headless CMS vs Traditional: A Performance Breakdown",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
      author: "Raj",
      readTime: "10 MIN READ"
    },
    {
      tag: "TECHNICAL SEO",
      title: "Why Backlinks Without Architecture is Wasted Budget",
      image: "https://images.unsplash.com/photo-1504384308090-c54be3852f95?q=80&w=800&auto=format&fit=crop",
      author: "Raj",
      readTime: "5 MIN READ"
    },
    {
      tag: "CASE STUDIES",
      title: "Re-engineering a Casino Platform for 100/100 Lighthouse Scores",
      image: "https://images.unsplash.com/photo-1596728345706-b25867142475?q=80&w=800&auto=format&fit=crop",
      author: "Raj",
      readTime: "12 MIN READ"
    },
    {
      tag: "ENGINEERING",
      title: "Sanity vs Contentful: Which Headless CMS Wins for SEO?",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      author: "Raj",
      readTime: "7 MIN READ"
    },
    {
      tag: "OPINION",
      title: "The Death of 'Thin Content' and the Rise of Intent Engineering",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
      author: "Raj",
      readTime: "4 MIN READ"
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 font-sans">
      
      {/* --- HERO SECTION & CATEGORY FILTER --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16 lg:mb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          
          {/* Unique Headline */}
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9]">
              Raw data. <br />
              Deep code. <br />
              <span className="text-gray-600">Real truth.</span>
            </h1>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
                  activeCategory === cat 
                    ? "bg-[#FF3300] text-black border-[#FF3300]" 
                    : "bg-transparent text-gray-400 border-gray-800 hover:border-gray-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- TOP SECTION (Featured + Trending) --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: Featured Post (8 columns) */}
          <div className="lg:col-span-8 group cursor-pointer">
            <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden mb-8 bg-[#111] border border-gray-800">
              <Image 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                fill 
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-4 text-[#FF3300] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
               {featuredPost.tag} <span className="text-gray-600">•</span> {featuredPost.date}
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-snug group-hover:text-[#FF3300] transition-colors mb-6">
              {featuredPost.title}
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
              {featuredPost.excerpt}
            </p>
          </div>

          {/* RIGHT: Trending Sidebar (4 columns) */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 border-b border-gray-800 pb-4">
              Trending in {activeCategory}
            </h3>
            <div className="flex flex-col gap-8">
              {trendingPosts.map((post, idx) => (
                <div key={idx} className="flex gap-6 group cursor-pointer items-start">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-[#111] border border-gray-800">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      sizes="96px"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                  <div>
                    <span className="text-[#FF3300] text-[9px] font-bold uppercase tracking-[0.2em] block mb-2">
                      {post.tag}
                    </span>
                    <h4 className="text-lg font-medium leading-snug group-hover:text-white text-gray-300 transition-colors">
                      {post.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- ARCHIVE GRID --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 border-b border-gray-800 pb-4">
          All Archive
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {archivePosts.map((post, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col h-full">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-[#111] border border-gray-800">
                 {/* Floating Tag */}
                 <div className="absolute top-4 left-4 bg-[#FF3300] text-black px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] z-10 shadow-lg">
                   {post.tag}
                 </div>
                 <Image 
                   src={post.image} 
                   alt={post.title} 
                   fill 
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                 />
              </div>
              
              <div className="flex items-center gap-3 text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-4">
                 <span className="w-5 h-5 rounded-full bg-gray-800 relative overflow-hidden border border-gray-700">
                    <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} fill alt={post.author}/>
                 </span>
                 {post.author} <span className="w-1 h-1 bg-gray-700 rounded-full" /> {post.readTime}
              </div>
              
              <h3 className="text-2xl font-medium leading-snug group-hover:text-[#FF3300] transition-colors mt-auto">
                {post.title}
              </h3>
            </div>
          ))}
        </div>

        {/* --- PAGINATION --- */}
        <div className="flex justify-center items-center gap-3 mt-24 border-t border-gray-800 pt-16">
           <button className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-white transition-all">
             ←
           </button>
           <button className="w-10 h-10 rounded-full bg-[#FF3300] text-black font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(255,51,0,0.4)]">
             1
           </button>
           <button className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all text-sm font-medium">
             2
           </button>
           <button className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all text-sm font-medium">
             3
           </button>
           <span className="text-gray-600 px-2">...</span>
           <button className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-white transition-all">
             →
           </button>
        </div>

      </div>

    </main>
  );
}