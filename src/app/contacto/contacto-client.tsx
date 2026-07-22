'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Send, Sparkles, Mail, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactoClient() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [goal, setGoal] = useState("Desarrollo a Medida");
  const [preference, setPreference] = useState<"chat" | "call">("chat");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const generateWhatsappUrl = () => {
    const phoneNumber = "51923384303";
    const message = [
      "Hola Sudolabs,",
      "",
      "---------------------------------",
      "RESUMEN DE SOLICITUD (VÍA WEB)",
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
    window.open(url, '_blank');
    setStep("success");
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-transparent text-slate-900 selection:bg-[#004481]/20">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Context */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Hablemos de tu <span className="text-[#004481] block mt-2">Proyecto</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed font-normal">
                No somos solo programadores; somos socios estratégicos. Cuéntanos tu desafío y diseñemos juntos la solución técnica que tu empresa necesita.
              </p>
            </motion.div>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#004481]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Correo Electrónico</h3>
                  <p className="text-slate-600 text-sm font-medium">contacto@sudolabs.space</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#004481]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">WhatsApp Directo</h3>
                  <p className="text-slate-600 text-sm font-medium">+51 923 384 303</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-slate-900">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#004481]" />
                    ¿Cuál es tu objetivo?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Desarrollo a Medida", "Consultoría Técnica", "Automatización", "Otro"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setGoal(opt)}
                        className={`text-left px-4 py-3 rounded-xl border text-xs font-bold transition duration-200 cursor-pointer ${ 
                          goal === opt 
                            ? "border-[#004481] bg-[#004481] text-white shadow-md" 
                            : "border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Tu Correo (Opcional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@empresa.com"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#004481]/50 focus:border-[#004481] transition text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    ¿Cómo prefieres conectar?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPreference("chat")}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-xs font-bold transition duration-200 cursor-pointer ${ 
                        preference === "chat"
                          ? "border-[#004481] bg-[#004481] text-white shadow-md"
                          : "border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800"
                      }`}
                    >
                      <MessageSquare className={`w-5 h-5 ${preference === 'chat' ? 'text-white' : 'text-[#004481]'}`} />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreference("call")}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-xs font-bold transition duration-200 cursor-pointer ${ 
                        preference === "call"
                          ? "border-[#004481] bg-[#004481] text-white shadow-md"
                          : "border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800"
                      }`}
                    >
                      <Phone className={`w-5 h-5 ${preference === 'call' ? 'text-white' : 'text-[#004481]'}`} />
                      <span className="text-sm font-medium">Llamada</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Detalles adicionales
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Breve descripción de tu idea..."
                    className="w-full min-h-[100px] rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004481]/50 focus:border-[#004481] resize-none transition"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full rounded-xl text-sm font-bold uppercase tracking-wider h-12 bg-[#004481] text-white hover:bg-[#003366] shadow-lg transition border-none cursor-pointer"
                >
                  Enviar Mensaje <Send className="ml-2 w-4 h-4" />
                </Button>              
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 text-foreground relative z-10">
                <div className="w-20 h-20 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">¡Solicitud Iniciada!</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                    Hemos abierto WhatsApp para que nos envíes tu mensaje. ¿No se abrió? Prueba el botón de abajo.
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                   <Button 
                     variant="outline" 
                     className="w-full h-12 rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-bold"
                     onClick={() => window.open(whatsappUrl, '_blank')}
                   >
                      Reintentar WhatsApp <ExternalLink className="ml-2 w-4 h-4" />
                   </Button>
                   
                   <Button 
                     variant="ghost" 
                     className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground"
                     onClick={() => setStep("form")}
                   >
                      Volver al formulario
                   </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}