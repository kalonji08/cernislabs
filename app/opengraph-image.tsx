import { ImageResponse } from 'next/og'

export const alt = 'Cernislabs — AI & Software Consulting, Johannesburg'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          backgroundColor: '#09090b',
          padding: '64px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top — logo mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#f59e0b',
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
                backgroundColor: '#09090b',
              }}
            />
          </div>
          <span style={{ color: '#a1a1aa', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.02em' }}>
            Cernislabs
          </span>
        </div>

        {/* Middle — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#f59e0b',
            }}
          >
            Johannesburg, South Africa
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#fafafa',
            }}
          >
            AI that actually
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: '#f59e0b',
            }}
          >
            moves the needle.
          </div>
        </div>

        {/* Bottom — services + domain */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['AI Consulting', 'Data Engineering', 'Software Dev', 'Digital Marketing'].map((s) => (
              <div
                key={s}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: '1px solid #3f3f46',
                  color: '#71717a',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <span style={{ color: '#3f3f46', fontSize: '15px', letterSpacing: '0.02em' }}>
            cernislabs.com
          </span>
        </div>

        {/* Amber glow accent */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
