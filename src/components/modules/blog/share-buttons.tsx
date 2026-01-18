"use client";

import { useState } from "react";
import { Link2, Linkedin, Check, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/core/config";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.siteUrl}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: title,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex flex-col gap-2">
       {/* LinkedIn */}
       <Button
         variant="outline"
         size="icon"
         className="rounded-full w-10 h-10 hover:text-[#0077b5] hover:border-[#0077b5] transition-all"
         onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank')}
         title="Compartir en LinkedIn"
       >
          <Linkedin className="w-4 h-4" />
       </Button>

       {/* X (Twitter) */}
       <Button
         variant="outline"
         size="icon"
         className="rounded-full w-10 h-10 hover:text-foreground hover:border-foreground transition-all"
         onClick={() => window.open(`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=sudolabs_pe&hashtags=Desarrollo,Tecnología,Software`, '_blank')}
         title="Compartir en X"
       >
          <div className="w-4 h-4 relative">
             {/* Simple X Logo SVG Path */}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
          </div>
       </Button>

       {/* Facebook */}
       <Button
         variant="outline"
         size="icon"
         className="rounded-full w-10 h-10 hover:text-[#1877F2] hover:border-[#1877F2] transition-all"
         onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
         title="Compartir en Facebook"
       >
          <Facebook className="w-4 h-4" />
       </Button>

       {/* Copy Link / Native Share */}
       <Button
         variant="outline"
         size="icon"
         className="rounded-full w-10 h-10 hover:text-primary hover:border-primary transition-all"
         onClick={handleShare}
         title="Copiar Enlace"
       >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
       </Button>
    </div>
  );
}
