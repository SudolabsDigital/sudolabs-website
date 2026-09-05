import type { BrandIconName } from "@/components/ui/icons";

export const siteConfig = {
  name: "Sudolabs Perú",
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://sudolabs.space",
  /**
   * 64 caracteres: entra completo en un resultado de búsqueda sin truncarse.
   * Los términos descriptivos van delante y la marca al final.
   */
  title: "Desarrollo de Software y Sistemas Web en Huancayo | Sudolabs Perú",
  description: "Desarrollamos sistemas web y software a medida para empresas: plataformas, integraciones y arquitectura cloud de alto rendimiento, desde Huancayo para el mundo.",
  shortDescription: "Consultora de Ingeniería de Software y Transformación Digital en Huancayo.",
  author: "Sudolabs Perú",
  ogImage: "/opengraph-image.webp",
  contact: {
    email: "contacto@sudolabs.space",
    phone: "+51 923 384 303",
    whatsapp: "51923384303", // Formato para API de Whatsapp
    address: "Prolongacion Jose Carlos Mariategui 205, Huancayo, Junín, Perú",
    city: "Huancayo",
    region: "Junín",
    country: "Perú",
    postalCode: "12001",
    geo: {
      latitude: -12.07395,
      longitude: -75.19748
    }
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61585696276461",
    instagram: "https://www.instagram.com/sudolabsperu/",
    tiktok: "https://www.tiktok.com/@sudolabs_peru",
    github: "https://github.com/sudolabs-digital"
  },
  /**
   * Handle de X sin la arroba.
   *
   * Sudolabs todavía no tiene cuenta, así que va vacío a propósito: mientras lo
   * esté, el botón de compartir en X funciona igual pero NO atribuye con `via=`.
   * Al crear la cuenta, basta con poner el handle aquí.
   */
  xHandle: ""
};

/**
 * Redes en el orden en que se muestran. Vive aquí y no en cada componente
 * porque la consumen el header y el footer: dos listas escritas a mano
 * divergen el día que se añade una red y alguien actualiza solo una.
 */
export const socialLinks: { name: BrandIconName; href: string; label: string }[] = [
  { name: "facebook", href: siteConfig.social.facebook, label: "Facebook" },
  { name: "instagram", href: siteConfig.social.instagram, label: "Instagram" },
  { name: "tiktok", href: siteConfig.social.tiktok, label: "TikTok" },
  { name: "github", href: siteConfig.social.github, label: "GitHub" },
];
