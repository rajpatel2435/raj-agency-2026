import { client } from "@/sanity/lib/client"; // Your sanity client path
import { urlFor } from "@/sanity/lib/image"; // Your image builder path
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
// import SharingBar from "@/components/SharingBar"; // Move sharing logic to a client component

// 1. GROQ Query to get post + related posts
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    publishedAt,
    author,
    "image": mainImage.asset->url,
    body,
    "related": *[_type == "post" && slug.current != $slug][0...3]{
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url
    }
  }`;
  return await client.fetch(query, { slug });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) return <div className="min-h-screen bg-black flex items-center justify-center">Post not found.</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row relative z-10 px-6 md:px-12 gap-12">
        
        {/* Functional Sharing Bar (Client Component) */}
        {/* <SharingBar title={post.title} /> */}

        <article className="max-w-[900px] w-full">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-8">
              <div className="w-12 h-12 bg-[#FF3300] border-2 border-white shadow-[4px_4px_0px_0px_#333] relative overflow-hidden font-bold flex items-center justify-center">
                 {post.author?.[0] || 'L'}
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#FF3300]">{post.author}</p>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.05] mb-12 uppercase italic">
              {post.title}
            </h1>

            <div className="relative w-full aspect-video mb-16 border-2 border-[#222] shadow-[12px_12px_0px_0px_#111]">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>
          </header>

          {/* RENDER SANITY BODY CONTENT */}
          <div className="max-w-3xl prose prose-invert prose-orange">
             <div className="space-y-8 text-lg md:text-xl font-light text-gray-300 leading-relaxed">
                <PortableText 
                  value={post.body} 
                  components={{
                    block: {
                      h2: ({children}) => <h2 className="text-3xl md:text-5xl font-medium mt-16 mb-6 leading-tight text-white uppercase italic">{children}</h2>,
                      h3: ({children}) => <h3 className="text-2xl md:text-3xl font-medium mt-12 mb-4 text-[#FF3300] uppercase italic">{children}</h3>,
                      blockquote: ({children}) => <blockquote className="border-l-4 border-[#FF3300] pl-6 italic text-2xl text-white my-12 bg-[#111] p-8 shadow-[8px_8px_0px_0px_#222]">{children}</blockquote>,
                    },
                    list: {
                      bullet: ({children}) => <ul className="list-disc pl-6 space-y-4 marker:text-[#FF3300]">{children}</ul>,
                    }
                  }}
                />
             </div>
          </div>
        </article>
      </div>

      {/* Related Posts Section remains the same, but using post.related data */}
    </main>
  );
}