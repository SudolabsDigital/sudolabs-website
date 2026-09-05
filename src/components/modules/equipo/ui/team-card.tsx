import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TeamMeta } from "@/lib/mdx-utils";
import { type BrandIconName } from "@/components/ui/icons";
import { IconChip } from "@/components/ui/icons/icon-chip";

interface TeamCardProps {
  member: TeamMeta;
  /** El destacado se muestra a mayor altura dentro de la misma rejilla. */
  priority?: boolean;
}

/**
 * Los retratos vienen recortados sin fondo y cortados limpiamente al torso, así
 * que se tratan como figura y no como foto: fondo claro con un halo de marca
 * detrás de la cabeza y anclaje `object-bottom`, para que la persona apoye en el
 * borde inferior del panel en vez de flotar recortada dentro de un círculo.
 *
 * El fondo se mantiene CLARO a propósito: ambos visten saco oscuro y sobre el
 * azul de marca la silueta se perdería.
 */
export function TeamCard({ member, priority = false }: TeamCardProps) {
  return (
    <Link href={`/equipo/${member.slug}`} className="group block h-full">
      <article className="h-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#004481]/30">
        {/* Retrato */}
        {/* El panel del retrato conserva tono en toda su altura. Antes el
            degradado acababa en blanco y se fundía con la zona de texto: las
            dos mitades se leían como una sola mancha clara. */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#004481]/[0.10] via-slate-100 to-[#3178c6]/15">
          {/* Halo de marca detrás de la figura */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[12%] h-48 w-48 -translate-x-1/2 rounded-full bg-[#3178c6]/20 blur-2xl"
          />
          {member.image && (
            <Image
              src={member.image}
              alt={member.fullName}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="relative object-cover object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}

          <span className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full bg-white/95 border border-slate-200 shadow-sm text-[10px] font-bold uppercase tracking-widest text-[#004481]">
            {member.orientation.split("·")[0].trim()}
          </span>
        </div>

        {/* Ficha */}
        {/* Zona de texto en blanco puro y separada por un borde: el panel del
            retrato lleva degradado, y sin corte el texto se leía sobre un fondo
            azulado que le restaba contraste. */}
        <div className="p-6 flex flex-col flex-1 bg-white border-t border-slate-200/90">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#004481] transition-colors">
            {member.fullName}
          </h3>
          <p className="mt-1.5 text-xs font-bold uppercase tracking-widest text-[#004481]">
            {member.role}
          </p>

          <p className="mt-4 text-sm text-slate-700 leading-relaxed line-clamp-3 flex-1">
            {member.description}
          </p>

          {member.skills && member.skills.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {member.skills.slice(0, 4).map((group) => (
                <li
                  key={group.label}
                  className="px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-slate-600 border border-slate-200 rounded bg-slate-50"
                >
                  {group.label}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
            {/* Decorativos a propósito (`interactive={false}`): aquí los iconos
                no son enlaces —lo enlazable es la tarjeta entera— y encender
                tres colores de marca a la vez al pasar por encima de ella
                convierte el pie en un arcoíris. */}
            <div className="flex items-center gap-2">
              {(["github", "linkedin", "email"] as const).map((key) => {
                const value = member.links?.[key];
                if (!value) return null;
                return (
                  <IconChip
                    key={key}
                    name={key as BrandIconName}
                    size="sm"
                    interactive={false}
                  />
                );
              })}
            </div>
            <span className="flex items-center gap-2 text-xs font-bold text-[#004481] uppercase tracking-widest">
              Ver perfil <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
