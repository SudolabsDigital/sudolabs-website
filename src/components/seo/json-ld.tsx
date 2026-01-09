export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sudolabs Perú",
    "alternateName": "Sudolabs Digital",
    "image": "https://sudolabs.space/assets/logo-full.webp",
    "description": "Consultora de Ingeniería de Software y Transformación Digital en Huancayo.",
    "disambiguatingDescription": "Empresa peruana de desarrollo de software y consultoría tecnológica con sede en Huancayo, especializada en soluciones web y modernización de plataformas.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Prolongacion Jose Carlos Mariategui 205",
      "addressLocality": "Huancayo",
      "addressRegion": "Junín",
      "addressCountry": "PE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -12.06513,
      "longitude": -75.20486
    },
    "url": "https://sudolabs.space",
    "telephone": "+51923384303",
    "email": "contacto@sudolabs.space",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}