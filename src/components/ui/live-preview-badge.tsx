import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LivePreviewBadgeProps {
  url?: string;
  className?: string;
  showText?: boolean;
}

export function LivePreviewBadge({ url, className, showText = true }: LivePreviewBadgeProps) {
  if (!url) return null;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      {showText && (
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/90">
          Live Project
        </span>
      )}
    </div>
  );
}
