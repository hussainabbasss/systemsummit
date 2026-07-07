import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: "default" | "muted" | "inverse";
  className?: string;
  ariaLabelledby?: string;
  ariaLabel?: string;
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "",
  muted: "bg-surface-muted",
  inverse: "bg-bg-inverse text-text-on-inverse",
};

/** Vertical-rhythm section wrapper (`--section-y`). Optional tonal background. */
export function Section({
  children,
  id,
  tone = "default",
  className,
  ariaLabelledby,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      className={cn(toneClass[tone], className)}
      style={{ paddingBlock: "var(--section-y)" }}
    >
      {children}
    </section>
  );
}
