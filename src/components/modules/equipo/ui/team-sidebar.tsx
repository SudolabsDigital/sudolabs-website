"use client";

import Link from "next/link";
import { ArrowLeft, GraduationCap, MapPin, Languages, Share2 } from "lucide-react";
import { TeamMeta } from "@/lib/mdx-utils";
import { IconChip } from "@/components/ui/icons/icon-chip";
import { brandHex, type BrandIconName } from "@/components/ui/icons";
import { ShareButtons } from "@/components/modules/blog/share-buttons";

interface TeamSidebarProps {
  member: TeamMeta;
}

/** Enlaces del perfil, en el orden en que se muestran. */
const LINK_ORDER: { key: "github" | "linkedin" | "email"; icon: BrandIconName; label: string }[] = [
  { key: "github", icon: "github", label: "GitHub" },
  { key: "linkedin", icon: "linkedin", label: "LinkedIn" },
  { key: "email", icon: "email", label: "Correo" },
];

export function TeamSidebar({ member }: TeamSidebarProps) {
  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/equipo"
        className="inline-flex items-center text-xs font-bold text-muted-foreground hover:text-primary transition-colors group uppercase tracking-widest"
      >
        <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver al equipo
      </Link>

      {/* Ficha */}
      <div className="space-y-6 pb-8 border-b border-border/50">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Rol en Sudolabs
          </span>
          <div className="text-sm font-semibold text-foreground leading-snug">{member.role}</div>
        </div>

        {member.career && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Formación
            </span>
            <div className="text-sm font-semibold flex items-start gap-2 text-foreground leading-snug">
              <GraduationCap className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <span>
                {member.career}
                {member.university && (
                  <span className="block text-xs font-normal text-muted-foreground mt-0.5">
                    {member.university}
                  </span>
                )}
              </span>
            </div>
          </div>
        )}

        {member.location && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Ubicación
            </span>
            <div className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {member.location}
            </div>
          </div>
        )}

        {member.languages && member.languages.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Idiomas
            </span>
            <div className="text-sm font-semibold flex items-start gap-2 text-foreground">
              <Languages className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <span>{member.languages.join(" · ")}</span>
            </div>
          </div>
        )}
      </div>

      {/* Enlaces del perfil */}
      {member.links && (
        <div className="space-y-4 pb-8 border-b border-border/50">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
            Contacto
          </span>
          <ul className="space-y-2.5">
            {LINK_ORDER.map(({ key, icon, label }) => {
              const value = member.links?.[key];
              if (!value) return null;
              const href = key === "email" ? `mailto:${value}` : value;
              const isExternal = key !== "email";
              return (
                <li key={key}>
                  <a
                    href={href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{ ["--brand" as string]: brandHex(icon) }}
                    // `group` a secas, no `group/link`: IconChip escucha el
                    // grupo sin nombre. El `--brand` de aquí lo usa el TEXTO;
                    // el chip resuelve el suyo por dentro.
                    className="group flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-[var(--brand)] transition-colors"
                  >
                    <IconChip name={icon} size="sm" />
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Compartir: el mismo componente del blog, apuntando a /equipo */}
      <div className="space-y-4">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <Share2 className="w-3 h-3" /> Compartir perfil
        </span>
        <ShareButtons title={`${member.fullName} — ${member.role}`} slug={member.slug} basePath="equipo" />
      </div>
    </div>
  );
}
