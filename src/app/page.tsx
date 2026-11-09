import { About } from '@/components/sections/about'
import { CtaBand } from '@/components/sections/cta-band'
import { Hero } from '@/components/sections/hero'
import { SelectedWork } from '@/components/sections/selected-work'
import { Services } from '@/components/sections/services'
import {
  jsonLd,
  organizationSchema,
  processSchema,
  servicesSchema,
  websiteSchema,
} from '@/lib/structured-data'

/**
 * Section order: Hero → Case studies → Services (with the process) → Studio →
 * Start a project. Proof first, then capability and reassurance, then the
 * people and the ask. Studio, Start a project and the footer form one
 * continuous night band.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(servicesSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(processSchema()) }}
      />

      <Hero />
      <SelectedWork />
      <Services />
      <About />
      <CtaBand />
    </>
  )
}
