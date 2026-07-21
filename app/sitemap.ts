import { MetadataRoute } from 'next';
import { client } from "@/sanity/lib/client";
import { SITE_URL } from './seo';
import { LOCAL_BLOG_SLUGS } from './blog/localPosts';
import { LOCAL_SLUGS } from './local/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/case-study-teardown`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact/hello`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/start`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/restaurant-growth`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/montreal-seo-agency`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/vancouver-digital-agency`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/best-seo-agencies-montreal`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/best-digital-agencies-vancouver`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/local`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/tools/ai-agent`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/tools/ai-visibility-checker`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/tools/authority-checker`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/tools/seo-checker`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/tools/graphic-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/tools/badge`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/tools/meta-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/tools/utm-builder`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/tools/roi-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const [workItems, blogPosts, servicePages] = await Promise.all([
    client.fetch(`*[_type == "work" && defined(slug.current)] { "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "post" && defined(slug.current)] { "slug": slug.current, _updatedAt }`),
    client.fetch(`*[_type == "service" && defined(slug.current)] { "slug": slug.current, _updatedAt }`),
  ]);

  const defaultServiceSlugs = ["strategy", "seo", "pr", "data", "design", "engineering"];
  const serviceSlugSet = new Set<string>(defaultServiceSlugs);
  for (const service of servicePages) {
    if (service?.slug) serviceSlugSet.add(service.slug);
  }

  const workRoutes: MetadataRoute.Sitemap = workItems.map((project: { slug: string; _updatedAt: string }) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: new Date(project._updatedAt || now),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogSlugSet = new Set<string>(LOCAL_BLOG_SLUGS);
  for (const post of blogPosts) {
    if (post?.slug) blogSlugSet.add(post.slug);
  }

  const blogLastModifiedMap = new Map<string, string>();
  for (const post of blogPosts) {
    if (post?.slug) blogLastModifiedMap.set(post.slug, post._updatedAt);
  }

  const blogRoutes: MetadataRoute.Sitemap = Array.from(blogSlugSet).map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(blogLastModifiedMap.get(slug) || now),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const servicesRoutes: MetadataRoute.Sitemap = Array.from(serviceSlugSet).map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const localRoutes: MetadataRoute.Sitemap = LOCAL_SLUGS.map((slug) => ({
    url: `${SITE_URL}/local/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...blogRoutes, ...servicesRoutes, ...localRoutes];
}