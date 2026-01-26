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
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Context */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Hablemos de tu <span className="text-primary">Proyecto</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                No somos solo programadores; somos socios estratégicos. Cuéntanos tu desafío y diseñemos juntos la solución técnica que tu empresa necesita.
              </p>
            </motion.div>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Correo Electrónico</h3>
                  <p className="text-muted-foreground text-sm">contacto@sudolabs.space</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">WhatsApp Directo</h3>
                  <p className="text-muted-foreground text-sm">+51 923 384 303</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-black">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-black" />
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
                            ? "border-black bg-black text-white ring-1 ring-black shadow-md" 
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-black/30 text-gray-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Tu Correo (Opcional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@empresa.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/50 transition-all text-black placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    ¿Cómo prefieres conectar?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPreference("chat")}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200 ${ 
                        preference === "chat"
                          ? "border-black bg-black text-white ring-1 ring-black shadow-md"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-black/30 text-gray-600"
                      }`}
                    >
                      <MessageSquare className={`w-6 h-6 ${preference === 'chat' ? 'text-white' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreference("call")}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200 ${ 
                        preference === "call"
                          ? "border-black bg-black text-white ring-1 ring-black shadow-md"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-black/30 text-gray-600"
                      }`}
                    >
                      <Phone className={`w-6 h-6 ${preference === 'call' ? 'text-white' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Llamada</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Detalles adicionales
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Breve descripción de tu idea..."
                    className="w-full min-h-[100px] rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/50 resize-none transition-all"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full rounded-full text-base font-bold h-12 bg-black text-white hover:bg-gray-900 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Enviar Mensaje <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 text-black relative z-10">
                <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">¡Solicitud Iniciada!</h3>
                  <p className="text-gray-500 max-w-xs mx-auto text-sm">
                    Hemos abierto WhatsApp para que nos envíes tu mensaje. ¿No se abrió? Prueba el botón de abajo.
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                   <Button 
                     variant="outline" 
                     className="w-full h-12 rounded-xl border-green-200 hover:bg-green-50 text-green-600 font-bold"
                     onClick={() => window.open(whatsappUrl, '_blank')}
                   >
                      Reintentar WhatsApp <ExternalLink className="ml-2 w-4 h-4" />
                   </Button>
                   
                   <Button 
                     variant="ghost" 
                     className="w-full h-12 rounded-xl text-gray-400 hover:text-black"
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
