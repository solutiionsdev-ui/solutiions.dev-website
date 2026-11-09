import type { Service } from './types'

/** Descriptions written for SEO and the MENA market. */
export const servicesHeading = 'Web development & AI systems for businesses across the Middle East'

/** One line under the "Services" heading on the homepage. */
export const servicesNote = 'Every project starts with a clear brief and a fixed quote.'

export const services: Service[] = [
  {
    index: 1,
    slug: 'web-development',
    title: 'Web Development',
    description:
      'Fast, SEO-ready websites for businesses across the Middle East, built with Next.js and optimised to rank and load in under a second.',
    pricing: 'Fixed quote',
    includes: [
      'Next.js build',
      'SEO setup and analytics',
      'Testing on every device and browser',
      'Regular demos while we build',
    ],
    commitments: [
      'A fixed quote after discovery',
      'A prototype you approve before any code',
      'Pages built to load in under a second',
    ],
  },
  {
    index: 2,
    slug: 'web-applications',
    title: 'Web Apps & AI Systems',
    description:
      'Custom platforms, dashboards and AI tools (chatbots, automation and AI agents) that save your team hours every week.',
    pricing: 'Fixed quote',
    includes: [
      'Platforms and dashboards',
      'AI chatbots and agents',
      'Workflow automation',
      'Links to the tools you already use',
    ],
    commitments: [
      'A clickable prototype before code',
      'Regular demos along the way',
      'A fixed quote after discovery',
    ],
  },
  {
    index: 3,
    slug: 'e-commerce',
    title: 'E-commerce',
    description:
      'Online stores that convert, with local MENA payment gateways like Tap, Checkout.com, Tabby and Tamara built in.',
    pricing: 'Fixed quote',
    includes: ['Store design and build', 'Tap, Checkout.com, Tabby and Tamara', 'SEO and analytics setup'],
    commitments: ['Testing on every device and browser', 'A prototype you approve before any code'],
  },
  {
    index: 4,
    slug: 'ui-ux-design',
    title: 'UI / UX Design',
    description:
      'Research-led interfaces, prototypes and design systems that make your product easy to use on every device.',
    pricing: 'Fixed quote',
    includes: ['User research', 'Wireframes', 'Clickable prototypes', 'Design systems'],
    commitments: ['You approve every screen before it is built'],
  },
  {
    index: 5,
    slug: 'api-integrations',
    title: 'API & Integrations',
    description:
      'Connect payments, CRMs, ERPs, WhatsApp Business and AI models with secure, well-documented APIs.',
    pricing: 'Fixed quote',
    includes: ['Payment gateways', 'CRM and ERP sync', 'WhatsApp Business', 'AI model APIs'],
    commitments: ['Documentation for every endpoint', 'Secure by default'],
  },
  {
    index: 6,
    slug: 'maintenance',
    title: 'Maintenance',
    description:
      'Monthly updates, security patches, uptime monitoring and speed optimisation, with support in your time zone.',
    pricing: 'Monthly',
    includes: ['Updates', 'Security patches', 'Uptime monitoring', 'Speed optimisation'],
    commitments: ['Support in your time zone'],
  },
]
