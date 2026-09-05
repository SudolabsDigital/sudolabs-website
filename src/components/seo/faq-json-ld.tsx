import { faqItems } from "@/core/faq-data";
import { siteConfig } from "@/core/config";

/**
 * `FAQPage` de la portada.
 *
 * La página mostraba cuatro preguntas y respuestas sin ningún dato estructurado
 * detrás. Es el hueco más barato de cerrar para que un motor generativo —o el
 * panel de resultados de Google— pueda citar la respuesta en vez de adivinarla.
 *
 * Lee del MISMO array que renderiza la sección visible: un `FAQPage` que no
 * coincide con lo que la página dice es peor que no tenerlo.
 */
export default function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.siteUrl}/#faq`,
    inLanguage: "es-PE",
    isPartOf: { "@id": `${siteConfig.siteUrl}/#website` },
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
