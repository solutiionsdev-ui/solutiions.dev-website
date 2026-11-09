'use client'

import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'

import { buildMock, type MockLang } from '@/content/home'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/lib/use-reduced-motion'

type View = 'wire' | 'built'
type Step = { view: View; lang: MockLang }

/** Autoplay loop: build it, show the blueprint, rebuild, then do it in Arabic. */
const SEQUENCE: Step[] = [
  { view: 'built', lang: 'en' },
  { view: 'wire', lang: 'en' },
  { view: 'built', lang: 'en' },
  { view: 'built', lang: 'ar' },
  { view: 'wire', lang: 'ar' },
  { view: 'built', lang: 'ar' },
]
const STEP_MS = 2600
/** Matches the .bm-site opacity transition in globals.css. */
const SWAP_MS = 230

const BEANS = [
  'var(--color-mock-bean-1)',
  'var(--color-mock-bean-2)',
  'var(--color-mock-bean-3)',
] as const

/** Stagger index for a block's content fade-in. */
const order = (i: number) => ({ '--i': i }) as CSSProperties

const segment = (active: boolean) =>
  cn(
    'type-nav inline-flex h-8 cursor-pointer items-center rounded-pill px-3 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    active ? 'bg-fg text-surface' : 'text-fg-muted hover:text-fg',
  )

/**
 * Signature 1. A small storefront for a fictional Riyadh coffee roaster, shown
 * as a wireframe and as a finished build, in English and in Arabic (the layout
 * mirrors because `dir` flips, not because anything is re-laid out by hand).
 *
 * Server render and first paint are the built English state, so the hero is
 * complete before any JavaScript runs. Autoplay starts only once motion is
 * known to be allowed, pauses off-screen and in background tabs, and stops for
 * good once a visitor uses a control.
 */
export function BuildMock() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const stepRef = useRef(0)
  const langRef = useRef<MockLang>('en')
  const swapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const [view, setView] = useState<View>('built')
  const [lang, setLang] = useState<MockLang>('en')
  const [shownLang, setShownLang] = useState<MockLang>('en')
  const [swapping, setSwapping] = useState(false)
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(false)

  // Fade the copy out, swap language and direction, fade back in.
  const changeLang = useCallback((next: MockLang, instant: boolean) => {
    if (next === langRef.current) return
    langRef.current = next
    setLang(next)
    clearTimeout(swapTimer.current)

    if (instant) {
      setShownLang(next)
      setSwapping(false)
      return
    }

    setSwapping(true)
    swapTimer.current = setTimeout(() => {
      setShownLang(next)
      setSwapping(false)
    }, SWAP_MS)
  }, [])

  useEffect(() => () => clearTimeout(swapTimer.current), [])

  useEffect(() => {
    const element = rootRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const autoplay = reduced === false && !paused && onScreen

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => {
      if (document.hidden) return
      stepRef.current = (stepRef.current + 1) % SEQUENCE.length
      const next = SEQUENCE[stepRef.current]
      setView(next.view)
      changeLang(next.lang, false)
    }, STEP_MS)
    return () => clearInterval(id)
  }, [autoplay, changeLang])

  const copy = buildMock.copy[shownLang]
  const dir = shownLang === 'ar' ? 'rtl' : 'ltr'

  return (
    <figure ref={rootRef} className="bm m-0 grid min-w-0 gap-3" data-state={view}>
      {/* The storefront is illustration; the caption and status line describe it. */}
      <div className="bm-frame" aria-hidden="true">
        <div className="border-hairline bg-surface flex items-center gap-2.5 border-b px-3 py-2.5">
          <WindowDots />
          <span className="type-mono text-fg-subtle min-w-0 flex-1 text-center">
            <span className="bg-surface-2 rounded-pill inline-block max-w-full truncate px-3 py-1 align-middle">
              {buildMock.domain}
            </span>
          </span>
          <WindowDots className="invisible" />
        </div>

        <div className="bm-stage">
          <div className={cn('bm-site', swapping && 'is-swapping')} dir={dir} lang={shownLang}>
            <div className="bm-b flex items-center gap-3.5 px-3.5 py-2.5 text-xs" data-w="nav" style={order(0)}>
              <strong className="text-mock-espresso text-[1.0625rem] font-extrabold tracking-[0.02em] uppercase [font-stretch:78%] rtl:text-base rtl:font-semibold rtl:[font-stretch:100%]">
                {copy.logo}
              </strong>
              <span className="text-mock-mute flex min-w-0 gap-3 whitespace-nowrap">
                <span>{copy.nav[0]}</span>
                <span className="max-sm:hidden">{copy.nav[1]}</span>
                <span>{copy.nav[2]}</span>
              </span>
              <span className="ms-auto font-semibold whitespace-nowrap">{copy.cart}</span>
            </div>

            <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-2.5">
              <div
                className="bm-b flex min-h-[clamp(190px,22vw,270px)] items-end [--bc:var(--color-mock-sand)] px-3 pt-6 pb-3 sm:px-4.5 sm:pb-4.5"
                data-w="h1 + cta"
                style={order(1)}
              >
                <div className="grid justify-items-start gap-2.5">
                  <p className="text-mock-espresso text-[clamp(19px,2.2vw,30px)] leading-[1.04] font-semibold tracking-[-0.01em] text-balance [font-stretch:86%] rtl:leading-[1.35] rtl:tracking-normal rtl:[font-stretch:100%]">
                    {copy.headline}
                  </p>
                  <p className="text-mock-mute max-w-[34ch] text-[12.5px] leading-[1.45]">{copy.sub}</p>
                  <span className="bg-mock-espresso text-mock-bg rounded-pill inline-block px-3.5 py-2 text-xs font-semibold">
                    {copy.button}
                  </span>
                </div>
              </div>
              <div
                className="bm-b grid place-items-center overflow-hidden [--bc:var(--color-mock-cardamom)]"
                data-w="img 4:5"
                style={order(2)}
              >
                <div className="bm-cup" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {BEANS.map((bean, index) => (
                <div
                  key={bean}
                  className="bm-b grid gap-1.5 p-2 text-xs"
                  data-w="card"
                  style={order(3 + index)}
                >
                  <div className="bm-bean" style={{ '--bean': bean } as CSSProperties} />
                  <span className="font-semibold">{copy.beans[index]}</span>
                  <span className="text-mock-mute tabular-nums">{copy.prices[index]}</span>
                </div>
              ))}
            </div>

            <div
              className="bm-b text-mock-mint-ink [--bc:var(--color-mock-mint)] px-3.5 py-2.5 text-xs font-semibold"
              data-w="bnpl · tabby"
              style={order(6)}
            >
              <span>{copy.bnpl}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
        <div role="group" aria-label="View" className="bg-surface-2 rounded-pill inline-flex gap-0.5 p-[3px]">
          <button
            type="button"
            aria-pressed={view === 'wire'}
            onClick={() => {
              setPaused(true)
              setView('wire')
            }}
            className={segment(view === 'wire')}
          >
            Wireframe
          </button>
          <button
            type="button"
            aria-pressed={view === 'built'}
            onClick={() => {
              setPaused(true)
              setView('built')
            }}
            className={segment(view === 'built')}
          >
            Built
          </button>
        </div>

        <div role="group" aria-label="Language" className="bg-surface-2 rounded-pill inline-flex gap-0.5 p-[3px]">
          <button
            type="button"
            aria-pressed={lang === 'en'}
            onClick={() => {
              setPaused(true)
              changeLang('en', reduced === true)
            }}
            className={segment(lang === 'en')}
          >
            EN
          </button>
          <button
            type="button"
            lang="ar"
            aria-pressed={lang === 'ar'}
            onClick={() => {
              setPaused(true)
              changeLang('ar', reduced === true)
            }}
            className={segment(lang === 'ar')}
          >
            عربي
          </button>
        </div>

        {reduced === false ? (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="type-nav border-hairline text-fg-muted hover:text-fg rounded-pill inline-flex h-8 cursor-pointer items-center border px-3 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {paused ? 'Play' : 'Pause'}
          </button>
        ) : null}

        <code aria-live="polite" className="type-mono text-fg-subtle bg-surface ms-auto">
          view: {view} · dir: {dir} · lang: {shownLang}
        </code>
      </div>

      <figcaption className="type-mono text-fg-subtle bg-surface w-fit">{buildMock.caption}</figcaption>
    </figure>
  )
}

function WindowDots({ className }: { className?: string }) {
  return (
    <span className={cn('flex gap-1.5', className)}>
      <i className="bg-hairline size-[9px] rounded-full" />
      <i className="bg-hairline size-[9px] rounded-full" />
      <i className="bg-hairline size-[9px] rounded-full" />
    </span>
  )
}
