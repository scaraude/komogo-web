import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import { messagesFor } from '@/lib/messages'
import { requestLocale } from '@/lib/request-locale'
import { FinishInApp } from './FinishInApp'

export async function generateMetadata(): Promise<Metadata> {
  const messages = messagesFor(await requestLocale())
  return { title: messages.signInTitle, robots: { index: false } }
}

export default async function AuthConfirmPage() {
  const messages = messagesFor(await requestLocale())
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col px-6 pb-10 pt-8">
      <header className="flex items-center justify-center gap-2">
        <Image src="/komo-mark.png" alt="" width={1280} height={486} className="h-auto w-[40px]" />
        <span className="text-[18px] font-bold tracking-[0.5px] text-ink" style={{ fontFamily: 'var(--font-fredoka)' }}>
          Komogo
        </span>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-[26px] font-bold text-ink" style={{ fontFamily: 'var(--font-fredoka)' }}>
          {messages.oneMoreStep}
        </h1>
        <p className="mt-3 max-w-[300px] text-[15px] leading-[1.5] text-body">
          {messages.signInFinishesInApp}
        </p>
        <Suspense fallback={null}>
          <FinishInApp messages={messages} />
        </Suspense>
      </section>
    </main>
  )
}
