import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseSecretKey, getSupabaseUrl } from "@/lib/supabase/env";

/**
 * Service-role client. Bypasses RLS — server-only.
 * Use for leads / page_views writes and admin reads.
 */
export function createAdminClient(): SupabaseClient {
  return createClient(getSupabaseUrl(), getSupabaseSecretKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
