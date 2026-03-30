import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/studio/', // Disallow crawling of your Sanity Studio
        '/admin/', 
        '/api/',
      ],
    },
    sitemap: 'https://launchatdawn.com/sitemap.xml',
  };
}