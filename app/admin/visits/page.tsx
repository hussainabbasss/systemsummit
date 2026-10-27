import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { getContactVisits, type ContactVisit } from "@/lib/contact-visits";

export const metadata: Metadata = {
  title: "Contact visits",
};

export const dynamic = "force-dynamic";

/** "Chrome on Windows"-style summary from a user agent string. */
function describeDevice(ua: string | null): string {
  if (!ua) return "Unknown device";
  const browser =
    /Edg\//.test(ua) ? "Edge"
    : /OPR\//.test(ua) ? "Opera"
    : /SamsungBrowser/.test(ua) ? "Samsung Internet"
    : /Chrome\//.test(ua) ? "Chrome"
    : /Firefox\//.test(ua) ? "Firefox"
    : /Safari\//.test(ua) ? "Safari"
    : /bot|crawl|spider/i.test(ua) ? "Bot"
    : "Browser";
  const os =
    /Windows/.test(ua) ? "Windows"
    : /Android/.test(ua) ? "Android"
    : /iPhone|iPad/.test(ua) ? "iOS"
    : /Mac OS X/.test(ua) ? "macOS"
    : /Linux/.test(ua) ? "Linux"
    : null;
  return os ? `${browser} on ${os}` : browser;
}

function describeLocation(visit: ContactVisit): string | null {
  const geo = visit.geo;
  if (!geo) return null;
  return (
    [geo.city, geo.subdivision?.name, geo.country?.name ?? geo.country?.code]
      .filter(Boolean)
      .join(", ") || null
  );
}

function referrerHost(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).host;
  } catch {
    return referrer;
  }
}

export default async function AdminVisitsPage() {
  await requireAdmin();
  const { visits, today, last7Days, uniqueVisitorsLast7Days, error } =
    await getContactVisits();

  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)] py-10">
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-text">
          Contact visits
        </h1>
        <p className="mt-2 text-text-muted">
          Everyone who opened Get a Website, newest first. Latest 200 shown.
        </p>
      </header>

      <section aria-label="Visit totals" className="mb-10 grid gap-4 sm:grid-cols-3">
        <Stat label="Today" value={today} />
        <Stat label="Last 7 days" value={last7Days} />
        <Stat label="Unique visitors (7 days)" value={uniqueVisitorsLast7Days} />
      </section>

      {error ? (
        <p className="rounded-xl border border-border bg-bg-elevated p-5 text-text-muted">
          Couldn&rsquo;t load visits: <code className="text-text">{error}</code>. If the
          table is missing, run the <code className="text-text">contact_visits</code>{" "}
          block from <code className="text-text">supabase/schema.sql</code> in the
          Supabase SQL Editor.
        </p>
      ) : visits.length === 0 ? (
        <p className="text-text-muted">No visits yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {visits.map((visit) => {
            const location = describeLocation(visit);
            const from = referrerHost(visit.referrer);
            const c = visit.client;
            return (
              <li
                key={visit.id}
                className="rounded-xl border border-border bg-bg-elevated p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="font-medium text-text">
                    {location ?? "Unknown location"}
                    <span className="text-text-muted">
                      {" "}· {describeDevice(visit.user_agent)}
                      {c?.mobile ? " · mobile" : ""}
                    </span>
                  </p>
                  <p className="text-sm tabular-nums text-text-muted">
                    {new Date(visit.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="mt-1 text-sm text-text-muted">
                  {visit.ip ?? "no IP"}
                  {from ? ` · from ${from}` : " · direct"}
                  {visit.utm
                    ? ` · ${Object.entries(visit.utm)
                        .map(([k, v]) => `${k.replace("utm_", "")}=${v}`)
                        .join(" ")}`
                    : ""}
                  {c?.screen?.w ? ` · ${c.screen.w}×${c.screen.h}` : ""}
                  {c?.timezone ? ` · ${c.timezone}` : ""}
                </p>
                <details className="mt-3 text-sm">
                  <summary className="cursor-pointer text-link hover:text-link-hover">
                    All details
                  </summary>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-surface-muted p-4 text-xs leading-relaxed text-text">
                    {JSON.stringify(visit, null, 2)}
                  </pre>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-bg-elevated px-5 py-4">
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-1 font-[family-name:var(--font-sora)] text-3xl font-semibold tabular-nums text-text">
        {value}
      </p>
    </div>
  );
}
