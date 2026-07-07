import type { ReactNode } from "react";
import { AlertIcon } from "@/app/components/ui/icons";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  hint?: string;
  hintId?: string;
  children: ReactNode;
};

/** Label + control + inline error/hint wiring. Pass ids through to the input. */
export function Field({
  label,
  htmlFor,
  error,
  errorId,
  hint,
  hintId,
  children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-text"
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-sm text-danger"
        >
          <AlertIcon className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
