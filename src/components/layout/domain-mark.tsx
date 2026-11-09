import { site } from '@/content/site'

/** The url-style wordmark: "solutiions.dev" in mono, with the doubled "ii" in the accent. */
export function DomainMark() {
  return (
    <span className="font-mono text-sm font-medium tracking-normal whitespace-nowrap">
      {site.domain.before}
      <span className="text-accent">{site.domain.mark}</span>
      {site.domain.after}
    </span>
  )
}
