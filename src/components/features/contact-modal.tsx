'use client';

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Mail, CheckCircle2, ExternalLink, Terminal as TerminalIcon } from "lucide-react";
import { TechButton } from "@/components/ui/design-system/tech-button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export function ContactModal({ isOpen, onClose, defaultSubject = "" }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [goal, setGoal] = useState(defaultSubject || "Desarrollo a Medida");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  
  // Spotlight state
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("form");
        setGoal(defaultSubject || "Desarrollo a Medida");
        setEmail("");
        setDetails("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, defaultSubject]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!modalRef.current) return;
    const bounds = modalRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  const generateWhatsappMessage = () => {
    return [
      "Hola Sudolabs,",
      "",
      "---------------------------------",
      "SOLICITUD DE INGENIERÍA",
      "---------------------------------",
      `> OBJETIVO:    [ ${goal.toUpperCase()} ]`,
      `> CANAL:       [ CHAT_WHATSAPP ]`,
      `> CONTACTO:    < ${email || "ANONYMOUS"} >`,
      "",
      "REQUERIMIENTOS:",
      details || "Exploración inicial sin detalles previos.",
      "---------------------------------"
    ].join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = generateWhatsappMessage();
    const phoneNumber = "51923384303";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    setWhatsappUrl(url);
    window.open(url, '_blank');
    setStep("success");
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop Blur & Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
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
            className="relative w-full max-w-xl rounded-[2rem] p-[1.5px] overflow-visible shadow-2xl pointer-events-auto"
          >
            {/* Spotlight Effect */}
            {visible && (
              <>
                <div
                  className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-100 rounded-[2rem]"
                  style={{
                    background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, var(--color-brand-core, #3178c6) 0%, var(--color-ts-blue, #65318d) 40%, transparent 70%)`,
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[-1] transition-opacity duration-300 opacity-50 blur-2xl rounded-[2rem]"
                  style={{
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, var(--color-brand-core, #3178c6) 0%, var(--color-ts-blue, #65318d) 50%, transparent 100%)`,
                  }}
                />
              </>
            )}

            {/* Content Core */}
            <div className="relative z-10 w-full bg-[#0b0f1a] dark:bg-[#0b0f1a] rounded-[1.9rem] overflow-hidden flex flex-col max-h-[90vh] border border-white/5">
              
              {/* Header: Tech Console Style */}
              <div className="p-6 md:p-8 border-b border-white/10 bg-[#0f172a]/50 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500/80 uppercase">System_Link: Active</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
                    {step === 'form' ? 'Nueva Solicitud' : 'Despliegue Exitoso'}
                  </h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2.5 hover:bg-white/10 rounded-full transition-all hover:rotate-90 duration-300 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide bg-transparent">
                <AnimatePresence mode="wait">
                  {step === "form" ? (
                    <motion.form 
                      key="contact-form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onSubmit={handleSubmit} 
                      className="space-y-8"
                    >
                      {/* Selection: Objective */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
                          <Sparkles className="w-3.5 h-3.5" /> 01 // SELECCIONAR_OBJETIVO
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {["Desarrollo a Medida", "Consultoría Técnica", "Automatización", "Otro"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setGoal(opt)}
                              className="text-left px-4 py-3 rounded-xl border text-[13px] font-bold transition-all duration-300 border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 text-gray-400 hover:text-gray-200"
                              style={goal === opt ? { borderColor: 'rgb(59 130 246)', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'rgb(219 234 254)', boxShadow: '0 0 15px rgba(59,130,246,0.2)' } : {}}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Input: Email */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
                          <Mail className="w-3.5 h-3.5" /> 02 // IDENTIFICACIÓN_USER
                        </div>
                        <div className="relative group">
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@correo.com"
                            className="w-full h-14 rounded-xl border border-white/10 bg-black/40 pl-5 pr-4 text-sm font-medium focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      {/* Input: Details (The "Terminal" Input) */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
                          <TerminalIcon className="w-3.5 h-3.5" /> 03 // BUFFER_REQUERIMIENTOS
                        </div>
                        <div className="relative rounded-xl border border-white/10 bg-[#05070a] p-1 shadow-inner">
                           <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Describe brevemente el alcance, presupuesto o plazos..."
                            className="w-full min-h-[120px] bg-transparent p-4 text-sm font-mono text-emerald-400/90 placeholder:text-emerald-900/50 focus:outline-none resize-none scrollbar-hide"
                          />
                          <div className="absolute bottom-3 right-4 text-[9px] font-mono text-emerald-500/30 tracking-tighter">
                            STDOUT {">>"}_READY
                          </div>
                        </div>
                      </div>

                      {/* Action Zone */}
                      <div className="pt-4">
                        <TechButton 
                          type="submit"
                          variant="laser"
                          size="xl"
                          className="w-full h-16"
                          iconRight={<Send className="w-5 h-5" />}
                        >
                          GENERAR_CONEXIÓN
                        </TechButton>
                        <p className="text-center mt-4 text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                          LATENCY_ESTIMATED: &lt; 120_MIN
                        </p>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="contact-success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-10 text-center space-y-8"
                    >
                      <div className="relative">
                         <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
                         <div className="w-24 h-24 rounded-full bg-[#0b0f1a] border border-emerald-500/30 flex items-center justify-center relative z-10 shadow-2xl">
                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                         </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white tracking-tight">¡PAQUETE_ENVIADO!</h3>
                        <p className="text-gray-400 max-w-xs mx-auto text-sm leading-relaxed">
                          La conexión ha sido establecida con éxito. Si la terminal de WhatsApp no se activó, usa el reintento manual.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 w-full">
                         <TechButton 
                           variant="primary" 
                           size="lg"
                           className="w-full h-14"
                           onClick={() => window.open(whatsappUrl, '_blank')}
                           iconRight={<ExternalLink className="w-4 h-4" />}
                         >
                            REABRIR_WHATSAPP
                         </TechButton>
                         
                         <button 
                           className="w-full py-3 text-[11px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-[0.3em]"
                           onClick={onClose}
                         >
                            [ TERMINAR_SESIÓN ]
                         </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
