import { Container } from "@/app/components/layout/Container";
import { Button } from "@/app/components/ui/Button";
import { ArrowRightIcon } from "@/app/components/ui/icons";
import { HeroMotif, HeroBackdrop } from "@/app/components/marketing/HeroMotif";
import { ctaLink } from "@/app/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Quiet blueprint backdrop */}
      <HeroBackdrop className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Emblem, right side, from md up */}
      <HeroMotif className="pointer-events-none absolute -right-16 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-80 md:block lg:-right-8 lg:h-[560px] lg:w-[560px]" />

      <Container className="relative pb-16 pt-16 md:pb-24 md:pt-24 lg:pt-28">
        <div className="max-w-2xl">
          <span
            className="ss-enter inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-elevated/80 py-1.5 pl-2 pr-4 text-xs font-semibold uppercase tracking-[var(--tracking-wide)] text-text-secondary shadow-[var(--shadow-xs)] backdrop-blur-sm"
            style={{ ["--enter-delay" as string]: "0ms" }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-2 py-0.5 text-accent-ink">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              MUN only
            </span>
            Digital Architects for Diplomacy
          </span>

          <h1
            id="hero-heading"
            className="ss-enter mt-6 font-display font-bold leading-[1.02] tracking-[var(--tracking-display)]"
            style={{
              fontSize: "clamp(2.75rem, 6vw + 0.5rem, 4.75rem)",
              ["--enter-delay" as string]: "80ms",
            }}
          >
            Get a website
            <br className="hidden sm:block" /> for your{" "}
            <span className="text-text-secondary">MUN</span>.
          </h1>

          <p
            className="ss-enter mt-6 max-w-xl text-lg leading-relaxed text-text-muted md:text-xl"
            style={{ ["--enter-delay" as string]: "160ms" }}
          >
            The full digital backbone your conference deserves: a custom site,
            delegate registration and payments, an EB dashboard, and an
            AI-assisted allotment engine. No more Google Forms and spreadsheets.
          </p>

          <div
            className="ss-enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ ["--enter-delay" as string]: "240ms" }}
          >
            <Button href={ctaLink.href} variant="accent" size="lg">
              {ctaLink.label}
              <ArrowRightIcon className="h-[1.1em] w-[1.1em]" />
            </Button>
            <Button href="/about" variant="ghost" size="lg">
              Why we only do MUN
            </Button>
          </div>

          <p
            className="ss-enter mt-6 text-sm text-text-muted"
            style={{ ["--enter-delay" as string]: "320ms" }}
          >
            Proper infrastructure for every MUN, whatever the budget.
          </p>
        </div>
      </Container>
    </section>
  );
}
