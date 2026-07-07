"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  /** Stagger index - delays the enter transition by index * step. */
  index?: number;
  step?: number;
  as?: "div" | "li" | "section";
  className?: string;
};

/**
 * Wraps already-visible content with a subtle fade+rise on scroll-in.
 * Never gates visibility: the element is in the DOM and readable regardless.
 */
export function Reveal({
  children,
  index = 0,
  step = 60,
  as = "div",
  className,
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-[var(--dur-slow)] motion-safe:ease-[var(--ease-out)]",
        revealed
          ? "opacity-100 translate-y-0"
          : "motion-safe:opacity-0 motion-safe:translate-y-3",
        className,
      )}
      style={{ transitionDelay: revealed ? `${index * step}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
