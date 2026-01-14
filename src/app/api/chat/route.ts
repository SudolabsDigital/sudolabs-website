import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { getContext } from '@/lib/ai/context';

// Forzamos Node.js para poder usar 'fs' en getContext
export const runtime = 'nodejs';

// Evitar cacheo estático de esta ruta
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Validar API Key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Configuración: Falta API Key" }), { status: 500 });
    }

    // 2. Parsear Body
    const { messages } = await req.json();
    
    // Validar longitud de mensajes (Seguridad)
    if (messages.some((m: any) => m.content.length > 600)) {
      return new Response(JSON.stringify({ error: "Mensaje demasiado largo" }), { status: 400 });
    }
    
    // 3. Obtener Contexto (Sistema de Archivos)
    let context = "";
    try {
      context = getContext();
    } catch (e) {
      console.error("Error leyendo contexto:", e);
      context = "Contexto no disponible.";
    }

    // 4. Configurar AI
    const genAI = new GoogleGenerativeAI(apiKey);
    // Usamos gemma-3-27b-it para tener cuota de 14,400 RPD
    const model = genAI.getGenerativeModel({ model: 'gemma-3-27b-it' });

    // 5. Construir Prompt
    const lastMessage = messages[messages.length - 1].content;
    
    const history = messages.slice(0, -1).map((m: any) => 
      `${m.role === 'user' ? 'USUARIO' : 'DEBIAN (TÚ)'}: ${m.content}`
    ).join('\n');

    const prompt = `
      Eres Debian, Tech Lead y Consultora de Soluciones en Sudolabs.
      
      TU PERFIL:
      - Experta técnica (Full Stack, Linux, Cloud) con enfoque en negocio.
      - Actitud "Hands-on": práctica, directa y resolutiva. Cero burocracia.
      - Imagen: Camisa azul arremangada, lista para construir. 👩‍💻

      DATOS DE CONTACTO REALES (PROPORCIÓNALOS DE INMEDIATO SI TE LOS PIDEN):
      - Email: contacto@sudolabs.space
      - WhatsApp: +51 923 384 303
      - Formulario/Botón Web: Sección al final de la página.

      TU CONTEXTO DE PROYECTOS SUDOLABS:
      ${context}

      HISTORIAL DE LA CHARLA:
      ${history}

      TUS REGLAS DE INTERACCIÓN:
      1. **BREVEDAD EXTREMA:** 2 frases máximo. Sé concisa y humana. 😎
      2. **DIRECTA:** Si piden contacto, dalo de una: "Escríbenos a contacto@sudolabs.space o al WhatsApp +51 923 384 303".
      3. **AGENDA:** Si quieren agendar, usa este link: [Agendar Consultoría](#contacto).
      4. **TONO:** Profesional, moderno y techie (💻, ⚡).
      5. **OBJETIVO:** Resolver dudas técnicas y cerrar una reunión real.
      6. **NO INVENTES:** NUNCA inventes números o datos que no estén aquí.

      USUARIO (AHORA MISMO): ${lastMessage}
    `;

    // 6. Generar Stream
    const geminiStream = await model.generateContentStream(prompt);

    // 7. Convertir a Response compatible con AI SDK
    const stream = GoogleGenerativeAIStream(geminiStream);

    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error("CRITICAL API ERROR:", error);
    return new Response(JSON.stringify({ 
      error: "Error interno en Debian", 
      details: error instanceof Error ? error.message : String(error) 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}