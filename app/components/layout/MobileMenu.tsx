"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { navLinks, ctaLink } from "@/app/content/site";
import { Logo } from "@/app/components/ui/Logo";
import { Button } from "@/app/components/ui/Button";
import { CloseIcon, ArrowRightIcon } from "@/app/components/ui/icons";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Esc to close, focus trap, scroll lock while open.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = sheetRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 overflow-hidden md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      style={{ zIndex: "var(--z-modal)" }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 backdrop-blur-sm transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)]",
          open ? "opacity-100" : "opacity-0",
        )}
        style={{ backgroundColor: "oklch(0.20 0.075 264 / 0.55)" }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col",
          "bg-bg-elevated shadow-[var(--shadow-lg)]",
          "transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo height={28} surface="adaptive" asStatic />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-muted hover:text-text focus-visible:outline-none"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-lg px-4 py-3.5 text-lg font-medium transition-colors",
                  active
                    ? "bg-surface-muted text-text"
                    : "text-text-secondary hover:bg-surface-muted hover:text-text",
                )}
              >
                {link.label}
                {active && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border p-5">
          <Button
            href={ctaLink.href}
            variant="accent"
            size="lg"
            className="w-full"
          >
            {ctaLink.label}
            <ArrowRightIcon className="h-[1.1em] w-[1.1em]" />
          </Button>
          <p className="mt-3 text-center text-xs text-text-muted">
            We reply within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
