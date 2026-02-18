import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";

// --- CRITICAL: Forces the page to refresh when you click a category ---
export const dynamic = "force-dynamic";

export default async function BlogPage({ searchParams }: { searchParams: { page?: string, category?: string } }) {
  
  // 1. GET PARAMETERS FROM URL (e.g., ?category=Tech)
  const currentPage = Number(searchParams?.page) || 1;
  const currentCategory = searchParams?.category || "All";

  // 2. BUILD SANITY QUERY
  // If category is "All", fetch everything. If not, add a filter.
  const filter = currentCategory === "All" ? '' : `&& category == "${currentCategory}"`;
  
  const query = `*[_type == "post" ${filter}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "image": mainImage.asset->url,
    "author": author->name,
    category
  }`;

  let allPosts = await client.fetch(query);

  // 3. FALLBACK DATA (If Sanity is empty, use dummies that MATCH the category)
  if (!allPosts || allPosts.length === 0) {
    // We generate 11 dummy posts to fill the layout
    allPosts = Array.from({ length: 11 }).map((_, i) => ({
      _id: `dummy-post-${i}`,
      title: i === 0 
        ? "The Agency Model Is Resetting - Why I'm Hiring Client-Side Leaders" 
        : `The Future of ${currentCategory === 'All' ? 'Digital' : currentCategory} in 2026: Trends to Watch`,
      slug: `dummy-post-${i}`,
      publishedAt: "2026-02-18",
      author: "Carrie Rose",
      // If filtering by "All", assign random categories. If filtering, match the current category.
      category: currentCategory === "All" ? (i % 2 === 0 ? "Tech" : "News") : currentCategory,
      image: i % 2 === 0 
        ? "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"
    }));
  }

  // 4. SLICE DATA FOR LAYOUT
  const heroPost = allPosts[0];           // 1st post = Hero
  const sidebarPosts = allPosts.slice(1, 5); // Next 4 = Sidebar list
  const gridPosts = allPosts.slice(5);    // The rest = Bottom Grid

  // The Categories List (Add more here if you want!)
  const categories = ['All', 'News', 'Case Studies', 'Opinion', 'Tech', 'Culture', 'SEO', 'PPC', 'Social'];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 md:pt-48 pb-24 px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- HEADER & CATEGORY SCROLL BAR --- */}
        <div className="mb-16 md:mb-24 border-b border-gray-800 pb-8 flex flex-col xl:flex-row justify-between items-end gap-8">
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-medium tracking-tighter leading-[0.9]">
            News, views <br/> and everything else.
          </h1>
          
          {/* Scrollable Container */}
   <div className="w-full xl:w-auto overflow-x-auto pb-2 -mb-2 no-scrollbar">
            <div className="flex gap-3 whitespace-nowrap min-w-max px-1">
              {categories.map((cat) => (
                <Link 
                  key={cat} 
                  href={cat === 'All' ? '/blog' : `/blog?category=${cat}`}
                  // Active State: Orange Background. Inactive: Gray Border.
                  className={`border px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
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
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        {!heroPost ? (
           // Empty State (If filter returns 0 results)
           <div className="py-24 text-center border-t border-gray-800">
             <h2 className="text-2xl text-gray-500 mb-4">No articles found in <span className="text-[#FF3300]">{currentCategory}</span>.</h2>
             <Link href="/blog" className="text-white underline hover:text-[#FF3300]">Reset Filters</Link>
           </div>
        ) : (
          <>
            {/* SECTION 1: SPLIT "NEWSROOM" LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
              
              {/* Left: Massive Hero Post */}
              <div className="lg:col-span-8 group cursor-pointer">
                <Link href={`/blog/${heroPost.slug}`}>
                  <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-gray-800">
                    <Image 
                      src={heroPost.image} 
                      alt={heroPost.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                       <p className="text-[#FF3300] text-sm font-bold uppercase tracking-widest">
                        {heroPost.category || "Featured"}
                      </p>
                      <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                        {new Date(heroPost.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight group-hover:underline decoration-2 underline-offset-8 transition-all">
                      {heroPost.title}
                    </h2>
                  </div>
                </Link>
              </div>

              {/* Right: Sidebar List */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 border-b border-gray-800 pb-4">
                  Trending in {currentCategory}
                </h3>
                {sidebarPosts.map((post: any) => (
                  <Link href={`/blog/${post.slug}`} key={post._id} className="group flex gap-6 items-start">
                    <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-gray-800">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-[#FF3300] font-mono uppercase">
                        {post.category}
                      </p>
                      <h4 className="text-lg font-medium leading-snug group-hover:text-gray-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* SECTION 2: THE ARCHIVE GRID */}
            <div className="border-t border-gray-800 pt-24">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-12">
                {currentCategory} Archive
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {gridPosts.map((post: any) => (
                  <Link href={`/blog/${post.slug}`} key={post._id} className="group cursor-pointer">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-gray-800">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      {/* Floating Category Pill */}
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-white/10 text-[#FF3300]">
                        {post.category}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-6 h-6 rounded-full bg-gray-700 relative overflow-hidden">
                          <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="Author" fill />
                       </div>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                         {post.author || "Agency Team"} • 5 min read
                       </p>
                    </div>

                    <h2 className="text-2xl font-medium tracking-tight leading-snug group-hover:text-[#FF3300] transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                ))}
              </div>
            </div>

            {/* SECTION 3: PAGINATION UI */}
            <div className="mt-32 flex justify-center items-center gap-4">
              <button disabled className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-600 cursor-not-allowed">←</button>
              <div className="flex gap-2">
                <button className="w-12 h-12 rounded-full bg-[#FF3300] text-black font-bold flex items-center justify-center">1</button>
                <button className="w-12 h-12 rounded-full border border-gray-800 hover:border-white transition-colors flex items-center justify-center">2</button>
                <button className="w-12 h-12 rounded-full border border-gray-800 hover:border-white transition-colors flex items-center justify-center">3</button>
              </div>
              <button className="w-12 h-12 rounded-full border border-gray-800 hover:bg-white hover:text-black transition-colors flex items-center justify-center">→</button>
            </div>

          </>
        )}
      </div>
    </main>
  );
}