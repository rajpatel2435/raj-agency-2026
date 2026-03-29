import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

// 1. Technical Editorial GROQ Query
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    publishedAt,
    "author": author->name,
    "authorImage": author->image.asset->url,
    "image": mainImage.asset->url,
    body,
    "tag": categories[0]->title,
    "related": *[_type == "post" && slug.current != $slug][0...3]{
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      "tag": categories[0]->title
    }
  }`;
  return await client.fetch(query, { slug });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono uppercase tracking-widest text-white">
      Entry Not Found // 404
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 md:pt-40 pb-32 font-sans selection:bg-[#FF3300] selection:text-black">
      
      {/* --- EDITORIAL HEADER --- */}
      <header className="max-w-[1400px] mx-auto px-6 text-center mb-16 md:mb-24">
        <div className="flex justify-center mb-10">
          <span className="bg-[#FF3300] text-black px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            {post.tag || "Intelligence"}
          </span>
        </div>

        <h1 className="text-5xl md:text-[8vw] font-black tracking-tighter leading-[0.85] mb-16 uppercase italic">
          {post.title}
        </h1>

        <div className="flex items-center justify-center gap-6 border-y border-white/5 py-10 max-w-2xl mx-auto">
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white/5 overflow-hidden relative grayscale">
               {post.authorImage ? (
                 <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-zinc-800">{post.author?.[0]}</div>
               )}
             </div>
             <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF3300]">{post.author}</p>
           </div>
           <div className="w-[1px] h-4 bg-white/10" />
           <p className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.3em]">
             {new Date(post.publishedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
           </p>
        </div>
      </header>

      {/* --- CINEMATIC HERO --- */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-24">
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out" 
            priority 
          />
        </div>
      </section>

      {/* --- FOCUSED READING CONTAINER --- */}
      <article className="max-w-[950px] mx-auto px-6">
        <div className="bg-[#0A0A0A] rounded-[3.5rem] p-8 md:p-20 border border-white/5">
          <div className="prose prose-invert prose-lg md:prose-xl max-w-none">
            <PortableText 
              value={post.body} 
              components={{
                block: {
                  h2: ({children}) => <h2 className="text-4xl md:text-6xl font-black mt-20 mb-10 tracking-tighter leading-[0.9] text-white uppercase italic">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-[#FF3300] uppercase italic tracking-tight">{children}</h3>,
                  normal: ({children}) => <p className="text-xl font-light text-zinc-400 leading-[1.7] mb-10">{children}</p>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-[#FF3300] pl-10 italic text-3xl md:text-4xl font-medium text-white my-16 py-4 leading-tight bg-white/5 rounded-r-2xl pr-8">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc pl-8 space-y-5 mb-12 marker:text-[#FF3300] text-zinc-400 text-xl font-light">{children}</ul>,
                }
              }}
            />
          </div>
        </div>
      </article>

      {/* --- RELATED INTELLIGENCE --- */}
      <footer className="max-w-[1400px] mx-auto px-6 mt-40">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[1px] flex-grow bg-white/5" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-600 italic shrink-0">Further Intelligence</h3>
          <div className="h-[1px] flex-grow bg-white/5" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {post.related?.map((rel: any) => (
            <Link href={`/blog/${rel.slug}`} key={rel._id} className="group block">
              <div className="relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 border border-white/5 bg-[#0A0A0A]">
                <Image src={rel.image} alt={rel.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#FF3300] mb-3">{rel.tag || "Analysis"}</p>
              <h4 className="text-2xl font-black leading-[1.1] text-zinc-300 group-hover:text-white transition-colors uppercase italic tracking-tighter">
                {rel.title}
              </h4>
            </Link>
          ))}
        </div>
      </footer>
    </main>
  );
}