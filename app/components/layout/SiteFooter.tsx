import Link from "next/link";
import Image from "next/image";
import { Container } from "@/app/components/layout/Container";
import { Logo } from "@/app/components/ui/Logo";
import { brand, footerLinks, niqbrands } from "@/app/content/site";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-white/12 bg-bg-inverse text-text-on-inverse">
      <Container className="py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo height={40} surface="onDark" asStatic />
            <p className="mt-5 font-display text-lg font-medium tracking-[var(--tracking-heading)] text-text-on-inverse">
              {brand.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-on-inverse/85">
              {brand.mission}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[var(--tracking-wide)] text-text-on-inverse/70">
              Explore
            </span>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-[0.95rem] font-medium text-text-on-inverse underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Parent company */}
        <div className="mt-12 flex flex-col gap-4 rounded-xl border border-white/12 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:gap-5">
          <Image
            src={niqbrands.logo}
            alt={`${niqbrands.name} logo`}
            width={64}
            height={52}
            className="shrink-0"
            style={{ height: 52, width: "auto" }}
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[var(--tracking-wide)] text-accent">
              A {niqbrands.short} company
            </p>
            <p className="mt-1 text-sm leading-relaxed text-text-on-inverse/85">
              {niqbrands.blurb}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/12 pt-6 text-sm text-text-on-inverse/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}, a {niqbrands.name} company. Built for the
            people who run Model UN.
          </p>
          <a
            href={`mailto:${brand.email}`}
            className="w-fit font-medium text-text-on-inverse underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            {brand.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
