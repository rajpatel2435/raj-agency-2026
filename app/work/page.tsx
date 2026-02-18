import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";

// Force fresh data on every load
export const dynamic = "force-dynamic";

export default async function WorkPage({ searchParams }: { searchParams: { category?: string } }) {
  
  // 1. FILTER LOGIC
  const currentCategory = searchParams?.category || "All";
  const filter = currentCategory === "All" ? '' : `&& category == "${currentCategory}"`;

  // 2. SANITY QUERY
  const query = `*[_type == "work" ${filter}] | order(_createdAt desc) {
    _id,
    title,
    client,
    category, // e.g. "B2B", "Retail", "Digital PR"
    "slug": slug.current,
    "image": mainImage.asset->url
  }`;

  let projects = await client.fetch(query);

  // 3. DUMMY DATA (Matches your screenshots exactly)
  if (!projects || projects.length === 0) {
    projects = [
      {
        _id: "1",
        client: "Dojo",
        category: "B2B",
        title: "Reinventing payments",
        slug: "dojo",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "2",
        client: "Magnet Trade",
        category: "B2B",
        title: "Kitchen Showroom",
        slug: "magnet",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "3",
        client: "Sole Supplier",
        category: "Retail",
        title: "Squid Game Campaign",
        slug: "sole-supplier",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
      },
      {
        _id: "4",
        client: "Xbox",
        category: "Gaming",
        title: "Series X Launch",
        slug: "xbox",
        image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=1200&auto=format&fit=crop"
      }
    ];
  }

  // Categories for the filter pills
  const categories = ['All', 'B2B', 'Retail', 'Gaming', 'Finance', 'Fashion'];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-4 md:px-8 w-full">
      
      {/* HEADER SECTION */}
      <div className="max-w-[1600px] mx-auto mb-16 flex flex-col xl:flex-row justify-between items-end gap-12">
        
        {/* The Massive Headline */}
        <div className="w-full xl:w-1/2">
          <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
            The Problems <br/>
            We <span className="inline-block w-16 h-12 relative rounded-full overflow-hidden align-middle mx-2 border border-gray-700"><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" alt="Avatar" fill className="object-cover" /></span> Solve
          </h1>
        </div>

        {/* The Descriptive Text */}
        <div className="w-full xl:w-1/3 text-gray-400 text-sm md:text-base font-light leading-relaxed mb-2">
          <p>
            Clients globally come to us with either one of these problems: <strong className="text-white">Demand</strong> or <strong className="text-white">Discovery</strong>.
            We drive search demand or discovery for brands with ambitions to be category leaders.
          </p>
        </div>
      </div>

      {/* FILTER BAR (Pills) */}
      <div className="max-w-[1600px] mx-auto mb-12 overflow-x-auto no-scrollbar pb-2">
         <div className="flex gap-2">
            {categories.map((cat) => (
              <Link 
                key={cat} 
                href={cat === 'All' ? '/work' : `/work?category=${cat}`}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${
                  currentCategory === cat 
                    ? "bg-[#FF3300] border-[#FF3300] text-black" 
                    : "border-gray-800 text-gray-400 hover:border-white hover:text-white"
                }`}
              >
                {cat}
              </Link>
            ))}
         </div>
      </div>

      {/* THE WORK GRID */}
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project: any) => (
          <Link href={`/work/${project.slug}`} key={project._id} className="group relative block w-full aspect-[16/10] overflow-hidden rounded-2xl bg-[#111]">
            
            {/* The Image */}
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
            />
            
            {/* The Overlay (Gradient for readability) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

            {/* The Text (Bottom Left, exactly like screenshot) */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-1 group-hover:text-[#FF3300] transition-colors">
                {project.client} <span className="text-gray-400 text-lg md:text-xl font-light">– {project.category}</span>
              </h2>
            </div>

            {/* Optional: Top Right Arrow Icon on Hover */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">↗</span>
            </div>

          </Link>
        ))}
      </div>

    </main>
  );
}