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
  seoKeywords: string[];
  body: PortableBlock[];
};

const AUTHOR = "Launch at Dawn Editorial";
const AUTHOR_IMAGE = "https://api.dicebear.com/7.x/avataaars/svg?seed=launchatdawn-editorial";

const TOPIC_BLUEPRINTS: Array<{
  slug: string;
  title: string;
  tag: string;
  keyword: string;
  secondaryKeywords: string[];
}> = [
  { slug: "technical-seo-audit-checklist-2026", title: "Technical SEO Audit Checklist for 2026", tag: "Technical SEO", keyword: "technical SEO audit checklist", secondaryKeywords: ["seo audit template", "technical seo issues", "site health audit"] },
  { slug: "local-seo-for-restaurants", title: "Local SEO for Restaurants: A Revenue-First Framework", tag: "Local SEO", keyword: "local seo for restaurants", secondaryKeywords: ["restaurant google ranking", "restaurant map pack", "local restaurant marketing"] },
  { slug: "google-business-profile-optimization-guide", title: "Google Business Profile Optimization Guide", tag: "Local SEO", keyword: "google business profile optimization", secondaryKeywords: ["gbp ranking factors", "google maps seo", "local business profile"] },
  { slug: "core-web-vitals-for-lead-generation", title: "Core Web Vitals for Lead Generation Sites", tag: "Engineering", keyword: "core web vitals optimization", secondaryKeywords: ["improve lcp", "reduce cls", "fix inp"] },
  { slug: "nextjs-seo-best-practices", title: "Next.js SEO Best Practices for Fast Indexing", tag: "Engineering", keyword: "nextjs seo best practices", secondaryKeywords: ["nextjs metadata", "nextjs sitemap", "nextjs robots"] },
  { slug: "schema-markup-for-local-business", title: "Schema Markup for Local Business Websites", tag: "Technical SEO", keyword: "schema markup local business", secondaryKeywords: ["local business schema", "organization schema", "json ld seo"] },
  { slug: "programmatic-seo-for-service-pages", title: "Programmatic SEO for Service Page Expansion", tag: "Strategy", keyword: "programmatic seo service pages", secondaryKeywords: ["service page templates", "seo scaling", "long tail seo"] },
  { slug: "on-page-seo-for-conversion-pages", title: "On-Page SEO for Conversion-Driven Pages", tag: "Technical SEO", keyword: "on page seo optimization", secondaryKeywords: ["title tag optimization", "meta description seo", "header structure seo"] },
  { slug: "seo-content-brief-template", title: "SEO Content Brief Template for High-Intent Keywords", tag: "Content", keyword: "seo content brief template", secondaryKeywords: ["content brief format", "keyword mapping", "search intent"] },
  { slug: "how-to-improve-crawl-budget", title: "How to Improve Crawl Budget on Growing Websites", tag: "Technical SEO", keyword: "improve crawl budget", secondaryKeywords: ["crawl efficiency", "crawl stats", "index coverage"] },
  { slug: "canonical-tags-explained", title: "Canonical Tags Explained for Multi-Page Websites", tag: "Technical SEO", keyword: "canonical tags seo", secondaryKeywords: ["duplicate content seo", "canonical url", "index control"] },
  { slug: "internal-linking-strategy-for-seo", title: "Internal Linking Strategy for Better Rankings", tag: "Strategy", keyword: "internal linking strategy seo", secondaryKeywords: ["topic clusters", "anchor text seo", "site architecture"] },
  { slug: "blog-seo-structure-that-ranks", title: "Blog SEO Structure That Ranks Consistently", tag: "Content", keyword: "blog seo structure", secondaryKeywords: ["blog topic clusters", "editorial seo", "content optimization"] },
  { slug: "service-page-seo-template", title: "Service Page SEO Template for Local Brands", tag: "Content", keyword: "service page seo template", secondaryKeywords: ["local service page", "location page seo", "conversion copywriting"] },
  { slug: "ecommerce-seo-foundation-guide", title: "Ecommerce SEO Foundation Guide", tag: "Case Studies", keyword: "ecommerce seo strategy", secondaryKeywords: ["category page seo", "product page seo", "ecommerce crawl"] },
  { slug: "seo-metrics-that-actually-matter", title: "SEO Metrics That Actually Matter to Revenue", tag: "Analytics", keyword: "seo metrics that matter", secondaryKeywords: ["seo kpis", "organic conversion rate", "seo roi"] },
  { slug: "how-to-rank-location-pages", title: "How to Rank Location Pages in Competitive Cities", tag: "Local SEO", keyword: "rank location pages", secondaryKeywords: ["city landing pages", "geo seo", "local intent pages"] },
  { slug: "ai-content-and-seo-quality-control", title: "AI Content and SEO Quality Control Workflow", tag: "Content", keyword: "ai content seo", secondaryKeywords: ["ai content workflow", "editorial quality control", "helpful content"] },
  { slug: "website-migration-seo-checklist", title: "Website Migration SEO Checklist", tag: "Engineering", keyword: "website migration seo checklist", secondaryKeywords: ["301 redirect map", "migration qa", "traffic drop prevention"] },
  { slug: "seo-roadmap-for-new-business-sites", title: "SEO Roadmap for New Business Websites", tag: "Strategy", keyword: "seo roadmap", secondaryKeywords: ["new website seo", "first 90 days seo", "seo launch plan"] },
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

function createBody(title: string, keyword: string, secondaryKeywords: string[], index: number): PortableBlock[] {
  const related = secondaryKeywords.join(", ");
  return [
    block(`h2-${index}`, `${title}: What Matters Most`, "h2"),
    block(
      `p1-${index}`,
      `This guide breaks down ${keyword} into practical actions you can apply on production websites. The objective is to improve crawlability, relevance, and lead conversion without adding unnecessary complexity.`
    ),
    block(
      `p2-${index}`,
      `Use this framework to align technical implementation, content structure, internal linking, and authority signals. When these layers move together, rankings become more stable and pages index faster.`
    ),
    block(`h2-step-${index}`, "Execution Framework", "h2"),
    block(
      `p3-${index}`,
      `Step 1 is diagnosis. Review your crawl logs, index coverage, canonical tags, and search performance to identify where ${keyword} is currently underperforming. Avoid generic advice and isolate page templates with measurable impact.`
    ),
    block(
      `p4-${index}`,
      `Step 2 is architecture. Build topic and page relationships that reflect user intent. Connect core pages with internal links and clear semantic headings so search engines understand relevance at both page and section level.`
    ),
    block(
      `p5-${index}`,
      `Step 3 is on-page execution. Improve title tags, descriptions, heading hierarchy, copy depth, and schema where appropriate. Each element should support one clear business objective and one primary intent target.`
    ),
    block(`h2-measure-${index}`, "Measurement and Iteration", "h2"),
    block(
      `p6-${index}`,
      `Track movement weekly with a practical scorecard: impressions, rankings by intent cluster, CTR, indexed URL quality, and qualified conversions. This prevents vanity reporting and keeps your SEO tied to outcomes.`
    ),
    block(
      `p7-${index}`,
      `Related focus areas to include in your sprint: ${related}. These terms support long-tail visibility and help build topical authority around your primary query.`
    ),
    block(`h2-mistakes-${index}`, "Common Mistakes to Avoid", "h2"),
    block(
      `p8-${index}`,
      `Do not publish thin pages with rewritten duplicates, and do not rely on AI drafts without editorial quality control. Thin topical coverage can slow indexing and reduce trust signals over time.`
    ),
    block(
      `p9-${index}`,
      `Do not separate SEO from conversion. Rankings with weak page intent and weak offer clarity rarely produce qualified leads. Every content update should improve both discoverability and conversion flow.`
    ),
    block(`h2-outcome-${index}`, "Expected Outcomes", "h2"),
    block(
      `p10-${index}`,
      `When implemented correctly, this approach improves index quality, ranking consistency, and lead readiness. Most teams see early directional gains in 2 to 6 weeks and stronger compound gains in 8 to 16 weeks.`
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
    readTime: `${10 + (i % 4)} MIN`,
    seoKeywords: [topic.keyword, ...topic.secondaryKeywords, "Launch at Dawn", "technical SEO"],
    body: createBody(topic.title, topic.keyword, topic.secondaryKeywords, i + 1),
  };
});

export const LOCAL_BLOG_SLUGS = LOCAL_BLOG_POSTS.map((post) => post.slug);

export function getLocalBlogPostBySlug(slug: string): LocalBlogPost | undefined {
  return LOCAL_BLOG_POSTS.find((post) => post.slug === slug);
}

export function getLocalRelatedPosts(slug: string, count = 3): LocalBlogPost[] {
  return LOCAL_BLOG_POSTS.filter((post) => post.slug !== slug).slice(0, count);
}
