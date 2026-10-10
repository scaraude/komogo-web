'use client'

import { Button } from '@/components/ui/Button'
import { localeFromAcceptLanguage } from '@/lib/locale'
import { messagesFor } from '@/lib/messages'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const messages = messagesFor(localeFromAcceptLanguage(typeof document === 'undefined' ? null : document.documentElement.lang))
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 text-[44px]">😵‍💫</div>
      <h1 className="mb-2 font-serif text-[26px] text-ink">{messages.somethingBroke}</h1>
      <p className="mb-6 text-[14px] leading-[1.5] text-muted">
        {messages.unexpectedError}
      </p>
      <Button onClick={reset} className="rounded-[15px] px-6 py-[14px] text-[15px]">
        {messages.retry}
      </Button>
    </main>
  )
}
