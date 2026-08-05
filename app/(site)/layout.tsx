import { SiteNav } from "@/app/components/layout/SiteNav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { SkipLink } from "@/app/components/layout/SkipLink";
import { PageViewTracker } from "@/app/components/analytics/PageViewTracker";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SkipLink />
      <SiteNav />
      <main id="content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <PageViewTracker />
    </>
  );
}
