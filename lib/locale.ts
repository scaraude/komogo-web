export type Locale = 'fr' | 'en'

export const DEFAULT_LOCALE: Locale = 'fr'

const SUPPORTED_LOCALES: readonly Locale[] = ['fr', 'en']

function isSupportedLocale(code: string): code is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(code)
}

export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag = '', ...attributes] = part.trim().split(';')
      const quality = attributes.find((attribute) => attribute.trim().startsWith('q='))
      return { language: tag.trim().slice(0, 2).toLowerCase(), weight: quality ? Number(quality.trim().slice(2)) : 1 }
    })
    .filter(({ weight }) => Number.isFinite(weight) && weight > 0)
    .sort((left, right) => right.weight - left.weight)
  return ranked.map(({ language }) => language).find(isSupportedLocale) ?? DEFAULT_LOCALE
}

export function dateLocaleOf(locale: Locale): string {
  return locale === 'en' ? 'en-GB' : 'fr-FR'
}
