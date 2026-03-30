import { MetadataRoute } from 'next';
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://launchatdawn.com";

  // 1. Fetch all active project slugs from Sanity
  // We filter by _type == "work" (or "caseStudy" depending on your schema name)
  const query = `*[_type == "work" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }`;

  const projects = await client.fetch(query);

  // 2. Map Static Routes
  const staticRoutes = ["", "/services", "/work", "/about", "/blog", "/contact/hello"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  // 3. Map Dynamic Project Routes from Sanity
  const dynamicRoutes = projects.map((project: any) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}