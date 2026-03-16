import { 
  FileText, PackageSearch, BarChart3, ShieldCheck, History, BellRing, Calendar,
  Search, Filter, FormInput, Calculator, Smartphone, WifiOff, Languages,
  GitBranch, Lock
} from "lucide-react"
import React from "react"

export interface SolutionCard {
  title: string;
  pain: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
}

export interface SolutionCategory {
  id: string;
  label: string;
  cards: SolutionCard[];
}

export const SOLUTIONS_DATA: SolutionCategory[] = [
  {
    id: "medida",
    label: "Software a Medida",
    cards: [
      {
        title: "Generación Automática de Documentos",
        pain: "¿Tu equipo pierde tiempo copiando datos?",
        description: "Generación instantánea de PDFs/Excel con formato oficial listos para firmar.",
        icon: <FileText className="w-5 h-5" />,
        slug: "generacion-automatica-documentos"
      },
      {
        title: "Control de Stock e Insumos",
        pain: "¿Inventario desactualizado?",
        description: "Descuento automático de insumos basado en recetas/fórmulas en tiempo real.",
        icon: <PackageSearch className="w-5 h-5" />,
        slug: "control-stock-insumos"
      },
      {
        title: "Dashboards de Métricas (KPIs)",
        pain: "¿Datos sin visualizar?",
        description: "Gráficos dinámicos para tomar decisiones gerenciales basadas en datos reales.",
        icon: <BarChart3 className="w-5 h-5" />,
        slug: "dashboards-metricas"
      },
      {
        title: "Roles y Permisos (ACL)",
        pain: "¿Acceso indebido a datos?",
        description: "Seguridad granular que restringe vistas y botones según el cargo del usuario.",
        icon: <ShieldCheck className="w-5 h-5" />,
        slug: "roles-permisos-acl"
      },
      {
        title: "Logs de Auditoría",
        pain: "¿Quién borró ese archivo?",
        description: "Registro inmutable de 'quién hizo qué y cuándo' para seguridad interna.",
        icon: <History className="w-5 h-5" />,
        slug: "trazabilidad-logs-auditoria"
      },
      {
        title: "Notificaciones Automáticas",
        pain: "¿Olvidos y retrasos?",
        description: "Alertas por Email/WhatsApp automáticas para vencimientos y citas.",
        icon: <BellRing className="w-5 h-5" />,
        slug: "alertas-notificaciones"
      },
      {
        title: "Gestión de Recursos",
        pain: "¿Conflictos de agenda?",
        description: "Algoritmos que evitan cruces de horarios en salas, equipos o personal.",
        icon: <Calendar className="w-5 h-5" />,
        slug: "gestion-calendarios"
      }
    ]
  },
  {
    id: "web",
    label: "Web & Apps",
    cards: [
      {
        title: "SEO Técnico Avanzado",
        pain: "¿Invisible en Google?",
        description: "SSR y metadatos dinámicos para indexación perfecta en buscadores.",
        icon: <Search className="w-5 h-5" />,
        slug: "seo-tecnico-avanzado"
      },
      {
        title: "Buscadores Inteligentes",
        pain: "¿Clientes frustrados?",
        description: "Búsqueda predictiva y filtros multicriterio con resultados milimétricos.",
        icon: <Filter className="w-5 h-5" />,
        slug: "buscadores-inteligentes"
      },
      {
        title: "Validación en Tiempo Real",
        pain: "¿Datos erróneos?",
        description: "Formularios que corrigen al usuario mientras escribe (DNI, RUC, Email).",
        icon: <FormInput className="w-5 h-5" />,
        slug: "validacion-formularios"
      },
      {
        title: "Cotizadores Web",
        pain: "¿Presupuestos lentos?",
        description: "Calculadoras interactivas que dan precios estimados 24/7.",
        icon: <Calculator className="w-5 h-5" />,
        slug: "cotizadores-web"
      },
      {
        title: "Diseño Responsive",
        pain: "¿Móvil roto?",
        description: "Interfaces fluidas que funcionan perfecto en cualquier dispositivo.",
        icon: <Smartphone className="w-5 h-5" />,
        slug: "diseno-responsive"
      },
      {
        title: "Modo Offline (PWA)",
        pain: "¿Sin internet?",
        description: "La app sigue funcionando sin señal y sincroniza al volver la conexión.",
        icon: <WifiOff className="w-5 h-5" />,
        slug: "modo-offline-pwa"
      },
      {
        title: "Multi-idioma (i18n)",
        pain: "¿Solo español?",
        description: "Cambio de idioma instantáneo sin romper el diseño ni el SEO.",
        icon: <Languages className="w-5 h-5" />,
        slug: "soporte-multi-idioma"
      }
    ]
  },
  {
    id: "consultoria",
    label: "Consultoría",
    cards: [
      {
        title: "Mapeo de Procesos",
        pain: "¿Caos operativo?",
        description: "Diagramas As-Is/To-Be para detectar cuellos de botella y optimizar flujos.",
        icon: <GitBranch className="w-5 h-5" />,
        slug: "mapeo-procesos"
      },
      {
        title: "Auditoría de Seguridad",
        pain: "¿Vulnerable?",
        description: "Detección de brechas de seguridad y plan de remediación técnica.",
        icon: <Lock className="w-5 h-5" />,
        slug: "auditoria-seguridad"
      }
    ]
  }
]
