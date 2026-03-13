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
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000" />
      <Link 
        href={`/blog/${post.slug}`} 
        className="relative block rounded-[2rem] overflow-hidden border border-border/50 bg-card/40 hover:bg-card/60 transition duration-500"
      >
        <div className="grid lg:grid-cols-12 gap-0 lg:gap-8">
          <div className="lg:col-span-7 h-72 lg:h-auto min-h-[350px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 lg:bg-gradient-to-r" />
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            ) : (
              <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                <Hash className="w-32 h-32 text-foreground/5" />
              </div>
            )}
            <div className="absolute top-6 left-6 z-20 flex gap-2 flex-wrap">
              {post.featured && (
                <Badge className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-primary">
                  <Sparkles className="w-3 h-3" /> Destacado
                </Badge>
              )}
              {post.category && (
                <Badge variant="secondary" className="bg-background/80 backdrop-blur text-foreground text-xs font-bold uppercase tracking-widest border border-border/50 shadow-sm hover:bg-background/90">
                  {post.category}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground mb-6 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> 
                {formattedDate}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  • <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
              )}
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 line-clamp-3 leading-relaxed">
              {post.description}
            </p>
            
            <div className="mt-auto flex items-center justify-between">
              {post.difficulty && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "uppercase tracking-wider text-[10px] py-1", 
                    getDifficultyColor(post.difficulty)
                  )}
                >
                  {getDifficultyLabel(post.difficulty)}
                </Badge>
              )}
              <span className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest group/btn">
                Leer Artículo 
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
