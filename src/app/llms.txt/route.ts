import { getAllContent, BlogMeta, ProjectMeta, TeamMeta } from "@/lib/mdx";
import { siteConfig } from "@/core/config";
import { faqItems } from "@/core/faq-data";

/**
 * `/llms.txt` — el índice del sitio en markdown para motores generativos.
 *
 * Se GENERA desde el contenido, no se escribe a mano: una lista estática se
 * queda vieja con el siguiente artículo publicado, y un índice desactualizado
 * le da al motor una versión del sitio que ya no existe.
 *
 * Convención: https://llmstxt.org — título, resumen y secciones de enlaces con
 * su descripción. Es lo que permite a un agente entender el sitio sin rastrear
 * las 123 páginas.
 */
export const dynamic = "force-static";

const linea = (titulo: string, ruta: string, desc?: string) =>
  `- [${titulo}](${siteConfig.siteUrl}${ruta})${desc ? `: ${desc}` : ""}`;

export async function GET() {
  const [posts, projects, team] = await Promise.all([
    getAllContent<BlogMeta>("blog"),
    getAllContent<ProjectMeta>("projects"),
    getAllContent<TeamMeta>("team"),
  ]);

  const cuerpo = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Consultora de ingeniería de software con sede en ${siteConfig.contact.city}, ${siteConfig.contact.region}, ${siteConfig.contact.country}.`,
    "Desarrollo a medida, sistemas web, arquitectura cloud y productos propios.",
    "Sectores con trabajo entregado: transporte, salud, educación, seguridad y construcción.",
    "",
    "## Páginas principales",
    linea("Servicios", "/servicios", "Qué hacemos y cómo se contrata"),
    linea("Proyectos", "/proyectos", "Casos de estudio con resultados medidos"),
    linea("Equipo", "/equipo", "Las personas que construyen cada sistema"),
    linea("Nosotros", "/nosotros", "Cómo trabajamos y por qué"),
    linea("Blog", "/blog", "Artículos técnicos sobre los problemas que resolvemos"),
    linea("Contacto", "/contacto", "Solicitar una propuesta"),
    "",
    "## Casos de proyecto",
    ...projects.map((p) => linea(p.title, `/proyectos/${p.slug}`, p.description)),
    "",
    "## Artículos",
    ...posts.map((p) => linea(p.title, `/blog/${p.slug}`, p.description)),
    "",
    "## Equipo",
    ...team.map((m) => linea(m.fullName, `/equipo/${m.slug}`, m.role)),
    "",
    "## Preguntas frecuentes",
    ...faqItems.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    "## Legal",
    linea("Política de Privacidad", "/legal/privacidad"),
    linea("Términos y Condiciones", "/legal/terminos"),
    "",
  ].join("\n");

  return new Response(cuerpo, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
