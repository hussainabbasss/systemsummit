"use client";

import { useActionState, useId } from "react";
import {
  loginAdmin,
  type LoginState,
} from "@/app/admin/login/actions";
import { Field } from "@/app/components/ui/Field";
import { Input } from "@/app/components/ui/Input";
import { AlertIcon } from "@/app/components/ui/icons";
import { cn } from "@/lib/cn";

const initial: LoginState = { status: "idle" };

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, action, pending] = useActionState(loginAdmin, initial);
  const uid = useId();

  return (
    <form
      action={action}
      className="rounded-2xl border border-border bg-bg-elevated p-6 shadow-[var(--shadow-md)] sm:p-8"
    >
      <input type="hidden" name="next" value={nextPath} />

      {state.status === "error" ? (
        <p
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/8 px-4 py-3 text-sm text-danger"
        >
          <AlertIcon className="h-5 w-5 shrink-0" />
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-5">
        <Field label="Email" htmlFor={`${uid}-email`} errorId={`${uid}-email-err`}>
          <Input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="username"
            required
            disabled={pending}
            placeholder="you@systemsummit.online"
          />
        </Field>
        <Field
          label="Password"
          htmlFor={`${uid}-password`}
          errorId={`${uid}-password-err`}
        >
          <Input
            id={`${uid}-password`}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={pending}
            placeholder="••••••••"
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "mt-7 inline-flex w-full items-center justify-center rounded-md",
          "bg-primary px-7 py-3.5 text-base font-semibold text-primary-text",
          "min-h-[3.25rem] shadow-[var(--shadow-sm)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out)]",
          "hover:bg-primary-hover hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
          "disabled:cursor-progress disabled:opacity-80",
        )}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
