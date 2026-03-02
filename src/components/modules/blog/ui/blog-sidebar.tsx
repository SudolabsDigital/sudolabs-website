"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Clock, Share2, ArrowUpRight, ArrowLeft } from "lucide-react";
import { BlogMeta, ProjectMeta } from "@/lib/mdx-utils";
import { ShareButtons } from "../share-buttons";
import { cn } from "@/lib/utils";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/blog-ui-utils";

interface BlogSidebarProps {
  post: BlogMeta;
  relatedProject?: ProjectMeta | null;
}

export function BlogSidebar({ post, relatedProject }: BlogSidebarProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. Back Link - Now more integrated */}
      <Link 
        href="/blog" 
        className="inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors group uppercase tracking-widest"
      >
        <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver al Blog
      </Link>

      {/* 2. Main Info Card (Glass style) */}
      <div className="space-y-6 pb-8 border-b border-border/50">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Fecha de publicación</span>
          <div className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary" /> 
            {format(new Date(post.date), "d MMM, yyyy", { locale: es })}
          </div>
        </div>

        {post.readTime && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tiempo de lectura</span>
            <div className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <Clock className="w-3.5 h-3.5 text-primary" /> 
              {post.readTime}
            </div>
          </div>
        )}

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Nivel técnico</span>
          <div className={cn(
            "inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", 
            getDifficultyColor(post.difficulty)
          )}>
            {getDifficultyLabel(post.difficulty)}
          </div>
        </div>
      </div>

      {/* 3. Compact Share Section */}
      <div className="space-y-4">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <Share2 className="w-3 h-3" /> Compartir artículo
        </span>
        <ShareButtons title={post.title} slug={post.slug} />
      </div>

      {/* 4. Related Project (Redesigned for compactness) */}
      {relatedProject && (
        <div className="mt-4 space-y-4">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Caso de Estudio</span>
          <Link href={`/proyectos/${relatedProject.slug}`} className="block group">
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 hover:border-primary/50 transition-all p-3 flex gap-3 items-center">
              {relatedProject.image && (
                <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-border/50">
                  <Image 
                    src={relatedProject.image} 
                    alt={relatedProject.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[11px] leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {relatedProject.title}
                </h4>
                <div className="text-[9px] text-muted-foreground flex items-center gap-1 mt-1 font-bold uppercase tracking-wider">
                  Ver proyecto <ArrowUpRight className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
