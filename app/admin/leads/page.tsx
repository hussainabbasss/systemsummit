import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { listLeads, type LeadStatus } from "@/lib/leads";
import { LeadStatusForm } from "@/app/components/admin/LeadStatusForm";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Leads",
};

export const dynamic = "force-dynamic";

const FILTERS: { value: "all" | LeadStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "archived", label: "Archived" },
];

type LeadsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const raw = params.status ?? "all";
  const statusFilter = (
    ["all", "new", "contacted", "archived"] as const
  ).includes(raw as "all" | LeadStatus)
    ? (raw as "all" | LeadStatus)
    : "all";

  const leads = await listLeads(statusFilter);

  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)] py-10">
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-text">
          Leads
        </h1>
        <p className="mt-2 text-text-muted">
          Triage Get-a-Website submissions. New → contacted → archived.
        </p>
      </header>

      <nav aria-label="Filter by status" className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = statusFilter === f.value;
          const href =
            f.value === "all"
              ? "/admin/leads"
              : `/admin/leads?status=${f.value}`;
          return (
            <Link
              key={f.value}
              href={href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]",
                active
                  ? "bg-primary text-primary-text"
                  : "bg-surface-muted text-text-muted hover:text-text",
              )}
              aria-current={active ? "page" : undefined}
            >
              {f.label}
            </Link>
          );
        })}
      </nav>

      {leads.length === 0 ? (
        <p className="text-text-muted">No leads in this filter.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="rounded-xl border border-border bg-bg-elevated p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-sora)] text-lg font-semibold text-text">
                    {lead.mun_name}
                  </p>
                  <p className="mt-1 text-sm text-text">
                    {lead.name} ·{" "}
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-link hover:text-link-hover"
                    >
                      {lead.email}
                    </a>{" "}
                    ·{" "}
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-link hover:text-link-hover"
                    >
                      {lead.phone}
                    </a>
                  </p>
                  <p className="mt-2 text-xs text-text-muted">
                    {new Date(lead.created_at).toLocaleString()}
                    {lead.source_path ? ` · via ${lead.source_path}` : ""}
                  </p>
                </div>
                <LeadStatusForm id={lead.id} status={lead.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
