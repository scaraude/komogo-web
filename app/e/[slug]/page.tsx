import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getEventPreview } from '@/lib/event-preview'
import { formatEventDates } from '@/lib/format'
import { clientEnv } from '@/lib/env/client'
import { OpenInApp } from './OpenInApp'

export default async function EventInterstitialPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventPreview(slug)
  if (!event) notFound()

  const dateLabel = formatEventDates(event.date_start, event.date_end)
  const inviteUrl = `${clientEnv.siteUrl}/e/${slug}`

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col px-6 pb-10 pt-8">
      <header className="flex items-center justify-center gap-2">
        <Image src="/komo-mark.png" alt="" width={1280} height={486} className="h-auto w-[40px]" />
        <span className="text-[18px] font-bold tracking-[0.5px] text-ink" style={{ fontFamily: 'var(--font-fredoka)' }}>
          Komogo
        </span>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center py-8 text-center">
        <p className="text-[14px] font-bold uppercase tracking-[2px] text-terracotta">
          Ton crew t&apos;invite
        </p>

        <h1 className="mt-3 text-[32px] font-bold leading-[1.15] text-ink" style={{ fontFamily: 'var(--font-fredoka)' }}>
          {event.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border-[1.5px] border-line bg-card px-4 py-2 text-[14px] text-ink">
            📅 {dateLabel}
          </span>
          {event.destination && (
            <span className="rounded-full border-[1.5px] border-line bg-card px-4 py-2 text-[14px] text-ink">
              📍 {event.destination}
            </span>
          )}
        </div>

        {event.participant_count > 0 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="flex -space-x-2">
              {event.initials.map((initial, index) => (
                <span
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-terracotta-soft text-[13px] font-bold text-terracotta"
                >
                  {initial}
                </span>
              ))}
            </span>
            <span className="text-[14px] text-muted">
              {event.participant_count === 1
                ? 'déjà 1 partant·e'
                : `déjà ${event.participant_count} partant·es`}
            </span>
          </div>
        )}

        <OpenInApp slug={slug} inviteUrl={inviteUrl} />
      </section>
    </main>
  )
}
