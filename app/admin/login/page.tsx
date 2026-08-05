import type { Metadata } from "next";
import { LoginForm } from "@/app/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/admin") ? params.next : "/admin";

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-[var(--gutter)] py-16">
      <div>
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-text">
          Sign in
        </h1>
        <p className="mt-2 text-text-muted">
          Internal ops console for System Summit leads and traffic.
        </p>
      </div>
      <LoginForm nextPath={nextPath} />
    </div>
  );
}
