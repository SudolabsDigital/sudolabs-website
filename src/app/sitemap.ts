import { MetadataRoute } from 'next'
import { getAllContent, getAllTags, BlogMeta, ProjectMeta, TeamMeta } from '@/lib/mdx'
import { siteConfig } from '@/core/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.siteUrl
  
  // Obtener contenido dinámico
  const blogs = await getAllContent<BlogMeta>('blog')
  const projects = await getAllContent<ProjectMeta>('projects')
  const team = await getAllContent<TeamMeta>('team')
  const legal = await getAllContent<BlogMeta>('legal')
  const tags = await getAllTags()

  const blogsUrls = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const projectsUrls = projects.map((project) => ({
    url: `${baseUrl}/proyectos/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const teamUrls = team.map((member) => ({
    url: `${baseUrl}/equipo/${member.slug}`,
    lastModified: new Date(member.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // El sitio es institucional y no tiene rutas privadas: se declara TODO lo
  // que se sirve. Antes faltaban las 55 etiquetas, /contacto y los dos legales
  // — 58 de las ~104 páginas indexables quedaban sin declarar.
  // `lastModified` sale SIEMPRE de una fecha real del contenido, nunca de
  // `new Date()`. Con la fecha del build, cada compilación le anuncia a Google
  // que la página cambió aunque no haya cambiado: un `lastmod` que siempre dice
  // «ahora» es una señal que los rastreadores acaban ignorando. Donde no hay
  // fecha real —páginas cuyo contenido vive en el código— se omite el campo:
  // no dar señal es mejor que dar una falsa.
  const masReciente = (fechas: string[]) =>
    fechas.length ? new Date(fechas.reduce((a, b) => (a > b ? a : b))) : undefined

  const legalUrls = legal.map((doc) => ({
    url: `${baseUrl}/legal/${doc.slug}`,
    lastModified: new Date(doc.date),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  // La etiqueta se actualiza cuando se publica un artículo que la lleva.
  const tagUrls = tags.map((tag) => ({
    url: `${baseUrl}/blog/tags/${tag.slug}`,
    lastModified: masReciente(
      blogs.filter((p) => p.tags?.includes(tag.name)).map((p) => p.date)
    ),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: masReciente([...blogs, ...projects, ...team].map((c) => c.date)),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      // Su contenido vive en el código: no hay fecha real que declarar.
      url: `${baseUrl}/servicios`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: masReciente(blogs.map((p) => p.date)),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: masReciente(projects.map((p) => p.date)),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/equipo`,
      lastModified: masReciente(team.map((m) => m.date)),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ]

  return [...staticRoutes, ...blogsUrls, ...projectsUrls, ...teamUrls, ...tagUrls, ...legalUrls]
}
