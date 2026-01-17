import { BlogMeta } from "@/lib/mdx";

interface BlogJsonLdProps {
  post: BlogMeta;
}

export default function BlogJsonLd({ post }: BlogJsonLdProps) {
  const url = `https://sudolabs.space/blog/${post.slug}`;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": post.title,
    "description": post.description,
    "image": post.image ? `https://sudolabs.space${post.image}` : "https://sudolabs.space/opengraph-image.png",
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "Sudolabs Perú",
      "url": "https://sudolabs.space"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sudolabs Perú",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sudolabs.space/assets/logo-symbol.webp"
      }
    },
    "keywords": post.tags?.join(", ")
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
