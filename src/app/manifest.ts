import type { MetadataRoute } from 'next'

import { site } from '@/content/site'
import { staticColors } from '@/lib/static-colors'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Solutiions',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: staticColors.paper,
    theme_color: staticColors.paper,
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
