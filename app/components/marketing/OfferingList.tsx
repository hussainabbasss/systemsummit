import { Container } from "@/app/components/layout/Container";
import { Section } from "@/app/components/layout/Section";
import { Reveal } from "@/app/components/ui/Reveal";
import { AllotmentEngineDiagram } from "@/app/components/marketing/AllotmentEngineDiagram";
import {
  GlobeIcon,
  ClipboardIcon,
  DashboardIcon,
  CheckIcon,
} from "@/app/components/ui/icons";
import { offerings, type OfferingIcon } from "@/app/content/offerings";

const iconMap: Record<
  Exclude<OfferingIcon, "engine">,
  (p: { className?: string }) => React.ReactElement
> = {
  globe: GlobeIcon,
  clipboard: ClipboardIcon,
  dashboard: DashboardIcon,
};

export function OfferingList() {
  const featured = offerings.find((o) => o.featured);
  const rest = offerings.filter((o) => !o.featured);

  return (
    <Section id="what-we-build" ariaLabelledby="offerings-heading">
      <Container>
        <div className="max-w-2xl">
          <h2
            id="offerings-heading"
            className="font-display text-3xl font-semibold tracking-[var(--tracking-heading)] md:text-4xl"
            style={{ fontSize: "clamp(1.9rem, 3vw + 1rem, 2.75rem)" }}
          >
            One backbone for the whole conference
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Everything a MUN runs on, designed to work together, not stitched
            from a dozen tabs.
          </p>
        </div>

        {/* Secondary offerings: a clean list, not identical boxes */}
        <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((offering, i) => {
            const Icon = iconMap[offering.icon as keyof typeof iconMap];
            return (
              <Reveal as="li" index={i} key={offering.id}>
                <div className="flex flex-col gap-3 border-t border-border-strong pt-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface-muted text-text-secondary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-text">
                    {offering.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-text-muted">
                    {offering.blurb}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        {/* Featured: the Allotment Engine, distinct large treatment */}
        {featured && (
          <Reveal className="mt-14">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold uppercase tracking-[var(--tracking-wide)] text-accent-ink">
                  AI-assisted · Flagship
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[var(--tracking-heading)] text-text md:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-text-muted">
                  {featured.blurb}
                </p>
                {featured.points && (
                  <ul className="mt-6 flex flex-col gap-3">
                    {featured.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-[0.95rem] text-text">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <AllotmentEngineDiagram />
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
