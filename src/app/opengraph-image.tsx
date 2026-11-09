import { ImageResponse } from 'next/og'

import { loadOgFont } from '@/lib/og-font'
import { staticColors } from '@/lib/static-colors'

import { hero } from '@/content/home'
import { site } from '@/content/site'

/**
 * Runs on the NODE runtime, not edge. ImageResponse is backed by satori, which
 * needs explicit font buffers and fails on variable fonts — so this loads the
 * committed static instance (`Archivo-SemiCondensed-ExtraBold.ttf`, OFL, see
 * Archivo-OFL.txt) rather than the variable face used by the site itself.
 *
 * Night band colours, so the card reads as the site's footer and stands out in
 * a light social feed.
 */
export const runtime = 'nodejs'

export const alt = `${site.name}: ${hero.lines.join(' ')}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const archivo = await loadOgFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: staticColors.night,
          padding: '64px 72px',
          fontFamily: 'Archivo',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            letterSpacing: 1,
            color: staticColors.nightFg,
          }}
        >
          <span>SOLUT</span>
          <span style={{ color: staticColors.mint }}>II</span>
          <span>ONS.DEV</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 68,
            lineHeight: 1,
            letterSpacing: -1.5,
            color: staticColors.nightFg,
          }}
        >
          <span>{hero.lines[0]}</span>
          <span style={{ color: staticColors.mint }}>{hero.lines[1]}</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: `1px solid ${staticColors.nightRule}`,
            paddingTop: 28,
            fontSize: 22,
            color: staticColors.nightMute,
          }}
        >
          <span>Web development and AI studio</span>
          <span>{site.email}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Archivo', data: archivo, weight: 800, style: 'normal' }],
    },
  )
}
