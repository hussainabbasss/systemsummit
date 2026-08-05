/**
 * One-time bootstrap: ensure allowlisted admin exists in Supabase Auth.
 *
 * Usage (from project root, with .env.local loaded):
 *   node --env-file=.env.local scripts/bootstrap-admin.mjs
 *
 * Reads ADMIN_EMAILS (first email) + ADMIN_BOOTSTRAP_PASSWORD from env.
 * Never commit passwords.
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
const emails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);
const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
const email = emails[0];

if (!url || !secret) {
  console.error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY");
  process.exit(1);
}
if (!email) {
  console.error("ADMIN_EMAILS is empty — set at least one email");
  process.exit(1);
}
if (!password || password.length < 8) {
  console.error("Set ADMIN_BOOTSTRAP_PASSWORD (min 8 chars) for this run only");
  process.exit(1);
}

const supabase = createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: listed, error: listError } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 200,
});

if (listError) {
  console.error("listUsers failed:", listError.message);
  process.exit(1);
}

const existing = listed.users.find((u) => u.email?.toLowerCase() === email);

if (existing) {
  const { error } = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("updateUser failed:", error.message);
    process.exit(1);
  }
  console.log(`Updated password for existing admin: ${email}`);
} else {
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("createUser failed:", error.message);
    process.exit(1);
  }
  console.log(`Created admin user: ${email}`);
}
