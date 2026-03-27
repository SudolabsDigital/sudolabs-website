"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DebianChatModal } from "./debian-chat-modal";

export function DebianChatCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000); // Aparece un poco después de WhatsApp
    return () => clearTimeout(timer);
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Label expansivo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              className={cn(
                "hidden md:block bg-background/80 backdrop-blur-md border border-border px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl pointer-events-none text-primary",
                !isHovered && "invisible"
              )}
            >
              Consultoría IA con Debian
            </motion.div>

            {/* Botón Circular con Avatar */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative group w-14 h-14 md:w-16 md:h-16 rounded-full p-[2px] bg-gradient-to-tr from-primary via-blue-500 to-accent shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-transform duration-300 hover:scale-110 active:scale-95"
              aria-label="Hablar con Debian AI"
            >
              <div className="w-full h-full rounded-full bg-background p-1 overflow-hidden">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                  <Image 
                    src="/assets/debian.webp" 
                    alt="Debian AI" 
                    fill 
                    className="object-cover object-[center_5%]" 
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                </div>
              </div>
              
              {/* Badge de "AI" */}
              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-lg border border-white/20">
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
