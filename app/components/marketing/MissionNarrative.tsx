import { Container } from "@/app/components/layout/Container";
import { Section } from "@/app/components/layout/Section";
import { Reveal } from "@/app/components/ui/Reveal";

const blocks = [
  {
    heading: "The spreadsheet tax",
    body: "Most conferences run on borrowed tools: a Google Form for registration, a spreadsheet for payments, a group chat for allotments, a PDF for the schedule. It works, barely, and it costs the organising team the one thing they never have enough of: time. Delegates feel it too. Their first impression of your council is a generic form, not your conference.",
  },
  {
    heading: "Digital infrastructure for diplomacy",
    body: "Infrastructure is the invisible layer that makes everything else possible: the roads, not the traffic. For a MUN, that means registration that just works, payments that reconcile themselves, a dashboard your EB actually trusts, and a site that looks like the calibre of debate you're hosting. Built once, properly, so your team can spend its energy on the conference instead of the plumbing.",
  },
  {
    heading: "Specialization is the strength",
    body: "We don't build for restaurants, startups, and MUNs on alternate Tuesdays. We build for Model UN, and only Model UN. That focus is why we understand committee levels, agenda weight, EB workflows, and allotment politics without a briefing. A generalist agency would need you to explain your world. We already live in it.",
  },
];

export function MissionNarrative() {
  return (
    <Section ariaLabelledby="mission-heading">
      <Container width="narrow">
        <div className="flex flex-col gap-14">
          {blocks.map((block, i) => (
            <Reveal key={block.heading} index={i} step={40}>
              <article className="flex flex-col gap-4">
                <h2
                  id={i === 0 ? "mission-heading" : undefined}
                  className="font-display text-2xl font-semibold tracking-[var(--tracking-heading)] text-text md:text-3xl"
                >
                  {block.heading}
                </h2>
                <p className="text-lg leading-relaxed text-text-muted">
                  {block.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
