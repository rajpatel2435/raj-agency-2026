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
        },
        {
          // LocalBusiness entity — must match Google Business Profile NAP exactly.
          // TODO: Add streetAddress + postalCode if your GBP shows one,
          // and add your Google Maps listing URL to sameAs.
          "@type": "ProfessionalService",
          "@id": `${siteUrl}/#localbusiness-montreal`,
          "name": "Launch at Dawn",
          "parentOrganization": { "@id": `${siteUrl}/#organization` },
          "url": siteUrl,
          "image": `${siteUrl}/icon.svg`,
          "description": "Digital engineering and marketing agency in Montreal offering technical SEO, web development, and growth marketing.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Montreal",
            "addressRegion": "QC",
            "addressCountry": "CA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.5019,
            "longitude": -73.5674
          },
          "areaServed": [
            { "@type": "City", "name": "Montreal" },
            { "@type": "City", "name": "Vancouver" },
            { "@type": "Country", "name": "Canada" }
          ],
          "priceRange": "$$-$$$",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "knowsAbout": [
            "Technical SEO",
            "Local SEO",
            "Web Development",
            "Next.js",
            "Conversion Rate Optimization",
            "Digital PR"
          ]
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