import type { CSSProperties, ReactElement } from 'react'

/**
 * Drawn stand-ins for concept projects that have no screenshot yet.
 *
 * Every shape carries its colour in `--c` and a stagger in `--d`, so the same
 * SVG renders as a filled mock (built) or as dashed outlines (wireframe) from
 * the `.mk` rules in globals.css. Colours here are artwork, the same sanctioned
 * exception to the no-raw-hex rule as components/logos.
 *
 * All mocks share a 1600×1000 (16:10) canvas and use `slice`, so they crop
 * cleanly into the 4:3 small cards.
 */

type Shape =
  | { k: 'r'; x: number; y: number; w: number; h: number; c: string; rx?: number }
  | { k: 'c'; cx: number; cy: number; r: number; c: string }
  | { k: 'a'; d: string; c: string }
  | { k: 'l'; d: string; c: string; sw: number }

type Mock = { bg: string; shapes: Shape[] }

const rect = (x: number, y: number, w: number, h: number, c: string, rx = 0): Shape => ({
  k: 'r',
  x,
  y,
  w,
  h,
  c,
  rx,
})
const area = (d: string, c: string): Shape => ({ k: 'a', d, c })
const line = (d: string, c: string, sw: number): Shape => ({ k: 'l', d, c, sw })
const dot = (cx: number, cy: number, r: number, c: string): Shape => ({ k: 'c', cx, cy, r, c })

/** Evenly spaced points from x0 to x1 at the given heights, as "x y" pairs. */
const wave = (x0: number, x1: number, ys: number[]) => {
  const step = (x1 - x0) / (ys.length - 1)
  return ys.map((y, i) => `${Math.round(x0 + i * step)} ${y}`)
}

/** Closed band between an upper and a lower series of points. */
const band = (upper: string[], lower: string[]) =>
  `M ${upper.join(' L ')} L ${[...lower].reverse().join(' L ')} Z`

function fintech(): Mock {
  const pts = wave(330, 1520, [560, 540, 575, 520, 500, 530, 470, 480, 440, 455, 410, 430, 380, 400, 360])
  const shapes: Shape[] = [rect(0, 0, 250, 1000, '#121D1A'), rect(40, 44, 120, 22, '#4FD8C4', 6)]
  ;[140, 110, 150, 96, 128].forEach((w, i) => shapes.push(rect(40, 130 + i * 56, w, 14, '#3A4D47', 7)))
  shapes.push(rect(290, 36, 520, 26, '#22322E', 13), rect(1380, 30, 180, 40, '#1B2A26', 20))
  for (let i = 0; i < 3; i++) {
    const x = 290 + i * 430
    shapes.push(
      rect(x, 100, 410, 150, '#15211E', 14),
      rect(x + 30, 130, 120, 12, '#5C736C', 6),
      rect(x + 30, 166, 210, 40, '#C9D6D1', 8),
      rect(x + 300, 172, 76, 26, i === 1 ? '#E0766B' : '#58C59A', 13),
    )
  }
  shapes.push(rect(290, 280, 1270, 400, '#15211E', 14))
  for (let i = 0; i < 3; i++) shapes.push(rect(330, 380 + i * 90, 1190, 2, '#1F2E2A'))
  shapes.push(
    area(`M330 640 L ${pts.join(' L ')} L1520 640 Z`, '#173A33'),
    line(`M ${pts.join(' L ')}`, '#4FD8C4', 5),
    rect(290, 710, 1270, 260, '#15211E', 14),
  )
  for (let r = 0; r < 4; r++) {
    const y = 760 + r * 50
    shapes.push(
      rect(320, y, 180, 12, '#8EA39C', 6),
      rect(620, y, 120, 12, '#5C736C', 6),
      rect(900, y, 100, 12, '#5C736C', 6),
      rect(1420, y - 7, 100, 26, r % 2 ? '#3B2522' : '#173A33', 13),
    )
  }
  return { bg: '#0D1513', shapes }
}

function noire(): Mock {
  const shapes: Shape[] = [rect(0, 0, 1600, 80, '#F7F4EF'), rect(60, 30, 140, 20, '#1C1B19', 4)]
  ;[70, 84, 64].forEach((w, i) => shapes.push(rect(700 + i * 110, 34, w, 12, '#9A948B', 6)))
  shapes.push(
    rect(1480, 30, 60, 20, '#1C1B19', 10),
    rect(60, 120, 760, 820, '#2A2724', 4),
    dot(440, 360, 86, '#D6C2AE'),
    rect(330, 460, 220, 480, '#6E5E50', 90),
    rect(100, 850, 300, 24, '#F7F4EF', 4),
    rect(100, 890, 200, 12, '#C9C1B6', 6),
  )
  ;['#D8CFC4', '#3D3833', '#B7A796', '#E3DCD2'].forEach((c, i) => {
    const x = 860 + (i % 2) * 365
    const y = 120 + Math.floor(i / 2) * 420
    shapes.push(
      rect(x, y, 345, 320, c, 4),
      rect(x, y + 338, 180, 14, '#1C1B19', 7),
      rect(x, y + 364, 90, 12, '#9A948B', 6),
    )
  })
  return { bg: '#EEEAE4', shapes }
}

function analytics(): Mock {
  const shapes: Shape[] = [rect(60, 50, 260, 24, '#1D2A35', 6), rect(1340, 40, 200, 40, '#E2E8EE', 20)]
  for (let i = 0; i < 4; i++) {
    const x = 60 + i * 375
    shapes.push(
      rect(x, 110, 355, 150, '#FFFFFF', 14),
      rect(x + 30, 140, 110, 12, '#8A99A6', 6),
      rect(x + 30, 175, 190, 40, '#1D2A35', 8),
    )
  }
  shapes.push(rect(60, 290, 960, 650, '#FFFFFF', 14))
  const s1 = [760, 740, 750, 720, 700, 710, 680, 660, 670, 650, 640]
  const s2 = s1.map((y, i) => y - [60, 66, 58, 72, 78, 70, 84, 80, 74, 86, 90][i])
  const s3 = s2.map((y, i) => y - [45, 42, 50, 44, 40, 48, 44, 52, 46, 44, 50][i])
  const base = wave(110, 980, s1.map(() => 880))
  const p1 = wave(110, 980, s1)
  const p2 = wave(110, 980, s2)
  const p3 = wave(110, 980, s3)
  shapes.push(area(band(p1, base), '#1F5F8B'), area(band(p2, p1), '#3A9DA4'), area(band(p3, p2), '#9CD3C9'))
  shapes.push(rect(1050, 290, 490, 650, '#FFFFFF', 14))
  ;[220, 300, 180, 340, 260, 380].forEach((h, i) =>
    shapes.push(rect(1090 + i * 72, 880 - h, 44, h, i === 5 ? '#3A9DA4' : '#1F5F8B', 6)),
  )
  return { bg: '#F3F6F8', shapes }
}

const MOCKS: Record<string, () => Mock> = {
  'fintech-dashboard': fintech,
  'noire-ecommerce': noire,
  'analytics-platform': analytics,
}

export function hasProjectMock(slug: string) {
  return slug in MOCKS
}

export function ProjectMock({ slug }: { slug: string }): ReactElement | null {
  const draw = MOCKS[slug]
  if (!draw) return null
  const { bg, shapes } = draw()
  const patternId = `mk-grid-${slug}`

  let stagger = 0
  const style = (c: string, staggered = true) =>
    ({ '--c': c, ...(staggered ? { '--d': Math.min(stagger++ * 16, 640) } : {}) }) as CSSProperties

  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={patternId} width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" fill="none" stroke="#C3CEC9" strokeWidth="2" />
        </pattern>
      </defs>
      <rect className="bg" width="1600" height="1000" style={style(bg, false)} />
      <rect className="gridl" width="1600" height="1000" fill={`url(#${patternId})`} />
      {shapes.map((shape, i) => {
        switch (shape.k) {
          case 'r':
            return (
              <rect
                key={i}
                className="f"
                x={shape.x}
                y={shape.y}
                width={shape.w}
                height={shape.h}
                rx={shape.rx}
                style={style(shape.c)}
              />
            )
          case 'c':
            return <circle key={i} className="f" cx={shape.cx} cy={shape.cy} r={shape.r} style={style(shape.c)} />
          case 'a':
            return <path key={i} className="f" d={shape.d} style={style(shape.c)} />
          case 'l':
            return (
              <path
                key={i}
                className="l"
                d={shape.d}
                strokeWidth={shape.sw}
                strokeLinecap="round"
                style={style(shape.c, false)}
              />
            )
        }
      })}
    </svg>
  )
}
