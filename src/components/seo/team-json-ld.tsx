import { siteConfig } from "@/core/config";
import { TeamMeta } from "@/lib/mdx-utils";

/**
 * Schema `Person` para los perfiles del equipo.
 *
 * Vive aparte del JSON-LD global (`seo/json-ld.tsx`) a propósito: aquel se
 * renderiza en el layout y saldría en las 104 páginas del sitio. Aquí la
 * organización se referencia por `@id`, así que Google une ambos grafos sin
 * duplicar la ficha de empresa.
 */
export function TeamJsonLd({ members }: { members: TeamMeta[] }) {
  const orgId = `${siteConfig.siteUrl}/#organization`;

  const people = members.map((member) => {
    const sameAs = [member.links?.github, member.links?.linkedin].filter(Boolean);

    return {
      "@type": "Person",
      "@id": `${siteConfig.siteUrl}/equipo/${member.slug}#person`,
      name: member.fullName,
      jobTitle: member.role,
      description: member.description,
      image: member.image ? `${siteConfig.siteUrl}${member.image}` : undefined,
      url: `${siteConfig.siteUrl}/equipo/${member.slug}`,
      email: member.links?.email ? `mailto:${member.links.email}` : undefined,
      worksFor: { "@id": orgId },
      ...(member.university && {
        alumniOf: { "@type": "CollegeOrUniversity", name: member.university },
      }),
      ...(member.location && {
        address: { "@type": "PostalAddress", addressLocality: siteConfig.contact.city },
      }),
      // Las competencias declaradas, aplanadas: `knowsAbout` espera términos.
      knowsAbout: member.skills?.flatMap((group) => group.items).slice(0, 30),
      ...(sameAs.length > 0 && { sameAs }),
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...people,
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        // Quien tenga `featured` es el fundador; el resto, integrantes.
        founder: people.filter((_, i) => members[i].featured).map((p) => ({ "@id": p["@id"] })),
        employee: people.map((p) => ({ "@id": p["@id"] })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default TeamJsonLd;
