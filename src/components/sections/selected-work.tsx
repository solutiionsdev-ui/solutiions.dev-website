import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { CaseMedia } from '@/components/home/case-media'
import { hasProjectMock, ProjectMock } from '@/components/home/project-mocks'
import { featuredWork, workIntro, type FeaturedWork } from '@/content/home'
import { portfolio, type PortfolioItem } from '@/content/portfolio'
import { cn } from '@/lib/cn'

/**
 * Case studies: two large cards, a row of small ones, then a plain table of
 * every project. Each card leads with its result; concept work is always
 * labelled (brief §20).
 */
export function SelectedWork() {
  const cards = featuredWork
    .map((entry) => ({ entry, item: portfolio.find((p) => p.slug === entry.slug) }))
    .filter((card): card is { entry: FeaturedWork; item: PortfolioItem } => Boolean(card.item))

  return (
    <section id="work" aria-labelledby="work-heading" className="border-hairline py-band lg:py-band-lg border-t">
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 id="work-heading" className="type-h2 text-fg">
            {workIntro.heading}
          </h2>
          <p className="type-h2 text-fg-subtle">{workIntro.aside}</p>
        </div>
        <p className="type-mono text-fg-subtle mt-3 mb-8 flex flex-wrap justify-between gap-x-6 gap-y-1 lg:mb-10">
          <span className="max-w-[70ch]">{workIntro.note}</span>
          <span className="hidden [@media(hover:hover)]:inline">{workIntro.hint}</span>
        </p>

        <div className="grid grid-cols-12 gap-x-4 gap-y-10 lg:gap-x-6">
          {cards.map(({ entry, item }, index) => (
            <WorkCard key={item.slug} entry={entry} item={item} priority={index < 2} />
          ))}
        </div>

        <WorkIndex />

        <Link
          href={workIntro.more.href}
          className="text-accent hover:text-accent-deep mt-6 inline-block font-semibold underline underline-offset-4 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {workIntro.more.label}
        </Link>
      </div>
    </section>
  )
}

function WorkCard({
  entry,
  item,
  priority,
}: {
  entry: FeaturedWork
  item: PortfolioItem
  priority: boolean
}) {
  const large = entry.size === 'lg'
  const mock = hasProjectMock(item.slug)

  return (
    <article
      className={cn(
        'group relative col-span-12 flex min-w-0 flex-col gap-3',
        large ? 'md:col-span-6' : 'sm:col-span-6 lg:col-span-3',
      )}
    >
      <div className="grid gap-1">
        <h3 className="type-title text-accent flex flex-wrap items-center gap-2">
          <CardLink item={item}>{item.title}</CardLink>
          {item.concept ? <ConceptChip /> : null}
        </h3>
        <p className="type-meta text-fg">{entry.summary}</p>
      </div>

      <CaseMedia kind={mock ? 'mock' : 'image'} className={large ? 'aspect-[16/10]' : 'aspect-[4/3]'}>
        {mock ? (
          <ProjectMock slug={item.slug} />
        ) : (
          <Image
            src={item.cover.src}
            alt={item.cover.alt}
            width={item.cover.width}
            height={item.cover.height}
            priority={priority}
            sizes={large ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
          />
        )}
      </CaseMedia>

      <p className="type-mono text-fg-subtle flex flex-wrap gap-x-3.5">
        <span>{item.type}</span>
        <span>{item.industry}</span>
        <span>{item.liveUrl ? 'Live site ↗' : 'Case study'}</span>
      </p>
    </article>
  )
}

/** The title link is stretched over the whole card, so the card is one target. */
function CardLink({ item, children }: { item: PortfolioItem; children: ReactNode }) {
  const className =
    'after:absolute after:inset-0 after:rounded-card group-hover:underline underline-offset-4 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ring'

  if (item.liveUrl) {
    return (
      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span className="sr-only"> (live site, opens in a new tab)</span>
      </a>
    )
  }

  return (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  )
}

function ConceptChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'type-label text-fg-subtle border-hairline rounded-pill inline-block border px-2 py-0.5 align-middle',
        className,
      )}
    >
      Concept
    </span>
  )
}

function WorkIndex() {
  const cell = 'py-3.5 pr-4 align-top'
  const head = 'type-label text-fg-subtle py-2.5 pr-4 font-medium'

  return (
    <div className="mt-14 overflow-x-auto lg:mt-20">
      <table className="type-meta w-full border-collapse text-left">
        <caption className="sr-only">All projects</caption>
        <thead>
          <tr className="border-fg border-b">
            <th scope="col" className={head}>
              Project
            </th>
            <th scope="col" className={head}>
              Type
            </th>
            <th scope="col" className={cn(head, 'max-md:hidden')}>
              Industry
            </th>
            <th scope="col" className={cn(head, 'max-lg:hidden')}>
              Scope
            </th>
            <th scope="col" className={cn(head, 'pr-0 text-right')}>
              <span className="sr-only">Link</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item) => (
            <tr key={item.slug} className="border-hairline border-b">
              <th scope="row" className={cn(cell, 'text-fg font-semibold')}>
                {item.title}
                {item.concept ? <ConceptChip className="ml-2" /> : null}
              </th>
              <td className={cell}>{item.type}</td>
              <td className={cn(cell, 'max-md:hidden')}>{item.industry}</td>
              <td className={cn(cell, 'max-lg:hidden')}>{item.tags.join(', ')}</td>
              <td className={cn(cell, 'pr-0 text-right whitespace-nowrap')}>
                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-deep font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    Live site ↗<span className="sr-only"> {item.title}, opens in a new tab</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-accent hover:text-accent-deep font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    Case study<span className="sr-only">: {item.title}</span>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
