'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The address as a real mailto link, plus a Copy button for people whose
 * device has no mail app set up. If the clipboard is refused, the address is
 * selected so the visitor can copy it themselves.
 */
export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState('Copy email')
  const linkRef = useRef<HTMLAnchorElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const reset = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setLabel('Copy email'), 1800)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setLabel('Copied')
    } catch {
      const link = linkRef.current
      if (link) {
        const range = document.createRange()
        range.selectNodeContents(link)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
      setLabel('Selected, press copy')
    }
    reset()
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 font-mono text-sm">
      <a
        ref={linkRef}
        href={`mailto:${email}`}
        className="text-fg hover:text-accent transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="type-mono border-hairline text-fg hover:border-accent hover:text-accent rounded-pill cursor-pointer border px-2.5 py-1.5 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {label}
      </button>
    </div>
  )
}
