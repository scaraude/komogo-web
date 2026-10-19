'use client'

import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics'
import { eventAndroidIntentLink, eventDeepLink } from '@/lib/store'
import { StoreButtons } from '@/app/DownloadSection'
import { usePlatform } from '@/app/usePlatform'
import type { Messages } from '@/lib/messages'

export function OpenInApp({
  slug,
  inviteUrl,
  messages,
}: {
  slug: string
  inviteUrl: string
  messages: Messages
}) {
  const platform = usePlatform()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (platform === 'android') {
      window.location.replace(eventDeepLink(slug))
    }
  }, [platform, slug])

  async function copyInviteUrl() {
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="mt-10 flex w-full flex-col items-center gap-4">
      {platform !== 'desktop' && (
        <a
          href={platform === 'android' ? eventAndroidIntentLink(slug) : eventDeepLink(slug)}
          onClick={() => track('open_in_app_click', { platform })}
          className="w-full max-w-[300px] rounded-[15px] bg-terracotta px-6 py-[14px] text-[16px] font-bold text-on-dark shadow-[0_4px_0_var(--color-terracotta-dk)] transition-all active:translate-y-1 active:shadow-none"
        >
          {messages.openInApp}
        </a>
      )}

      <StoreButtons platform={platform} context="interstitial" messages={messages} />

      <div className="mt-4 w-full max-w-[320px] rounded-[18px] border border-line-2 bg-card p-4 text-left">
        <p className="text-[13px] leading-[1.5] text-body">
          {messages.justInstalled}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <code className="min-w-0 flex-1 truncate rounded-[10px] bg-soft px-3 py-2 text-[12px] text-ink">
            {inviteUrl.replace(/^https?:\/\//, '')}
          </code>
          <button
            type="button"
            onClick={copyInviteUrl}
            className="shrink-0 rounded-[10px] bg-ink px-3 py-2 text-[12px] font-bold text-on-dark transition-all active:translate-y-[2px]"
          >
            {copied ? messages.copied : messages.copy}
          </button>
        </div>
      </div>

      {platform === 'desktop' && (
        <p className="max-w-[300px] text-[13px] leading-[1.5] text-muted">
          {messages.openOnPhone}
        </p>
      )}
    </div>
  )
}
