import { MetadataRoute } from 'next'
import { siteConfig } from '@/core/config'
 
export default function robots(): MetadataRoute.Robots {
  return {
    // Sitio institucional sin rutas privadas: no se prohíbe nada.
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  }
}