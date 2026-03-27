"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { AiChatInterface } from "@/components/modules/home/ai-chat-interface";
import Image from "next/image";

interface DebianChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DebianChatModal({ isOpen, onClose }: DebianChatModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!modalRef.current) return;
    const bounds = modalRef.current.getBoundingClientRect();
    modalRef.current.style.setProperty('--mouse-x', `${e.clientX - bounds.left}px`);
    modalRef.current.style.setProperty('--mouse-y', `${e.clientY - bounds.top}px`);
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4 lg:p-8">
          {/* Backdrop Blur & Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
          />

          {/* Modal Architecture */}
          <motion.div
            ref={modalRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full md:h-[85vh] max-w-4xl rounded-none md:rounded-[2.5rem] p-[1.5px] overflow-visible shadow-2xl pointer-events-auto"
          >
            {/* Spotlight Effect */}
            {visible && (
              <>
                <div
                  className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-100 rounded-none md:rounded-[2.5rem]"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--color-brand-core, #3178c6) 0%, var(--color-ts-blue, #65318d) 40%, transparent 70%)`,
                  }}
                />
              </>
            )}

            {/* Content Core */}
            <div className="relative z-10 w-full h-full bg-[#0b0f1a] dark:bg-[#0b0f1a] rounded-none md:rounded-[2.4rem] overflow-hidden flex flex-col border border-white/10">
              
              {/* Header: Tech Lead Context */}
              <div className="p-4 md:p-6 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/20 shadow-lg">
                    <Image 
                      src="/assets/debian.webp" 
                      alt="Debian Tech Lead" 
                      fill 
                      className="object-cover object-[center_5%]" 
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-emerald-500 uppercase">Consultoría_IA: Online</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                      Chat con Debian <Sparkles className="w-4 h-4 text-primary" />
                    </h2>
                  </div>
                </div>
                
                <button 
                  onClick={onClose}
                  className="p-3 hover:bg-white/10 rounded-full transition hover:rotate-90 duration-300 text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Chat Interface Integration */}
              <div className="flex-1 min-h-0 bg-transparent flex flex-col overflow-hidden">
                <AiChatInterface className="!w-full !h-full bg-transparent" />
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
