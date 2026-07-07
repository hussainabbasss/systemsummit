import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
};

/** Styled text input. Focus + invalid states driven by tokens. */
export function Input({ invalid, className, ref, ...rest }: InputProps) {
  return (
    <input
      ref={ref}
      {...rest}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-md border bg-bg-elevated px-4 text-base text-text",
        "min-h-[3rem] transition-[border-color,box-shadow] duration-[var(--dur-fast)]",
        "placeholder:text-text-muted focus-visible:outline-none",
        invalid
          ? "border-danger focus-visible:shadow-[0_0_0_3px_oklch(0.55_0.19_25_/_0.25)]"
          : "border-border focus-visible:border-accent focus-visible:shadow-[var(--shadow-focus)]",
        className,
      )}
    />
  );
}
