import { Hero } from "@/app/components/marketing/Hero";
import { OfferingList } from "@/app/components/marketing/OfferingList";
import { CtaBand } from "@/app/components/marketing/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OfferingList />
      <CtaBand />
    </>
  );
}
