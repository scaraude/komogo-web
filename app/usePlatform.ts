'use client'

import { useSyncExternalStore } from 'react'
import { detectPlatform, type Platform } from '@/lib/store'

const subscribe = () => () => {}

export function usePlatform(): Platform {
  return useSyncExternalStore(
    subscribe,
    () => detectPlatform(navigator.userAgent),
    () => 'desktop' as Platform,
  )
}
