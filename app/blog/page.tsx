import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client"; // Adjust path to your sanity client

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "tag": categories[0]->title,
    publishedAt,
    excerpt,
    "image": mainImage.asset->url,
    "author": author->name,
    "authorImage": author->image.asset->url,
    readTime
  }`;
  return await client.fetch(query);
}

export default async function BlogPage() {
  const posts = await getPosts();

  // Logic to separate posts based on your design
  const featuredPost = posts[0];
  const trendingPosts = posts.slice(1, 4);
  const archivePosts = posts.slice(4);

  const categories = ["All", "Technical SEO", "Engineering", "Case Studies", "Web3", "Opinion"];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 font-sans">
      
      {/* --- HERO SECTION & CATEGORY FILTER --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16 lg:mb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9]">
              Raw data. <br />
              Deep code. <br />
              <span className="text-gray-600">Real truth.</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {categories.map((cat) => (
              <button key={cat} className="px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border border-gray-800 hover:border-[#FF3300] hover:text-white">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- TOP SECTION (Featured + Trending) --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: Featured Post */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="lg:col-span-8 group cursor-pointer">
              <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden mb-8 bg-[#111] border border-gray-800">
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill 
                  className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 text-[#FF3300] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                 {featuredPost.tag} <span className="text-gray-600">•</span> {new Date(featuredPost.publishedAt).toLocaleDateString('en-CA')}
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-snug group-hover:text-[#FF3300] transition-colors mb-6">
                {featuredPost.title}
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
                {featuredPost.excerpt}
              </p>
            </Link>
          )}

          {/* RIGHT: Trending Sidebar */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 border-b border-gray-800 pb-4">
              Trending
            </h3>
            <div className="flex flex-col gap-8">
              {trendingPosts.map((post: any) => (
                <Link href={`/blog/${post.slug}`} key={post._id} className="flex gap-6 group cursor-pointer items-start">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-[#111] border border-gray-800">
                    <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div>
                    <span className="text-[#FF3300] text-[9px] font-bold uppercase tracking-[0.2em] block mb-2">{post.tag}</span>
                    <h4 className="text-lg font-medium leading-snug group-hover:text-white text-gray-300 transition-colors">{post.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- ARCHIVE GRID --- */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-12 border-b border-gray-800 pb-4">Archive</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {archivePosts.map((post: any) => (
            <Link href={`/blog/${post.slug}`} key={post._id} className="group cursor-pointer flex flex-col h-full">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-[#111] border border-gray-800">
                <div className="absolute top-4 left-4 bg-[#FF3300] text-black px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] z-10 shadow-lg">{post.tag}</div>
                <Image src={post.image} alt={post.title} fill className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-4">
                <span className="w-5 h-5 rounded-full bg-gray-800 relative overflow-hidden border border-gray-700">
                  <Image src={post.authorImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} fill alt={post.author}/>
                </span>
                {post.author} <span className="w-1 h-1 bg-gray-700 rounded-full" /> {post.readTime || "5 MIN"} READ
              </div>
              <h3 className="text-2xl font-medium leading-snug group-hover:text-[#FF3300] transition-colors mt-auto">{post.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}