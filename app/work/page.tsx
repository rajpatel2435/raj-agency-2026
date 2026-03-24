import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";

// Force fresh data on every load
export const dynamic = "force-dynamic";

// --- CUSTOM TECH ARROW ---
const ArrowUpRight = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default async function WorkPage({ searchParams }: { searchParams: { category?: string } }) {
  
  // 1. FILTER LOGIC
  const currentCategory = searchParams?.category || "All";
  const filter = currentCategory === "All" ? '' : `&& category == "${currentCategory}"`;

  // 2. SANITY QUERY
  const query = `*[_type == "work" ${filter}] | order(_createdAt desc) {
    _id,
    title,
    client,
    category,
    "slug": slug.current,
    "image": mainImage.asset->url
  }`;

  let projects = await client.fetch(query);

  // 3. DUMMY DATA (Updated to match your technical/infrastructure brand)
  if (!projects || projects.length === 0) {
    projects = [
      {
        _id: "1",
        client: "PointSpreads",
        category: "GAMBLING",
        title: "Traffic Architecture",
        slug: "pointspreads",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "2",
        client: "BetUS",
        category: "IGAMING",
        title: "Next.js Migration",
        slug: "betus",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "3",
        client: "Global Fintech",
        category: "FINANCE",
        title: "Headless CMS Build",
        slug: "global-fintech",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "4",
        client: "Crypto Exchange",
        category: "WEB3",
        title: "Algorithmic Authority",
        slug: "crypto",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f4fc286?q=80&w=1200&auto=format&fit=crop"
      }
    ];
  }

  // Categories for the filter pills
  const categories = ['All', 'GAMBLING', 'IGAMING', 'FINANCE', 'WEB3', 'SAAS'];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-6 md:px-12 w-full font-sans selection:bg-[#FF3300] selection:text-black">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-[1600px] mx-auto mb-20 flex flex-col xl:flex-row justify-between items-end gap-12 border-b border-gray-900 pb-16">
        
        {/* The Massive Headline */}
        <div className="w-full xl:w-[60%]">
          <span className="text-[#FF3300] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">
            Proof of Concept
          </span>
          <h1 className="text-[4rem] sm:text-[5rem] md:text-[7rem] font-medium tracking-tighter leading-[0.9] mb-8">
            Architectures <br/>
            We <span className="inline-block w-[100px] h-[60px] md:w-[150px] md:h-[90px] relative rounded-2xl md:rounded-[2rem] overflow-hidden align-middle mx-3 md:mx-4 border border-gray-700 shadow-[0_0_30px_rgba(255,51,0,0.15)] -translate-y-2 md:-translate-y-4">
              <Image 
                src="https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=400&q=80" 
                alt="Codebase" 
                fill 
                className="object-cover grayscale" 
              />
              <div className="absolute inset-0 bg-[#FF3300]/20 mix-blend-overlay" />
            </span> Scaled.
          </h1>
        </div>

        {/* The Descriptive Text */}
        <div className="w-full xl:w-[35%] text-gray-400 text-lg font-light leading-relaxed mb-4">
          <p>
            Enterprise brands come to me when traditional marketing fails. I engineer the underlying <strong className="text-white font-medium">codebases</strong> and <strong className="text-white font-medium">search architectures</strong> that force algorithms to pay attention and capture massive organic market share.
          </p>
        </div>
      </div>

      {/* --- FILTER BAR (Pills) --- */}
      <div className="max-w-[1600px] mx-auto mb-12 overflow-x-auto no-scrollbar pb-4">
         <div className="flex gap-3">
            {categories.map((cat) => (
              <Link 
                key={cat} 
                href={cat === 'All' ? '/work' : `/work?category=${cat}`}
                className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border transition-all whitespace-nowrap ${
                  currentCategory === cat 
                    ? "bg-[#FF3300] border-[#FF3300] text-black shadow-[0_0_20px_rgba(255,51,0,0.3)]" 
                    : "bg-[#0a0a0a] border-gray-800 text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
              >
                {cat}
              </Link>
            ))}
         </div>
      </div>

      {/* --- THE ENGINEERED WORK GRID --- */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project: any) => (
          <Link href={`/work/${project.slug}`} key={project._id} className="group relative block w-full aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-gray-800">
            
            {/* The Image */}
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100" 
            />
            
            {/* The Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent pointer-events-none" />

            {/* Top Right: Pure CSS Kinetic Double Arrow */}
            <div className="absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center overflow-hidden z-20 transition-all duration-500">
               {/* Faint Base Ring */}
               <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-[#FF3300] transition-colors duration-500" />
               {/* Expanding Orange Core */}
               <div className="absolute inset-0 rounded-full bg-[#FF3300] scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
               
               {/* The Magic Arrows Box */}
               <div className="relative w-5 h-5 overflow-hidden text-white z-10">
                  <ArrowUpRight className="absolute inset-0 w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-hover:-translate-y-full" />
                  <ArrowUpRight className="absolute inset-0 w-5 h-5 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 text-black" />
               </div>
            </div>

            {/* Bottom Left: Tactical Details */}
            <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
              <span className="bg-black/50 backdrop-blur-md border border-gray-700 text-white px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block w-fit group-hover:border-[#FF3300]/50 transition-colors duration-500">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white group-hover:text-[#FF3300] transition-colors duration-500">
                {project.client}
              </h2>
            </div>

          </Link>
        ))}
      </div>

    </main>
  );
}