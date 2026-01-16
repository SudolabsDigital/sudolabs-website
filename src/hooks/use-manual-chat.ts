import { useState, useEffect } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function useManualChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('debian-chat-history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      if (messages.length > 0) {
        localStorage.setItem('debian-chat-history', JSON.stringify(messages));
      } else {
        localStorage.removeItem('debian-chat-history');
      }
    }
  }, [messages, mounted]);

  const clearChat = () => {
    if (confirm('¿Quieres borrar el historial de conversación?')) {
      setMessages([]);
      localStorage.removeItem('debian-chat-history');
    }
  };

  const appendUserMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

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

  return {
    messages,
    setMessages,
    input,
    setInput,
    isLoading,
    appendUserMessage,
    clearChat
  };
}
