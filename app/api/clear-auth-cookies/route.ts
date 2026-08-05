import { NextResponse, type NextRequest } from "next/server";

/**
 * Emergency recovery for 431 / bloated auth cookies.
 * Visit once after clearing is awkward: /api/clear-auth-cookies
 * Clears Supabase auth cookies for this host, then redirects to login.
 */
export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));

  for (const cookie of request.cookies.getAll()) {
    const name = cookie.name;
    if (
      name.startsWith("sb-") ||
      name.includes("supabase") ||
      name.includes("auth-token")
    ) {
      response.cookies.set(name, "", {
        path: "/",
        maxAge: 0,
      });
    }
  }

  return response;
}
