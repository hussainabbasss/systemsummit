"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, ctaLink } from "@/app/content/site";
import { Logo } from "@/app/components/ui/Logo";
import { Button } from "@/app/components/ui/Button";
import { ThemeToggle } from "@/app/components/layout/ThemeToggle";
import { MobileMenu } from "@/app/components/layout/MobileMenu";
import { MenuIcon } from "@/app/components/ui/icons";
import { cn } from "@/lib/cn";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 w-full bg-bg-elevated/85 backdrop-blur-md",
        "transition-[box-shadow,border-color] duration-[var(--dur-base)]",
        scrolled
          ? "border-b border-border shadow-[var(--shadow-xs)]"
          : "border-b border-transparent",
      )}
      style={{ zIndex: "var(--z-sticky)" }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 items-center justify-between gap-4 md:h-[4.5rem]"
        style={{
          maxWidth: "var(--container-max)",
          paddingInline: "var(--gutter)",
        }}
      >
        <Logo height={32} priority />

        <div className="flex items-center gap-1">
          {/* Desktop links */}
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3.5 py-2 text-[0.95rem] font-medium transition-colors duration-[var(--dur-fast)]",
                      "after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-0.5 after:rounded-full after:bg-accent after:transition-transform after:duration-[var(--dur-base)] after:ease-[var(--ease-out)] after:origin-left",
                      active
                        ? "text-text after:scale-x-100"
                        : "text-text-secondary hover:text-text after:scale-x-0",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          <div className="ml-1 hidden md:block">
            <Button href={ctaLink.href} variant="accent" size="md">
              {ctaLink.label}
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-md text-text-secondary hover:text-text hover:border hover:border-border focus-visible:outline-none md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </header>
  );
}
