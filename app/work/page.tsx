import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/app/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies and Client Work",
  description:
    "Review SEO and growth case studies showing how Launch at Dawn drives measurable visibility and revenue outcomes.",
  pathname: "/work",
});

// --- CURATED CASE STUDIES ---
// Each entry links to a full case-study page under /work/[slug].
// This is the source of truth for the grid so the page stays professional
// and never surfaces unfinished CMS drafts.
type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  metric: string;
  image: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "altos-grill-growth",
    client: "Altos Grill",
    title: "98% Surge in Organic Traffic",
    category: "SEO",
    metric: "+98% Traffic",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "aris-dental-local",
    client: "Clinique Dr. Aris",
    title: "#1 in the Local Map Pack",
    category: "Local SEO",
    metric: "+310% Leads",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "petit-secret-social",
    client: "Le Petit Secret",
    title: "4.8M Views, Booked Out",
    category: "Social",
    metric: "4.8M Reach",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "nexus-finance-onboarding",
    client: "Nexus Finance",
    title: "140% Acquisition Velocity",
    category: "FinTech",
    metric: "+140% Signups",
    image: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "festival-cyberk-launch",
    client: "Festival Cyberk",
    title: "100% Sell-Through in 12h",
    category: "Events",
    metric: "Sold Out",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1400&auto=format&fit=crop",
  },
  {
    slug: "maison-lumiere-global",
    client: "Maison Lumière",
    title: "3.5x ROAS at Global Scale",
    category: "Luxury",
    metric: "3.5x ROAS",
    image: "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=1400&auto=format&fit=crop",
  },
];

// --- CUSTOM TECH ARROW ---
const ArrowUpRight = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const currentCategory = category || "All";

  // Build filter pills from the case-study data.
  const categories = ["All", ...Array.from(new Set(CASE_STUDIES.map((c) => c.category)))];

  const projects =
    currentCategory === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === currentCategory);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-6 md:px-12 w-full font-sans selection:bg-[#FF3300] selection:text-black">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-[1600px] mx-auto mb-20 flex flex-col xl:flex-row justify-between items-end gap-12 border-b border-gray-900 pb-16">
        
        {/* The Massive Headline */}
        <div className="w-full xl:w-[60%]">
          <span className="text-[#FF3300] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">
            Proof of Work
          </span>
          <h1 className="text-[4rem] sm:text-[5rem] md:text-[7rem] font-medium tracking-tighter leading-[0.9] mb-8">
            Results <br/>
            We <span className="inline-block w-[100px] h-[60px] md:w-[150px] md:h-[90px] relative rounded-2xl md:rounded-[2rem] overflow-hidden align-middle mx-3 md:mx-4 border border-gray-700 shadow-[0_0_30px_rgba(255,51,0,0.15)] -translate-y-2 md:-translate-y-4">
              <Image 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80" 
                alt="Analytics dashboard" 
                fill 
                className="object-cover grayscale" 
              />
              <div className="absolute inset-0 bg-[#FF3300]/20 mix-blend-overlay" />
            </span> Engineered.
          </h1>
        </div>

        {/* The Descriptive Text */}
        <div className="w-full xl:w-[35%] text-gray-400 text-lg font-light leading-relaxed mb-4">
          <p>
            Ambitious brands come to us when traditional marketing stalls. We engineer the <strong className="text-white font-medium">search architectures</strong> and <strong className="text-white font-medium">conversion systems</strong> that capture organic market share and turn traffic into measurable revenue.
          </p>
        </div>
      </div>

      {/* --- FILTER BAR (Pills) --- */}
      <div className="max-w-[1600px] mx-auto mb-12 overflow-x-auto no-scrollbar pb-4">
         <div className="flex gap-3">
            {categories.map((cat) => (
              <Link 
                key={cat} 
                href={cat === 'All' ? '/work' : `/work?category=${encodeURIComponent(cat)}`}
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
        {projects.map((project) => (
          <Link href={`/work/${project.slug}`} key={project.slug} className="group relative block w-full aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-gray-800">
            
            {/* The Image */}
            <Image 
              src={project.image} 
              alt={`${project.client} — ${project.title}`} 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100" 
            />
            
            {/* The Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent pointer-events-none" />

            {/* Top Right: Metric badge */}
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-[#FF3300] text-black px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] shadow-[0_0_25px_rgba(255,51,0,0.35)]">
                {project.metric}
              </span>
            </div>

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
              <p className="text-gray-400 text-sm md:text-base font-light mt-2">{project.title}</p>
            </div>

          </Link>
        ))}
      </div>

    </main>
  );
}