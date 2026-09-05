import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getContentBySlug, getAllContent, getHeadings } from "@/lib/mdx";
import { TeamMeta } from "@/lib/mdx-utils";
import { CustomComponents } from "@/components/modules/blog/mdx-components";
import { TableOfContents } from "@/components/modules/blog/table-of-contents";
import { TeamSidebar } from "@/components/modules/equipo/ui/team-sidebar";
import { TeamJsonLd } from "@/components/seo/team-json-ld";
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";
import { BrandIcon } from "@/components/ui/icons";
import { brandForSkill } from "@/components/ui/icons/skill-icons";
import { TeamProfileHeader } from "@/components/modules/equipo/ui/team-profile-header";
import { siteConfig } from "@/core/config";

export async function generateStaticParams() {
  const members = await getAllContent<TeamMeta>("team");
  return members.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const member = await getContentBySlug<TeamMeta>("team", params.slug);
  if (!member) return {};

  // Sin sufijo de marca: el layout aplica el template `%s | Sudolabs Perú`.
  const title = `${member.meta.fullName} — ${member.meta.role}`;
  // Open Graph y Twitter NO pasan por el template, así que ahí sí se nombra.
  const socialTitle = `${title} | Sudolabs Perú`;
  return {
    title,
    description: member.meta.description,
    alternates: { canonical: `${siteConfig.siteUrl}/equipo/${params.slug}` },
    openGraph: {
      title: socialTitle,
      description: member.meta.description,
      type: "profile",
      images: member.meta.image ? [{ url: member.meta.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: member.meta.description,
      images: member.meta.image ? [member.meta.image] : undefined,
    },
  };
}

export default async function TeamMemberPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const member = await getContentBySlug<TeamMeta>("team", params.slug);

  if (!member) {
    notFound();
  }

  const headings = getHeadings(member.content);
  const { meta } = member;

  return (
    <div className="min-h-screen bg-background font-sans pb-24">
      <TeamJsonLd members={[meta]} />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", item: "/" },
          { name: "Equipo", item: "/equipo" },
          { name: meta.fullName },
        ]}
      />

      <TeamProfileHeader member={meta} />

      {/* relative z-10: el fondo Aurora (`GlobalSpotlight`) es `fixed inset-0 z-0`,
          o sea un elemento POSICIONADO, y por orden de pintado se dibuja encima de
          todo bloque sin posicionar — incluido el fondo blanco de este <main>. Las
          barras laterales se libraban por ser `sticky`. Sin esta línea el contenido
          central se lee sobre el degradado morado. */}
      <div className="container mx-auto px-6 max-w-[1400px] pt-12 md:pt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Ficha lateral */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white shadow-sm p-6">
              <TeamSidebar member={meta} />
            </div>
          </aside>

          <main className="lg:col-span-9 xl:col-span-7 rounded-3xl border border-slate-200/90 bg-white shadow-sm p-6 md:p-10">
            <Link
              href="/equipo"
              className="lg:hidden inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors mb-8 uppercase tracking-widest"
            >
              <ArrowLeft className="w-3 h-3 mr-2" />
              Volver al equipo
            </Link>

            {/* Orientación: la pregunta de "qué rol te llama y por qué" */}
            <section className="mb-12 p-6 md:p-8 rounded-3xl bg-[#004481]/5 border border-[#004481]/15">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#004481] block mb-3">
                {meta.orientation}
              </span>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed italic">
                &laquo;{meta.focus}&raquo;
              </p>
            </section>

            <article className="max-w-none text-slate-700 text-lg leading-relaxed article-content">
              <MDXRemote
                source={member.content}
                components={CustomComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </article>

            {/* Competencias, agrupadas como en su CV */}
            {meta.skills && meta.skills.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-8 tracking-tight">
                  Competencias técnicas
                </h2>
                <div className="space-y-6">
                  {meta.skills.map((group) => (
                    <div key={group.label}>
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#004481] mb-3">
                        {group.label}
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {group.items.map((item) => {
                          const brand = brandForSkill(item);
                          return (
                            <li
                              key={item}
                              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg"
                            >
                              {/* Sin logo cuando no es una marca: Scrum o
                                  Wireframes no tienen ni deben tenerlo. */}
                              {brand && <BrandIcon name={brand} className="w-3.5 h-3.5 text-slate-500" />}
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Participación en el portafolio */}
            {meta.projects && meta.projects.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
                  Participación en proyectos
                </h2>
                <p className="text-sm text-slate-600 mb-8">
                  Su rol concreto en cada sistema del portafolio.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {meta.projects.map((project) => {
                    const content = (
                      <>
                        <span className="block text-sm font-bold text-slate-900 group-hover/proj:text-[#004481] transition-colors">
                          {project.name}
                        </span>
                        <span className="block mt-1 text-xs text-slate-600 leading-relaxed">
                          {project.role}
                        </span>
                      </>
                    );
                    return (
                      <li key={project.name}>
                        {project.slug ? (
                          <Link
                            href={`/proyectos/${project.slug}`}
                            className="group/proj flex items-start justify-between gap-3 p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-[#004481]/40 hover:shadow-sm transition"
                          >
                            <span className="min-w-0">{content}</span>
                            <ArrowUpRight className="w-4 h-4 text-[#004481] shrink-0 mt-0.5" />
                          </Link>
                        ) : (
                          <div className="p-4 rounded-2xl border border-slate-200/90 bg-white">
                            {content}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </main>

          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white shadow-sm p-6">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
