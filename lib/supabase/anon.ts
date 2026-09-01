import { createClient } from '@supabase/supabase-js'
import { clientEnv } from '../env/client'

/**
 * Client Supabase anonyme, sans session ni cookies : le site ne lit plus la
 * base que via la RPC `security definer` get_event_preview (les grants anon
 * sur les tables ont été révoqués — migration grants explicites du 30/08).
 */
export function createAnonClient() {
  return createClient(clientEnv.supabaseUrl, clientEnv.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
