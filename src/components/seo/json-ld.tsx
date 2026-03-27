import { siteConfig } from "@/core/config";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.siteUrl}/#organization`,
        "name": siteConfig.name,
        "alternateName": "Sudolabs Digital",
        "image": `${siteConfig.siteUrl}/assets/logo-full.webp`,
        "logo": `${siteConfig.siteUrl}/assets/logo-symbol.webp`,
        "description": siteConfig.shortDescription,
        "url": siteConfig.siteUrl,
        "telephone": siteConfig.contact.phone,
        "email": siteConfig.contact.email,
        "priceRange": "$$",
        "areaServed": [
          {
            "@type": "City",
            "name": siteConfig.contact.city
          },
          {
            "@type": "State",
            "name": siteConfig.contact.region
          },
          {
            "@type": "Country",
            "name": siteConfig.contact.country
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": siteConfig.contact.address.split(",")[0],
          "addressLocality": siteConfig.contact.city,
          "addressRegion": siteConfig.contact.region,
          "postalCode": siteConfig.contact.postalCode,
          "addressCountry": "PE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": siteConfig.contact.geo.latitude,
          "longitude": siteConfig.contact.geo.longitude
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          siteConfig.social.github,
          siteConfig.social.facebook,
          siteConfig.social.instagram,
          siteConfig.social.tiktok
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        "url": siteConfig.siteUrl,
        "name": siteConfig.name,
        "description": siteConfig.shortDescription,
        "publisher": {
          "@id": `${siteConfig.siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteConfig.siteUrl}/blog?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}