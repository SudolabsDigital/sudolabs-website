"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type BrandIconName } from "@/components/ui/icons";
import { IconChip } from "@/components/ui/icons/icon-chip";
import { siteConfig } from "@/core/config";

interface ShareButtonsProps {
  title: string;
  slug: string;
  /**
   * Sección a la que pertenece el contenido, sin barras.
   *
   * Antes la ruta `/blog` estaba incrustada en la construcción de la URL, así
   * que el componente solo servía al blog: cualquier otra sección compartía
   * enlaces rotos. Se mantiene `"blog"` por defecto para no tocar sus usos.
   */
  basePath?: string;
}

/** Redes en las que se ofrece compartir, en orden de aparición. */
const NETWORKS: { name: BrandIconName; label: string; href: (u: string, t: string) => string }[] = [
  {
    name: "linkedin",
    label: "Compartir en LinkedIn",
    href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  },
  {
    name: "x",
    label: "Compartir en X",
    href: (u, t) => {
      const params = new URLSearchParams({ text: decodeURIComponent(t), url: decodeURIComponent(u) });
      // `via` solo se envía si la cuenta existe de verdad: ver `siteConfig.xHandle`.
      if (siteConfig.xHandle) params.set("via", siteConfig.xHandle);
      return `https://x.com/intent/tweet?${params.toString()}`;
    },
  },
  {
    name: "facebook",
    label: "Compartir en Facebook",
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`,
  },
  {
    name: "whatsapp",
    label: "Compartir por WhatsApp",
    href: (u, t) => `https://wa.me/?text=${t}%20${u}`,
  },
];

export function ShareButtons({ title, slug, basePath = "blog" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.siteUrl}/${basePath}/${slug}`;

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
        await navigator.share({ title, url });
      } catch (err) {
        console.error("Error sharing:", err);
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {NETWORKS.map((network) => (
        <Button
          key={network.name}
          variant="ghost"
          size="icon"
          // El botón solo aporta comportamiento; lo visual lo pone el chip.
          // Pasa de 36 a 44 px, el mínimo táctil.
          className="group w-11 h-11 rounded-full p-0 hover:bg-transparent"
          onClick={() => window.open(network.href(encodedUrl, encodedTitle), "_blank", "noopener,noreferrer")}
          title={network.label}
          aria-label={network.label}
        >
          <IconChip name={network.name} size="lg" shape="circle" />
        </Button>
      ))}

      {/* Compartir nativo, con copia del enlace como alternativa */}
      <Button
        variant="outline"
        size="icon"
        // 44px como los chips de marca de al lado: no entra en el sistema de
        // iconos —su glifo es de lucide y no tiene color de marca— pero si se
        // queda en 36 la fila se ve descuadrada.
        className="rounded-full w-11 h-11 bg-slate-100 border-slate-200/90 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
        onClick={handleShare}
        title="Copiar enlace"
        aria-label="Copiar enlace"
      >
        {copied ? (
          <Check className="w-5 h-5 text-[var(--color-success-green)]" />
        ) : (
          <Link2 className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
