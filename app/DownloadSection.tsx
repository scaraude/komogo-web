'use client'

import Image from 'next/image'
import { track } from '@vercel/analytics'
import { PLAY_STORE_URL, type Platform } from '@/lib/store'

export function PlayStoreButton({ platform, context }: { platform: Platform; context: string }) {
  return (
    <a
      href={PLAY_STORE_URL}
      onClick={() => track('download_click', { store: 'play', platform, context })}
      className="inline-flex items-center gap-3 rounded-[14px] bg-ink px-5 py-3 text-left text-on-dark shadow-[0_4px_0_rgba(0,0,0,0.25)] transition-all active:translate-y-1 active:shadow-none"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 shrink-0">
        <path fill="#00dc82" d="M3.6 1.8 13.7 12 3.6 22.2c-.4-.3-.6-.8-.6-1.4V3.2c0-.6.2-1.1.6-1.4Z" />
        <path fill="#ffd400" d="m13.7 12 3.4-3.4 3.4 1.9c1.1.6 1.1 2.4 0 3l-3.4 1.9-3.4-3.4Z" />
        <path fill="#ff3d4b" d="M3.6 22.2 13.7 12l3.4 3.4-11.7 6.9c-.6.3-1.3.3-1.8-.1Z" />
        <path fill="#00b4ff" d="M3.6 1.8c.5-.4 1.2-.4 1.8-.1l11.7 6.9-3.4 3.4L3.6 1.8Z" />
      </svg>
      <span>
        <span className="block text-[11px] uppercase tracking-[0.5px] text-on-dark-2">Disponible sur</span>
        <span className="block text-[17px] font-bold leading-tight">Google Play</span>
      </span>
    </a>
  )
}

export function IosSoonBadge() {
  return (
    <p className="rounded-full bg-soft px-4 py-2 text-[13px] font-bold text-faint">
      🍏 Bientôt sur iPhone
    </p>
  )
}

export function DownloadSection({ platform }: { platform: Platform }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {platform === 'android' && <PlayStoreButton platform={platform} context="landing" />}

      {platform === 'ios' && (
        <>
          <IosSoonBadge />
          <p className="max-w-[280px] text-[13px] leading-[1.5] text-muted">
            L&apos;app iPhone arrive. En attendant, Komogo est disponible sur Android.
          </p>
        </>
      )}

      {platform === 'desktop' && (
        <>
          <div className="rounded-[18px] border border-line-2 bg-card p-4 shadow-[0_2px_0_var(--color-line-2)]">
            <Image src="/qr-download.svg" alt="QR code vers komogo.fr" width={148} height={148} className="h-[148px] w-[148px]" />
          </div>
          <p className="text-[13px] font-bold text-faint">Scanne avec ton téléphone pour installer l&apos;app</p>
          <PlayStoreButton platform={platform} context="landing" />
          <IosSoonBadge />
        </>
      )}
    </div>
  )
}
