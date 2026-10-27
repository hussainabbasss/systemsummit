import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function str(value: unknown, max: number): string | null {
  return typeof value === "string" && value ? value.slice(0, max) : null;
}

function uuidOrNull(value: unknown): string | null {
  return typeof value === "string" && UUID_RE.test(value) ? value : null;
}

/** Netlify sends visitor geo as base64 JSON in `x-nf-geo`. */
function readGeo(request: NextRequest): unknown {
  const raw = request.headers.get("x-nf-geo");
  if (raw) {
    try {
      return JSON.parse(atob(raw));
    } catch {
      // fall through to the plain country header
    }
  }
  const country = request.headers.get("x-country");
  return country ? { country: { code: country } } : null;
}

function readIp(request: NextRequest): string | null {
  return (
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip")
  );
}

/** One row per open of the contact page. Soft-fails: never breaks the page. */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = str(body.path, 500);
  if (!path?.startsWith("/")) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const client =
    body.client && typeof body.client === "object" ? body.client : null;
  const utm = body.utm && typeof body.utm === "object" ? body.utm : null;

  try {
    const { error } = await createAdminClient().from("contact_visits").insert({
      path,
      query: str(body.query, 1000),
      referrer: str(body.referrer, 1000),
      utm,
      visitor_id: uuidOrNull(body.visitorId),
      session_id: uuidOrNull(body.sessionId),
      ip: readIp(request),
      geo: readGeo(request),
      user_agent: str(request.headers.get("user-agent"), 500),
      accept_language: str(request.headers.get("accept-language"), 200),
      client: JSON.stringify(client ?? {}).length <= 4000 ? client : null,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[analytics] contact_visit insert failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
