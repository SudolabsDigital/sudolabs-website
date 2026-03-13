'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface FaqItemData {
  question: string;
  answer: React.ReactNode;
}

interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItemData[];
}

function FaqItemComponent({ 
  faq, 
  isOpen, 
  onClick 
}: { 
  faq: FaqItemData; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={cn(
        "relative rounded-[16px] p-[2px] overflow-visible group/faq transition duration-300",
        isOpen ? "mb-4" : "mb-2"
      )}
    >
      {/* 
        Efecto Spotlight (Láser y Sombra) - Igual que en FloatingCard
      */}
      {visible && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-100 rounded-[16px]"
            style={{
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, #3178c6 0%, #65318d 20%, transparent 40%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[-1] transition-opacity duration-300 opacity-60 blur-xl rounded-[16px]"
            style={{
              background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, #3178c6 0%, #65318d 40%, transparent 70%)`,
            }}
          />
        </>
      )}

      {/* Contenedor Principal (Fondo Sólido) */}
      <div 
        className={cn(
          "relative z-10 w-full rounded-[14px] flex flex-col overflow-hidden transition-colors duration-300",
          isOpen ? "bg-card border-transparent" : "bg-background border border-border group-hover/faq:bg-card/80 group-hover/faq:border-transparent"
        )}
      >
        <button
          onClick={onClick}
          className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
          aria-expanded={isOpen}
        >
          <h3 className={cn(
            "text-base md:text-lg font-semibold transition-colors duration-300",
            isOpen ? "text-primary" : "text-foreground group-hover/faq:text-primary"
          )}>
            {faq.question}
          </h3>
          
          <div className={cn(
            "ml-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition duration-300 border",
            isOpen 
              ? "bg-primary text-primary-foreground border-primary rotate-180 shadow-md" 
              : "bg-secondary text-muted-foreground border-border group-hover/faq:bg-primary/10 group-hover/faq:text-primary group-hover/faq:border-primary/20"
          )}>
            <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
          </div>
        </button>
        
        <div 
          className={cn(
            "transition duration-500 ease-in-out origin-top",
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-6 pb-6 pt-0 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/50 mx-6 mt-2">
            <p className="pt-4">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ items, className, ...props }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("w-full flex flex-col gap-2", className)} {...props}>
      {items.map((faq, index) => (
        <FaqItemComponent 
          key={index} 
          faq={faq} 
          isOpen={openIndex === index} 
          onClick={() => setOpenIndex(openIndex === index ? null : index)} 
        />
      ))}
    </div>
  );
}