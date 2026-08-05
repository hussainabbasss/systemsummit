import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { countLeadsByStatus, listLeads } from "@/lib/leads";
import { getTrafficSummary } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Overview",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [counts, traffic, recent] = await Promise.all([
    countLeadsByStatus(),
    getTrafficSummary(),
    listLeads("all").then((rows) => rows.slice(0, 5)),
  ]);

  const totalLeads = counts.new + counts.contacted + counts.archived;

  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)] py-10">
      <header className="mb-10">
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-text">
          Overview
        </h1>
        <p className="mt-2 text-text-muted">
          Leads from Get a Website and light traffic from the marketing site.
        </p>
      </header>

      <section aria-label="Lead totals" className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total leads" value={totalLeads} />
        <Stat label="New" value={counts.new} accent />
        <Stat label="Contacted" value={counts.contacted} />
        <Stat label="Archived" value={counts.archived} />
      </section>

      <section aria-label="Traffic" className="mb-12 grid gap-4 sm:grid-cols-3">
        <Stat label="Views today" value={traffic.viewsToday} />
        <Stat label="Views (7 days)" value={traffic.viewsLast7Days} />
        <Stat
          label="Unique visitors (7 days)"
          value={traffic.uniqueVisitorsLast7Days}
        />
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="recent-leads-heading">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2
              id="recent-leads-heading"
              className="font-[family-name:var(--font-sora)] text-xl font-semibold text-text"
            >
              Recent leads
            </h2>
            <Link
              href="/admin/leads"
              className="text-sm font-medium text-link hover:text-link-hover"
            >
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-text-muted">No leads yet.</p>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {recent.map((lead) => (
                <li
                  key={lead.id}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-text">{lead.mun_name}</p>
                    <p className="text-sm text-text-muted">
                      {lead.name} · {lead.email}
                    </p>
                  </div>
                  <StatusPill status={lead.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="top-paths-heading">
          <h2
            id="top-paths-heading"
            className="mb-4 font-[family-name:var(--font-sora)] text-xl font-semibold text-text"
          >
            Top paths (7 days)
          </h2>
          {traffic.topPaths.length === 0 ? (
            <p className="text-sm text-text-muted">No page views yet.</p>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {traffic.topPaths.map((row) => (
                <li
                  key={row.path}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <code className="text-sm text-text">{row.path}</code>
                  <span className="text-sm tabular-nums text-text-muted">
                    {row.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-elevated px-5 py-4",
        accent && "border-accent/40",
      )}
    >
      <p className="text-sm text-text-muted">{label}</p>
      <p
        className={cn(
          "mt-1 font-[family-name:var(--font-sora)] text-3xl font-semibold tabular-nums",
          accent ? "text-accent-ink" : "text-text",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-accent/15 text-accent-ink",
    contacted: "bg-surface-muted text-text-secondary",
    archived: "bg-surface-muted text-text-muted",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2.5 py-1 text-xs font-medium capitalize",
        styles[status] ?? styles.archived,
      )}
    >
      {status}
    </span>
  );
}
