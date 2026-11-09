import type { NavItem, SocialLink } from './types'

/**
 * The single source for brand name, email, nav, socials and OG defaults.
 * No hardcoded strings for these anywhere else.
 */
export const site = {
  name: 'Solutiions.dev',
  wordmark: 'SOLUTIIONS.DEV',
  /** The url-style wordmark in the header. The doubled "ii" is the brand mark. */
  domain: { before: 'solut', mark: 'ii', after: 'ons.dev' },
  email: 'hello@solutiions.dev',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://solutiions.dev',
  description:
    'Solutiions.dev is a web development and AI agency serving the Middle East, crafting high-performance websites, web apps, AI systems and e-commerce stores.',
  tagline: 'We build digital experiences that matter.',
  /** Footer tagline. Arabic first, English underneath. */
  taglineAr: 'حلول رقمية للشرق الأوسط',
  taglineEn: 'Digital solutions for the Middle East',
  locale: 'en',
} as const

/**
 * Header pills. Contact is not in this list: the header's "Start a project"
 * button routes to the /contact intercepting modal. The homepage form band's
 * id is `start`, never `contact`, so there is exactly one thing called
 * "contact" on the site.
 */
export const navItems: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/#services' },
  { label: 'Studio', href: '/#studio' },
]

export const ctaItem: NavItem = { label: 'Start a project', href: '/contact' }

/** Section ids observed by the header's active-pill IntersectionObserver. */
export const navSectionIds = ['work', 'services', 'studio'] as const

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/solutiions-dev' },
  { label: 'GitHub', href: 'https://github.com/solutiions-dev' },
  { label: 'Instagram', href: 'https://www.instagram.com/solutiions.dev' },
  { label: 'X', href: 'https://x.com/solutiionsdev' },
]

export const footerLinks: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/contact' },
]
