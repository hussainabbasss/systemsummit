"use client";

import { useEffect, useState } from "react";
import { THEME_KEY, THEME_ATTR, type Theme } from "@/lib/theme";
import { SunIcon, MoonIcon } from "@/app/components/ui/icons";
import { cn } from "@/lib/cn";

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute(THEME_ATTR) === "dark"
    ? "dark"
    : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Sync from the DOM (set pre-paint by the boot script) once, after hydration.
  // This is a legitimate external-system sync, not derived state.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(currentTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute(THEME_ATTR, next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable - theme still applies for the session */
    }
    setTheme(next);
  }

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-md",
        "text-text-secondary hover:text-text",
        "border border-transparent hover:border-border",
        "transition-colors duration-[var(--dur-base)] focus-visible:outline-none",
        className,
      )}
    >
      <span className="relative block h-5 w-5">
        <SunIcon
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-[var(--dur-base)] ease-[var(--ease-out)]",
            mounted && isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
        <MoonIcon
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-[var(--dur-base)] ease-[var(--ease-out)]",
            mounted && !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0",
          )}
        />
      </span>
    </button>
  );
}
