import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'
import { detectPlatform } from '@/lib/store'
import { DownloadSection } from './DownloadSection'

export default async function LandingPage() {
  const userAgent = (await headers()).get('user-agent') ?? ''
  const platform = detectPlatform(userAgent)

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col px-6 pb-10 pt-8">
      <header className="flex items-center justify-center gap-2">
        <Image src="/komo-mark.png" alt="" width={1280} height={486} className="h-auto w-[46px]" />
        <span className="text-[20px] font-bold tracking-[0.5px] text-ink" style={{ fontFamily: 'var(--font-fredoka)' }}>
          Komogo
        </span>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center py-10 text-center">
        <h1 className="animate-rise-up">
          <span className="sr-only">Komogo — </span>
          <span className="block text-[38px] font-bold uppercase leading-[1.1] tracking-[1px] text-ink">
            Crew. Plan. <span className="text-terracotta">Go.</span>
          </span>
        </h1>

        <p className="animate-rise-up mt-5 max-w-[300px] text-[16px] leading-[1.5] text-body" style={{ animationDelay: '.08s' }}>
          Organise tes voyages entre amis.
          <br />
          Sans le bazar des groupes de discussion.
        </p>

        <div className="animate-rise-up relative mt-10" style={{ animationDelay: '.16s' }}>
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-soft/40 blur-3xl"
          />
          <Image
            src="/screenshot-mobile.png"
            alt="L'app Komogo sur un téléphone : le programme du séjour, qui vient, qui conduit."
            width={1080}
            height={2340}
            priority
            className="relative h-auto w-[220px] rounded-[28px] border-[6px] border-ink/90 shadow-[0_18px_40px_rgba(34,31,26,0.18)]"
          />
        </div>

        <DownloadSection platform={platform} />
      </section>

      <footer className="flex items-center justify-center gap-4 text-[12px] text-muted">
        <Link href="/confidentialite" className="underline underline-offset-2">
          Confidentialité
        </Link>
        <Link href="/suppression-compte" className="underline underline-offset-2">
          Supprimer mon compte
        </Link>
      </footer>
    </main>
  )
}
