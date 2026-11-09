import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Full-bleed page wrapper.
 *
 * `overflow-clip`, NOT `overflow-hidden`. `overflow: hidden` creates a scroll
 * container, and a `position: sticky` child sticks to its nearest scrolling
 * ancestor — the sticky header would scroll away with the page.
 */
export function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('bg-surface relative m-0 min-h-svh overflow-clip', className)}>{children}</div>
  )
}
