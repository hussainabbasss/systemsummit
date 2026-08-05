import type { WebsiteRequest } from "@/lib/validation";
import { createAdminClient } from "@/lib/supabase/admin";

export type LeadAttribution = {
  sourcePath?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
};

export type LeadStatus = "new" | "contacted" | "archived";

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  mun_name: string;
  phone: string;
  status: LeadStatus;
  source_path: string | null;
  referrer: string | null;
  user_agent: string | null;
};

/**
 * The single integration seam for captured leads.
 * Persists to Supabase `leads` via the service-role client.
 */
export async function persistLead(
  lead: WebsiteRequest,
  attribution: LeadAttribution = {},
): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    email: lead.email,
    mun_name: lead.munName,
    phone: lead.phone,
    status: "new",
    source_path: attribution.sourcePath ?? null,
    referrer: attribution.referrer ?? null,
    user_agent: attribution.userAgent ?? null,
  });

  if (error) {
    console.error("[lead] persist failed:", error.message);
    throw new Error("Failed to persist lead");
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[lead] website request stored:", {
      munName: lead.munName,
      email: lead.email,
    });
  }
}

export async function listLeads(status?: LeadStatus | "all"): Promise<Lead[]> {
  const supabase = createAdminClient();
  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[lead] list failed:", error.message);
    throw new Error("Failed to load leads");
  }
  return (data ?? []) as Lead[];
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("[lead] status update failed:", error.message);
    throw new Error("Failed to update lead status");
  }
}

export async function countLeadsByStatus(): Promise<Record<LeadStatus, number>> {
  const supabase = createAdminClient();
  const statuses: LeadStatus[] = ["new", "contacted", "archived"];
  const counts: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    archived: 0,
  };

  await Promise.all(
    statuses.map(async (status) => {
      const { count, error } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", status);
      if (error) {
        console.error("[lead] count failed:", error.message);
        return;
      }
      counts[status] = count ?? 0;
    }),
  );

  return counts;
}
