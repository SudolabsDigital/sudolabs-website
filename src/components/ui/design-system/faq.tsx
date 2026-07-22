'use client';

import React, { useState } from 'react';
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
  return (
    <div
      className={cn(
        "relative rounded-[16px] overflow-hidden transition duration-300",
        isOpen ? "mb-4" : "mb-2"
      )}
    >
      {/* Contenedor Principal (Fondo Blanco Sólido en Modo Claro) */}
      <div 
        className={cn(
          "relative z-10 w-full rounded-[14px] flex flex-col overflow-hidden bg-white border transition-colors duration-300",
          isOpen ? "border-[#004481]/40 shadow-md" : "border-slate-200/90 shadow-sm"
        )}
      >
        <button
          onClick={onClick}
          className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none cursor-pointer"
          aria-expanded={isOpen}
        >
          <h3 className={cn(
            "text-base md:text-lg font-semibold transition-colors duration-300",
            isOpen ? "text-[#004481]" : "text-slate-900"
          )}>
            {faq.question}
          </h3>
          
          <div className={cn(
            "ml-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition duration-300 border",
            isOpen 
              ? "bg-[#004481] text-white border-[#004481] rotate-180 shadow-sm" 
              : "bg-slate-100 text-slate-600 border-slate-200"
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
          <div className="px-6 pb-6 pt-0 text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-100 mx-6 mt-2">
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