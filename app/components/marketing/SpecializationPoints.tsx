import { Container } from "@/app/components/layout/Container";
import { Section } from "@/app/components/layout/Section";
import { Reveal } from "@/app/components/ui/Reveal";

const principles = [
  {
    stat: "Only MUN",
    label: "One community, served fully",
    body: "Every feature we ship answers to a real conference need, not a generic template with the serial numbers filed off.",
  },
  {
    stat: "Any budget",
    label: "Affordable by design",
    body: "A first-year society and a decade-old flagship both deserve real infrastructure. Pricing bends so access doesn't.",
  },
  {
    stat: "Human-led",
    label: "AI assists, the EB decides",
    body: "Our allotment engine suggests; your Executive Board reviews and issues. Judgement stays where it belongs.",
  },
];

/** Distinct from Home's offering list: a principle-led statement grid on the muted surface. */
export function SpecializationPoints() {
  return (
    <Section tone="muted" ariaLabelledby="principles-heading">
      <Container>
        <div className="max-w-2xl">
          <h2
            id="principles-heading"
            className="font-display text-3xl font-semibold tracking-[var(--tracking-heading)] md:text-4xl"
          >
            What we hold to
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            A few commitments that shape every decision we make.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.stat} index={i} className="bg-bg-elevated">
              <div className="flex h-full flex-col gap-3 p-7">
                <span className="font-display text-2xl font-bold tracking-[var(--tracking-heading)] text-accent-hover">
                  {p.stat}
                </span>
                <span className="font-display text-base font-semibold text-text">
                  {p.label}
                </span>
                <p className="text-[0.95rem] leading-relaxed text-text-muted">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
