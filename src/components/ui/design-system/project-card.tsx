import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProjectMeta } from "@/lib/mdx-utils";
import { LivePreviewBadge } from "@/components/ui/live-preview-badge";

interface ProjectCardProps {
  project: ProjectMeta;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/proyectos/${project.slug}`} className="block h-full">
      <article className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-sm transition-shadow">
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-200/90">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}

          {project.logo && (
            <div className="absolute top-4 left-4 z-20 h-10 w-20 rounded-lg bg-white/95 border border-slate-200 shadow-sm p-1.5">
              <div className="relative w-full h-full">
                <Image src={project.logo} alt={`${project.title} Logo`} fill sizes="80px" className="object-contain" />
              </div>
            </div>
          )}

          {project.websiteUrl && (
            <div className="absolute top-4 right-4 z-20">
              <LivePreviewBadge
                url={project.websiteUrl}
                className="bg-white/90 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"
              />
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          {project.type === "producto-propio" && (
            <span className="mb-3 w-fit px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#004481] bg-[#004481]/5 border border-[#004481]/20 rounded-full">
              Producto Propio
            </span>
          )}
          <h4 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">
            {project.title}
          </h4>
          <p className="text-sm text-slate-600 mb-6 line-clamp-2 flex-1 leading-relaxed">
            {project.description}
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-[#004481] uppercase tracking-widest">
            Detalles <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}
