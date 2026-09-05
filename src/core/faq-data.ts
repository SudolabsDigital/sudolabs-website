/**
 * Preguntas frecuentes de la portada.
 *
 * Vive aquí y no dentro del componente porque la consumen DOS piezas: la
 * sección visible y el bloque `FAQPage` de datos estructurados. Con el array
 * dentro del componente, el schema sería una copia que un día discrepa de lo
 * que el visitante lee — y un `FAQPage` que no coincide con la página es peor
 * que no tenerlo.
 */
export const faqItems: { question: string; answer: string }[] = [
    {
      question: "Tengo una pequeña empresa, ¿es esto para mí?",
      answer: "Absolutamente. No necesitas ser una corporación para beneficiarte de la tecnología de alto nivel. A menudo, una pequeña automatización (como un sistema de pedidos, control de inventario o una web profesional rápida) puede duplicar la productividad de un equipo pequeño. Adaptamos la arquitectura y el presupuesto a tu etapa actual."
    },
    {
      question: "¿Por qué invertir en software a medida en lugar de usar algo genérico?",
      answer: "Lo genérico es fantástico para empezar, pero no escala bien con procesos únicos. Cuando tienes múltiples usuarios editando archivos, versiones conflictivas o datos dispersos, pierdes dinero y tiempo. Un software a medida centraliza tu información, automatiza tus reglas de negocio exactas y crece a tu ritmo, adaptándose a tu éxito sin obligarte a cambiar tu forma de trabajar."
    },
    {
      question: "¿Qué pasa cuando terminan el proyecto? ¿Me quedo solo?",
      answer: "Nunca. Creemos en relaciones a largo plazo como socios tecnológicos. Ofrecemos periodos de garantía post-lanzamiento donde corregimos cualquier error sin costo. Después, puedes optar por nuestros planes de mantenimiento continuo o, si prefieres, te entregamos toda la documentación para que tu equipo interno tome el control. Eres 100% dueño de tu código."
    },
    {
      question: "\"Tengo un sistema antiguo que limita mi crecimiento. ¿Pueden ayudar?\"",
      answer: "Sí, somos especialistas en \"Software Rescue\". Analizamos tu arquitectura actual, identificamos los cuellos de botella y proponemos un plan de migración o refactorización gradual. No siempre es necesario tirarlo todo y empezar de cero; a veces una optimización estratégica es la solución más rentable para volver a ser competitivos."
    }
];
