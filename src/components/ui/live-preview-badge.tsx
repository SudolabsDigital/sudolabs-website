'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LivePreviewBadgeProps {
  url: string;
  className?: string;
}

export const LivePreviewBadge = ({ url, className }: LivePreviewBadgeProps) => {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition",
        className
      )}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-widest">Live Preview</span>
    </a>
  );
};
