import Link from 'next/link'

import { footerLinks, site, socialLinks } from '@/content/site'

const link =
  'cursor-pointer text-fg transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

/**
 * The bottom of the night band. On the homepage it continues the studio and
 * contact sections; on every other page it is the only dark block.
 *
 * The wordmark is sized in container units (`cqi`) against its own wrapper, so
 * it spans the full width at every breakpoint without JavaScript. Copyright
 * year is computed server-side.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="theme-night border-hairline border-t">
      <div className="shell pt-10 pb-8 lg:pt-14 lg:pb-10">
        <div className="@container mb-8 overflow-hidden lg:mb-12">
          <p
            aria-hidden="true"
            className="font-display text-[length:14.6cqi] leading-[0.82] font-extrabold tracking-[-0.015em] whitespace-nowrap uppercase [font-stretch:var(--stretch-wordmark)]"
          >
            SOLUT<span className="text-accent">II</span>ONS.DEV
          </p>
        </div>

        <div className="type-meta grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <p lang="ar" dir="rtl" className="text-fg w-fit text-lg">
              {site.taglineAr}
            </p>
            <p className="text-fg-muted">{site.taglineEn}</p>
          </div>

          <nav aria-labelledby="footer-links" className="lg:col-span-2">
            <h2 id="footer-links" className="type-label text-fg-muted mb-3">
              Pages
            </h2>
            <ul className="flex flex-col gap-1.5">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-social" className="lg:col-span-2">
            <h2 id="footer-social" className="type-label text-fg-muted mb-3">
              Social
            </h2>
            <ul className="flex flex-col gap-1.5">
              {socialLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {item.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="type-label text-fg-muted mb-3">Email</h2>
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
          </div>
        </div>

        <div className="type-mono text-fg-muted border-hairline mt-10 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t pt-5">
          <span>
            © {year} {site.name}
          </span>
          <span>Websites, web apps and AI systems</span>
        </div>
      </div>
    </footer>
  )
}
