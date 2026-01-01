'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Phone, Send, Sparkles, Mail, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export function ContactModal({ isOpen, onClose, defaultSubject = "" }: ContactModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [goal, setGoal] = useState(defaultSubject || "Desarrollo a Medida");
  const [preference, setPreference] = useState<"chat" | "call">("chat");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  // Reset state when opening
  useEffect(() => {
    if (!isOpen) {
      // Reset only when closing to be ready for next open, 
      // avoiding synchronous setState during render/mount.
      const timer = setTimeout(() => {
        setStep("form");
        setGoal(defaultSubject || "Desarrollo a Medida");
        setEmail("");
        setDetails("");
      }, 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [isOpen, defaultSubject]);

  const generateWhatsappUrl = () => {
    const phoneNumber = "51923384303";
    
    // Construimos el mensaje con formato estructurado tipo log
    const message = [
      "Hola Sudolabs,",
      "",
      "---------------------------------",
      "RESUMEN DE SOLICITUD",
      "---------------------------------",
      `> Objetivo:    [ ${goal} ]`,
      `> Preferencia: [ ${preference === 'chat' ? 'Chat Rápido' : 'Agendar Llamada'} ]`,
      `> Correo:      < ${email || "No especificado"} >`,
      "",
      "MENSAJE:",
      details || "Sin detalles adicionales.",
      "---------------------------------"
    ].join("\n");

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsappUrl();
    setWhatsappUrl(url);
    
    // Abrir inmediatamente
    window.open(url, '_blank');
    
    // Cambiar a estado de éxito/persistencia
    setStep("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop without blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[200]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[201] p-4 pointer-events-none"
          >
            <div className="bg-white text-black border border-gray-200 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] relative">
              
              {/* Decorative gradient blob */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="p-6 md:p-8 pb-4 flex justify-between items-start relative z-10">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight mb-1">
                    {step === 'form' ? 'Hablemos de tu Proyecto' : '¡Casi listo!'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {step === 'form' ? 'Cuéntanos tu idea, nosotros ponemos la ingeniería.' : 'Si WhatsApp no se abrió, usa los botones abajo.'}
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors -mr-2 -mt-2"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 pt-2 overflow-y-auto relative z-10 custom-scrollbar">
                {step === "form" ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Field: Goal */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-primary" />
                        ¿Cuál es tu objetivo?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {["Desarrollo a Medida", "Consultoría Técnica", "Automatización", "Otro"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setGoal(opt)}
                            className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                              goal === opt 
                                ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                                : "border-border bg-background/50 hover:bg-muted/50 hover:border-primary/50 text-muted-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Field: Email (New) */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Tu Correo (Opcional)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ejemplo@empresa.com"
                          className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Field: Preference */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        ¿Cómo prefieres conectar?
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setPreference("chat")}
                          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                            preference === "chat"
                              ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                              : "border-border bg-background/50 hover:bg-muted/50 hover:border-primary/50 text-muted-foreground"
                          }`}
                        >
                          <MessageSquare className={`w-6 h-6 ${preference === 'chat' ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Chat WhatsApp</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreference("call")}
                          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                            preference === "call"
                              ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                              : "border-border bg-background/50 hover:bg-muted/50 hover:border-primary/50 text-muted-foreground"
                          }`}
                        >
                          <Phone className={`w-6 h-6 ${preference === 'call' ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="text-sm font-medium">Agendar Llamada</span>
                        </button>
                      </div>
                    </div>

                    {/* Field: Details */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Detalles adicionales (Opcional)
                      </label>
                      <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Breve descripción de tu idea..."
                        className="w-full min-h-[80px] rounded-xl border border-border bg-background/50 p-4 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-full text-base font-bold h-12 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                      Continuar a WhatsApp <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
                    <div className="relative">
                       <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                       <div className="w-24 h-24 rounded-full bg-background border border-border flex items-center justify-center relative z-10 shadow-xl">
                          <CheckCircle2 className="w-12 h-12 text-green-500" />
                       </div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <h3 className="text-2xl font-bold">¡Ventana Abierta!</h3>
                      <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                        WhatsApp debería haberse abierto. Si no, usa el botón de abajo.
                      </p>
                    </motion.div>

                    <div className="flex flex-col gap-3 w-full">
                       <Button 
                         variant="outline" 
                         className="w-full h-12 rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-bold"
                         onClick={() => window.open(whatsappUrl, '_blank')}
                       >
                          Reintentar Abrir WhatsApp <ExternalLink className="ml-2 w-4 h-4" />
                       </Button>
                       
                       <Button 
                         variant="ghost" 
                         className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground"
                         onClick={onClose}
                       >
                          Cerrar, ya envié el mensaje
                       </Button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}