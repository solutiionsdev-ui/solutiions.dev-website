import Link from 'next/link'

import { about, stats } from '@/content/about'
import { technologies } from '@/content/tech'

/**
 * The studio band: the first block of the night band that runs on into the
 * contact section and the footer. The statement is the studio's own promise,
 * not a client quote.
 */
export function About() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="theme-night pt-band lg:pt-band-lg pb-6 lg:pb-10"
    >
      <div className="shell">
        <div className="mb-8 flex items-center justify-between gap-4 lg:mb-12">
          <h2 id="studio-heading" className="type-label text-fg-muted">
            {about.label}
          </h2>
          <Link
            href={about.cta.href}
            className="type-button bg-accent text-on-accent hover:bg-accent-deep rounded-pill inline-flex h-11 items-center px-5 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {about.cta.label}
          </Link>
        </div>

        <p className="type-statement text-accent mb-10 max-w-[26ch] lg:mb-16">{about.statement}</p>

        <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-[minmax(0,13.75rem)_minmax(0,1fr)] lg:gap-12">
          {/* Swap for a real <Image> of the team before launch. */}
          <div
            role="img"
            aria-label="Placeholder for a team photo"
            className="border-accent type-mono text-fg-muted rounded-card grid aspect-[4/5] w-44 place-content-center gap-1 border border-dashed p-3 text-center sm:w-auto"
          >
            <span className="text-accent font-medium">{about.portrait.file}</span>
            <span>{about.portrait.note}</span>
          </div>

          <div className="min-w-0">
            <p className="text-fg mb-7 max-w-[50ch] text-lg">{about.body}</p>

            <dl className="border-hairline grid grid-cols-3 gap-4 border-t pt-5">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse justify-end gap-1.5">
                  <dt className="type-mono text-fg-muted">{stat.label}</dt>
                  <dd className="font-display text-fg text-[length:clamp(1.75rem,3vw,2.75rem)] leading-none font-medium tabular-nums [font-stretch:84%]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="type-mono text-fg-muted mt-7">
              Built with <span className="text-fg">{technologies.map((tech) => tech.name).join(' · ')}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
