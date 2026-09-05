import Link from "next/link";
import { Home, FileText, Briefcase, Users } from "lucide-react";

export const metadata = {
  title: "Página no encontrada",
  // Un 404 no debe competir en el índice con el contenido real.
  robots: { index: false, follow: true },
};

const SALIDAS = [
  { href: "/servicios", label: "Servicios", Icono: Briefcase },
  { href: "/proyectos", label: "Proyectos", Icono: FileText },
  { href: "/blog", label: "Blog", Icono: FileText },
  { href: "/equipo", label: "Equipo", Icono: Users },
];

/**
 * 404 propio. Antes se servía el genérico de Next, que devuelve el código
 * correcto pero deja al visitante sin ninguna salida.
 *
 * Lleva `relative z-10` y caja blanca por el mismo motivo que el resto del
 * sitio: la Aurora es `fixed inset-0 z-0` y se pinta encima de todo bloque sin
 * posicionar.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-transparent font-sans pb-24 pt-32">
      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <div className="rounded-3xl border border-slate-200/90 bg-white shadow-sm p-8 md:p-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#004481]">Error 404</p>
          <h1 className="mt-4 text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Esta página no existe
          </h1>
          <p className="mt-5 text-slate-700 leading-relaxed">
            Puede que el enlace esté mal escrito o que el contenido haya cambiado de sitio.
            Desde aquí llegas a cualquier parte del sitio.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3">
            {SALIDAS.map(({ href, label, Icono }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200/90 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition-colors hover:border-[#004481]/40 hover:text-[#004481]"
                >
                  <Icono className="w-4 h-4 text-[#004481]" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#004481] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#003366]"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
