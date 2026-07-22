'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tag?: string;
  href?: string;
  onCardClick?: () => void;
  interactive?: boolean;
}

export function FloatingCard({
  title,
  description,
  icon,
  tag,
  href,
  onCardClick,
  interactive = true,
  className,
  ...props
}: CardProps) {
  const divRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty('--mouse-x', `${e.clientX - bounds.left}px`);
    divRef.current.style.setProperty('--mouse-y', `${e.clientY - bounds.top}px`);
  };

  const cardClasses = cn(
    "relative rounded-[16px] overflow-hidden block h-full w-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
    className
  );

  const innerContent = (
    <article className={cn(
      "relative z-10 h-full w-full rounded-[16px] p-5 lg:p-6 flex flex-col", 
      "bg-white border border-slate-200/90 shadow-sm transition-shadow duration-300"
    )}>
      {/* Header: Icon & Arrow */}
      <div className="flex justify-between items-start mb-4">
        {icon && (
          <div 
            className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#004481] border border-slate-200"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        {interactive && (
          <ArrowUpRight 
            className="w-5 h-5 text-[#004481] opacity-90" 
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content & Metadata */}
      <div className="flex flex-col flex-grow">
        {tag && (
          <span className="mb-3 w-fit px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-medium text-[#004481] border border-[#004481]/20 rounded bg-[#004481]/5 uppercase tracking-wider">
            {tag}
          </span>
        )}
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onCardClick as React.MouseEventHandler<HTMLAnchorElement>}
        ref={divRef as React.RefObject<HTMLAnchorElement>}
        onMouseMove={handleMouseMove}
        className={cardClasses}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <div
      onClick={onCardClick as React.MouseEventHandler<HTMLDivElement>}
      ref={divRef as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      className={cardClasses}
      {...props}
    >
      {innerContent}
    </div>
  );
}
