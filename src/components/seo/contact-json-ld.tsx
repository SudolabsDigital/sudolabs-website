import { siteConfig } from "@/core/config";
import { absoluteUrl } from "@/lib/utils";

/**
 * Datos estructurados de la página de contacto.
 *
 * `mainEntity` apunta por `@id` al bloque `ProfessionalService` que ya emite el
 * layout, en vez de repetir dirección, teléfono y horarios. Duplicar esos datos
 * sería tenerlos en dos sitios que un día discreparán.
 */
export default function ContactJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": absoluteUrl("/contacto"),
    name: `Contacto · ${siteConfig.name}`,
    description:
      "Cuéntanos tu proyecto: desarrollo a medida, consultoría técnica o automatización de procesos.",
    inLanguage: "es-PE",
    isPartOf: { "@id": `${siteConfig.siteUrl}/#website` },
    mainEntity: { "@id": `${siteConfig.siteUrl}/#organization` },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
