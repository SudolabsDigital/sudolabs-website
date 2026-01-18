import { siteConfig } from "@/core/config";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.siteUrl}/#organization`,
        "name": "Sudolabs Perú",
        "alternateName": "Sudolabs Digital",
        "image": `${siteConfig.siteUrl}/assets/logo-full.webp`,
        "logo": `${siteConfig.siteUrl}/assets/logo-symbol.webp`,
        "description": "Consultora de Ingeniería de Software y Transformación Digital en Huancayo.",
        "url": siteConfig.siteUrl,
        "telephone": siteConfig.contact.phone,
        "email": siteConfig.contact.email,
        "priceRange": "$$",
        "areaServed": [
          {
            "@type": "City",
            "name": "Huancayo"
          },
          {
            "@type": "State",
            "name": "Junín"
          },
          {
            "@type": "Country",
            "name": "Perú"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Prolongacion Jose Carlos Mariategui 205",
          "addressLocality": "Huancayo",
          "addressRegion": "Junín",
          "postalCode": "12001",
          "addressCountry": "PE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -12.06513,
          "longitude": -75.20486
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
          "https://github.com/sudolabs-digital",
          siteConfig.social.facebook,
          siteConfig.social.instagram,
          siteConfig.social.tiktok
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        "url": siteConfig.siteUrl,
        "name": "Sudolabs Perú",
        "description": "Consultora de Software y Tecnología en Huancayo",
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