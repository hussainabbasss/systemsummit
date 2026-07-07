import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "secondary" | "ghost";
type Size = "md" | "lg";

const baseClass =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md " +
  "transition-[transform,box-shadow,background-color,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] " +
  "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 " +
  "min-h-[44px] whitespace-nowrap";

const variantClass: Record<Variant, string> = {
  // Navy in light, teal in dark (via token) - the strongest weight.
  primary:
    "bg-primary text-primary-text shadow-[var(--shadow-sm)] hover:bg-primary-hover hover:-translate-y-px hover:shadow-[var(--shadow-md)] active:translate-y-0",
  // Teal fill - reserved for THE conversion action, one per view.
  accent:
    "bg-accent text-text-on-accent shadow-[var(--shadow-sm)] hover:bg-accent-hover hover:-translate-y-px hover:shadow-[var(--shadow-md)] active:translate-y-0",
  secondary:
    "bg-bg-elevated text-text border border-border-strong hover:border-accent hover:-translate-y-px active:translate-y-0",
  ghost:
    "text-link hover:text-link-hover underline-offset-4 hover:underline bg-transparent",
};

const sizeClass: Record<Size, string> = {
  md: "text-[0.95rem] px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  "aria-label"?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(baseClass, variantClass[variant], sizeClass[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href } = props;
    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  const domProps: Record<string, unknown> = { ...props };
  delete domProps.variant;
  delete domProps.size;
  delete domProps.className;
  delete domProps.children;
  delete domProps.href;

  return (
    <button
      className={classes}
      {...(domProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
