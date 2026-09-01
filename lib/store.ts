export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=fr.komogo.app'

export const APP_SCHEME = 'komogo'

export function eventDeepLink(slug: string) {
  return `${APP_SCHEME}://e/${slug}`
}

export function eventAndroidIntentLink(slug: string) {
  return `intent://e/${slug}#Intent;scheme=${APP_SCHEME};package=fr.komogo.app;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`
}

export function authConfirmDeepLink(search: string) {
  return `${APP_SCHEME}:///auth/confirm${search ? `?${search}` : ''}`
}

export type Platform = 'android' | 'ios' | 'desktop'

export function detectPlatform(userAgent: string): Platform {
  if (/android/i.test(userAgent)) return 'android'
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'ios'
  return 'desktop'
}
