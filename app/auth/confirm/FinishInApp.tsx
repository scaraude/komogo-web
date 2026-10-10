'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { authConfirmDeepLink } from '@/lib/store'
import { PlayStoreButton, IosSoonBadge } from '@/app/DownloadSection'
import { usePlatform } from '@/app/usePlatform'
import type { Messages } from '@/lib/messages'

export function FinishInApp({ messages }: { messages: Messages }) {
  const searchParams = useSearchParams()
  const deepLink = authConfirmDeepLink(searchParams.toString())
  const platform = usePlatform()

  useEffect(() => {
    if (platform === 'android') {
      window.location.replace(deepLink)
    }
  }, [platform, deepLink])

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {platform !== 'ios' && (
        <a
          href={deepLink}
          className="w-full max-w-[300px] rounded-[15px] bg-terracotta px-6 py-[14px] text-[16px] font-bold text-on-dark shadow-[0_4px_0_var(--color-terracotta-dk)] transition-all active:translate-y-1 active:shadow-none"
        >
          {messages.backToApp}
        </a>
      )}
      <p className="max-w-[300px] text-[13px] leading-[1.5] text-muted">
        {messages.nothingHappens}
      </p>
      {platform === 'ios' ? (
        <IosSoonBadge messages={messages} />
      ) : (
        <PlayStoreButton platform={platform} context="auth-confirm" messages={messages} />
      )}
    </div>
  )
}
