import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  width?: "max" | "narrow";
  className?: string;
};

/** Centered content wrapper with page gutter. `narrow` for prose/forms. */
export function Container({
  children,
  as: Tag = "div",
  width = "max",
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full", className)}
      style={{
        maxWidth:
          width === "narrow" ? "var(--container-narrow)" : "var(--container-max)",
        paddingInline: "var(--gutter)",
      }}
    >
      {children}
    </Tag>
  );
}
