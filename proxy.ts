import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  getAdminEmails,
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";

/** Edge functions on Netlify die on long awaits; cap the Supabase round-trip. */
const CLAIMS_TIMEOUT_MS = 3000;

function hasAuthCookie(request: NextRequest): boolean {
  return request.cookies
    .getAll()
    .some(({ name }) => name.startsWith("sb-") && name.includes("auth-token"));
}

/**
 * Next.js 16 Proxy — refreshes Supabase auth cookies and guards /admin.
 * (middleware.ts was renamed to proxy.ts in this Next version.)
 * Admin pages still call requireAdmin(), so the proxy only needs to be a fast
 * first pass: no network when signed out, and a bounded check when signed in.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  // Signed out: decide from cookies alone, never touch Supabase.
  if (!hasAuthCookie(request)) {
    if (isLogin) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabasePublishableKey(),
    {
      cookies: {
        // Tokens only — avoids 431 from oversized auth cookies on localhost.
        encode: "tokens-only",
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
          Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
          });
        },
      },
    },
  );

  // Validates JWT and refreshes cookies when needed. On timeout or error, let
  // the request through; requireAdmin() in the page is the real gate.
  const result = await Promise.race([
    supabase.auth.getClaims().catch(() => null),
    new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), CLAIMS_TIMEOUT_MS),
    ),
  ]);
  if (!result) return response;

  const claims = result.data?.claims as { email?: string } | undefined;
  const email = claims?.email?.toLowerCase() ?? null;
  const allowlist = getAdminEmails();
  const isAdmin = Boolean(email && allowlist.includes(email));

  if (!isLogin && !isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && isAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
  ],
};
