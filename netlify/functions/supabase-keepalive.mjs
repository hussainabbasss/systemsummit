/**
 * Netlify scheduled function: pings Supabase once a day so the free-tier
 * project never hits the 7-day inactivity pause. Uses the site's existing
 * SUPABASE_URL / SUPABASE_SECRET_KEY env vars; no extra setup needed.
 * Trigger manually from Netlify → Functions → supabase-keepalive → Run now.
 */
export default async function keepalive() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    console.error("[keepalive] Missing SUPABASE_URL or SUPABASE_SECRET_KEY");
    return new Response("missing env", { status: 500 });
  }

  // A tiny real query: reads one page_views id through the REST API.
  const res = await fetch(`${url}/rest/v1/page_views?select=id&limit=1`, {
    headers: { apikey: key },
  });

  if (!res.ok) {
    console.error("[keepalive] Supabase ping failed:", res.status, await res.text());
    return new Response("ping failed", { status: 502 });
  }

  console.log("[keepalive] Supabase ping ok");
  return new Response("ok");
}

export const config = {
  schedule: "@daily",
};
