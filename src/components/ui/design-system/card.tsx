'use client';

import React, { useState, useRef } from 'react';
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
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty('--mouse-x', `${e.clientX - bounds.left}px`);
    divRef.current.style.setProperty('--mouse-y', `${e.clientY - bounds.top}px`);
  };

  const cardClasses = cn(
    "relative rounded-[16px] p-[2px] overflow-visible group/card block", 
    "bg-border transition duration-500 h-full w-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
    interactive && "hover:-translate-y-1 cursor-pointer", 
    className
  );

  const innerContent = (
    <>
      {visible && interactive && (
        <>
          {/* Borde Iluminado Interior (Láser de 2px) */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-100 rounded-[16px]"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), #3178c6 0%, #65318d 20%, transparent 40%)`,
            }}
          />
          {/* Sombra Exterior Iluminada (Aura Difuminada) */}
          <div
            className="pointer-events-none absolute inset-0 z-[-1] transition-opacity duration-300 opacity-60 blur-xl rounded-[16px]"
            style={{
              background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), #3178c6 0%, #65318d 40%, transparent 70%)`,
            }}
          />
        </>
      )}

      <article className={cn(
        "relative z-10 h-full w-full rounded-[14px] p-5 lg:p-6 flex flex-col", 
        "bg-card transition-colors duration-300", 
        interactive && "group-hover/card:bg-card/95"
      )}>
        {/* Header: Icon & Arrow */}
        <div className="flex justify-between items-start mb-4">
          {icon && (
            <div 
              className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-primary border border-border/50 group-hover/card:border-primary/30 transition-colors duration-300"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          {interactive && (
            <ArrowUpRight 
              className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 group-hover/card:translate-y-0 transition duration-300" 
              aria-hidden="true"
            />
          )}
        </div>

        {/* Content & Metadata */}
        <div className="flex flex-col flex-grow">
          {tag && (
            <span className="mb-3 w-fit px-2 py-0.5 text-[10px] sm:text-[11px] font-mono font-medium text-accent border border-accent/20 rounded bg-accent/5 uppercase tracking-wider">
              {tag}
            </span>
          )}
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 leading-tight group-hover/card:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
            {description}
          </p>
        </div>
      </article>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onCardClick as React.MouseEventHandler<HTMLAnchorElement>}
        ref={divRef as any}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={cardClasses}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <div
      onClick={onCardClick as React.MouseEventHandler<HTMLDivElement>}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={cardClasses}
      {...props}
    >
      {innerContent}
    </div>
  );
}
