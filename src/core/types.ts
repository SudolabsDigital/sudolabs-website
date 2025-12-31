export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  category: string
  image: string
}
