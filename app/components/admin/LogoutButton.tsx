"use client";

import { logoutAdmin } from "@/app/admin/login/actions";

export function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="rounded-md border border-border px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:border-border-strong hover:text-text focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]"
      >
        Sign out
      </button>
    </form>
  );
}
