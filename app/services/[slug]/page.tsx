import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";

// Update the type to expect a Promise for the params
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. AWAIT the params first (The Next.js 15+ fix!)
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;
  
  // 2. Fetch the exact service that matches the URL slug
  const query = `*[_type == "service" && slug.current == $slug][0] {
    title,
    description,
    "imageUrl": mainImage.asset->url
  }`;
  
  // 3. Pass the resolved currentSlug to Sanity
  const service = await client.fetch(query, { slug: currentSlug });

  // 4. If someone types a random URL, send them to a 404 page
  if (!service) {
    return notFound();
  }
return (
    // Swapped to our pitch-black agency background and white text
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Breadcrumb & Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16 md:mb-24">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight w-full md:w-1/4">
            {service.title}
          </h1>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.1] w-full md:w-3/4">
            An aggressive <span className="text-gray-500">{service.title.toLowerCase()}</span> strategy designed to steal market share and drive massive revenue.
          </h2>
        </div>

        {/* Massive Featured Image */}
        {service.imageUrl && (
          <div className="relative w-full h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden mb-24 border border-gray-800">
            <Image 
              src={service.imageUrl} 
              alt={service.title} 
              fill 
              className="object-cover"
            />
          </div>
        )}

        {/* The Metrics Bar - Swapped to dark gray borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-b border-gray-800 py-16 mb-24">
          <div>
            <h3 className="text-6xl md:text-8xl font-medium tracking-tighter mb-2">£100<span className="text-4xl">m</span></h3>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Incremental Value</p>
          </div>
          <div>
            <h3 className="text-6xl md:text-8xl font-medium tracking-tighter mb-2">40<span className="text-4xl">+</span></h3>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Strong Organic Team</p>
          </div>
          <div>
            <h3 className="text-6xl md:text-8xl font-medium tracking-tighter mb-2">6<span className="text-4xl">x</span></h3>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">ROI Avg from Investment</p>
          </div>
        </div>

        {/* Two-Column Text Layout */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="w-full md:w-1/2">
            <h3 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight sticky top-32">
              Engineering a foundation for explosive growth.
            </h3>
          </div>
          
          {/* Swapped body text to a lighter gray for readability on black */}
          <div className="w-full md:w-1/2 flex flex-col gap-8 text-lg md:text-xl font-light leading-relaxed text-gray-400">
            <p className="font-medium text-white text-2xl">
              {service.description}
            </p>
            <p>
              Your website sends the first signal to search engines and the final one to your customers—that is why it is so crucial. We do not just build for traffic; we build for conversion.
            </p>
            <p>
              The priority is simple: build the most crawlable, indexable digital footprint possible. Create an experience that competitors struggle to copy, and deliver performance that leaves the market chasing your tail.
            </p>
            
            {/* Call to Action Button - Swapped to your custom acid green */}
            <div className="mt-8">
              <a href="/contact" className="inline-block bg-[#A855F7] text-black rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Let's Talk Strategy ↗
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}