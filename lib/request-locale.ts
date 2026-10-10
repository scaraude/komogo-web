import { headers } from 'next/headers'
import { localeFromAcceptLanguage, type Locale } from './locale'

export async function requestLocale(): Promise<Locale> {
  return localeFromAcceptLanguage((await headers()).get('accept-language'))
}
