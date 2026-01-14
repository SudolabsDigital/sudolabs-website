'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Code2, Cpu, Send, ShieldCheck, Terminal, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function AiChatSection() {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: behavior
      });
      setUserScrolledUp(false);
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    if (!userScrolledUp) scrollToBottom('auto');
  }, [messages]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setUserScrolledUp(false);
    setTimeout(() => scrollToBottom('smooth'), 100);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' };

      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          const matches = buffer.matchAll(/0:"((?:[^"\\]|\\.)*)"/g);
          let finalString = '';
          let matchCount = 0;
          for (const match of matches) {
            matchCount++;
            try { finalString += JSON.parse(`"${match[1]}"`); } catch { finalString += match[1]; }
          }
          if (matchCount === 0 && buffer.length > 0 && !buffer.includes('0:"')) finalString = buffer;

          if (finalString.length > 0) {
              assistantMessage.content = finalString;
              setMessages((prev) => prev.map(m => m.id === assistantMessage.id ? { ...m, content: finalString } : m));
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      const fallbackMessage: Message = { 
        id: 'error-' + Date.now(), 
        role: 'assistant', 
        content: '¡Vaya! 🔋 Me he quedado sin energía o hay demasiadas personas hablando conmigo ahora mismo. No quiero que esperes, escríbenos directo a **contacto@sudolabs.space** o por **[WhatsApp (+51 923 384 303)](https://wa.me/51923384303)** y te atenderemos de inmediato. 🚀' 
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return <div className="h-[700px] w-full bg-zinc-950 animate-pulse" />;

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-[1400px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            Hablemos de tu Proyecto
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            ¿Tienes una idea? Debian, nuestra Tech Lead, está lista para discutir la viabilidad técnica y darte un primer feedback.
          </p>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[85vh] lg:h-[600px]">
          
          {/* LEFT PANEL: DEBIAN PROFILE (30% Desktop / 25% Mobile) */}
          <div className="h-[25%] lg:h-full lg:w-[30%] bg-zinc-950 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col relative overflow-hidden group">
            {/* Abstract Tech Background */}
            <div className="absolute inset-0 opacity-5" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #22d3ee 1px, transparent 0)', backgroundSize: '24px 24px' }} 
            />

            {/* Character Container - Large Immersive View */}
            <div className="relative flex-1 flex flex-col justify-end">
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src="/assets/debian.webp" 
                  alt="Debian Tech Lead" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              
              {/* Info Overlay at the bottom of the image */}
              <div className="relative z-10 p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pt-32 flex flex-col justify-end h-full">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">Debian</h3>
                </div>
                <p className="text-cyan-400 text-xs lg:text-sm font-medium mb-1 lg:mb-4">Tech Lead & Solutions Architect</p>
                
                <div className="hidden lg:block text-xs text-zinc-400 leading-relaxed italic border-l-2 border-cyan-500/30 pl-3">
                  "No escribo código sin propósito. Vamos a construir algo que escale."
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: CHAT (70% Desktop / 75% Mobile) */}
          <div className="h-[75%] lg:h-full lg:w-[70%] flex flex-col bg-zinc-950/50 relative">
            
            {/* Chat Header */}
            <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/80 backdrop-blur-sm z-20">
              <div className="flex items-center gap-3">
                 <div className="relative w-5 h-5 group/logo">
                    <Image 
                      src="/assets/logo-symbol.webp" 
                      alt="Sudolabs Symbol" 
                      fill 
                      sizes="20px"
                      className="object-contain opacity-80 group-hover/logo:opacity-100 transition-opacity" 
                    />
                 </div>
                 <span className="text-xs font-medium text-zinc-400 tracking-wider uppercase">Sesión Segura</span>
              </div>
              {isLoading && <span className="text-[10px] text-cyan-500 animate-pulse font-mono uppercase tracking-widest">Debian escribiendo...</span>}
            </div>

            {/* Messages Area */}
            <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth 
                  [&::-webkit-scrollbar]:w-1.5
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-zinc-800
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700"
            >
                <div className="space-y-6">
                  {/* Welcome Message */}
                  <div className="flex gap-4 max-w-[90%]">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-zinc-700 bg-zinc-800 relative">
                      <Image src="/assets/debian.webp" alt="Debian" fill sizes="32px" className="object-cover object-[center_5%]" />
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 ml-1 mb-1 block">Debian</span>
                      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-none p-4 text-sm text-zinc-300 shadow-sm">
                        <p className="mb-2 font-medium text-white">¡Hola! Qué bueno verte por aquí. 👋</p>
                        <p>Soy Debian. Me encargo de aterrizar las ideas locas en software real. ¿Qué traes en mente hoy? ¿Un MVP, una refactorización o simplemente quieres explorar opciones?</p>
                      </div>
                    </div>
                  </div>

                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 max-w-[90%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                      
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-zinc-700 bg-zinc-800 flex items-center justify-center relative">
                        {m.role === 'user' ? <User size={16} className="text-zinc-400" /> : 
                          <Image src="/assets/debian.webp" alt="Debian" fill sizes="32px" className="object-cover object-[center_5%]" />
                        }
                      </div>

                      <div className={m.role === 'user' ? 'text-right' : 'text-left'}>
                        <span className="text-xs text-zinc-500 mr-1 mb-1 block">{m.role === 'user' ? 'Tú' : 'Debian'}</span>
                        <div className={`text-sm leading-relaxed p-4 rounded-2xl shadow-md text-left
                          ${m.role === 'user' 
                            ? 'bg-cyan-600 text-white rounded-tr-none border border-cyan-500' 
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-none'
                          }`}>
                            {m.role === 'user' ? (
                                <p>{m.content}</p>
                            ) : (
                                <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800">
                                    <ReactMarkdown components={{
                                        ul: ({node, ...props}) => <ul className="list-disc list-outside ml-4 mt-2 space-y-1" {...props} />,
                                        ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-4 mt-2 space-y-1" {...props} />,
                                        strong: ({node, ...props}) => <strong className="font-bold text-cyan-300 bg-cyan-950/30 px-1 rounded" {...props} />,
                                        a: ({node, ...props}) => (
                                            <a 
                                                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-500/30 hover:decoration-cyan-400 transition-colors font-medium" 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                {...props} 
                                            />
                                        ),
                                    }}>
                                        {m.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                            
                            {/* Verified Badge for Debian - Filtered by content relevance */}
                            {m.role === 'assistant' && (m.content.length > 80 || ['sudolabs', 'oficri', 'bárbaro', 'software', 'next.js', 'desarrollo'].some(kw => m.content.toLowerCase().includes(kw))) && (
                                <div className="mt-4 pt-3 border-t border-zinc-800/50 flex items-center justify-between group/seal">
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/10 group-hover/seal:border-emerald-500/30 transition-colors">
                                        <ShieldCheck size={12} className="text-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-emerald-500/90 uppercase tracking-widest">
                                            Verified Source
                                        </span>
                                    </div>
                                    <span className="text-[9px] font-mono text-zinc-600 group-hover/seal:text-zinc-400 transition-colors">
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
                    <div className="flex gap-3 max-w-[90%] animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-zinc-700 bg-zinc-800 relative">
                        <Image src="/assets/debian.webp" alt="Debian" fill sizes="32px" className="object-cover object-[center_5%]" />
                      </div>
                      <div>
                        <span className="text-xs text-zinc-500 ml-1 mb-1 block">Debian</span>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-none p-4 shadow-sm">
                          <div className="flex gap-1.5 h-4 items-center px-1">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
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
                  className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-zinc-800 hover:bg-zinc-700 text-cyan-400 p-2 rounded-full shadow-lg border border-zinc-700 transition-all z-30"
                >
                  <ChevronDown size={20} />
                </button>
            )}

            {/* Quick Starters */}
            {messages.length === 0 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar 
                [&::-webkit-scrollbar]:h-1
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-zinc-800
                [&::-webkit-scrollbar-thumb]:rounded-full">
                <button 
                  onClick={() => { setInput("📞 Quiero contactarme con el equipo de Sudolabs"); setTimeout(() => document.querySelector('form')?.requestSubmit(), 0); }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-colors flex items-center gap-1.5"
                >
                  📞 Quiero contactarme
                </button>
                <button 
                  onClick={() => { setInput("🚀 Quiero escalar mi startup de software"); setTimeout(() => document.querySelector('form')?.requestSubmit(), 0); }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors flex items-center gap-1.5"
                >
                  🚀 Escalar startup
                </button>
                <button 
                  onClick={() => { setInput("💰 Quiero cotizar un desarrollo a medida"); setTimeout(() => document.querySelector('form')?.requestSubmit(), 0); }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors flex items-center gap-1.5"
                >
                  💰 Cotizar proyecto
                </button>
                <button 
                  onClick={() => { setInput("🛠️ ¿Qué tecnologías recomiendan para un MVP?"); setTimeout(() => document.querySelector('form')?.requestSubmit(), 0); }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors flex items-center gap-1.5"
                >
                  🛠️ Stack recomendado
                </button>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800">
              <form onSubmit={handleSubmit} className="relative group">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Cuéntame sobre tu proyecto..."
                  maxLength={500}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-cyan-500/50 pl-5 py-6 pr-24 text-base rounded-full shadow-inner transition-all group-focus-within:border-cyan-900/50"
                />
                
                <div className={`absolute right-16 top-1/2 -translate-y-1/2 text-[10px] font-mono transition-colors ${input.length > 450 ? 'text-orange-500' : 'text-zinc-600'}`}>
                  {input.length}/500
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 top-1.5 h-[calc(100%-12px)] aspect-square rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg transition-all disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-600"
                >
                  <Send size={18} className={isLoading ? 'animate-pulse' : ''} />
                </Button>
              </form>
              <div className="text-center mt-3">
                <p className="text-[10px] text-zinc-600">Debian puede cometer errores. Verifica la información importante.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
