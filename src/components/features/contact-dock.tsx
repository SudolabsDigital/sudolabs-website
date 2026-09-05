"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/core/config";
import { BrandIcon, type BrandIconName } from "@/components/ui/icons";
import { IconChip } from "@/components/ui/icons/icon-chip";

type Canal = { name: BrandIconName; href: string; label: string };

/** WhatsApp va PRIMERO: es el canal de contacto directo, no una red más. */
const CANALES: Canal[] = [
  { name: "whatsapp", href: `https://wa.me/${siteConfig.contact.whatsapp}`, label: "WhatsApp" },
  { name: "facebook", href: siteConfig.social.facebook, label: "Facebook" },
  { name: "instagram", href: siteConfig.social.instagram, label: "Instagram" },
  { name: "tiktok", href: siteConfig.social.tiktok, label: "TikTok" },
  { name: "github", href: siteConfig.social.github, label: "GitHub" },
];

/**
 * Burbuja de contacto desplegable.
 *
 * **Se abre hacia la IZQUIERDA, no hacia arriba.** Arriba está la burbuja de
 * Debian (`bottom-28` contra el `bottom-8` de esta): un abanico vertical se le
 * echaría encima y obligaría a que los dos componentes compartieran estado para
 * apartarse mutuamente. En horizontal no se tocan y siguen siendo independientes.
 *
 * Los cinco canales caben en móvil: 5 x 44 px + 4 huecos de 8 + el disparador
 * de 56 y su hueco = 320 px, dentro de los 375 px de la pantalla más estrecha
 * menos el margen.
 *
 * El disparador abre el menú en vez de enlazar directo: es un toque más, a
 * cambio de exponer el resto de canales desde el mismo sitio.
 */
export function ContactDock() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    const labelTimer = setTimeout(() => setShowLabel(false), 5500);
    return () => {
      clearTimeout(timer);
      clearTimeout(labelTimer);
    };
  }, []);

  // Escape y clic fuera. Solo se escucha mientras está abierto: un listener
  // permanente en `document` por una burbuja cerrada es coste sin uso.
  useEffect(() => {
    if (!abierto) return;
    const porTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    const porClic = (e: MouseEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("keydown", porTecla);
    document.addEventListener("mousedown", porClic);
    return () => {
      document.removeEventListener("keydown", porTecla);
      document.removeEventListener("mousedown", porClic);
    };
  }, [abierto]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={contenedor}
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-8 right-8 z-[100] flex items-center gap-2 md:gap-3"
        >
          {/* Canales desplegados */}
          <AnimatePresence>
            {abierto &&
              CANALES.map((canal, i) => (
                <motion.a
                  key={canal.name}
                  href={canal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={canal.label}
                  // El retardo escalona la salida de derecha a izquierda, en el
                  // mismo orden en que se leen.
                  initial={{ opacity: 0, x: 24, scale: 0.6 }}
                  animate={{ opacity: 1, x: 0, scale: 1, transition: { delay: i * 0.04 } }}
                  exit={{ opacity: 0, x: 24, scale: 0.6, transition: { delay: (CANALES.length - 1 - i) * 0.03 } }}
                  className="group rounded-full focus-visible:outline-none"
                >
                  <IconChip name={canal.name} label={canal.label} size="lg" shape="circle" />
                </motion.a>
              ))}
          </AnimatePresence>

          {/* Etiqueta de bienvenida, solo mientras está cerrado */}
          <AnimatePresence>
            {showLabel && !abierto && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="hidden md:block bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md text-slate-900 whitespace-nowrap"
              >
                Hablemos por WhatsApp
              </motion.div>
            )}
          </AnimatePresence>

          {/* Disparador */}
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-label={abierto ? "Cerrar canales de contacto" : "Abrir canales de contacto"}
            className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {abierto ? (
              <X className="w-7 h-7 md:w-8 md:h-8 text-white" />
            ) : (
              <BrandIcon name="whatsapp" className="w-8 h-8 md:w-9 md:h-9 text-white" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactDock;
