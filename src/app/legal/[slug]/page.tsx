import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

import { getContentBySlug, getAllContent, getHeadings } from "@/lib/mdx";
import { BlogMeta } from "@/lib/mdx-utils";
import { CustomComponents } from "@/components/modules/blog/mdx-components";
import { TableOfContents } from "@/components/modules/blog/table-of-contents";
import PageHero from "@/components/ui/page-hero";
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";

export async function generateStaticParams() {
  const docs = await getAllContent<BlogMeta>("legal");
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const doc = await getContentBySlug<BlogMeta>("legal", params.slug);
  if (!doc) return {};
  
  return {
    title: `${doc.meta.title} | Sudolabs Perú`,
    description: doc.meta.description,
    alternates: {
      canonical: `https://sudolabs.space/legal/${params.slug}`,
    },
  };
}

export default async function LegalPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const doc = await getContentBySlug<BlogMeta>("legal", params.slug);

  if (!doc) {
    notFound();
  }

  const headings = getHeadings(doc.content);

  return (
    <div className="min-h-screen bg-background font-sans pb-24">
      <BreadcrumbSchema 
        items={[
          { name: "Inicio", item: "/" },
          { name: "Legal", item: "#" },
          { name: doc.meta.title, item: `/legal/${params.slug}` }
        ]} 
      />
      
      <PageHero 
        title={doc.meta.title}
        subtitle="DOCUMENTACIÓN LEGAL"
        description={doc.meta.description}
        imageSrc={doc.meta.image || "/assets/images/blogs/bienvenidos-a-sudolabs.webp"}
        size="compact"
        align="left"
        breadcrumbs={[
          { label: "Legal", href: "#" },
          { label: doc.meta.title }
        ]}
      />

      <div className="container mx-auto px-6 max-w-[1400px] pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* MAIN CONTENT */}
            <main className="lg:col-span-8 xl:col-span-9">
                <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none article-content">
                    <MDXRemote 
                        source={doc.content} 
                        components={CustomComponents} 
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [
                                    [
                                        rehypePrettyCode,
                                        {
                                            theme: "github-dark",
                                            keepBackground: false,
                                            defaultLang: "plaintext",
                                        }
                                    ]
                                ]
                            }
                        }}
                    />
                </article>

                <div className="mt-20 border-t border-border pt-8 text-xs text-muted-foreground italic">
                    Última revisión: {doc.meta.date} — Sudolabs Perú, Departamento Legal.
                </div>
            </main>

            {/* RIGHT SIDEBAR (Sticky TOC) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
                 <div className="sticky top-24">
                     <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                            Contenido del documento
                        </h4>
                        <TableOfContents headings={headings} />
                     </div>
                 </div>
            </aside>

        </div>
      </div>
    </div>
  );
}
