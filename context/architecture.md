# Architecture — System Summit

## Stack (as scaffolded — do not add without cause)
- **Next.js 16.2** — App Router. ⚠️ This is a newer Next than training data assumes; consult `node_modules/next/dist/docs/` (per `AGENTS.md`) before using any framework API you're unsure about (metadata, server actions, `next/font`, image, dynamic APIs).
- **React 19.2** — Server Components by default; `"use client"` only where interactivity requires it.
- **TypeScript 5** — `strict: true`, path alias `@/*` → project root.
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `app/globals.css` and the `@tailwindcss/postcss` plugin. **No `tailwind.config.js`** — theme is expressed through CSS `@theme` + custom properties (see `ui-tokens.md`). Tailwind v4 is CSS-first.
- **Fonts:** `next/font/google` — Sora + Inter, exposed as CSS variables on `<html>`.
- **No** database, ORM, auth, state library, component library, or animation library in this build. Motion is CSS + one small IntersectionObserver hook.

## Folder structure
```
app/
  layout.tsx              # Root layout: fonts, <ThemeProvider> boot script, Nav + Footer, metadata
  globals.css             # Tailwind import + @theme tokens + base layer (see ui-tokens.md)
  page.tsx                # Home (/)
  about/page.tsx          # About (/about)
  get-a-website/
    page.tsx              # Get a Website (/get-a-website) — renders <GetWebsiteForm>
    actions.ts            # "use server" — submitWebsiteRequest server action + validation
  components/
    layout/               # SiteNav, SiteFooter, MobileMenu, Container, Section, ThemeToggle
    ui/                   # Button, Field, Input, Logo, Reveal, Badge (built as needed)
    marketing/            # Hero, LogoMarquee, OfferingList, AllotmentEngineDiagram, CtaBand
    forms/                # GetWebsiteForm (client), form field primitives
  content/
    site.ts               # Nav links, footer links, contact/SLA copy, brand strings
    offerings.ts          # The four offerings (title, blurb, icon key)
    muns.ts               # Placeholder MUN names for the marquee
  lib/
    theme.ts              # Theme constants, storage key, inline boot script string
    validation.ts         # Zod-free hand-rolled validators for the form (shared client/server)
    leads.ts              # persistLead() — the single stubbed integration point
    cn.ts                 # className joiner helper
    useReveal.ts          # "use client" IntersectionObserver reveal hook
public/
  logo.png                # Provided brand logo (nav + footer)
context/                  # These nine spec files
```
> Create folders as features need them (per `build-plan.md`); do not pre-create empty dirs.

## System boundaries & data-flow rules
- **Server Components fetch/compose; Client Components handle interaction.** Default to server. Add `"use client"` only for: ThemeToggle, MobileMenu, GetWebsiteForm, Reveal hook, LogoMarquee (if it needs JS — prefer pure CSS).
- **The form is the only data mutation.** Flow: `GetWebsiteForm` (client, `useActionState`) → `submitWebsiteRequest` server action in `get-a-website/actions.ts` → validates with `lib/validation.ts` → calls `lib/leads.ts#persistLead()` → returns a typed `FormState`.
- **`persistLead()` is the one integration seam.** In this build it validates shape and resolves success (optionally `console.log`s server-side). A `// TODO(backend):` comment marks exactly where real email/DB/webhook goes. Nothing else in the app knows how leads are stored.
- **No component reads env/secrets or does I/O directly.** Any future secret is read only inside `lib/leads.ts` on the server.
- **Content is data, not markup.** Nav items, offerings, MUN names, and reusable brand copy live in `app/content/*` as typed exports — components map over them. No hard-coded lists inside JSX.

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
