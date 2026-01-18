import { BlogMeta } from "@/lib/mdx-utils";
import { siteConfig } from "@/core/config";
import { absoluteUrl } from "@/lib/utils";

interface BlogJsonLdProps {
  post: BlogMeta;
}

export default function BlogJsonLd({ post }: BlogJsonLdProps) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": post.title,
    "description": post.description,
    "image": post.image ? absoluteUrl(post.image) : absoluteUrl("/opengraph-image.webp"),
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "Sudolabs Perú",
      "url": siteConfig.siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sudolabs Perú",
      "logo": {
        "@type": "ImageObject",
        "url": absoluteUrl("/assets/logo-symbol.webp")
      }
    },
    "articleSection": post.category || "Technology",
    "keywords": post.tags?.join(", ")
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
