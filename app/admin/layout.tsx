import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/app/components/ui/Logo";
import { ThemeToggle } from "@/app/components/layout/ThemeToggle";
import { AdminNav } from "@/app/components/admin/AdminNav";
import { LogoutButton } from "@/app/components/admin/LogoutButton";
import { getAdminUser } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · Admin · System Summit",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getAdminUser();

  return (
    <div className="flex min-h-full flex-col bg-bg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg-elevated/90 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between gap-4 px-[var(--gutter)] py-3">
          <div className="flex items-center gap-6">
            <Link
              href={user ? "/admin" : "/admin/login"}
              className="flex items-center gap-3"
              aria-label="System Summit admin home"
            >
              <Logo height={36} asStatic />
              <span className="hidden font-[family-name:var(--font-sora)] text-sm font-semibold tracking-wide text-text sm:inline">
                Admin
              </span>
            </Link>
            {user ? <AdminNav /> : null}
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <span className="hidden text-sm text-text-muted md:inline">
                {user.email}
              </span>
            ) : null}
            <ThemeToggle />
            {user ? <LogoutButton /> : null}
          </div>
        </div>
      </header>
      <main id="content" className="flex-1">
        {children}
      </main>
    </div>
  );
}
