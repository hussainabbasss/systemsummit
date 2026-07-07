import type { Metadata } from "next";
import { Container } from "@/app/components/layout/Container";
import { MissionNarrative } from "@/app/components/marketing/MissionNarrative";
import { SpecializationPoints } from "@/app/components/marketing/SpecializationPoints";
import { NiqBrandsSection } from "@/app/components/marketing/NiqBrandsSection";
import { CtaBand } from "@/app/components/marketing/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "System Summit builds digital infrastructure exclusively for Model UN. We believe every MUN, whatever its budget, has a right to proper infrastructure, affordably. A NiqBrands company.",
};

export default function AboutPage() {
  return (
    <>
      {/* Lead */}
      <section aria-labelledby="about-lead" className="border-b border-border">
        <Container className="pb-14 pt-16 md:pb-20 md:pt-24">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[var(--tracking-wide)] text-text-secondary">
              Our belief
            </span>
            <h1
              id="about-lead"
              className="mt-5 font-display font-bold leading-[1.05] tracking-[var(--tracking-display)]"
              style={{ fontSize: "clamp(2.25rem, 5vw + 0.5rem, 4rem)" }}
            >
              Every MUN has a right to real digital infrastructure,{" "}
              <span className="text-accent-hover">affordably</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
              System Summit is a specialist studio that builds the digital
              backbone of Model UN conferences, and nothing else. That
              narrowness is the whole point.
            </p>
          </div>
        </Container>
      </section>

      <MissionNarrative />
      <SpecializationPoints />
      <NiqBrandsSection />
      <CtaBand
        heading="Let's build your conference's backbone"
        subheading="Tell us about your MUN. We'll show you what proper infrastructure looks like."
      />
    </>
  );
}
