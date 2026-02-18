import Image from "next/image";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";

// Force fresh data
export const dynamic = "force-dynamic";

// Custom Rich Text Styles
const ptComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl md:text-5xl font-medium mt-24 mb-8 text-white tracking-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-medium mt-16 mb-6 text-white">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg md:text-xl font-light text-gray-400 leading-relaxed mb-8 max-w-3xl">{children}</p>,
    blockquote: ({ children }: any) => <blockquote className="border-l-2 border-[#FF3300] pl-8 italic text-2xl md:text-3xl text-white my-16 max-w-4xl leading-tight">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-8 text-lg text-gray-400 space-y-3 marker:text-[#FF3300]">{children}</ul>,
  },
};

// 🚨 NEXT.JS 15 FIX: params is now a Promise
export default async function WorkDetailsPage(props: { params: Promise<{ slug: string }> }) {
  
  // 1. Await the params to get the slug
  const params = await props.params; 
  const { slug } = params;

  // 2. Fetch the specific project (Use the awaited 'slug' variable)
  const query = `*[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    client,
    metric,
    category,
    "image": mainImage.asset->url,
    body
  }`;

  let project = await client.fetch(query, { slug });

  // 3. Fetch "You Might Also Like"
  const relatedQuery = `*[_type == "work" && slug.current != $slug][0...3] {
    _id, title, client, category, "slug": slug.current, "image": mainImage.asset->url
  }`;
  
  let relatedProjects = await client.fetch(relatedQuery, { slug });

  // 4. FALLBACK DUMMY DATA
  if (!project) {
    project = {
      title: "Project Not Found",
      client: "Error",
      metric: "404",
      category: "System",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop",
      body: [] 
    };
  }

  // Stats for the Metrics Bar
  const stats = [
    { label: "Links Built", value: "708" },
    { label: "Online Views", value: "500K" },
    { label: "Rankings", value: "#1" },
    { label: "Social Shares", value: "16.7K" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 w-full">
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Top Row: Client & Services */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter">
            {project.client}
          </h1>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF3300] border border-[#FF3300] px-3 py-1 rounded-full">
              {project.category || "Service"}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-800 px-3 py-1 rounded-full">
              Strategy
            </span>
          </div>
        </div>

        {/* Headline & Challenge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
          <div className="lg:col-span-8">
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter leading-[0.95] mb-8">
              {project.title}
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
             <p className="text-sm font-bold uppercase tracking-widest text-[#FF3300] mb-4">The Challenge</p>
             <p className="text-gray-400 leading-relaxed">
               In a crowded market, traditional SEO wasn't moving the needle. We needed a campaign that didn't just drive traffic, but dominated cultural conversation.
             </p>
          </div>
        </div>

        {/* --- THE METRICS BAR --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-gray-800 py-12 mb-24">
          <div className="flex flex-col">
            <span className="text-4xl md:text-6xl font-medium tracking-tighter text-white mb-2">
              {project.metric ? project.metric.replace(/[^0-9.,%]/g, '') : "0"}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Key Result</span>
          </div>
          {stats.slice(1).map((stat, i) => (
            <div key={i} className="flex flex-col border-l border-gray-800 pl-8">
              <span className="text-4xl md:text-6xl font-medium tracking-tighter text-white mb-2">{stat.value}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Hero Image */}
        {project.image && (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-32 border border-gray-800 bg-[#111]">
             <Image src={project.image} alt={project.title} fill className="object-cover" priority />
          </div>
        )}

        {/* --- STORY & CONTENT --- */}
        <div className="max-w-5xl mx-auto mb-48">
          {project.body && <PortableText value={project.body} components={ptComponents} />}
        </div>

      </div>

      {/* --- "YOU MIGHT ALSO LIKE" --- */}
      <section className="border-t border-gray-800 pt-24 px-6 md:px-12 w-full">
        <div className="max-w-[1600px] mx-auto">
          <h3 className="text-4xl md:text-5xl font-medium tracking-tighter mb-12">
            You might also like
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects && relatedProjects.length > 0 ? relatedProjects.map((item: any) => (
              <Link href={`/work/${item.slug}`} key={item._id} className="group cursor-pointer block">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-gray-800 bg-[#111]">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-white/10 text-[#FF3300]">
                    {item.category}
                  </div>
                </div>
                <h4 className="text-xl font-medium tracking-tight group-hover:text-[#FF3300] transition-colors leading-snug">
                  {item.client}
                </h4>
              </Link>
            )) : (
              <p className="text-gray-500">No related projects found.</p>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}