import type { Metadata } from "next";
import { Container } from "@/app/components/layout/Container";
import { Section } from "@/app/components/layout/Section";
import { ProjectShowcase } from "@/app/components/marketing/ProjectShowcase";
import { CtaBand } from "@/app/components/marketing/CtaBand";
import { projects } from "@/app/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Model UN conferences running on System Summit, from public websites to delegate allotment, roll call sheets and waivers.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Lead */}
      <section aria-labelledby="projects-lead" className="border-b border-border">
        <Container className="pb-14 pt-16 md:pb-20 md:pt-24">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[var(--tracking-wide)] text-text-secondary">
              Projects
            </span>
            <h1
              id="projects-lead"
              className="mt-5 font-display font-bold leading-[1.05] tracking-[var(--tracking-display)]"
              style={{ fontSize: "clamp(2.25rem, 5vw + 0.5rem, 4rem)" }}
            >
              Conferences we&rsquo;ve <span className="text-accent-hover">built</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl">
              Every one of these is live. Click through and look around: the
              public site is only the part delegates see.
            </p>
          </div>
        </Container>
      </section>

      <Section ariaLabel="Project list">
        <Container>
          <div className="flex flex-col gap-24">
            {projects.map((project, i) => (
              <ProjectShowcase
                key={project.id}
                project={project}
                flip={i % 2 === 1}
                headingLevel="h2"
              />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        heading="Your conference could be next"
        subheading="Tell us about your MUN. We'll show you what proper infrastructure looks like."
      />
    </>
  );
}
