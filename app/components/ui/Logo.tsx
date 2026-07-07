import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { brand } from "@/app/content/site";

// Two art files: dark navy logo for light surfaces, light logo for dark surfaces.
const LIGHT_SRC = "/logo.png"; // dark art - use on light surfaces
const LIGHT_RATIO = 370 / 200;
const DARK_SRC = "/black-bg.png"; // light art - use on dark surfaces
const DARK_RATIO = 363 / 178;

type LogoProps = {
  /** Rendered mark height in px (fallback / intrinsic sizing when no heightClass). */
  height?: number;
  /**
   * Optional Tailwind height utilities for responsive sizing, e.g. "h-9 md:h-11".
   * When set, it drives the displayed height and `height` is used only for the
   * intrinsic aspect ratio.
   */
  heightClass?: string;
  /**
   * Which surface the logo sits on:
   *  - "adaptive": light surface in light theme, dark surface in dark theme
   *    (the nav) - swaps art by theme, no backing chip.
   *  - "onDark": always a dark surface (the navy footer) - always light art.
   */
  surface?: "adaptive" | "onDark";
  priority?: boolean;
  className?: string;
  /** Render without the enclosing home link (e.g. inside another link). */
  asStatic?: boolean;
};

function Mark({
  src,
  ratio,
  height,
  heightClass,
  priority,
  className,
}: {
  src: string;
  ratio: number;
  height: number;
  heightClass?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={`${brand.name}, ${brand.tagline}`}
      width={Math.round(height * ratio)}
      height={height}
      priority={priority}
      className={cn(heightClass ? `${heightClass} w-auto` : "", className)}
      style={heightClass ? undefined : { height, width: "auto" }}
    />
  );
}

export function Logo({
  height = 34,
  heightClass,
  surface = "adaptive",
  priority = false,
  className,
  asStatic = false,
}: LogoProps) {
  const inner =
    surface === "onDark" ? (
      <Mark
        src={DARK_SRC}
        ratio={DARK_RATIO}
        height={height}
        heightClass={heightClass}
        priority={priority}
      />
    ) : (
      <>
        <Mark
          src={LIGHT_SRC}
          ratio={LIGHT_RATIO}
          height={height}
          heightClass={heightClass}
          priority={priority}
          className="block dark:hidden"
        />
        <Mark
          src={DARK_SRC}
          ratio={DARK_RATIO}
          height={height}
          heightClass={heightClass}
          priority={priority}
          className="hidden dark:block"
        />
      </>
    );

  const wrapped = (
    <span className={cn("inline-flex items-center", className)}>{inner}</span>
  );

  if (asStatic) return wrapped;

  return (
    <Link
      href="/"
      aria-label={`${brand.name} home`}
      className="inline-flex items-center rounded-lg focus-visible:outline-none"
    >
      {wrapped}
    </Link>
  );
}
