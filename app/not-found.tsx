import { Container } from "@/app/components/layout/Container";
import { Button } from "@/app/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-display text-sm font-semibold uppercase tracking-[var(--tracking-wide)] text-accent-hover">
        404
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-[var(--tracking-heading)] md:text-4xl">
        This page isn&apos;t on the agenda
      </h1>
      <p className="mt-4 max-w-md text-lg text-text-muted">
        The page you&apos;re after doesn&apos;t exist. Let&apos;s get you back to
        the summit.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="primary" size="lg">
          Back to home
        </Button>
        <Button href="/get-a-website" variant="ghost" size="lg">
          Get a website
        </Button>
      </div>
    </Container>
  );
}
