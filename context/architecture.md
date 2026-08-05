# Architecture — System Summit

## Stack (as scaffolded — do not add without cause)
- **Next.js 16.2** — App Router. ⚠️ This is a newer Next than training data assumes; consult `node_modules/next/dist/docs/` (per `AGENTS.md`) before using any framework API you're unsure about (metadata, server actions, `next/font`, image, dynamic APIs).
- **React 19.2** — Server Components by default; `"use client"` only where interactivity requires it.
- **TypeScript 5** — `strict: true`, path alias `@/*` → project root.
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `app/globals.css` and the `@tailwindcss/postcss` plugin. **No `tailwind.config.js`** — theme is expressed through CSS `@theme` + custom properties (see `ui-tokens.md`). Tailwind v4 is CSS-first.
- **Fonts:** `next/font/google` — Sora + Inter, exposed as CSS variables on `<html>`.
- **Supabase** — Postgres (`leads`, `page_views`) + Auth for the internal `/admin` console. Server-only service-role client for data; cookie SSR auth via `@supabase/ssr`. Motion remains CSS + one small IntersectionObserver hook.

## Folder structure
```
app/
  layout.tsx              # Root: fonts, theme boot script, metadata (no nav/footer)
  globals.css             # Tailwind import + @theme tokens + base layer (see ui-tokens.md)
  (site)/
    layout.tsx            # Marketing chrome: Nav + Footer + PageViewTracker
    page.tsx              # Home (/)
    about/page.tsx        # About (/about)
    get-a-website/
      page.tsx            # Get a Website — renders <GetWebsiteForm>
      actions.ts          # submitWebsiteRequest → persistLead
  admin/
    layout.tsx            # Admin chrome (no public nav/footer)
    page.tsx              # Overview dashboard
    login/                # Sign-in
    leads/                # Lead triage
  api/track/route.ts      # POST page-view beacon
  components/
    layout/               # SiteNav, SiteFooter, MobileMenu, Container, Section, ThemeToggle
    ui/                   # Button, Field, Input, Logo, Reveal
    marketing/            # Hero, OfferingList, AllotmentEngineDiagram, CtaBand, …
    forms/                # GetWebsiteForm, FormSuccess
    admin/                # AdminNav, LoginForm, LeadStatusForm, LogoutButton
    analytics/            # PageViewTracker
  content/                # site.ts, offerings.ts, muns.ts
lib/
  supabase/               # env, server (auth cookies), admin (service role)
  admin-auth.ts           # allowlist + requireAdmin
  leads.ts / analytics.ts # Supabase data access
  validation.ts, theme.ts, cn.ts, useReveal.ts
proxy.ts                  # Next 16 proxy: refresh auth + guard /admin
supabase/schema.sql       # leads + page_views DDL
public/logo.png
context/                  # Spec + admin-panel plan
```

## System boundaries & data-flow rules
- **Server Components fetch/compose; Client Components handle interaction.** Default to server.
- **Lead capture:** `GetWebsiteForm` → `submitWebsiteRequest` → `lib/validation.ts` → `lib/leads.ts#persistLead()` (Supabase service role) → `FormState`.
- **Analytics:** `PageViewTracker` → `POST /api/track` → `lib/analytics.ts#recordPageView` (skips `/admin`).
- **Admin auth:** Supabase email/password + `ADMIN_EMAILS` allowlist; `proxy.ts` refreshes cookies and redirects unauthenticated `/admin` traffic to `/admin/login`.
- **Secrets stay server-side.** Publishable key used only in server/proxy auth clients; secret key only in `lib/supabase/admin.ts`.
- **Content is data, not markup.** Nav items, offerings, MUN names live in `app/content/*`.

## Architectural constraints (guardrails)
- Server Actions contain **no JSX / no UI logic** — only validate → persist → return state.
- Components **never** import from `actions.ts` of another route; the form owns its action.
- **No hard-coded colors, spacing, radii, or font sizes** in components — every visual value references a token from `ui-tokens.md` (via Tailwind utilities mapped to tokens, or `var(--token)`).
- Validation logic lives **once** in `lib/validation.ts` and is imported by both the client (instant feedback) and the server action (source of truth). Never duplicate rules.
- Every interactive element is reachable and operable by **keyboard**; every image/icon has a text alternative or is `aria-hidden` when decorative.
- The theme must be resolved **before first paint** (inline script in `<head>`) to avoid a flash of wrong theme.

## Rendering & performance
- All three pages are **static** (no dynamic data) → statically rendered / prerendered. The form page is static; only its action runs on the server on submit.
- Fonts via `next/font` (self-hosted, `display: swap`, subset latin) — no external font network calls.
- `logo.png` served via `next/image` with explicit width/height to reserve space (no layout shift).
- Marquee animation is **CSS transform** (GPU-friendly) with a `prefers-reduced-motion` stop.
- Target: Lighthouse ≥95 across the board; zero CLS; no client JS on pages that don't need it (About and the marketing sections stay server-rendered).

## Data schemas
No database. The only data shape is the lead payload:

```ts
// lib/validation.ts
export type WebsiteRequest = {
  name: string;        // 2–80 chars, required
  email: string;       // valid email, required
  munName: string;     // 2–120 chars, required  (the conference's name)
  phone: string;       // 7–20 chars, digits/+/space/-/() , required
};

// Server action return shape
export type FormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof WebsiteRequest, string>> };
```
