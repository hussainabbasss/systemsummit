import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/env";

export type AdminUser = {
  id: string;
  email: string;
};

/**
 * Verifies the JWT via getClaims, then checks ADMIN_EMAILS allowlist.
 * Returns null when unauthenticated or not allowlisted.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createAuthClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) return null;

  const claims = data.claims as {
    sub?: string;
    email?: string;
  };

  const email = claims.email;
  if (!claims.sub || !isAdminEmail(email)) return null;

  return { id: claims.sub, email: email! };
}

/** Redirects to /admin/login when the caller is not an allowlisted admin. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
