/**
 * Homepage copy that has no other home. Services, process, studio stats and
 * projects keep living in their own files; this holds the hero, the profile
 * column, the hero build mock and which projects the homepage features.
 */

export const hero = {
  /** Two authored lines. The second renders muted. */
  lines: ['Websites, web apps and AI systems', 'for businesses across the Middle East'],
} as const

export const profile = {
  intro:
    'Solutiions.dev is a small, senior studio building websites, web apps, AI systems and online stores for businesses across the Middle East.',
  builds: [
    'Websites (Next.js, SEO-ready)',
    'Web apps and dashboards',
    'AI chatbots, automation and agents',
    'E-commerce with local payments',
    'UI / UX design',
    'API and integrations',
    'Maintenance',
  ],
  languages: {
    before: 'English and ',
    arabic: 'العربية',
    after: '. Layouts mirror for right-to-left reading.',
  },
} as const

/* ── Hero build mock ─────────────────────────────────────────────────────── */

export type MockLang = 'en' | 'ar'

export type MockCopy = {
  logo: string
  nav: [string, string, string]
  cart: string
  headline: string
  sub: string
  button: string
  beans: [string, string, string]
  prices: [string, string, string]
  bnpl: string
}

/**
 * A fictional Riyadh coffee roaster, used to show the same storefront as a
 * wireframe and as a finished build, in English and in Arabic.
 */
export const buildMock = {
  domain: 'hayl-roasters.sa',
  caption:
    'Concept mock for a fictional Riyadh coffee roaster. Switch between wireframe and built, English and Arabic.',
  copy: {
    en: {
      logo: 'Hayl',
      nav: ['Shop', 'Subscriptions', 'About'],
      cart: 'Cart (2)',
      headline: 'Specialty coffee, roasted in Riyadh',
      sub: 'Single-origin beans, delivered across the Gulf in 48 hours.',
      button: 'Shop now',
      beans: ['Ethiopia', 'Colombia', 'Yemen'],
      prices: ['SAR 68', 'SAR 74', 'SAR 92'],
      bnpl: 'Split it into 4 interest-free payments with Tabby',
    },
    ar: {
      logo: 'هيل',
      nav: ['المتجر', 'الاشتراكات', 'من نحن'],
      cart: 'السلة (٢)',
      headline: 'قهوة مختصة، محمّصة في الرياض',
      sub: 'حبوب أحادية المصدر، تصلك في أنحاء الخليج خلال ٤٨ ساعة.',
      button: 'تسوّق الآن',
      beans: ['إثيوبيا', 'كولومبيا', 'اليمن'],
      prices: ['٦٨ ر.س', '٧٤ ر.س', '٩٢ ر.س'],
      bnpl: 'قسّمها على ٤ دفعات بدون فوائد مع تابي',
    },
  } satisfies Record<MockLang, MockCopy>,
} as const

/* ── Case studies ────────────────────────────────────────────────────────── */

export const workIntro = {
  heading: 'Case studies',
  aside: 'Concept work',
  note: 'These are concept projects that show the kind of work we take on. Client case studies replace them as they launch.',
  hint: 'Hover a project to see its wireframe.',
  more: { label: 'Explore all work', href: '/portfolio' },
} as const

export type FeaturedWork = {
  /** A slug from src/content/portfolio.ts. */
  slug: string
  /** Two large cards, then a row of small ones. */
  size: 'lg' | 'sm'
  /** One line under the title. Lead with the result where there is one. */
  summary: string
}

export const featuredWork: FeaturedWork[] = [
  {
    slug: 'driver-website',
    size: 'lg',
    summary: 'Personal brand site for a racing driver: season stats, race calendar, journal and store.',
  },
  {
    slug: 'clothing-store',
    size: 'lg',
    summary: 'Storefront for weather-ready technical jackets, with a terminal-inspired, motion-led design.',
  },
  {
    slug: 'coffee-shop',
    size: 'sm',
    summary: 'Specialty coffee house with menu, sourced beans and order-ahead.',
  },
  {
    slug: 'fintech-dashboard',
    size: 'sm',
    summary: 'Trading console that reads calmly: interaction latency down 72%.',
  },
  {
    slug: 'noire-ecommerce',
    size: 'sm',
    summary: 'Editorial Shopify theme: mobile Lighthouse from 38 to 96.',
  },
  {
    slug: 'analytics-platform',
    size: 'sm',
    summary: 'One chart system for 12 teams; reports render 64% faster.',
  },
]

/* ── Start a project ─────────────────────────────────────────────────────── */

export const startIntro = {
  heading: 'Start a project',
  body: 'Tell us what you’re building. We’ll come back with a clear brief and a fixed quote.',
} as const
