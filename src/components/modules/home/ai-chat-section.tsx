'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Send, ShieldCheck, Trash2, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { useManualChat } from '@/hooks/use-manual-chat';
import { TechButton } from '@/components/ui/design-system/tech-button';

export function AiChatSection() {
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
  const [mounted, setMounted] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
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

  if (!mounted) return <div className="h-[700px] w-full bg-background animate-pulse" />;

  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden border-t border-border">
      
      {/* Background Glows (Auras) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-[1400px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            Hablemos de tu Proyecto
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            ¿Tienes una idea? Debian, nuestra Tech Lead, está lista para discutir la viabilidad técnica y darte un primer feedback.
          </p>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[85vh] lg:h-[600px]">
          
          {/* LEFT PANEL: DEBIAN PROFILE (30% Desktop / 25% Mobile) */}
          <div className="h-[25%] lg:h-full lg:w-[30%] bg-card border-b lg:border-b-0 lg:border-r border-border flex flex-col relative overflow-hidden group">
            {/* Abstract Tech Background */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-ts-blue) 1px, transparent 0)', backgroundSize: '24px 24px' }} 
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
              <div className="relative z-10 p-6 bg-gradient-to-t from-background via-background/80 to-transparent pt-32 flex flex-col justify-end h-full">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">Debian</h3>
                </div>
                <p className="text-primary text-xs lg:text-sm font-medium mb-1 lg:mb-4">Tech Lead & Solutions Architect</p>
                
                <div className="hidden lg:block text-xs text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-3">
                  &quot;No escribo código sin propósito. Vamos a construir algo que escale.&quot;
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: CHAT (70% Desktop / 75% Mobile) */}
          <div className="h-[75%] lg:h-full lg:w-[70%] flex flex-col bg-background/50 relative">
            
            {/* Chat Header */}
            <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm z-20">
              <div className="flex items-center gap-3">
                 <div className="relative w-5 h-5 group/logo dark:invert transition">
                    <Image 
                      src="/assets/logo-symbol.webp" 
                      alt="Sudolabs Symbol" 
                      fill 
                      sizes="20px"
                      className="object-contain opacity-80 group-hover/logo:opacity-100 transition-opacity" 
                    />
                 </div>
                 <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">Sesión Segura</span>
              </div>
              
              <div className="flex items-center gap-4">
                {isLoading && <span className="text-[10px] text-primary animate-pulse font-mono uppercase tracking-widest">Debian escribiendo...</span>}
                
                {messages.length > 0 && (
                  <button 
                    onClick={clearChat}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
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
                className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth custom-scrollbar"
            >
                <div className="space-y-6">
                  {/* Welcome Message */}
                  <div className="flex gap-4 max-w-[90%]">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border bg-secondary relative">
                      <Image src="/assets/debian.webp" alt="Debian" fill sizes="32px" className="object-cover object-[center_5%]" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground ml-1 mb-1 block">Debian</span>
                      <div className="bg-card border border-border rounded-2xl rounded-tl-none p-4 text-sm text-muted-foreground shadow-sm">
                        <p className="mb-2 font-medium text-foreground">¡Hola! Qué bueno verte por aquí. 👋</p>
                        <p>Soy Debian. Me encargo de aterrizar las ideas locas en software real. ¿Qué traes en mente hoy? ¿Un MVP, una refactorización o simplemente quieres explorar opciones?</p>
                      </div>
                    </div>
                  </div>

                  {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 max-w-[90%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                      
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border bg-secondary flex items-center justify-center relative">
                        {m.role === 'user' ? <User size={16} className="text-muted-foreground" /> : 
                          <Image src="/assets/debian.webp" alt="Debian" fill sizes="32px" className="object-cover object-[center_5%]" />
                        }
                      </div>

                      <div className={m.role === 'user' ? 'text-right' : 'text-left'}>
                        <span className="text-xs text-muted-foreground mr-1 mb-1 block">{m.role === 'user' ? 'Tú' : 'Debian'}</span>
                        <div className={`text-sm leading-relaxed p-4 rounded-2xl shadow-md text-left
                          ${m.role === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-tr-none border-none' 
                            : 'bg-card border border-border text-muted-foreground rounded-tl-none'
                          }`}>
                            {m.role === 'user' ? (
                                <p>{m.content}</p>
                            ) : (
                                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-secondary prose-pre:border prose-pre:border-border">
                                    <ReactMarkdown components={{
                                        ul: ({node, ...props}) => <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-foreground" {...props} />,
                                        ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-4 mt-2 space-y-1 text-foreground" {...props} />,
                                        strong: ({node, ...props}) => <strong className="font-bold text-primary bg-primary/10 px-1 rounded" {...props} />,
                                        a: ({node, ...props}) => (
                                            <a 
                                                className="inline-flex items-center gap-1 text-accent hover:text-primary underline underline-offset-4 decoration-accent/30 hover:decoration-primary transition-colors font-medium" 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                {...props} 
                                            />
                                        ),
                                        p: ({node, ...props}) => <p className="text-foreground" {...props} />
                                    }}>
                                        {m.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                            
                            {/* Verified Badge for Debian */}
                            {m.role === 'assistant' && (m.content.length > 80 || ['sudolabs', 'oficri', 'bárbaro', 'software', 'next.js', 'desarrollo'].some(kw => m.content.toLowerCase().includes(kw))) && (
                                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between group/seal">
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-success/10 border border-success/20 group-hover/seal:border-success/40 transition-colors">
                                        <ShieldCheck size={12} className="text-success animate-pulse" />
                                        <span className="text-[10px] font-bold text-success/90 uppercase tracking-widest">
                                            Verified Source
                                        </span>
                                    </div>
                                    <span className="text-[9px] font-mono text-muted-foreground group-hover/seal:text-foreground transition-colors">
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
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border bg-secondary relative">
                        <Image src="/assets/debian.webp" alt="Debian" fill sizes="32px" className="object-cover object-[center_5%]" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground ml-1 mb-1 block">Debian</span>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-none p-4 shadow-sm">
                          <div className="flex gap-1.5 h-4 items-center px-1">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
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
                  className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-card hover:bg-secondary text-primary p-2 rounded-full shadow-lg border border-border transition z-30"
                >
                  <ChevronDown size={20} />
                </button>
            )}

            {/* Quick Starters */}
            {messages.length === 0 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar">
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
            <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border">
              <form onSubmit={handleSubmit} className="relative group">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Cuéntame sobre tu proyecto..."
                  maxLength={500}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50 pl-5 py-6 pr-24 text-base rounded-full shadow-inner transition group-focus-within:border-primary/50"
                />
                
                <div className={`absolute right-16 top-1/2 -translate-y-1/2 text-[10px] font-mono transition-colors ${input.length > 450 ? 'text-warning' : 'text-muted-foreground'}`}>
                  {input.length}/500
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 top-1.5 h-[calc(100%-12px)] aspect-square rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition disabled:opacity-50 disabled:bg-secondary disabled:text-muted-foreground border-none"
                >
                  <Send size={18} className={isLoading ? 'animate-pulse' : ''} />
                </Button>
              </form>
              <div className="text-center mt-3">
                <p className="text-[10px] text-muted-foreground">Debian puede cometer errores. Verifica la información importante.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
