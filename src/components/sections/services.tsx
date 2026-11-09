import type { ReactNode } from 'react'

import { processLabel, processSteps } from '@/content/process'
import { services, servicesNote } from '@/content/services'

/**
 * Services as an accordion of native <details>, so it works without
 * JavaScript and keyboard/AT support comes for free. Each row says how it is
 * billed; opening it shows what it is, what's included and what the client can
 * count on. The four-step process sits underneath, numbered because it is a
 * real sequence.
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-hairline py-band lg:py-band-lg border-t"
    >
      <div className="shell">
        <h2 id="services-heading" className="type-h2 text-fg">
          Services
        </h2>
        <p className="type-mono text-fg-subtle mt-3 mb-8 lg:mb-10">{servicesNote}</p>

        <div className="border-fg border-t">
          {services.map((service, index) => (
            <details key={service.slug} open={index === 0} className="border-hairline border-b">
              <summary className="text-fg hover:text-accent flex cursor-pointer list-none items-center gap-4 py-4.5 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <h3 className="type-h2-secondary">{service.title}</h3>
                <span className="type-mono text-fg-subtle ms-auto whitespace-nowrap">{service.pricing}</span>
                <span aria-hidden="true" className="svc-plus" />
              </summary>

              <div className="type-meta text-fg-muted grid grid-cols-1 gap-5 pb-8 md:grid-cols-3 md:gap-6">
                <Column label="What it is">
                  <p className="max-w-[44ch]">{service.description}</p>
                </Column>
                <Column label="What’s included">
                  <PlusList items={service.includes} />
                </Column>
                <Column label="You can count on">
                  <PlusList items={service.commitments} />
                </Column>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-14 lg:mt-18">
          <h3 className="type-label text-fg-subtle mb-4">{processLabel}</h3>
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.index} className="border-fg grid content-start gap-2 border-t pt-3.5">
                <span className="type-mono text-accent">{String(step.index).padStart(2, '0')}</span>
                <h4 className="text-fg text-lg font-semibold">{step.title}</h4>
                <p className="type-meta text-fg-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Column({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h4 className="type-label text-fg-subtle mb-2.5">{label}</h4>
      {children}
    </div>
  )
}

function PlusList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="text-accent font-mono">
            +
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
