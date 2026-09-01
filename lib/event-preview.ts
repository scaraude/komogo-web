import { cache } from 'react'
import { createAnonClient } from './supabase/anon'

export type EventPreview = {
  title: string
  date_start: string | null
  date_end: string | null
  destination: string | null
  participant_count: number
  initials: string[]
}

/**
 * Seul chemin de lecture anonyme : la RPC get_event_preview (security
 * definer), définie dans le repo de l'app — la source des migrations.
 * `cache()` déduplique l'appel entre generateMetadata et la page.
 */
export const getEventPreview = cache(async (slug: string): Promise<EventPreview | null> => {
  const supabase = createAnonClient()
  const { data, error } = await supabase.rpc('get_event_preview', { p_slug: slug })
  if (error) return null
  const rows = (data ?? []) as EventPreview[]
  return rows[0] ?? null
})
