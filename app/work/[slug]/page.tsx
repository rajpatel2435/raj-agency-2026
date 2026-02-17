import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // 1. We grab the slug from the URL
  const { slug } = params;

  // 2. We ask Sanity for the specific case study that matches this slug
  const query = `*[_type == "caseStudy" && slug.current == $slug][0] {
    title,
    client,
    "imageUrl": mainImage.asset->url,
    summary
  }`;
  
  const project = await client.fetch(query, { slug });

  // 3. If the user types a URL that doesn't exist, we show a 404 page
  if (!project) {
    return notFound();
  }

  // 4. Render the massive, high-end case study page
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 px-6 md:px-12 pb-24">
      <div className="max-w-6xl mx-auto cursor-none">
        
        {/* Back Button */}
        <Link href="/" className="inline-block mb-12 text-sm font-bold tracking-widest uppercase hover:text-cyan-400 transition-colors">
          ← Back to Home
        </Link>

        {/* Project Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
            {project.title}
          </h1>
          <div className="flex items-center gap-4 border-t border-gray-800 pt-6">
            <span className="text-sm font-medium tracking-widest uppercase text-gray-500">Client</span>
            <span className="text-lg font-bold uppercase tracking-wide text-white">{project.client}</span>
          </div>
        </div>

        {/* Massive Hero Image */}
        {project.imageUrl && (
          <div className="relative w-full aspect-video bg-gray-900 mb-16 overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority // Tells Next.js to load this image immediately
            />
          </div>
        )}

        {/* Project Summary */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">The Challenge & Solution</h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
            {project.summary}
          </p>
        </div>

      </div>
    </main>
  );
}