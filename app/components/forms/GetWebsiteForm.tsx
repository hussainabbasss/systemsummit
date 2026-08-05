"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { submitWebsiteRequest } from "@/app/(site)/get-a-website/actions";
import {
  validateField,
  type FieldErrors,
  type FormState,
  type WebsiteRequest,
} from "@/lib/validation";
import { Field } from "@/app/components/ui/Field";
import { Input } from "@/app/components/ui/Input";
import { FormSuccess } from "@/app/components/forms/FormSuccess";
import { AlertIcon, ArrowRightIcon } from "@/app/components/ui/icons";
import { brand } from "@/app/content/site";
import { cn } from "@/lib/cn";

type FieldKey = keyof WebsiteRequest;

const fields: {
  key: FieldKey;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  inputMode?: "text" | "email" | "tel";
}[] = [
  { key: "name", label: "Name", type: "text", autoComplete: "name", placeholder: "Jordan Alvarez" },
  { key: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@yourmun.org", inputMode: "email" },
  { key: "munName", label: "MUN name", type: "text", autoComplete: "organization", placeholder: "e.g. Meridian MUN" },
  { key: "phone", label: "Phone number", type: "tel", autoComplete: "tel", placeholder: "+1 555 012 3456", inputMode: "tel" },
];

const initialState: FormState = { status: "idle" };

export function GetWebsiteForm() {
  const [state, formAction, isPending] = useActionState(
    submitWebsiteRequest,
    initialState,
  );
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const uid = useId();
  const inputRefs = useRef<Record<FieldKey, HTMLInputElement | null>>({
    name: null,
    email: null,
    munName: null,
    phone: null,
  });

  const serverErrors = state.status === "error" ? state.fieldErrors ?? {} : {};

  // On a server error, focus the first invalid field.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = fields.find((f) => state.fieldErrors?.[f.key]);
    if (first) inputRefs.current[first.key]?.focus();
  }, [state]);

  if (state.status === "success") {
    return <FormSuccess message={state.message} />;
  }

  function handleBlur(key: FieldKey, value: string) {
    setClientErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
  }

  function clearError(key: FieldKey) {
    setClientErrors((prev) =>
      prev[key] ? { ...prev, [key]: undefined } : prev,
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-2xl border border-border bg-bg-elevated p-6 shadow-[var(--shadow-md)] sm:p-8"
    >
      {state.status === "error" && !state.fieldErrors && (
        <p
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/8 px-4 py-3 text-sm text-danger"
        >
          <AlertIcon className="h-5 w-5 shrink-0" />
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-5">
        {fields.map((f) => {
          const error = serverErrors[f.key] ?? clientErrors[f.key];
          const errorId = `${uid}-${f.key}-error`;
          return (
            <Field
              key={f.key}
              label={f.label}
              htmlFor={`${uid}-${f.key}`}
              error={error}
              errorId={errorId}
            >
              <Input
                id={`${uid}-${f.key}`}
                name={f.key}
                type={f.type}
                inputMode={f.inputMode}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                required
                disabled={isPending}
                invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                ref={(el) => {
                  inputRefs.current[f.key] = el;
                }}
                onBlur={(e) => handleBlur(f.key, e.currentTarget.value)}
                onInput={() => clearError(f.key)}
              />
            </Field>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md",
          "bg-accent px-7 py-3.5 text-base font-semibold text-text-on-accent",
          "min-h-[3.25rem] shadow-[var(--shadow-sm)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out)]",
          "hover:bg-accent-hover hover:shadow-[var(--shadow-md)] focus-visible:outline-none",
          "disabled:cursor-progress disabled:opacity-80",
        )}
      >
        {isPending ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          <>
            Get a Website
            <ArrowRightIcon className="h-[1.1em] w-[1.1em]" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-sm text-text-muted">
        {brand.responseSla} No spam, ever.
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
