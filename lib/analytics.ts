import { createAdminClient } from "@/lib/supabase/admin";

export type PageViewInput = {
  path: string;
  referrer?: string | null;
  visitorId: string;
  sessionId: string;
  userAgent?: string | null;
};

export async function recordPageView(input: PageViewInput): Promise<void> {
  const path = input.path.trim().slice(0, 500);
  if (!path.startsWith("/")) return;
  // Never track admin routes.
  if (path.startsWith("/admin")) return;

  const supabase = createAdminClient();
  const { error } = await supabase.from("page_views").insert({
    path,
    referrer: input.referrer?.slice(0, 1000) ?? null,
    visitor_id: input.visitorId,
    session_id: input.sessionId,
    user_agent: input.userAgent?.slice(0, 500) ?? null,
  });

  if (error) {
    console.error("[analytics] page_view insert failed:", error.message);
    throw new Error("Failed to record page view");
  }
}

export type TrafficSummary = {
  viewsLast7Days: number;
  uniqueVisitorsLast7Days: number;
  viewsToday: number;
  topPaths: { path: string; count: number }[];
};

export async function getTrafficSummary(): Promise<TrafficSummary> {
  const supabase = createAdminClient();
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const sinceIso = sevenDaysAgo.toISOString();
  const todayIso = startOfToday.toISOString();

  const [weekRes, todayRes, pathsRes] = await Promise.all([
    supabase
      .from("page_views")
      .select("visitor_id")
      .gte("created_at", sinceIso),
    supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayIso),
    supabase
      .from("page_views")
      .select("path")
      .gte("created_at", sinceIso),
  ]);

  if (weekRes.error) {
    console.error("[analytics] week query failed:", weekRes.error.message);
  }
  if (todayRes.error) {
    console.error("[analytics] today query failed:", todayRes.error.message);
  }
  if (pathsRes.error) {
    console.error("[analytics] paths query failed:", pathsRes.error.message);
  }

  const weekRows = weekRes.data ?? [];
  const unique = new Set(weekRows.map((r) => r.visitor_id as string));

  const pathCounts = new Map<string, number>();
  for (const row of pathsRes.data ?? []) {
    const p = row.path as string;
    pathCounts.set(p, (pathCounts.get(p) ?? 0) + 1);
  }
  const topPaths = [...pathCounts.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    viewsLast7Days: weekRows.length,
    uniqueVisitorsLast7Days: unique.size,
    viewsToday: todayRes.count ?? 0,
    topPaths,
  };
}
