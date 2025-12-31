export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SudolabsDigital",
    "image": "https://sudolabs.space/assets/logo-full.png",
    "description": "Consultora de software especializada en desarrollo web a medida, arquitectura de sistemas y transformación digital.",
    "address": {
      "@type": "PostalAddress",
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
    "email": "jososo1396@gmail.com",
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
      "https://github.com/sudolabs-digital"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}