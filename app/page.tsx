import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'
import { detectPlatform } from '@/lib/store'
import { messagesFor, type Messages } from '@/lib/messages'
import { requestLocale } from '@/lib/request-locale'
import { CtaDownload, HeroDownload } from './DownloadSection'
import { FeatureScroll, type Feature } from './FeatureScroll'
import { HeroCarousel } from './HeroCarousel'

type ScreenId = 'hq' | 'dates' | 'plan' | 'crew' | 'feed' | 'lodging' | 'transport' | 'meals' | 'groceries' | 'activities'

const HERO_SCREENS: ScreenId[] = ['hq', 'dates', 'plan', 'crew', 'feed', 'lodging']

function screenNames(messages: Messages): Record<ScreenId, string> {
  return {
    hq: messages.screenHq,
    dates: messages.screenDates,
    plan: messages.screenPlan,
    crew: messages.screenCrew,
    feed: messages.screenFeed,
    lodging: messages.screenLodging,
    transport: messages.screenTransport,
    meals: messages.screenMeals,
    groceries: messages.screenGroceries,
    activities: messages.screenActivities,
  }
}

export default async function LandingPage() {
  const userAgent = (await headers()).get('user-agent') ?? ''
  const platform = detectPlatform(userAgent)
  const locale = await requestLocale()
  const messages = messagesFor(locale)

  const names = screenNames(messages)
  const screen = (id: ScreenId) => ({ src: `/screens/${id}.webp`, alt: messages.screenAlt.replace('{screen}', names[id]) })
  const heroScreens = HERO_SCREENS.map((id) => ({
    ...screen(id),
    dotLabel: messages.showScreen.replace('{screen}', names[id]),
  }))
  const features: Feature[] = [
    { kicker: messages.step1Kicker, title: messages.step1Title, text: messages.step1Text, screen: screen('hq') },
    { kicker: messages.step2Kicker, title: messages.step2Title, text: messages.step2Text, screen: screen('transport') },
    { kicker: messages.step3Kicker, title: messages.step3Title, text: messages.step3Text, screen: screen('meals') },
    { kicker: messages.step4Kicker, title: messages.step4Title, text: messages.step4Text, screen: screen('groceries') },
    { kicker: messages.step5Kicker, title: messages.step5Title, text: messages.step5Text, screen: screen('activities') },
  ]

  return (
    <div className="min-h-dvh bg-card text-ink">
      <main>
        <section className="overflow-hidden bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-10 p-6">
            <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[22px] py-6">
              <Image
                src="/komogo-logo.png"
                alt="Komogo"
                width={640}
                height={453}
                loading="eager"
                className="h-[84px] w-auto self-start"
              />
              <h1 className="mt-7 max-w-[605px] font-serif text-[clamp(36px,4.2vw,56px)] font-semibold leading-[1.08]">
                {messages.heroTitle}
              </h1>
              <p className="max-w-[499px] text-[20px] leading-[1.5] text-body">{messages.heroSubtitle}</p>
              <HeroDownload platform={platform} locale={locale} messages={messages} />
            </div>

            <div className="flex min-w-0 flex-[1_1_520px] justify-center pb-14 pt-10">
              <HeroCarousel
                screens={heroScreens}
                label={messages.carouselLabel}
                roleDescription={messages.carouselRoleDescription}
                dotsLabel={messages.carouselDotsLabel}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-[1240px] flex-col items-center gap-3.5 px-6 pb-10 pt-[120px] text-center">
          <span className="text-[14px] font-extrabold uppercase tracking-[0.12em] text-terracotta-dk">
            {messages.introEyebrow}
          </span>
          <h2 className="font-serif text-[clamp(32px,3.6vw,48px)] font-semibold leading-[1.1]">{messages.introTitle}</h2>
        </section>

        <FeatureScroll features={features} />

        <section className="px-6 pb-24">
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-10 rounded-[48px] bg-ink p-[clamp(40px,6vw,80px)] text-on-dark">
            <div className="flex flex-[1_1_380px] flex-col gap-3">
              <h2 className="font-serif text-[clamp(40px,5vw,64px)] font-semibold leading-[1.02]">
                Crew. Plan. <span className="text-orange-bright">Go.</span>
              </h2>
              <p className="text-[19px] text-on-dark-2">{messages.ctaText}</p>
            </div>
            <CtaDownload platform={platform} locale={locale} messages={messages} />
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 pb-12 text-[15px] text-body">
        <Image src="/komogo-logo.png" alt="Komogo" width={640} height={453} className="h-9 w-auto" />
        <nav className="flex flex-wrap gap-6">
          <Link href="/aide" className="text-ink underline underline-offset-2 hover:text-terracotta-dk">
            {messages.help}
          </Link>
          <Link href="/conditions" className="text-ink underline underline-offset-2 hover:text-terracotta-dk">
            {messages.terms}
          </Link>
          <Link href="/confidentialite" className="text-ink underline underline-offset-2 hover:text-terracotta-dk">
            {messages.privacy}
          </Link>
          <Link href="/suppression-compte" className="text-ink underline underline-offset-2 hover:text-terracotta-dk">
            {messages.deleteAccount}
          </Link>
        </nav>
        {/* Credit line required by Apple's guidelines wherever the App Store badge appears. */}
        <p className="basis-full text-[12px] leading-[1.5] text-muted">{messages.trademarks}</p>
      </footer>
    </div>
  )
}
