import { createAdminClient } from "@/lib/supabase/admin";

/** Shape Netlify sends in `x-nf-geo` (all fields optional). */
export type VisitGeo = {
  city?: string;
  country?: { code?: string; name?: string };
  subdivision?: { code?: string; name?: string };
  timezone?: string;
  latitude?: number;
  longitude?: number;
};

export type VisitClient = {
  language?: string;
  timezone?: string;
  screen?: { w?: number; h?: number; dpr?: number };
  viewport?: { w?: number; h?: number };
  colorScheme?: string;
  platform?: string;
  mobile?: boolean;
  connection?: { type?: string; downlinkMbps?: number };
  [key: string]: unknown;
};

export type ContactVisit = {
  id: number;
  created_at: string;
  path: string;
  query: string | null;
  referrer: string | null;
  utm: Record<string, string> | null;
  visitor_id: string | null;
  session_id: string | null;
  ip: string | null;
  geo: VisitGeo | null;
  user_agent: string | null;
  accept_language: string | null;
  client: VisitClient | null;
};

export type ContactVisitsResult = {
  visits: ContactVisit[];
  today: number;
  last7Days: number;
  uniqueVisitorsLast7Days: number;
  /** Set when the query fails, e.g. the table hasn't been created yet. */
  error: string | null;
};

/** Latest contact-page visits plus headline counts for the admin panel. */
export async function getContactVisits(limit = 200): Promise<ContactVisitsResult> {
  const supabase = createAdminClient();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [listRes, weekRes, todayRes] = await Promise.all([
    supabase
      .from("contact_visits")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("contact_visits")
      .select("visitor_id, ip")
      .gte("created_at", sevenDaysAgo.toISOString()),
    supabase
      .from("contact_visits")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfToday.toISOString()),
  ]);

  const error = listRes.error ?? weekRes.error ?? todayRes.error;
  if (error) {
    console.error("[contact-visits] query failed:", error.message);
  }

  // A visitor is their first-party id, or their IP when storage was blocked.
  const weekRows = weekRes.data ?? [];
  const unique = new Set(
    weekRows
      .map((r) => (r.visitor_id as string | null) ?? (r.ip as string | null))
      .filter(Boolean),
  );

  return {
    visits: (listRes.data ?? []) as ContactVisit[],
    today: todayRes.count ?? 0,
    last7Days: weekRows.length,
    uniqueVisitorsLast7Days: unique.size,
    error: error?.message ?? null,
  };
}
