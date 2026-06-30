type PortableSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type PortableBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2";
  markDefs: never[];
  children: PortableSpan[];
};

export type LocalBlogPost = {
  _id: string;
  title: string;
  slug: string;
  tag: string;
  publishedAt: string;
  excerpt: string;
  image: string;
  author: string;
  authorImage: string;
  readTime: string;
  body: PortableBlock[];
};

const AUTHOR = "Launch at Dawn Editorial";
const AUTHOR_IMAGE = "https://api.dicebear.com/7.x/avataaars/svg?seed=launchatdawn-editorial";

const TOPIC_BLUEPRINTS: Array<{
  slug: string;
  title: string;
  tag: string;
  keyword: string;
}> = [
  { slug: "technical-seo-audit-checklist-2026", title: "Technical SEO Audit Checklist for 2026", tag: "Technical SEO", keyword: "technical SEO audit checklist" },
  { slug: "local-seo-for-restaurants", title: "Local SEO for Restaurants: A Revenue-First Framework", tag: "Local SEO", keyword: "local seo for restaurants" },
  { slug: "google-business-profile-optimization-guide", title: "Google Business Profile Optimization Guide", tag: "Local SEO", keyword: "google business profile optimization" },
  { slug: "core-web-vitals-for-lead-generation", title: "Core Web Vitals for Lead Generation Sites", tag: "Engineering", keyword: "core web vitals optimization" },
  { slug: "nextjs-seo-best-practices", title: "Next.js SEO Best Practices for Fast Indexing", tag: "Engineering", keyword: "nextjs seo best practices" },
  { slug: "schema-markup-for-local-business", title: "Schema Markup for Local Business Websites", tag: "Technical SEO", keyword: "schema markup local business" },
  { slug: "programmatic-seo-for-service-pages", title: "Programmatic SEO for Service Page Expansion", tag: "Strategy", keyword: "programmatic seo service pages" },
  { slug: "on-page-seo-for-conversion-pages", title: "On-Page SEO for Conversion-Driven Pages", tag: "Technical SEO", keyword: "on page seo optimization" },
  { slug: "seo-content-brief-template", title: "SEO Content Brief Template for High-Intent Keywords", tag: "Content", keyword: "seo content brief template" },
  { slug: "how-to-improve-crawl-budget", title: "How to Improve Crawl Budget on Growing Websites", tag: "Technical SEO", keyword: "improve crawl budget" },
  { slug: "canonical-tags-explained", title: "Canonical Tags Explained for Multi-Page Websites", tag: "Technical SEO", keyword: "canonical tags seo" },
  { slug: "internal-linking-strategy-for-seo", title: "Internal Linking Strategy for Better Rankings", tag: "Strategy", keyword: "internal linking strategy seo" },
  { slug: "blog-seo-structure-that-ranks", title: "Blog SEO Structure That Ranks Consistently", tag: "Content", keyword: "blog seo structure" },
  { slug: "service-page-seo-template", title: "Service Page SEO Template for Local Brands", tag: "Content", keyword: "service page seo template" },
  { slug: "ecommerce-seo-foundation-guide", title: "Ecommerce SEO Foundation Guide", tag: "Case Studies", keyword: "ecommerce seo strategy" },
  { slug: "seo-metrics-that-actually-matter", title: "SEO Metrics That Actually Matter to Revenue", tag: "Analytics", keyword: "seo metrics that matter" },
  { slug: "how-to-rank-location-pages", title: "How to Rank Location Pages in Competitive Cities", tag: "Local SEO", keyword: "rank location pages" },
  { slug: "ai-content-and-seo-quality-control", title: "AI Content and SEO Quality Control Workflow", tag: "Content", keyword: "ai content seo" },
  { slug: "website-migration-seo-checklist", title: "Website Migration SEO Checklist", tag: "Engineering", keyword: "website migration seo checklist" },
  { slug: "seo-roadmap-for-new-business-sites", title: "SEO Roadmap for New Business Websites", tag: "Strategy", keyword: "seo roadmap" },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
];

function block(key: string, text: string, style: "normal" | "h2" = "normal"): PortableBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${key}-span`,
        text,
        marks: [],
      },
    ],
  };
}

function createBody(title: string, keyword: string, index: number): PortableBlock[] {
  return [
    block(`h2-${index}`, `${title}: What Matters Most`, "h2"),
    block(
      `p1-${index}`,
      `This guide breaks down ${keyword} into practical actions you can apply on production pages. The focus is simple: improve crawlability, relevance, and conversion intent without adding unnecessary complexity.`
    ),
    block(
      `p2-${index}`,
      `Use this framework to align technical implementation, content structure, and internal linking. When these layers move together, rankings become more stable and pages index faster.`
    ),
  ];
}

export const LOCAL_BLOG_POSTS: LocalBlogPost[] = TOPIC_BLUEPRINTS.map((topic, i) => {
  const publishedAt = new Date(Date.UTC(2026, 5, 30 - i)).toISOString();
  return {
    _id: `local-post-${i + 1}`,
    title: topic.title,
    slug: topic.slug,
    tag: topic.tag,
    publishedAt,
    excerpt: `A practical playbook on ${topic.keyword} with implementation steps, common mistakes, and quick wins for long-term visibility.`,
    image: HERO_IMAGES[i % HERO_IMAGES.length],
    author: AUTHOR,
    authorImage: AUTHOR_IMAGE,
    readTime: `${5 + (i % 5)} MIN`,
    body: createBody(topic.title, topic.keyword, i + 1),
  };
});

export const LOCAL_BLOG_SLUGS = LOCAL_BLOG_POSTS.map((post) => post.slug);

export function getLocalBlogPostBySlug(slug: string): LocalBlogPost | undefined {
  return LOCAL_BLOG_POSTS.find((post) => post.slug === slug);
}

export function getLocalRelatedPosts(slug: string, count = 3): LocalBlogPost[] {
  return LOCAL_BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, count);
}
