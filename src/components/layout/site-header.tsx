'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { DomainMark } from '@/components/layout/domain-mark'
import { MobileNav } from '@/components/layout/mobile-nav'
import { ctaItem, navItems, navSectionIds } from '@/content/site'
import { cn } from '@/lib/cn'

const pill =
  'type-nav hit-area inline-flex h-8 cursor-pointer items-center rounded-pill px-3.5 transition-colors duration-(--dur-base) ease-(--ease-out-quart) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

/**
 * Sticky header: the url-style wordmark on the left, pill navigation on the
 * right. Transparent at rest so the hero reads as one composition; after 24px
 * of scroll it gains a paper background and a hairline.
 *
 * The active pill uses ONE IntersectionObserver over the homepage sections, so
 * GSAP stays out of the header's chunk.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return

    const sections = navSectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      // A band counts as active once it occupies the upper-middle of the viewport.
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  // Returning focus to the toggle is what makes the sheet keyboard-safe.
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  const currentId = isHome ? activeId : null

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-[border-color,background-color] duration-(--dur-base) ease-(--ease-out-quart)',
          scrolled ? 'border-hairline bg-surface/90 backdrop-blur-md' : 'border-transparent',
        )}
      >
        <div className="shell h-nav flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Solutiions.dev home"
            className="text-fg decoration-fg/60 hover:decoration-accent cursor-pointer underline decoration-1 underline-offset-4 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <DomainMark />
          </Link>

          <div className="flex items-center gap-1.5">
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1.5">
                {navItems.map((item) => {
                  const id = item.href.split('#')[1] ?? null
                  const isActive = (Boolean(id) && id === currentId) || item.href === pathname
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          pill,
                          isActive
                            ? 'bg-surface-3 text-fg'
                            : 'bg-surface-2 text-fg hover:bg-surface-3',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <Link
              href={ctaItem.href}
              className={cn(pill, 'bg-fg text-surface hover:bg-accent hover:text-on-accent')}
            >
              {ctaItem.label}
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Open navigation"
              className="text-fg -mr-2 flex size-11 cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
            >
              <Menu aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={closeMenu} activeId={currentId} />
    </>
  )
}
