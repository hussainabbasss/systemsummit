import { NextResponse, type NextRequest } from "next/server";
import { recordPageView } from "@/lib/analytics";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type TrackBody = {
  path?: unknown;
  referrer?: unknown;
  visitorId?: unknown;
  sessionId?: unknown;
};

export async function POST(request: NextRequest) {
  let body: TrackBody;
  try {
    body = (await request.json()) as TrackBody;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path : "";
  const visitorId =
    typeof body.visitorId === "string" ? body.visitorId : "";
  const sessionId =
    typeof body.sessionId === "string" ? body.sessionId : "";
  const referrer =
    typeof body.referrer === "string" ? body.referrer : null;

  if (!path.startsWith("/") || !UUID_RE.test(visitorId) || !UUID_RE.test(sessionId)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await recordPageView({
      path,
      referrer,
      visitorId,
      sessionId,
      userAgent: request.headers.get("user-agent"),
    });
  } catch {
    // Soft-fail: analytics must never break the site.
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
