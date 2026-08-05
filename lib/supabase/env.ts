/** Server-only env accessors. Never import this into Client Components. */

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSupabaseUrl(): string {
  return required("SUPABASE_URL");
}

export function getSupabasePublishableKey(): string {
  return required("SUPABASE_PUBLISHABLE_KEY");
}

export function getSupabaseSecretKey(): string {
  return required("SUPABASE_SECRET_KEY");
}

/** Comma-separated allowlist of admin emails (case-insensitive). */
export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS?.trim() ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.trim().toLowerCase());
}
