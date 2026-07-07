import { Container } from "@/app/components/layout/Container";
import { Button } from "@/app/components/ui/Button";
import { ArrowRightIcon } from "@/app/components/ui/icons";
import { ctaLink, brand } from "@/app/content/site";

type CtaBandProps = {
  heading?: string;
  subheading?: string;
};

/** Closing call-to-action on the navy inverse surface. One accent CTA. */
export function CtaBand({
  heading = "Give your MUN the infrastructure it deserves",
  subheading = brand.mission,
}: CtaBandProps) {
  return (
    <section
      aria-labelledby="cta-band-heading"
      className="relative overflow-hidden bg-bg-inverse text-text-on-inverse"
    >
      {/* restrained teal spotlight - one accent glow, the closing moment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[130%] w-[min(48rem,90%)] -translate-x-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 30%, oklch(0.71 0.115 208 / 0.18), transparent 70%)",
        }}
      />
      <Container className="relative py-16 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 text-left md:items-center md:text-center">
          <h2
            id="cta-band-heading"
            className="font-display font-semibold tracking-[var(--tracking-heading)] text-text-on-inverse"
            style={{ fontSize: "clamp(1.9rem, 3vw + 1rem, 3rem)" }}
          >
            {heading}
          </h2>
          <p className="text-lg text-text-on-inverse/90">{subheading}</p>
          <Button href={ctaLink.href} variant="accent" size="lg" className="mt-2">
            {ctaLink.label}
            <ArrowRightIcon className="h-[1.1em] w-[1.1em]" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
