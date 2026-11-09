import type { Step } from './types'

/** Descriptions written for SEO. */
export const processHeading = 'From idea to launch in 4 clear steps'

/** Label above the process strip on the homepage. */
export const processLabel = 'How every project runs'

export const processSteps: Step[] = [
  {
    index: 1,
    title: 'Discover',
    description:
      'We learn your goals, audience and market. You get a clear brief and a fixed quote.',
  },
  {
    index: 2,
    title: 'Design',
    description: 'Wireframes and clickable prototypes you approve before any code is written.',
  },
  {
    index: 3,
    title: 'Develop',
    description: 'We build and test on every device and browser, with regular demos along the way.',
  },
  {
    index: 4,
    title: 'Launch & grow',
    description: 'Deployment, SEO setup, analytics and ongoing improvements after launch.',
  },
]
