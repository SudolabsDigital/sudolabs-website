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
      className="group flex flex-col h-full rounded-3xl border border-border/50 bg-card/20 hover:bg-card/40 hover:border-primary/30 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="h-52 bg-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/10 bg-gradient-to-br from-muted/50 to-background">
            <Hash className="w-16 h-16" />
          </div>
        )}
        
        <div className="absolute top-4 left-4 z-20">
          {post.category && (
            <Badge variant="secondary" className="bg-background/90 backdrop-blur text-foreground border border-border/50 shadow-sm uppercase tracking-widest text-[10px]">
              {post.category}
            </Badge>
          )}
        </div>

        {post.difficulty && (
          <div className="absolute bottom-4 right-4 z-20">
            <Badge 
              variant="outline" 
              className={cn(
                "uppercase tracking-wider text-[10px] py-0.5 bg-background/90 backdrop-blur border-border/50 shadow-sm", 
                getDifficultyColor(post.difficulty)
              )}
            >
              {getDifficultyLabel(post.difficulty)}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mt-auto pt-6 border-t border-border/30">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" /> 
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" /> 
            {post.readTime || '5 min'}
          </span>
        </div>
      </div>
    </Link>
  );
}
