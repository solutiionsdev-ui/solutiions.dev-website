'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/lib/use-reduced-motion'

/**
 * Signature 2. Wraps a case study's media (a screenshot or a drawn mock) and
 * shows it as a blueprint until it scrolls into view, then builds it. Hovering
 * the card shows the blueprint again.
 *
 * The blueprint state is still fully visible (outlines, a faded screenshot),
 * so nothing is ever hidden waiting for JavaScript. Under reduced motion the
 * media renders built straight away.
 */
export function CaseMedia({
  kind,
  className,
  children,
}: {
  kind: 'image' | 'mock'
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [built, setBuilt] = useState(false)
  const [peek, setPeek] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || reduced !== false) return

    let timer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        // A beat of blueprint before it builds, so the change is noticed.
        timer = setTimeout(() => setBuilt(true), 450)
      },
      { threshold: 0.35 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [reduced])

  useEffect(() => {
    const card = ref.current?.closest('article')
    if (!card || !window.matchMedia('(hover: hover)').matches) return

    const show = () => setPeek(true)
    const hide = () => setPeek(false)
    card.addEventListener('mouseenter', show)
    card.addEventListener('mouseleave', hide)
    return () => {
      card.removeEventListener('mouseenter', show)
      card.removeEventListener('mouseleave', hide)
    }
  }, [])

  const isBuilt = reduced === true || built
  const state = isBuilt && !peek ? 'built' : 'wire'

  return (
    <div ref={ref} className={cn('mk', className)} data-kind={kind} data-state={state}>
      {children}
      {kind === 'image' ? (
        <>
          <span aria-hidden="true" className="mk-grid" />
          <span aria-hidden="true" className="mk-frame" />
        </>
      ) : null}
      <span aria-hidden="true" className="mk-tag">
        wireframe
      </span>
    </div>
  )
}
