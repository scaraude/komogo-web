import type { Metadata } from 'next'
import { getEventPreview } from '@/lib/event-preview'
import { clientEnv } from '@/lib/env/client'

const BASE_URL = clientEnv.siteUrl

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventPreview(slug)

  if (!event) return {}

  const title = `${event.title} · Komogo`
  const description = event.destination
    ? `Rejoins l'event à ${event.destination} !`
    : `Rejoins l'event sur Komogo !`
  const ogImage = `${BASE_URL}/api/og/${slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
