import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Hash } from "lucide-react";
import { BlogMeta } from "@/lib/mdx-utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/blog-ui-utils";

interface BlogCardProps {
  post: BlogMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(post.date));

  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className="group block h-full"
    >
      <article className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200/90 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl cursor-pointer">
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-200/90">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100">
              <Hash className="w-16 h-16" />
            </div>
          )}
          
          <div className="absolute top-4 left-4 z-20">
            {post.category && (
              <Badge variant="secondary" className="bg-white/95 text-[#004481] border border-slate-200 shadow-sm uppercase tracking-widest text-[10px] font-bold">
                {post.category}
              </Badge>
            )}
          </div>

          {post.difficulty && (
            <div className="absolute bottom-4 right-4 z-20">
              <Badge 
                variant="outline" 
                className={cn(
                  "uppercase tracking-wider text-[10px] py-0.5 bg-white/95 border-slate-200 shadow-sm font-bold", 
                  getDifficultyColor(post.difficulty)
                )}
              >
                {getDifficultyLabel(post.difficulty)}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-1 bg-white/90">
          <h3 className="text-xl font-bold mb-3 leading-snug text-slate-900 tracking-tight line-clamp-2 group-hover:text-[#004481] transition-colors">
            {post.title}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed font-normal">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mt-auto pt-5 border-t border-slate-200/80">
            <span className="flex items-center gap-1.5 text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-[#004481]" /> 
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-[#004481]" /> 
              {post.readTime || '5 min'}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
