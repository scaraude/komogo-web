'use server'

import { ensureUser } from '@/lib/auth'

// Feedback in-app : insert dans Supabase (source de vérité). Le ping Discord est
// désormais géré au niveau DB (trigger `feedback_notify_discord` + pg_net), pour
// que web ET mobile notifient par le même chemin. RLS = insert pour tout user
// authentifié (anon inclus), donc on écrit via le client de ensureUser().

export async function sendFeedback(input: {
  message: string
  eventId?: string | null
  userAgent?: string | null
}) {
  const message = input.message?.trim()
  if (!message) throw new Error('Message vide.')
  if (message.length > 2000) throw new Error('Message trop long (2000 max).')

  const { userId, supabase } = await ensureUser()
  const { error } = await supabase.from('feedback').insert({
    message,
    event_id: input.eventId ?? null,
    user_id: userId,
    user_agent: input.userAgent ?? null,
  })
  if (error) {
    console.error('sendFeedback insert failed', error)
    throw new Error("Impossible d'envoyer le feedback.")
  }
}
