import { Container } from "@/app/components/layout/Container";
import { Hero } from "@/app/components/marketing/Hero";
import { LogoMarquee } from "@/app/components/marketing/LogoMarquee";
import { OfferingList } from "@/app/components/marketing/OfferingList";
import { CtaBand } from "@/app/components/marketing/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-label="Conferences we work with" className="pb-6 pt-4">
        <Container className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[var(--tracking-wide)] text-text-muted">
            Trusted by Model UN teams around the world
          </p>
        </Container>
        <LogoMarquee />
      </section>

      <OfferingList />

      <CtaBand />
    </>
  );
}
