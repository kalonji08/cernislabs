import { ImageResponse } from 'next/og'

export const alt = 'CernisLabs — AI Consulting Johannesburg'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand palette
const BRAND    = '#191C1F'
const MUTED    = '#8D969E'
const LIGHT    = '#F4F4F4'
const BORDER   = '#E8EAEC'
const WHITE    = '#FFFFFF'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: WHITE,
          padding: '64px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${BORDER} 1.5px, transparent 1.5px)`,
            backgroundSize: '32px 32px',
            opacity: 0.8,
          }}
        />

        {/* Subtle brand glow — top right */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(25,28,31,0.06) 0%, transparent 70%)`,
          }}
        />

        {/* Top — logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: BRAND,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: WHITE,
              }}
            />
          </div>
          <span style={{ color: BRAND, fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            CernisLabs
          </span>
        </div>

        {/* Middle — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: MUTED,
            }}
          >
            Johannesburg, South Africa
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: BRAND,
            }}
          >
            AI that actually
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: MUTED,
            }}
          >
            moves the needle.
          </div>
          <div
            style={{
              marginTop: '16px',
              fontSize: '20px',
              color: MUTED,
              fontWeight: 400,
              maxWidth: '640px',
              lineHeight: 1.5,
            }}
          >
            Fixed-fee AI consulting for South African businesses. Senior partners. Results within 90 days.
          </div>
        </div>

        {/* Bottom — service pills + domain */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['AI Consulting', 'Data Engineering', 'Software Dev', 'Digital Marketing'].map((s) => (
              <div
                key={s}
                style={{
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: `1px solid ${BORDER}`,
                  backgroundColor: LIGHT,
                  color: MUTED,
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <span style={{ color: BORDER, fontSize: '15px', letterSpacing: '0.02em' }}>
            cernislabs.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
