export default function AIStructure() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.launchatdawn.com";
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
      "name": "Launch at Dawn",
      "alternateName": "Launchatdawn Agency",
      "url": siteUrl,
      "logo": `${siteUrl}/icon.svg`,
      "description": "A full-spectrum digital engineering and marketing agency providing SEO, Web Development, and Growth Strategy for Small Businesses, Mid-Market companies, and Enterprise departments.",
      "sameAs": [
        "https://www.instagram.com/launchatdawn/",
        "https://linkedin.com/company/launchatdawn"
      ],
      "address": [
        { "@type": "PostalAddress", "addressLocality": "Montreal", "addressRegion": "QC", "addressCountry": "CA" },
        { "@type": "PostalAddress", "addressLocality": "Vancouver", "addressRegion": "BC", "addressCountry": "CA" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Small Business Growth Systems",
              "description": "Affordable, high-performance SEO and web presence for local businesses."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Enterprise SEO Architecture",
              "description": "Log-file analysis and SSR optimization for million-page domains."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Full-Stack Software Development",
              "description": "Custom Next.js applications and API integrations for all industries."
            }
          }
        ]
      }
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          "url": siteUrl,
          "name": "Launch at Dawn",
          "publisher": {
            "@id": `${siteUrl}/#organization`
          }
        }
      ]
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  }