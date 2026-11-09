import Link from 'next/link'
import type { ReactNode } from 'react'

import { BuildMock } from '@/components/home/build-mock'
import { hero, profile } from '@/content/home'
import { ctaItem, site } from '@/content/site'

/**
 * Hero: the niche as a two-line headline (second line muted), then the live
 * build mock beside a ruled profile column, on the crosshair grid.
 *
 * The profile column paints its own paper background (plus a 14px halo) so the
 * grid never runs behind body text.
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="bg-crosshair pt-6 pb-16 lg:pt-14 lg:pb-24">
      <div className="shell">
        <h1 id="hero-heading" className="type-h1 text-fg">
          <span className="block">{hero.lines[0]}</span>{' '}
          <span className="text-fg-subtle block">{hero.lines[1]}</span>
        </h1>

        <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
          <BuildMock />

          <aside
            aria-label="Studio profile"
            className="bg-surface type-meta text-fg-muted grid min-w-0 gap-7 shadow-[0_0_0_14px_var(--color-surface)]"
          >
            <Spec label="Profile">
              <p className="max-w-[54ch]">{profile.intro}</p>
            </Spec>

            <Spec label="What we build">
              <ul className="grid gap-0.5">
                {profile.builds.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Spec>

            <Spec label="Languages">
              <p>
                {profile.languages.before}
                <span lang="ar">{profile.languages.arabic}</span>
                {profile.languages.after}
              </p>
            </Spec>

            <Spec label="Contact">
              <Link
                href={ctaItem.href}
                className="text-accent hover:text-accent-deep w-fit font-semibold underline underline-offset-4 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {ctaItem.label}
              </Link>
              <span className="type-mono text-fg-subtle">{site.email}</span>
            </Spec>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2.5">
      <h2 className="type-label text-fg-subtle border-fg border-b pb-2">{label}</h2>
      {children}
    </div>
  )
}
