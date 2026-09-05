import { ProjectMeta } from "@/lib/mdx-utils";
import { siteConfig } from "@/core/config";
import { absoluteUrl } from "@/lib/utils";

/**
 * Datos estructurados del caso de proyecto.
 *
 * Sin este bloque las páginas de caso solo emiten el schema global del layout
 * y quedan sin identidad propia para un buscador.
 *
 * Se declara como `Article` —un caso de estudio es un artículo sobre un
 * trabajo—, no como `Service` ni `Product`: ni se vende el proyecto ni tiene
 * precio. `about` nombra al cliente cuando el frontmatter lo declara.
 */
export default function ProjectJsonLd({ project }: { project: ProjectMeta }) {
  const url = absoluteUrl(`/proyectos/${project.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: project.title,
    description: project.description,
    image: absoluteUrl(project.image || "/opengraph-image.webp"),
    datePublished: project.date,
    dateModified: project.date,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.siteUrl },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/logo-symbol.webp") },
    },
    ...(project.client ? { about: { "@type": "Organization", name: project.client } } : {}),
    ...(project.tags?.length ? { keywords: project.tags.join(", ") } : {}),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
