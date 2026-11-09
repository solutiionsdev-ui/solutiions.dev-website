/**
 * The palette in literal form, for the contexts that cannot read a CSS custom
 * property at all:
 *
 *   • `ImageResponse` / satori (opengraph-image, apple-icon) — renders outside
 *     the browser, with no CSSOM and no :root to resolve var() against;
 *   • Next `Metadata.themeColor` and the web manifest — consumed by the browser
 *     chrome and the OS, not by the page.
 *
 * These MUST stay in sync with the `@theme` block in globals.css by hand.
 */
export const staticColors = {
  paper: '#F4F5F3',
  ink: '#111614',
  night: '#0E1A18',
  nightFg: '#E6EEEB',
  nightMute: '#9DB0AA',
  nightRule: '#2A3B36',
  mint: '#4FD8C4',
} as const
