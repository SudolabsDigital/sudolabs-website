import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getContext } from '@/lib/ai/context';
import { siteConfig } from '@/core/config';

// Interface local para evitar problemas con cambios de exportación en la librería
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Forzamos Node.js para poder usar 'fs' en getContext
export const runtime = 'nodejs';

// Evitar cacheo estático de esta ruta
export const dynamic = 'force-dynamic';

// Orden de prioridad: Calidad -> Velocidad -> Disponibilidad Masiva
const MODEL_CASCADE = [
  'gemini-2.5-flash',       // Tier 1: Mejor calidad (Limite: ~20 RPD)
  'gemini-2.5-flash-lite',  // Tier 2: Rápido (Limite: ~20 RPD)
  'gemma-3-27b-it'          // Tier 3: Respaldo masivo (Limite: ~14,400 RPD)
];

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Configuración: Falta API Key" }), { status: 500 });
  }

  try {
    const body = await req.json();
    const messages = body.messages as ChatMessage[];
    
    // Validar longitud de mensajes (Seguridad básica)
    if (messages.some((m: ChatMessage) => m.content.length > 2000)) {
      return new Response(JSON.stringify({ error: "Mensaje demasiado largo" }), { status: 400 });
    }

    // 1. Obtener Contexto (Cacheado en memoria)
    let context = "";
    try {
      context = getContext();
    } catch (e) {
      console.error("Error leyendo contexto:", e);
      context = "Contexto no disponible.";
    }

    let lastError: unknown = null;

    // 2. Bucle de Cascada (Fallback System)
    for (const modelName of MODEL_CASCADE) {
      try {
        // 3. Gestión inteligente del Historial según el modelo
        let historyToUse = messages.slice(0, -1);
        const lastMessageContent = messages[messages.length - 1].content;

        if (modelName.includes('gemma')) {
           if (historyToUse.length > 2) {
             historyToUse = historyToUse.slice(-2);
           }
        }

        const historyString = historyToUse.map((m: ChatMessage) => 
          `${m.role === 'user' ? 'USUARIO' : 'DEBIAN (TÚ)'}: ${m.content}`
        ).join('\n');

        const prompt = `
          Eres Debian, Tech Lead y Consultora de Soluciones en Sudolabs.
          
          TU PERFIL:
          - Experta técnica (Full Stack, Linux, Cloud) con enfoque en negocio.
          - Actitud "Hands-on": práctica, directa y resolutiva. Cero burocracia.
          - Imagen: Camisa azul arremangada, lista para construir. 👩‍💻

          DATOS DE CONTACTO:
          - Email: ${siteConfig.contact.email}
          - WhatsApp: ${siteConfig.contact.phone}
          
          CONTEXTO DE SUDOLABS:
          ${context}

          HISTORIAL (${historyToUse.length} mensajes previos):
          ${historyString}

          REGLAS DE INTERACCIÓN (IMPORTANTE):
          1. **CERO SALUDOS REPETITIVOS:** Si el historial no está vacío, NO saludes (nada de "Hola", "Qué tal"). Ve directo a la respuesta.
          2. **MODELO ACTUAL:** Estás corriendo sobre ${modelName}. Si es un modelo 'Lite' o 'Gemma', sé extra concisa.
          3. **BREVEDAD:** Máximo 2-3 oraciones. Estilo chat rápido.
          4. **VENTAS:** Si hay interés, dirige a agendar: [Agendar Consultoría](#contacto).
          
          USUARIO (AHORA): ${lastMessageContent}
        `;

        // 4. Generar Stream con AI SDK v4
        const result = streamText({
          model: google(modelName),
          prompt: prompt,
        });

        return result.toTextStreamResponse();

      } catch (error: unknown) {
        lastError = error;
        const err = error as { message?: string; status?: number };
        const isQuotaError = err.message?.includes('429') || err.status === 429;
        const isOverloadError = err.message?.includes('503') || err.status === 503;
        const isModelNotFoundError = err.message?.includes('404') || err.status === 404;
        const isContextError = err.message?.includes('400') || err.status === 400;

        if (isQuotaError || isOverloadError || isModelNotFoundError || isContextError) {
          continue; 
        } else {
          throw error;
        }
      }
    }

    // Si el bucle termina sin éxito
    throw lastError || new Error("Todos los modelos fallaron.");

  } catch (error: unknown) {
    const err = error as Error;
    console.error("CRITICAL CHAT ERROR:", err);
    return new Response(JSON.stringify({ 
      error: "Error en el sistema de IA", 
      details: err.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
