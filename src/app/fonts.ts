import { Archivo, IBM_Plex_Sans_Arabic, JetBrains_Mono } from 'next/font/google'

/**
 * Three families, each with one job:
 *   • Archivo — headings AND body. One voice; headings use the width axis.
 *   • JetBrains Mono — labels, meta and anything that reads as "spec".
 *   • IBM Plex Sans Arabic — Arabic text (tagline, the hero's RTL demo).
 *
 * Archivo is a variable font: declaring `axes` (and omitting `weight`) loads
 * the full 100–900 weight range plus the width axis the headings depend on.
 */
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  // NOT 'swap': adjustFontFallback cannot metric-match a font-stretch face, so
  // a large headline would visibly reflow on swap.
  display: 'optional',
  preload: true,
})

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-arabic',
  display: 'swap',
  // Arabic shows below the fold or after a toggle — don't compete with Archivo.
  preload: false,
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const fontVariables = `${archivo.variable} ${plexArabic.variable} ${jetbrainsMono.variable}`
