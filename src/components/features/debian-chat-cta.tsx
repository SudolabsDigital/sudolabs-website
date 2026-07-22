"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { DebianChatModal } from "./debian-chat-modal";

export function DebianChatCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    const labelTimer = setTimeout(() => setShowLabel(false), 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(labelTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed bottom-28 right-8 z-[100] flex items-center gap-3"
          >
            {/* Label temporal que colapsa suavemente a solo icono */}
            <AnimatePresence>
              {showLabel && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="hidden md:block bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md text-[#004481] whitespace-nowrap"
                >
                  Consultoría IA con Debian
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón Circular con Avatar */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative w-14 h-14 md:w-16 md:h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#004481] via-[#3178c6] to-[#65318d] shadow-lg cursor-pointer"
              aria-label="Hablar con Debian AI"
            >
              <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-slate-200">
                  <Image 
                    src="/assets/debian.webp" 
                    alt="Debian AI" 
                    fill 
                    className="object-cover object-[center_5%]" 
                  />
                </div>
              </div>
              
              {/* Badge de "AI" */}
              <div className="absolute -top-1 -right-1 bg-[#004481] text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-md border border-white">
                AI
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <DebianChatModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
