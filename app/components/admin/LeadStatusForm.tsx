"use client";

import { useTransition } from "react";
import { setLeadStatus } from "@/app/admin/leads/actions";
import type { LeadStatus } from "@/lib/leads";
import { cn } from "@/lib/cn";

const OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "archived", label: "Archived" },
];

type LeadStatusFormProps = {
  id: string;
  status: LeadStatus;
};

export function LeadStatusForm({ id, status }: LeadStatusFormProps) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="flex flex-wrap items-center gap-2"
      action={(formData) => {
        startTransition(async () => {
          await setLeadStatus(formData);
        });
      }}
    >
      <input type="hidden" name="id" value={id} />
      <label htmlFor={`status-${id}`} className="sr-only">
        Status
      </label>
      <select
        id={`status-${id}`}
        name="status"
        defaultValue={status}
        disabled={pending}
        className={cn(
          "min-h-[2.75rem] rounded-md border border-border bg-bg px-3 text-sm text-text",
          "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-[var(--shadow-focus)]",
          "disabled:opacity-60",
        )}
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-text transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] disabled:opacity-60"
      >
        {pending ? "Saving…" : "Update"}
      </button>
    </form>
  );
}
