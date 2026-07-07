# Library Docs — System Summit

How *this* project uses each library. Not generic docs.

## ⚠️ Next.js 16.2 — read the shipped docs first
This project is on **Next 16**, which diverges from older training data (see `AGENTS.md` / `CLAUDE.md`). **Before writing any Next-specific API, read the relevant guide in `node_modules/next/dist/docs/`** (`01-app/...`). Especially verify, against the installed version, the current signatures for:
- **Metadata API** — `export const metadata` / `generateMetadata`, template titles, OpenGraph.
- **`next/font`** — `next/font/google` import shape, `variable` option, subsetting, `display`.
- **`next/image`** — props, `sizes`, static import vs `/public` path, avoiding CLS.
- **Server Actions** — `"use server"` placement, calling from `useActionState`, return typing, progressive enhancement.
- **Dynamic APIs** (`headers()`, `cookies()`, route params) — several became async; we mostly avoid them (fully static site) but confirm if used for theme cookie fallback.
- **Route/file conventions** — `layout.tsx`, `page.tsx`, colocated `actions.ts`, `not-found.tsx`.

Heed any deprecation notices in the docs. Do not assume Pages Router patterns.

### Our Next usage pattern
- App Router, all three pages statically rendered. No `getServerSideProps`/`getStaticProps` (Pages-era — not used).
- Root `app/layout.tsx` owns fonts, the pre-paint theme script, `<SiteNav>` + `<SiteFooter>`, and default metadata (`title.template = "%s · System Summit"`, description, OpenGraph, theme-color for both schemes).
- Each page sets its own `metadata` (`Home`, `About · …`, `Get a Website · …`).
- The only server action is `submitWebsiteRequest` in `app/get-a-website/actions.ts`.

## React 19
- **`useActionState`** drives the form: `const [state, formAction, isPending] = useActionState(submitWebsiteRequest, { status: "idle" })`. Wire to `<form action={formAction}>` for progressive enhancement.
- Prefer the platform: uncontrolled inputs + `FormData` in the action where possible; use controlled state only for live client-side validation display.
- Use `useId` for label/field/error id wiring in `Field`.

## Tailwind CSS v4
- **CSS-first config** — no `tailwind.config.js`. Configure via `app/globals.css`:
  - `@import "tailwindcss";`
  - `@theme { --color-bg: var(--bg); --color-text: var(--text); --font-display: ...; --radius-md: ...; ... }` to expose our semantic tokens as utilities (`bg-bg`, `text-text`, `rounded-md`, `font-display`).
  - Base layer for `:root` / `[data-theme="dark"]` token values and element defaults (body bg/text, focus-visible ring, `::selection`).
- **Dark theme is driven by `[data-theme="dark"]` on `<html>`, not Tailwind's `dark:` media variant** — because we support a manual toggle. If we need a `dark:`-style variant, register a custom variant: `@custom-variant dark (&:where([data-theme="dark"] *));`. Prefer semantic tokens that already swap by theme, so most components need **no** theme-specific classes at all.
- Never use arbitrary literals for brand values — extend tokens instead.
- PostCSS plugin `@tailwindcss/postcss` is already set in `postcss.config.mjs`; don't change the pipeline.

## `next/font/google` — Sora + Inter
- Load both in `app/layout.tsx`, assign CSS variables, spread onto `<html className>`:
```ts
import { Sora, Inter } from "next/font/google";
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["500","600","700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
```
- `--font-sora` / `--font-inter` are referenced by `--font-display` / `--font-sans` in `@theme`. Self-hosted by Next — no runtime Google request.

## Theme handling (no library)
- Hand-rolled, in `lib/theme.ts`: `THEME_KEY = "ss-theme"`, `type Theme = "light" | "dark"`, and a stringified **inline boot script** injected in `<head>` (via a `<script dangerouslySetInnerHTML>` in layout) that reads `localStorage[THEME_KEY]` → else `matchMedia("(prefers-color-scheme: dark)")` → sets `document.documentElement.dataset.theme`. Runs before paint → no flash.
- `ThemeToggle` (client) reads/writes the same key and updates `dataset.theme`; optionally listens to the media query when the user hasn't explicitly chosen. No `next-themes` dependency (kept lean; add only if manual approach proves fragile).

## Validation (no library)
- Hand-rolled in `lib/validation.ts` (no Zod, to stay dependency-free for four fields). Pure functions, shared client + server. If the form grows substantially later, revisit adding Zod — documented here so the choice is deliberate.

## Motion (no library)
- CSS keyframes + transitions using motion tokens (`--ease-out`, durations). Scroll reveal via a small `useReveal` IntersectionObserver hook, disabled under `prefers-reduced-motion`. No Framer Motion / GSAP — not warranted for this scope; adding one must be justified in this file first.

## Icons & graphics (no library)
- Inline SVG only, in `components/ui/icons.tsx` and the marketing SVG components — no icon package. Keeps bundle tiny and lets every glyph use `currentColor` / tokens and render in both themes.

## MCP / tooling
- No MCP servers required for this build. Local verification uses the preview dev-server tools (`preview_start` on the `dev` script) — not Bash — to run and inspect the app.

## Adding a dependency (policy)
Default is **no new dependencies**. Before adding one: justify it here, confirm it's maintained and small, and prefer a platform/CSS solution first. Document the intended usage pattern in this file the same way as above.
