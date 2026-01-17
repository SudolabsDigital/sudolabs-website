export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://sudolabs.space/#organization",
        "name": "Sudolabs Perú",
        "alternateName": "Sudolabs Digital",
        "image": "https://sudolabs.space/assets/logo-full.webp",
        "logo": "https://sudolabs.space/assets/logo-symbol.webp",
        "description": "Consultora de Ingeniería de Software y Transformación Digital en Huancayo.",
        "url": "https://sudolabs.space",
        "telephone": "+51923384303",
        "email": "contacto@sudolabs.space",
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
          "https://www.facebook.com/profile.php?id=61585696276461",
          "https://www.instagram.com/sudolabsperu/",
          "https://www.tiktok.com/@sudolabs_peru"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://sudolabs.space/#website",
        "url": "https://sudolabs.space",
        "name": "Sudolabs Perú",
        "description": "Consultora de Software y Tecnología en Huancayo",
        "publisher": {
          "@id": "https://sudolabs.space/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://sudolabs.space/blog?search={search_term_string}"
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