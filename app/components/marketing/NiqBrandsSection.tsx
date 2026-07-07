import Image from "next/image";
import { Container } from "@/app/components/layout/Container";
import { Section } from "@/app/components/layout/Section";
import { Reveal } from "@/app/components/ui/Reveal";
import { niqbrands } from "@/app/content/site";

/**
 * Parent-company section: System Summit is a NiqBrands product. Leads with the
 * NiqBrands belief and shows its mark. A genuine separable unit, so a panel is
 * the right affordance.
 */
export function NiqBrandsSection() {
  return (
    <Section ariaLabelledby="niqbrands-heading">
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 rounded-2xl border border-border bg-bg-elevated p-8 shadow-[var(--shadow-sm)] sm:p-10 md:grid-cols-[auto_1fr] md:gap-10">
            <Image
              src={niqbrands.logo}
              alt={`${niqbrands.name} logo`}
              width={118}
              height={96}
              className="shrink-0"
              style={{ height: 96, width: "auto" }}
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[var(--tracking-wide)] text-accent-ink">
                Part of {niqbrands.name}
              </p>
              <h2
                id="niqbrands-heading"
                className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[var(--tracking-heading)] text-text md:text-[1.9rem]"
              >
                {niqbrands.belief}
              </h2>
              <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-text-muted">
                {niqbrands.blurb} System Summit is where that belief meets Model
                UN: the same conviction, focused entirely on the world of
                diplomacy and debate.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
