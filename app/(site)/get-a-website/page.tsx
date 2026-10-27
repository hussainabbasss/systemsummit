import type { Metadata } from "next";
import { Container } from "@/app/components/layout/Container";
import { GetWebsiteForm } from "@/app/components/forms/GetWebsiteForm";
import { CheckIcon } from "@/app/components/ui/icons";
import { ContactVisitTracker } from "@/app/components/analytics/ContactVisitTracker";

export const metadata: Metadata = {
  title: "Get a Website",
  description:
    "Tell us about your MUN and we'll build your digital backbone: custom site, registration, payments, EB dashboard, and the Merit-Logic Allotment Engine. We reply within 48 hours.",
};

const assurances = [
  "A custom conference site, not a template",
  "Registration & payments that reconcile themselves",
  "An EB dashboard your team will actually trust",
  "AI-assisted allotments, your board makes the call",
];

export default function GetAWebsitePage() {
  return (
    <Container className="pb-20 pt-14 md:pb-28 md:pt-20">
      <ContactVisitTracker />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Value / trust column */}
        <div className="lg:pt-4">
          <span className="text-sm font-semibold uppercase tracking-[var(--tracking-wide)] text-text-secondary">
            Start here
          </span>
          <h1
            className="mt-5 font-display font-bold leading-[1.05] tracking-[var(--tracking-display)]"
            style={{ fontSize: "clamp(2.25rem, 4vw + 0.5rem, 3.5rem)" }}
          >
            Get a website for your MUN
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-text-muted">
            Four quick details and we&apos;ll take it from there. No commitment,
            no sales maze, just a real conversation about your conference.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {assurances.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[0.95rem] text-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form column */}
        <div className="lg:max-w-xl">
          <GetWebsiteForm />
        </div>
      </div>
    </Container>
  );
}
