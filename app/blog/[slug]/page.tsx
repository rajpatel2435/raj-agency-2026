"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// --- DUMMY DATA (Replace with sanity fetch later) ---
const post = {
  title: "The Agency Model Is Resetting - why I am hiring more client side leaders",
  publishedAt: "2026-02-14",
  author: "Carrie Rose",
  image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600&auto=format&fit=crop",
  body: null 
};

const relatedPosts = [
  { _id: "1", title: "Trend Report: The future of Digital PR", slug: "#", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
  { _id: "2", title: "How to dominate organic search results", slug: "#", image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=800&auto=format&fit=crop" },
  { _id: "3", title: "Why your 'Technical SEO' audit is worthless", slug: "#", image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop" },
];
// ----------------------------------------------------

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // 1. Get the real URL once the page loads in the browser
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 2. Construct the Sharing Links
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 w-full relative">
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row relative z-10 px-6 md:px-12 gap-12">

        {/* --- LEFT: FUNCTIONAL STICKY SHARING BAR --- */}
        <aside className="hidden lg:flex flex-col gap-6 sticky top-48 h-fit w-24 shrink-0">
           <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>
             Share Article
           </p>
           
           {/* LINKEDIN (Now an <a> tag) */}
           <a 
             href={linkedinShare}
             target="_blank"
             rel="noopener noreferrer"
             className="w-12 h-12 bg-[#111] border border-gray-700 text-white flex items-center justify-center transition-all hover:bg-[#FF3300] hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] shadow-[4px_4px_0px_0px_#333] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
           >
             <span className="font-bold text-lg">in</span>
           </a>

           {/* X / TWITTER (Now an <a> tag) */}
           <a 
             href={twitterShare}
             target="_blank"
             rel="noopener noreferrer"
             className="w-12 h-12 bg-[#111] border border-gray-700 text-white flex items-center justify-center transition-all hover:bg-[#FF3300] hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] shadow-[4px_4px_0px_0px_#333] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
           >
             <span className="font-bold text-lg">𝕏</span>
           </a>

           {/* COPY LINK (Stays a button) */}
           <button 
             onClick={handleCopy}
             className="w-12 h-12 bg-[#111] border border-gray-700 text-white flex items-center justify-center transition-all hover:bg-[#FF3300] hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] shadow-[4px_4px_0px_0px_#333] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] relative group"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
             
             {/* Tooltip */}
             {copied && (
               <span className="absolute left-14 bg-[#FF3300] text-black text-xs font-bold px-2 py-1 uppercase tracking-widest whitespace-nowrap">
                 Copied!
               </span>
             )}
           </button>
        </aside>

        {/* --- CENTER: ARTICLE CONTENT --- */}
        <article className="max-w-[900px] w-full">
          
          <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-8">
            <div className="w-12 h-12 bg-[#FF3300] border-2 border-white shadow-[4px_4px_0px_0px_#333] relative overflow-hidden">
               <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="Author" fill />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#FF3300]">
                {post.author || "Agency Team"}
              </p>
              <p className="text-xs text-gray-500 font-mono mt-1">
                {new Date(post.publishedAt).toLocaleDateString()} • 5 min read
              </p>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.05] mb-12">
            {post.title}
          </h1>

          <div className="relative w-full aspect-video mb-16 border-2 border-[#222] shadow-[12px_12px_0px_0px_#111]">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          <div className="max-w-3xl">
              <div className="space-y-8 text-lg md:text-xl font-light text-gray-300 leading-relaxed">
                <p>
                  The digital landscape is shifting beneath our feet. The strategies that built empires in 2024 are the same ones crumbling them in 2026. We are seeing a fundamental reset in how brands approach organic discovery.
                </p>
                <h2 className="text-3xl md:text-5xl font-medium mt-16 mb-6 leading-tight text-white">
                  1. The Death of Generic Content
                </h2>
                <p>
                  Google's latest core updates have made one thing clear: <strong className="text-white font-medium">Mediocrity is being de-indexed.</strong> If your content strategy relies on high-volume, low-value programmatic pages, you are already dead. You just don't know it yet.
                </p>
                <blockquote className="border-l-4 border-[#FF3300] pl-6 italic text-2xl text-white my-12 bg-[#111] p-8 shadow-[8px_8px_0px_0px_#222]">
                  "We don't chase algorithms. We chase human behavior. Algorithms eventually catch up."
                </blockquote>
                <h3 className="text-2xl md:text-3xl font-medium mt-12 mb-4 text-[#FF3300]">
                  Key Takeaways for CMOs:
                </h3>
                <ul className="list-disc pl-6 space-y-4 marker:text-[#FF3300]">
                  <li>Shift budget from "maintenance" SEO to "growth" Digital PR.</li>
                  <li>Stop auditing technical debt and start building brand authority.</li>
                  <li>Own your category, don't just participate in it.</li>
                </ul>
              </div>
          </div>
        </article>
      </div>

      {/* --- BOTTOM: "YOU MAY ALSO LIKE" --- */}
      <section className="mt-32 border-t border-gray-800 bg-[#080808] py-24 px-6 md:px-12 w-full">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-12 h-12 relative text-[#FF3300]">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="M3.27 6.96 12 12.01l8.73-5.05"></path><path d="M12 22.08V12"></path></svg>
            </div>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tighter">Dive Deeper.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related: any) => (
              <Link href={`/blog/${related.slug}`} key={related._id} className="group cursor-pointer">
                <div className="relative w-full aspect-[4/3] mb-6 border-2 border-[#222] shadow-[8px_8px_0px_0px_#111] transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[12px_12px_0px_0px_#FF3300] bg-[#111]">
                  <Image src={related.image} alt={related.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xl font-medium tracking-tight group-hover:text-[#FF3300] transition-colors leading-snug">{related.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}