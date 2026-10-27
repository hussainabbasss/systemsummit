import Image from "next/image";
import { Reveal } from "@/app/components/ui/Reveal";
import { ArrowRightIcon, CheckIcon } from "@/app/components/ui/icons";
import { cn } from "@/lib/cn";
import type { Project } from "@/app/content/projects";

function hostOf(url: string) {
  return new URL(url).host;
}

/**
 * One live project: a browser-framed screenshot beside its story. Alternates
 * sides via `flip` so a list of these doesn't read as identical boxes.
 */
export function ProjectShowcase({
  project,
  flip = false,
  headingLevel = "h3",
}: {
  project: Project;
  flip?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const host = hostOf(project.url);

  return (
    <Reveal>
      <article className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name} (opens in a new tab)`}
          className={cn(
            "group block overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-[var(--shadow-md)]",
            "transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]",
            flip && "lg:order-2",
          )}
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            </span>
            <span className="truncate rounded-md bg-surface-muted px-3 py-1 text-xs text-text-muted">
              {host}
            </span>
          </div>
          <Image
            src={project.screenshot}
            alt={`Home page of ${project.name}`}
            width={1440}
            height={900}
            sizes="(min-width: 1024px) 640px, 100vw"
            className="h-auto w-full"
          />
        </a>

        <div className={cn(flip && "lg:order-1")}>
          <p className="text-sm font-semibold uppercase tracking-[var(--tracking-wide)] text-accent-ink">
            {project.context}
          </p>
          <Heading className="mt-3 font-display text-2xl font-semibold tracking-[var(--tracking-heading)] text-text md:text-3xl">
            {project.name}
          </Heading>
          {project.stat && (
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tracking-[var(--tracking-display)] text-text">
                {project.stat.value}
              </span>
              <span className="text-text-muted">{project.stat.label}</span>
            </p>
          )}
          <p className="mt-4 text-[1.05rem] leading-relaxed text-text-muted">
            {project.summary}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {project.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-[0.95rem] text-text">{point}</span>
              </li>
            ))}
          </ul>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 font-medium text-link underline-offset-4 hover:text-link-hover hover:underline"
          >
            Visit {host}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}
