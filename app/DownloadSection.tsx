'use client'

import Image from 'next/image'
import { track } from '@vercel/analytics'
import type { Locale } from '@/lib/locale'
import type { Messages } from '@/lib/messages'
import { APP_STORE_URL, PLAY_STORE_URL, type Platform } from '@/lib/store'

const STORE_BUTTON_CLASS =
  'inline-flex items-center gap-3 rounded-[14px] bg-ink px-5 py-3 text-left text-on-dark shadow-[0_4px_0_rgba(0,0,0,0.25)] transition-all active:translate-y-1 active:shadow-none'

function PlayStoreButton({
  platform,
  context,
  messages,
}: {
  platform: Platform
  context: string
  messages: Messages
}) {
  return (
    <a
      href={PLAY_STORE_URL}
      onClick={() => track('download_click', { store: 'play', platform, context })}
      className={STORE_BUTTON_CLASS}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 shrink-0">
        <path fill="#00dc82" d="M3.6 1.8 13.7 12 3.6 22.2c-.4-.3-.6-.8-.6-1.4V3.2c0-.6.2-1.1.6-1.4Z" />
        <path fill="#ffd400" d="m13.7 12 3.4-3.4 3.4 1.9c1.1.6 1.1 2.4 0 3l-3.4 1.9-3.4-3.4Z" />
        <path fill="#ff3d4b" d="M3.6 22.2 13.7 12l3.4 3.4-11.7 6.9c-.6.3-1.3.3-1.8-.1Z" />
        <path fill="#00b4ff" d="M3.6 1.8c.5-.4 1.2-.4 1.8-.1l11.7 6.9-3.4 3.4L3.6 1.8Z" />
      </svg>
      <span>
        <span className="block text-[11px] uppercase tracking-[0.5px] text-on-dark-2">{messages.availableOn}</span>
        <span className="block text-[17px] font-bold leading-tight">Google Play</span>
      </span>
    </a>
  )
}

function AppStoreButton({
  platform,
  context,
  messages,
}: {
  platform: Platform
  context: string
  messages: Messages
}) {
  return (
    <a
      href={APP_STORE_URL}
      onClick={() => track('download_click', { store: 'apple', platform, context })}
      className={STORE_BUTTON_CLASS}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 shrink-0" fill="currentColor">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
      <span>
        <span className="block text-[11px] uppercase tracking-[0.5px] text-on-dark-2">{messages.downloadOnThe}</span>
        <span className="block text-[17px] font-bold leading-tight">{messages.appStore}</span>
      </span>
    </a>
  )
}

export function StoreButtons({
  platform,
  context,
  messages,
}: {
  platform: Platform
  context: string
  messages: Messages
}) {
  return (
    <div className="flex flex-col gap-4">
      {platform !== 'ios' && <PlayStoreButton platform={platform} context={context} messages={messages} />}
      {platform !== 'android' && <AppStoreButton platform={platform} context={context} messages={messages} />}
    </div>
  )
}

type Store = 'apple' | 'play'

// Official artwork, used as provided (Apple and Google forbid any change): App Store SVGs from
// toolbox.marketingtools.apple.com, Google Play PNGs from play.google.com/badges with their transparent margin trimmed.
const BADGES: Record<Store, Record<Locale, { src: string; width: number; height: number }>> = {
  apple: {
    fr: { src: '/badges/app-store-fr.svg', width: 127, height: 40 },
    en: { src: '/badges/app-store-en.svg', width: 120, height: 40 },
  },
  play: {
    fr: { src: '/badges/google-play-fr.png', width: 646, height: 192 },
    en: { src: '/badges/google-play-en.png', width: 564, height: 168 },
  },
}

// Landing: App Store first, as in the validated mockup; on mobile only the platform's own store.
function landingStores(platform: Platform): Store[] {
  if (platform === 'android') return ['play']
  if (platform === 'ios') return ['apple']
  return ['apple', 'play']
}

function StoreBadge({
  store,
  platform,
  locale,
  messages,
  context,
}: {
  store: Store
  platform: Platform
  locale: Locale
  messages: Messages
  context: string
}) {
  const badge = BADGES[store][locale]
  const label = store === 'apple' ? `${messages.downloadOnThe} ${messages.appStore}` : `${messages.availableOn} Google Play`
  return (
    <a
      href={store === 'apple' ? APP_STORE_URL : PLAY_STORE_URL}
      onClick={() => track('download_click', { store, platform, context })}
      className="rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta-dk"
    >
      {/* Same height for both badges: Google requires its badge to be at least as large as the others. */}
      <Image src={badge.src} alt={label} width={badge.width} height={badge.height} className="h-14 w-auto" />
    </a>
  )
}

type DownloadProps = { platform: Platform; locale: Locale; messages: Messages }

/** Hero: official store badges side by side, plus the QR code on desktop. */
export function HeroDownload({ platform, locale, messages }: DownloadProps) {
  return (
    <div className="mt-4 flex max-w-[420px] flex-col gap-3">
      {/* gap-4 keeps the clear space both guidelines require: a quarter of the badge height. */}
      <div className="flex flex-wrap gap-4">
        {landingStores(platform).map((store) => (
          <StoreBadge key={store} store={store} platform={platform} locale={locale} messages={messages} context="landing_hero" />
        ))}
      </div>
      {platform === 'desktop' && (
        <div className="flex items-center gap-3.5 px-1 py-2">
          <Image src="/qr-download.svg" alt={messages.qrAlt} width={64} height={64} className="h-16 w-16 rounded-lg" />
          <span className="max-w-[180px] text-[15px] leading-[1.4] text-body">{messages.scanFromDesktop}</span>
        </div>
      )}
    </div>
  )
}

/** Final call to action: the same badges on the dark block, plus the QR code on desktop. */
export function CtaDownload({ platform, locale, messages }: DownloadProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {landingStores(platform).map((store) => (
        <StoreBadge key={store} store={store} platform={platform} locale={locale} messages={messages} context="landing_cta" />
      ))}
      {platform === 'desktop' && (
        <Image src="/qr-download.svg" alt={messages.qrAlt} width={78} height={78} className="h-[78px] w-[78px] rounded-xl bg-card" />
      )}
    </div>
  )
}
