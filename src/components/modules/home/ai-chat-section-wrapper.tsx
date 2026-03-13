'use client';

import dynamic from 'next/dynamic';

const AiChatSectionDynamic = dynamic(
  () => import('@/components/modules/home/ai-chat-section').then((mod) => mod.AiChatSection),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[600px] w-full bg-background animate-pulse flex flex-col items-center justify-center text-muted-foreground border-y border-border/50">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4"></div>
        <p className="text-sm font-medium tracking-widest uppercase">Iniciando enlace con Debian...</p>
      </div>
    ),
  }
);

export function AiChatSectionWrapper() {
  return <AiChatSectionDynamic />;
}
