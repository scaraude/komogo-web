import { ImageResponse } from '@vercel/og'
import { getEventPreview } from '@/lib/event-preview'
import { formatEventDates } from '@/lib/format'

export const runtime = 'edge'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventPreview(slug)

  if (!event) return new Response(null, { status: 404 })

  const dateLabel = formatEventDates(event.date_start, event.date_end, { fallback: 'Date à définir' })

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px', height: '630px',
          background: '#fbf4e9',
          display: 'flex', flexDirection: 'column',
          padding: '64px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: '#df402a' }} />
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#df402a', fontFamily: 'sans-serif' }}>
            Komogo · Crew. Plan. Go.
          </span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '72px', fontWeight: 900, lineHeight: 1, color: '#221f1a', marginBottom: '24px' }}>
            {event.title}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ background: '#fffdf8', border: '1.5px solid #e2d8c6', borderRadius: '999px', padding: '8px 16px', fontSize: '18px', color: '#221f1a', fontFamily: 'sans-serif' }}>
              📅 {dateLabel}
            </span>
            {event.destination && (
              <span style={{ background: '#fffdf8', border: '1.5px solid #e2d8c6', borderRadius: '999px', padding: '8px 16px', fontSize: '18px', color: '#221f1a', fontFamily: 'sans-serif' }}>
                📍 {event.destination}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'sans-serif' }}>
          {event.participant_count > 0 && (
            <>
              <div style={{ display: 'flex' }}>
                {event.initials.map((initial, index) => (
                  <div
                    key={index}
                    style={{
                      width: '44px', height: '44px', borderRadius: '999px',
                      background: '#fce7e1', border: '3px solid #fbf4e9',
                      marginLeft: index === 0 ? '0' : '-10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', fontWeight: 700, color: '#df402a',
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: '18px', color: '#5c574e', fontWeight: 600 }}>
                {event.participant_count === 1 ? 'déjà 1 partant' : `déjà ${event.participant_count} partants`}
              </span>
            </>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
