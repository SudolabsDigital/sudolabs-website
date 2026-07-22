"use client";

import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/core/config";
import { useState, useEffect } from "react";

export function WhatsAppCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  // Aparece después de un pequeño scroll o tiempo
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    const labelTimer = setTimeout(() => setShowLabel(false), 5500);
    return () => {
      clearTimeout(timer);
      clearTimeout(labelTimer);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-8 right-8 z-[100] flex items-center gap-3"
        >
          {/* Label temporal que colapsa suavemente a solo icono */}
          <AnimatePresence>
            {showLabel && (
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

          {/* Botón Flotante */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative cursor-pointer"
            aria-label="Contactar por WhatsApp"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-transform duration-300 group-hover:scale-110 active:scale-95">
              <svg 
                viewBox="0 0 24 24" 
                className="w-8 h-8 md:w-9 md:h-9 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.597 6.011L0 24l6.135-1.61a11.787 11.787 0 005.911 1.583h.005c6.635 0 12.05-5.414 12.05-12.05a11.767 11.767 0 00-3.489-8.522z"/>
              </svg>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
