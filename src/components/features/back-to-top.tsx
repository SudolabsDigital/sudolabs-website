"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Umbral: hora y media de pantalla. Aparecer antes estorba más de lo que ayuda. */
const UMBRAL_PANTALLAS = 1.5;

/**
 * Vuelta al inicio, abajo a la IZQUIERDA.
 *
 * A la derecha ya viven la burbuja de contacto (`bottom-8`) y la de Debian
 * (`bottom-28`); un tercer botón en esa columna convertiría la esquina en una
 * barra de herramientas.
 *
 * El desplazamiento respeta `prefers-reduced-motion`: `<html>` lleva
 * `scroll-smooth`, así que sin este cálculo el salto sería animado incluso para
 * quien ha pedido que no lo sea.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setVisible(window.scrollY > window.innerHeight * UMBRAL_PANTALLAS);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  const subir = () => {
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: sinMovimiento ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={subir}
          aria-label="Volver al inicio de la página"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-8 left-8 z-[100] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer bg-white/90 backdrop-blur-md border border-slate-200/90 text-slate-600 shadow-lg transition-colors hover:bg-[#004481] hover:border-[#004481] hover:text-white motion-safe:transition-transform motion-safe:hover:scale-105 motion-safe:active:scale-95"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
