import type { Metadata, Viewport } from 'next'
import { Fredoka, Manrope } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { messagesFor } from '@/lib/messages'
import { requestLocale } from '@/lib/request-locale'

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const messages = messagesFor(await requestLocale())
  return {
    title: 'Komogo — Crew. Plan. Go.',
    description: messages.siteDescription,
  }
}

export const viewport: Viewport = {
  themeColor: '#df402a',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await requestLocale()
  return (
    <html lang={locale} className={`${fredoka.variable} ${manrope.variable}`}>
      <body className="min-h-screen font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
