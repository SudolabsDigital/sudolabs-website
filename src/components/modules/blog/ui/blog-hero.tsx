import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Hash, ArrowRight, Sparkles } from "lucide-react";
import { BlogMeta } from "@/lib/mdx-utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getDifficultyColor, getDifficultyLabel } from "@/lib/blog-ui-utils";

interface BlogHeroProps {
  post: BlogMeta;
}

export function BlogHero({ post }: BlogHeroProps) {
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(post.date));

  return (
    <section className="relative group mb-12 animate-in fade-in zoom-in duration-500">
      <Link 
        href={`/blog/${post.slug}`} 
        className="relative block rounded-[2rem] overflow-hidden border-2 border-slate-200/90 bg-white shadow-xl transition duration-500 cursor-pointer"
      >
        <div className="grid lg:grid-cols-12 gap-0 lg:gap-8">
          <div className="lg:col-span-7 h-72 lg:h-auto min-h-[350px] relative overflow-hidden bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200/90">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <Hash className="w-32 h-32 text-slate-300" />
              </div>
            )}
            <div className="absolute top-6 left-6 z-20 flex gap-2 flex-wrap">
              {post.featured && (
                <Badge className="bg-[#004481] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" /> Destacado
                </Badge>
              )}
              {post.category && (
                <Badge variant="secondary" className="bg-white text-slate-900 text-xs font-bold uppercase tracking-widest border border-slate-300 shadow-sm">
                  {post.category}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#004481]" /> 
                {formattedDate}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  • <Clock className="w-3.5 h-3.5 text-[#004481]" /> {post.readTime}
                </span>
              )}
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight text-slate-900 tracking-tight">
              {post.title}
            </h2>
            
            <p className="text-slate-600 text-lg mb-8 line-clamp-3 leading-relaxed font-normal">
              {post.description}
            </p>
            
            <div className="mt-auto flex items-center justify-between">
              {post.difficulty && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "uppercase tracking-wider text-[10px] py-1 font-bold bg-white border-slate-200 shadow-sm", 
                    getDifficultyColor(post.difficulty)
                  )}
                >
                  {getDifficultyLabel(post.difficulty)}
                </Badge>
              )}
              <span className="flex items-center gap-2 text-[#004481] font-bold text-sm uppercase tracking-widest">
                Leer Artículo 
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
