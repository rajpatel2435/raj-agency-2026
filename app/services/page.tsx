import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import FaqAccordion from "../../components/FaqAccordion";

export default async function ServicesDirectoryPage() {
  
  // 1. Fetch all your published services from Sanity
  const query = `*[_type == "service"] | order(_createdAt asc) {
    _id,
    title,
    description,
    "slug": slug.current,
    "image": mainImage.asset->url
  }`;

  let services = await client.fetch(query);

  // 2. Fallback Data (Just in case your database is empty, so we can see the design!)
  if (!services || services.length === 0) {
    services = [
      {
        _id: "1",
        title: "Search & Growth Strategy",
        slug: "search",
        description: "We don't offer 50 different generic marketing packages. We focus purely on the aggressive, high-impact strategies that actually steal market share and drive revenue.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "2",
        title: "Digital PR & Outreach",
        slug: "digital-pr",
        description: "Securing high-authority backlinks and massive brand awareness through disruptive, viral media campaigns designed to break the internet.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
      }
    ];
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 w-full">
      
      {/* Massive Header Section */}
      <div className="px-6 md:px-12 mb-24 max-w-[1400px] mx-auto">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter leading-[0.9] mb-8">
          Our Services.
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-400 max-w-2xl leading-relaxed">
          We push users along the funnel through performance-driven, aggressively technical search and content marketing.
        </p>
      </div>

      {/* The Split-Scroll Sticky Layout */}
      <div className="flex flex-col w-full border-t border-gray-800">
        {services.map((service: any, index: number) => (
          
          // Each service acts as a full-screen row
          <div 
            key={service._id} 
            className="relative w-full flex flex-col md:flex-row border-b border-gray-800 bg-[#050505]"
          >
            
            {/* LEFT SIDE: The Sticky Title Panel */}
            <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-24 border-r border-gray-800 relative z-10">
              {/* THE MAGIC: This container sticks to the top of the screen as the right side scrolls */}
              <div className="sticky top-40 flex flex-col items-start">
                <span className="text-[#A855F7] text-sm font-bold uppercase tracking-widest mb-6 block">
                  0{index + 1} // Phase
                </span>
                <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 leading-[1.1]">
                  {service.title}
                </h2>
                <p className="text-lg md:text-xl font-light text-gray-400 mb-12 max-w-md">
                  {service.description}
                </p>
                <Link 
                  href={`/services/${service.slug}`}
                  className="bg-white text-black rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#A855F7] transition-colors flex items-center gap-2"
                >
                  Explore Service <span className="text-lg font-light">↗</span>
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE: The Massive Scrolling Content Area */}
            {/* We added a subtle gradient background to separate it from the left menu */}
            <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-24 flex flex-col gap-12 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
              
              {/* Massive Image Container */}
              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <Image 
                  src={service.image || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop"} 
                  alt={service.title} 
                  fill 
                  className="object-cover" 
                />
              </div>

              {/* Data / Insights Blocks to create scroll depth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                <div className="bg-[#111111] p-8 rounded-3xl border border-gray-800 flex flex-col justify-center">
                  <h3 className="text-4xl md:text-6xl font-medium tracking-tighter text-[#A855F7] mb-2">+200%</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Average ROI</p>
                </div>
                <div className="bg-[#111111] p-8 rounded-3xl border border-gray-800 flex flex-col justify-center">
                  <h3 className="text-4xl md:text-6xl font-medium tracking-tighter text-white mb-2">Tier 1</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Technical Standards</p>
                </div>
              </div>

              {/* Extra spacing to allow the user to fully experience the sticky scroll effect */}
              <div className="h-24 md:h-48 w-full"></div>

            </div>
          </div>
        ))}
      </div>
<FaqAccordion />
    </main>
  );
}