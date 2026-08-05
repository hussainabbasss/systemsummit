# Implementation Plan — Admin Panel (Supabase)

## What we are building
An internal System Summit ops console at `/admin` for triaging Get-a-Website leads and viewing light site analytics. Public form submissions write to Supabase `leads`; first-party page views write to `page_views`. Admin access is email/password via Supabase Auth, gated to an allowlisted set of emails.

## Language we agreed on
- **Admin panel**: Internal System Summit ops console (not the marketed EB product dashboard).
- **Connected to Supabase**: Server-side secret-key access to `leads` + `page_views`; RLS blocks anon.
- **Continue**: Finish from schema/env groundwork (no prior admin UI).
- **Auth**: Small allowlisted login only.
- **Leads triage**: Statuses `new` → `contacted` → `archived`.

## Decisions made
- **Auth**: Supabase Auth email/password + `ADMIN_EMAILS` allowlist check. Session via `@supabase/ssr` cookies; middleware guards `/admin/*` except `/admin/login`.
- **Data access**: `@supabase/supabase-js` service-role client on the server only (`lib/supabase/admin.ts`). Browser never sees the secret key.
- **Leads**: Wire `persistLead()` to insert into `leads` with optional attribution (`source_path`, `referrer`, `user_agent`).
- **Analytics**: Lightweight client beacon → `POST /api/track` → `page_views` (visitor + session first-party cookies).
- **Admin UI**: Separate layout (no public nav/footer). Dashboard summary + leads table with status actions + basic traffic stats.
- **Design**: Reuse existing tokens/Button/Field/Input; no new component library.

## Assumptions
- Schema in `supabase/schema.sql` is already applied (or will be) in the linked Supabase project.
- One bootstrap admin: `hussain@systemsummit.online` (password set in Supabase Auth; never committed).
- Admin is not linked from the public marketing nav.

## How to build it
1. Install `@supabase/supabase-js` + `@supabase/ssr`.
2. Add `lib/supabase/{admin,server,client,env}.ts` helpers.
3. Wire `persistLead()` to Supabase; enrich server action with attribution headers.
4. Add `POST /api/track` + client `PageViewTracker`.
5. Admin auth: login page, logout action, middleware, allowlist check.
6. Admin pages: dashboard, leads list + status updates, traffic summary.
7. Bootstrap allowlisted admin user; verify `tsc` / lint / build.
