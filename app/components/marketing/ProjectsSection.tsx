import { Container } from "@/app/components/layout/Container";
import { Section } from "@/app/components/layout/Section";
import { Button } from "@/app/components/ui/Button";
import { ProjectShowcase } from "@/app/components/marketing/ProjectShowcase";
import { projects } from "@/app/content/projects";

/** Home: live conferences running on System Summit, linking to /projects. */
export function ProjectsSection() {
  return (
    <Section id="projects" tone="muted" ariaLabelledby="projects-heading">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              id="projects-heading"
              className="font-display font-semibold tracking-[var(--tracking-heading)]"
              style={{ fontSize: "clamp(1.9rem, 3vw + 1rem, 2.75rem)" }}
            >
              Conferences already running on it
            </h2>
            <p className="mt-4 text-lg text-text-muted">
              Real MUNs, live right now. Not mockups.
            </p>
          </div>
          <Button href="/projects" variant="secondary" className="self-start md:self-auto">
            All projects
          </Button>
        </div>

        <div className="mt-14 flex flex-col gap-20">
          {projects.map((project, i) => (
            <ProjectShowcase key={project.id} project={project} flip={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
