'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Send, ShieldCheck, Trash2, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { useManualChat } from '@/hooks/use-manual-chat';
import { TechButton } from '@/components/ui/design-system/tech-button';
import { cn } from '@/lib/utils';

interface AiChatInterfaceProps {
  className?: string;
}

export function AiChatInterface({ className }: AiChatInterfaceProps) {
  const { 
    messages, 
    input, 
    setInput, 
    isLoading, 
    appendUserMessage, 
    clearChat 
  } = useManualChat();
  
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;

    if (isAtBottom) {
      setUserScrolledUp(false);
      setShowScrollButton(false);
    } else {
      setUserScrolledUp(true);
      setShowScrollButton(true);
    }
  };

  const scrollToBottom = useCallback((behavior: 'smooth' | 'auto' = 'smooth') => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: behavior
      });
      setUserScrolledUp(false);
      setShowScrollButton(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userScrolledUp) scrollToBottom('auto');
    }, 0);
    return () => clearTimeout(timer);
  }, [messages, userScrolledUp, scrollToBottom]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // UI Feedback inmediato (scroll)
    setUserScrolledUp(false);
    setTimeout(() => scrollToBottom('smooth'), 100);
    
    await appendUserMessage(input);
  };

  // Quick Starter Helper
  const handleQuickStart = (text: string) => {
    setUserScrolledUp(false);
    setTimeout(() => scrollToBottom('smooth'), 100);
    appendUserMessage(text);
  };

  return (
    <div className={cn("h-[75%] lg:h-full lg:w-[70%] flex flex-col bg-background/50 relative", className)}>
      
      {/* Chat Header */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white z-20">
        <div className="flex items-center gap-3">
           <div className="relative w-5 h-5">
              <Image 
                src="/assets/logo-symbol.webp" 
                alt="Sudolabs Symbol" 
                fill 
                sizes="20px"
                className="object-contain" 
              />
           </div>
           <span className="text-xs font-mono font-bold text-slate-500 tracking-wider uppercase">Sesión Segura</span>
        </div>
        
        <div className="flex items-center gap-4">
          {isLoading && <span className="text-[10px] text-[#004481] animate-pulse font-mono uppercase tracking-widest">Debian escribiendo...</span>}
          
          {messages.length > 0 && (
            <button 
              onClick={clearChat}
              className="text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
              title="Borrar historial"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth custom-scrollbar bg-white"
      >
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="flex gap-4 max-w-[90%]">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100 relative">
                <Image src="/assets/debian.webp" alt="Debian" fill sizes="32px" className="object-cover object-[center_5%]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 ml-1 mb-1 block">Debian</span>
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl rounded-tl-none p-4 text-sm text-slate-700 shadow-sm">
                  <p className="mb-2 font-bold text-slate-900">¡Hola! Qué bueno verte por aquí. 👋</p>
                  <p>Soy Debian. Me encargo de aterrizar las ideas locas en software real. ¿Qué traes en mente hoy? ¿Un MVP, una refactorización o simplemente quieres explorar opciones?</p>
                </div>
              </div>
            </div>

            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 max-w-[90%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100 flex items-center justify-center relative">
                  {m.role === 'user' ? <User size={16} className="text-slate-500" /> : 
                    <Image src="/assets/debian.webp" alt="Debian" fill sizes="32px" className="object-cover object-[center_5%]" />
                  }
                </div>

                <div className={m.role === 'user' ? 'text-right' : 'text-left'}>
                  <span className="text-xs font-semibold text-slate-500 mr-1 mb-1 block">{m.role === 'user' ? 'Tú' : 'Debian'}</span>
                  <div className={`text-sm leading-relaxed p-4 rounded-2xl shadow-sm text-left
                    ${m.role === 'user' 
                      ? 'bg-[#004481] text-white rounded-tr-none border-none font-medium' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                    }`}>
                      {m.role === 'user' ? (
                          <p>{m.content}</p>
                      ) : (
                          <div className="prose prose-sm max-w-none prose-p:leading-relaxed">
                              <ReactMarkdown components={{
                                  ul: ({...props}) => <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-slate-800" {...props} />,
                                  ol: ({...props}) => <ol className="list-decimal list-outside ml-4 mt-2 space-y-1 text-slate-800" {...props} />,
                                  strong: ({...props}) => <strong className="font-bold text-[#004481] bg-[#004481]/10 px-1 rounded" {...props} />,
                                  a: ({...props}) => (
                                      <a 
                                          className="inline-flex items-center gap-1 text-[#004481] hover:underline font-bold" 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          {...props} 
                                      />
                                  ),
                                  p: ({...props}) => <p className="text-slate-800" {...props} />
                              }}>
                                  {m.content}
                              </ReactMarkdown>
                          </div>
                      )}
                      
                      {/* Verified Badge */}
                      {m.role === 'assistant' && (m.content.length > 80 || ['sudolabs', 'oficri', 'bárbaro', 'software', 'next.js', 'desarrollo'].some(kw => m.content.toLowerCase().includes(kw))) && (
                          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200">
                                  <ShieldCheck size={12} className="text-emerald-600 animate-pulse" />
                                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                                      Verified Source
                                  </span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-400">
                                  Sudolabs Knowledge Base v1.0
                               </span>
                          </div>
                      )}
                  </div>
                </div>
              </div>
            ))}

            {/* LOADING TYPING BUBBLE */}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex gap-3 max-w-[90%] animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100 relative">
                  <Image src="/assets/debian.webp" alt="Debian" fill sizes="32px" className="object-cover object-[center_5%]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 ml-1 mb-1 block">Debian</span>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <div className="flex gap-1.5 h-4 items-center px-1">
                      <span className="w-1.5 h-1.5 bg-[#004481] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-[#004481] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-[#004481] rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} className="h-4" />
          </div>
      </div>

      {/* Scroll Button */}
      {showScrollButton && (
          <button 
            onClick={() => scrollToBottom('smooth')}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white text-[#004481] p-2 rounded-full shadow-lg border border-slate-200 transition z-30 cursor-pointer"
          >
            <ChevronDown size={20} />
          </button>
      )}

      {/* Quick Starters */}
      {messages.length === 0 && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar bg-white">
          <TechButton 
            onClick={() => handleQuickStart("📞 Quiero contactarme con el equipo de Sudolabs")}
            variant="outline"
            size="sm"
            className="whitespace-nowrap rounded-full"
          >
            📞 Quiero contactarme
          </TechButton>
          <TechButton 
            onClick={() => handleQuickStart("🚀 Quiero escalar mi startup de software")}
            variant="outline"
            size="sm"
            className="whitespace-nowrap rounded-full"
          >
            🚀 Escalar startup
          </TechButton>
          <TechButton 
            onClick={() => handleQuickStart("💰 Quiero cotizar un desarrollo a medida")}
            variant="outline"
            size="sm"
            className="whitespace-nowrap rounded-full"
          >
            💰 Cotizar proyecto
          </TechButton>
          <TechButton 
            onClick={() => handleQuickStart("🛠️ ¿Qué tecnologías recomiendan para un MVP?")}
            variant="outline"
            size="sm"
            className="whitespace-nowrap rounded-full"
          >
            🛠️ Stack recomendado
          </TechButton>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cuéntame sobre tu proyecto..."
            maxLength={500}
            className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#004481]/30 pl-5 py-6 pr-24 text-base rounded-full transition"
          />
          
          <div className={`absolute right-16 top-1/2 -translate-y-1/2 text-[10px] font-mono ${input.length > 450 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
            {input.length}/500
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            aria-label="Enviar mensaje"
            className="absolute right-1.5 top-1.5 h-[calc(100%-12px)] aspect-square rounded-full bg-[#004481] hover:bg-[#003366] text-white shadow-md transition disabled:opacity-50 border-none cursor-pointer"
          >
            <Send size={18} className={isLoading ? 'animate-pulse' : ''} />
          </Button>
        </form>
        <div className="text-center mt-3">
          <p className="text-[10px] text-slate-400">Debian puede cometer errores. Verifica la información importante.</p>
        </div>
      </div>

    </div>
  );
}
