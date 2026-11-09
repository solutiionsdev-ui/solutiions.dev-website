import type { Stat } from './types'

/** The dark "Studio" band on the homepage. */
export const about = {
  label: 'Studio',
  statement:
    'No account managers, no handoffs. The people who scope your project are the people who build it.',
  body: 'We take on a handful of engagements at a time so every one gets senior attention from start to launch.',
  /** Shown until a real team photo is added. */
  portrait: { file: 'team-photo.jpg', note: '4:5 · add before launch' },
  cta: { label: 'Book a call', href: '/contact' },
} as const

export const stats: Stat[] = [
  { value: '6 yrs', label: 'building for the web' },
  { value: '40+', label: 'projects shipped' },
  { value: '98', label: 'average Lighthouse score' },
]
