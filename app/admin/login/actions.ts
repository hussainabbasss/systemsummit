"use server";

import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/env";

export type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string };

export async function loginAdmin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "/admin");
  const next = nextRaw.startsWith("/admin") ? nextRaw : "/admin";

  if (!email || !password) {
    return { status: "error", message: "Email and password are required." };
  }

  if (!isAdminEmail(email)) {
    return { status: "error", message: "That account is not authorized." };
  }

  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      status: "error",
      message: "Couldn’t sign in. Check your email and password.",
    };
  }

  // Double-check claims after sign-in (JWT must carry the allowlisted email).
  const { data } = await supabase.auth.getClaims();
  const claimsEmail = (data?.claims as { email?: string } | undefined)?.email;
  if (!isAdminEmail(claimsEmail)) {
    await supabase.auth.signOut();
    return { status: "error", message: "That account is not authorized." };
  }

  redirect(next);
}

export async function logoutAdmin(): Promise<void> {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
