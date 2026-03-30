import Image from "next/image";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const LOCAL_WORK_DATA: Record<string, any> = {
  "altos-grill-growth": {
    title: "Orchestrating a 98% Surge in Organic Volume for a Declining QSR Giant",
    client: "ALTOS GRILL",
    year: "2024-2026",
    industry: "Gastro-Retail",
    metric: "95% Lift",
    category: "Search Strategy, Digital PR",
    // Replace with the URL of the "Burger" image we generated
    heroGallery: ["/images/work/altos-hero.jpg"], 
    challenge: "Altos Grill occupied a 'dead zone' in search. We pivoted from brand-heavy reliance to a non-brand infrastructure that captured high-intent 'midnight-craving' searchers in the Griffintown area.",
    stats: [
      { label: "Organic Traffic Velocity", value: "95%" },
      { label: "High-Authority Backlinks", value: "81%" },
      { label: "Search Visibility", value: "Dominant" },
      { label: "Market-Leading Keywords", value: "228K" },
    ],
    whatWeDid: {
      headline: "The 'Cultural Context' Framework",
      points: ["Occasion-Based SEO Mapping", "Meme-Engine PR Cycles", "TikTok-Search Alignment"],
      description: "By restructuring the site architecture around 'Mood-Based Categories,' we bypassed saturated 'Best Burger' keywords and dominated conversational searches that drive 70% of modern Montreal conversions."
    },
    testimonial: {
      text: "LaunchAtDawn didn't just give us a report; they gave us a new language to speak to our customers.",
      author: "M. Holmes",
      role: "Operations Director, Altos"
    }
  },
  "aris-dental-local": {
    title: "Dominating the Plateau: How a Local Clinic Captured 40% of Neighborhood Search",
    client: "CLINIQUE DR. ARIS",
    year: "2025",
    industry: "Medical // Dominance",
    metric: "+310%",
    category: "Local SEO, Google Maps, Lead Gen",
    // Replace with the URL of the "Dental UI" image we generated
    heroGallery: ["/images/work/aris-dental-hero.jpg"],
    challenge: "A high-rated Plateau clinic was losing to generic dental chains. They had zero visibility for 'Emergency Dentist Montreal' despite superior patient care.",
    stats: [
      { label: "Local Map Pack Rank", value: "#1" },
      { label: "New Patient Leads", value: "+310%" },
      { label: "CPA Reduction", value: "-55%" },
      { label: "Market Share", value: "40%" },
    ],
    whatWeDid: {
      headline: "The 'Hyper-Local' Authority Model",
      points: ["Geofenced Google Ads", "Bilingual Content Optimization", "Automated Patient Review Funnels"],
      description: "We hijacked traffic from national chains by focusing on neighborhood-specific intent. By dominating the 'Plateau' geolocations, we turned a local clinic into a community landmark."
    },
    testimonial: {
      text: "They actually understand how people in Montreal search in both languages.",
      author: "Dr. Marc Aris",
      role: "Founder, Clinique Dr. Aris"
    }
  },
  "petit-secret-social": {
    title: "From 'Hidden' to 'Booked Out': Scaling an Old Montreal Speakeasy via Social SEO",
    client: "LE PETIT SECRET",
    year: "2025-2026",
    industry: "Hospitality // Visit",
    metric: "4.8M Views",
    category: "Social SEO, Short-Form Video, PR",
    // Replace with the URL of the "Alleyway Sign" image we generated
    heroGallery: ["/images/work/petit-secret-hero.jpg"],
    challenge: "An elite speakeasy in Old Montreal was a 'hidden gem' staying too hidden from the high-spending tourist demographic.",
    stats: [
      { label: "Cumulative Video Reach", value: "4.8M" },
      { label: "Direct Booking Increase", value: "+420%" },
      { label: "UGC Content Volume", value: "1.2K" },
      { label: "Waitlist Average", value: "22 Days" },
    ],
    whatWeDid: {
      headline: "The 'Exclusivity' Algorithm",
      points: ["Viral 'Mystery' Content Hooks", "Micro-Influencer Seeded PR", "Instagram-First SEO"],
      description: "We built a visual narrative around 'The Hunt.' By generating content that triggered the algorithm, we put the restaurant on the 'Montreal Bucket List' for thousands."
    },
    testimonial: {
      text: "They turned our quiet bar into the most talked-about spot in the city in under 60 days.",
      author: "C. Lefebvre",
      role: "Owner, Le Petit Secret"
    }
  },
  "nexus-finance-onboarding": {
    title: "Re-Engineering Trust: A 140% Increase in FinTech Acquisition Velocity",
    client: "NEXUS FINANCE",
    year: "2025",
    industry: "Tech Giant // Acquisition",
    metric: "140%",
    category: "UI/UX, Performance Marketing",
    // Replace with the URL of the "Hologram Globe/Hand" image we generated
    heroGallery: ["/images/work/nexus-finance-hero.jpg"],
    challenge: "Nexus Finance suffered from a 'conversion cliff.' Users abandoned the platform during the complex KYC onboarding process.",
    stats: [
      { label: "Onboarding Completion", value: "140%" },
      { label: "Cost Per Acquisition", value: "-45%" },
      { label: "User Trust Rating", value: "9.8/10" },
      { label: "Quarterly Volume", value: "$12M" },
    ],
    whatWeDid: {
      headline: "Frictionless Financial Logic",
      points: ["Biometric Trust-Flow UX", "Localized Regulatory SEO", "Retargeting Infrastructure"],
      description: "We reduced friction points in the onboarding funnel by 60%, implementing a 'Transparency-First' UI that converted skeptical visitors into verified active traders."
    },
    testimonial: {
      text: "A rare breed of agency that understands both regulatory constraints and creative growth.",
      author: "S. Chen",
      role: "CMO, Nexus Finance"
    }
  },
  "festival-cyberk-launch": {
    title: "Breaking the Sound Barrier: 100% Sell-Through Velocity for 50k Units",
    client: "FESTIVAL CYBERK",
    year: "2026",
    industry: "Hospitality // Visit",
    metric: "SELL-OUT",
    category: "Guerilla Orchestration, AR Integration",
    heroGallery: ["/images/work/cyberk-headset.jpg"], // The headset image
    challenge: "Executing a bilingual guerilla campaign to achieve 100% sell-through velocity within a 12-hour deployment window for a massive 50k unit festival launch.",
    stats: [
      { label: "Deployment Window", value: "12H" },
      { label: "Sell-Through Velocity", value: "100%" },
      { label: "Unit Volume", value: "50K" },
      { label: "AR Node Triggers", value: "Global" },
    ],
    whatWeDid: {
      headline: "The 'Sound Barrier' Protocol",
      points: ["Augmented Reality Nodes", "Bilingual Guerilla Orchestration", "Underground Street-Art Triggers"],
      description: "We integrated digital AR nodes with physical street-art triggers across Montreal, creating a scavenger-hunt hype cycle that resulted in a total sell-out in record time."
    },
    testimonial: {
      text: "A masterclass in high-velocity deployment. They didn't just sell tickets; they integrated the city into the experience.",
      author: "L. Thorne",
      role: "Operations, Cyberk"
    }
  },
  "maison-lumiere-global": {
    title: "The Aspiration Engine: Global ROAS Scaling for Luxury Lighting",
    client: "MAISON LUMIÈRE",
    year: "2025",
    industry: "Luxury // Scaling",
    metric: "ROAS 3.5x",
    category: "Brand Identity, Performance Marketing",
    heroGallery: ["/images/work/maison-lumiere-hero.jpg"],
    challenge: "Scaling a boutique Montreal atelier into a global luxury competitor while maintaining a 3.5x ROAS and high-end brand perception.",
    stats: [
      { label: "Return on Ad Spend", value: "3.5x" },
      { label: "Global Acquisition", value: "+115%" },
      { label: "Market Position", value: "Elite" },
      { label: "Brand Equity", value: "High" },
    ],
    whatWeDid: {
      headline: "Aspiration Engineering",
      points: ["Global Scalability Audit", "Prestige-First Funnel Design", "High-Couture Visual Identity"],
      description: "We built an 'Aspiration Engine' that targeted high-net-worth hubs, shifting the brand from a local maker to a global luxury authority."
    },
    testimonial: {
      text: "They managed to scale our volume without ever compromising our luxury status.",
      author: "J. Dupont",
      role: "Creative Director"
    }
  },
  
};
const ptComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl md:text-5xl font-medium mt-24 mb-8 text-white tracking-tight">{children}</h2>,
    normal: ({ children }: any) => <p className="text-lg md:text-xl font-light text-gray-400 leading-relaxed mb-8 max-w-3xl">{children}</p>,
  },
};

export default async function WorkDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  // 1. Data Source Selection
  let project = LOCAL_WORK_DATA[slug];
  if (!project) {
    const query = `*[_type == "work" && slug.current == $slug][0] { _id, title, client, metric, category, "image": mainImage.asset->url, body }`;
    project = await client.fetch(query, { slug });
  }

  if (!project) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Entry Not Found</div>;

  // Related Projects Fetch
  const relatedQuery = `*[_type == "work" && slug.current != $slug][0...3] { _id, title, client, category, "slug": slug.current, "image": mainImage.asset->url }`;
  const relatedProjects = await client.fetch(relatedQuery, { slug });

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 w-full overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
   {/* --- 1. META HEADER --- */}
{/* --- 1. META HEADER (Agency Refined) --- */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/5 pb-12 mb-16 font-sans">
  <div>
    <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-4 opacity-70 italic">Deployment Year</p>
    <p className="text-[11px] text-white font-medium tracking-[0.2em]">{project.year || "2025-2026"}</p>
  </div>
  
  <div>
    <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-4 opacity-70 italic">Core Capabilities</p>
    <p className="text-[11px] text-white font-medium tracking-[0.2em] uppercase leading-relaxed">{project.category}</p>
  </div>
  
  <div>
    <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-4 opacity-70 italic">Vertical</p>
    <p className="text-[11px] text-white font-medium tracking-[0.2em] uppercase">{project.industry || "Retail"}</p>
  </div>

  <div className="flex flex-col items-end">
    <p className="text-[9px] uppercase tracking-[0.4em] text-[#FF3300] font-bold mb-4 italic">SYS.ARCHIVE // DEPLOYED</p>
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-gray-400 font-mono">STATUS: 200 OK</span>
      <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]" />
    </div>
  </div>
</div>

        {/* --- 2. MAIN HEADLINE --- */}
        <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter leading-[0.9] mb-24 max-w-6xl">
          {project.title}
        </h1>

        {/* --- 3. TOP HERO CAROUSEL --- */}
        <div className="flex gap-4 overflow-x-auto pb-12 no-scrollbar mb-32 snap-x snap-mandatory">
          {project.heroGallery?.map((img: string, i: number) => (
            <div key={i} className="relative min-w-[85vw] md:min-w-[65vw] aspect-video rounded-[2rem] overflow-hidden border border-white/5 snap-center">
              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" priority={i === 0} />
            </div>
          ))}
        </div>

        {/* --- 4. THE CHALLENGE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-48 border-t border-gray-900 pt-16">
          <div className="lg:col-span-4 uppercase text-[11px] font-bold tracking-[0.2em] text-[#FF3300]">Problem Statement</div>
          <div className="lg:col-span-8">
             <p className="text-2xl md:text-4xl text-gray-400 leading-tight font-light">{project.challenge}</p>
          </div>
        </div>

{/* --- 5. DATA CARDS (Updated Dark Theme) --- */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-48">
  {project.stats?.map((stat: any, i: number) => (
    <div key={i} className="group relative bg-[#0A0A0A] border border-white/5 p-12 rounded-[2.5rem] flex flex-col justify-between min-h-[250px] transition-all duration-500 hover:border-[#FF3300]/30 hover:bg-[#0D0D0D]">
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF3300]/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <span className="text-7xl font-medium text-white tracking-tighter group-hover:text-[#FF3300] transition-colors">
        {stat.value}
      </span>
      <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-600 leading-tight">
        {stat.label}
      </span>
    </div>
  ))}
</div>

        {/* --- 6. STRATEGIC EXECUTION (What We Did) --- */}
        {project.whatWeDid && (
          <div className="mb-48 bg-[#0D0D0D] p-12 md:p-24 rounded-[3.5rem] border border-white/5">
            <h2 className="text-4xl md:text-7xl font-medium mb-16 tracking-tighter">{project.whatWeDid.headline}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-8">
                 {project.whatWeDid.points.map((p: string, i: number) => (
                   <div key={i} className="border-b border-white/5 pb-6">
                      <p className="text-xl font-medium mb-2 text-[#FF3300]">0{i+1} —</p>
                      <p className="text-gray-400 text-lg">{p}</p>
                   </div>
                 ))}
              </div>
              <div className="flex flex-col justify-between">
                 <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-12">{project.whatWeDid.description}</p>
                 <button className="w-fit px-12 py-6 bg-[#FF3300] rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                   Request Strategy Blueprint
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 7. VIDEO SHOWCASE --- */}
        <div className="mb-48">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-700 font-bold mb-12">Production & Motion Assets</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.videos?.map((vid: any, i: number) => (
              <div key={i} className="group relative aspect-video rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer">
                 <Image src={vid.thumbnail} alt={vid.title} fill className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
                       <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-2" />
                    </div>
                 </div>
                 <div className="absolute bottom-10 left-10">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#FF3300] mb-2">Asset 0{i+1}</p>
                    <p className="text-2xl font-medium tracking-tight">{vid.title}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 8. TESTIMONIAL --- */}
        {project.testimonial && (
          <section className="py-32 border-y border-gray-900 mb-48">
            <h2 className="text-3xl md:text-6xl font-medium leading-[1] tracking-tighter mb-16 max-w-5xl">
              &ldquo;{project.testimonial.text}&rdquo;
            </h2>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-full border border-white/10" />
              <div>
                <p className="font-bold text-white text-xl">{project.testimonial.author}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">{project.testimonial.role}</p>
              </div>
            </div>
          </section>
        )}

        <div className="max-w-5xl mx-auto">
          {project.body && <PortableText value={project.body} components={ptComponents} />}
        </div>
      </div>
      
      {/* --- RELATED FOOTER --- */}
      <section className="border-t border-gray-900 pt-32 px-6 md:px-12 w-full bg-[#030303]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-16">
             <h3 className="text-4xl md:text-5xl font-medium tracking-tighter text-white">Next Cases</h3>
             <Link href="/work" className="text-[10px] uppercase font-bold tracking-widest border-b border-white/20 pb-2">View Archive</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects?.map((item: any) => (
              <Link href={`/work/${item.slug}`} key={item._id} className="group">
                <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 border border-white/5">
                  <Image src={item.image} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                </div>
                <h4 className="text-2xl font-medium group-hover:text-[#FF3300] transition-colors">{item.client}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// app/work/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // Use a fallback if the project isn't in your local array
  const projectTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${projectTitle} Case Study`,
    description: `Deep dive into the digital deployment and SEO strategy for ${projectTitle}.`,
  };
}