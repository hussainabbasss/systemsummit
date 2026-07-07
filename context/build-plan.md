# Build Plan — System Summit

Ordered phases. Build in this order; don't improvise sequencing. Each phase has a **Definition of Done (DoD)**. Update `progress-tracker.md` as each completes. Verify in **both themes, mobile + desktop, keyboard** at every boundary.

---

## Phase 0 — Foundations & tokens
Set up the design system and app shell scaffolding before any page content.
- Rewrite `app/globals.css`: `@import "tailwindcss"`, `@theme` mapping semantic tokens to utilities, `:root` (light) + `[data-theme="dark"]` token blocks from `ui-tokens.md`, base layer (body, focus-visible ring, `::selection`, `scroll-behavior`, reduced-motion reset). Register `dark` custom variant.
- Load Sora + Inter via `next/font/google` in `layout.tsx`; wire font variables.
- `lib/cn.ts`, `lib/theme.ts` (key, types, boot-script string).
- Replace default `metadata` with brand defaults (title template, description, OG, theme-color for light+dark).
- **DoD:** app boots; tokens available as utilities; correct fonts render; no flash of wrong theme (boot script in place even before toggle UI); `tsc`/`lint`/`build` clean.

## Phase 1 — App shell: nav, footer, theme toggle
The consistent chrome every page shares.
- `Container`, `Section`, `SkipLink`.
- `Logo` (next/image, dark-safe), `Button` (variants), `Icon` set.
- `ThemeToggle` (client) + verify pre-paint script → persisted, no FOUC.
- `SiteNav` (sticky, logo + Home/About links + persistent "Get a Website" CTA + toggle; scroll hairline) with `MobileMenu` (focus-trapped sheet, Esc, scroll-lock).
- `SiteFooter` (navy inverse: logo, tagline, links, mission line, copyright).
- Wire Nav + Footer + SkipLink into `layout.tsx`; `<main id="content">`.
- `content/site.ts` (nav/footer links, brand strings, SLA copy).
- **DoD:** nav + footer render on every route, fully responsive; mobile menu accessible; theme toggle works and persists across reload in both themes; active-page state shown; keyboard-complete.

## Phase 2 — Home page
- `content/muns.ts` (placeholder MUN names), `MunLogo` (SVG wordmark/crest, muted-tinted), `LogoMarquee` (seamless CSS loop, hover-pause, edge mask, reduced-motion static fallback).
- `Hero`: headline **"Get a website for your MUN"**, supporting line in brand voice, single primary **accent** CTA → `/get-a-website`. Left-aligned, editorial, generous whitespace. Quiet logo-derived geometric motif (not wallpaper).
- Marquee section directly below hero ("Trusted by MUNs like…").
- `content/offerings.ts` + `OfferingList` (four offerings, **non-uniform** layout, Allotment Engine emphasized) + `AllotmentEngineDiagram` (inputs → engine → **EB reviews & issues**, human-in-loop).
- `CtaBand` closing section (navy, one accent CTA to form).
- `Reveal`/`useReveal` applied tastefully (content visible without JS/motion).
- **DoD:** Home complete & responsive; marquee smooth and reduced-motion-safe; exactly one primary CTA in the hero; offerings not a uniform card grid; diagram legible and correct in both themes; no bans violated.

## Phase 3 — About page
- `MissionNarrative` — leads with "every MUN has a right to digital infrastructure, affordably"; prose blocks (not cards): why MUNs deserve better than Google Forms → what "digital infrastructure for diplomacy" means → specialization as strength.
- `SpecializationPoints` — the specialization argument, visually distinct from Home's offering list (avoid repeating the same pattern).
- Reuse a quiet geometric motif and `CtaBand` at the end.
- Page `metadata`.
- **DoD:** About reads as a confident mission narrative; hierarchy clear; reuses shell + primitives; responsive; both themes; one clear CTA at the end.

## Phase 4 — Get a Website (conversion) page
- `lib/validation.ts` (`WebsiteRequest`, `FormState`, `validateWebsiteRequest`) — shared.
- `lib/leads.ts` (`persistLead()` stub + `// TODO(backend):` seam).
- `app/get-a-website/actions.ts` — `submitWebsiteRequest` server action (validate → persist → typed state).
- `Field`, `Input` primitives.
- `GetWebsiteForm` (client, `useActionState`): 4 fields (Name, Email, MUN Name, Phone), inline validation on blur/submit, submitting/success/error states, reassurance microcopy, one **"Get a Website"** submit. `FormSuccess` panel.
- Trust framing around the form (effortless, low-friction, brand voice); page `metadata`.
- **DoD:** form validates client + server via the same rules; success + error + submitting states all designed and working; first invalid field focused on error; fields preserved on error; fully keyboard + screen-reader operable; responsive; both themes; the primary action is unmistakable.

## Phase 5 — Integration, polish-prep & QA
- Cross-page consistency pass: nav active states, footer, spacing rhythm, metadata/titles, favicon, 404 (`not-found.tsx`) on-brand.
- Verify no hard-coded colors/spacing (grep), no ban violations, all images have alt, headings ordered, one h1/page.
- Full QA matrix: **mobile / tablet / desktop × light / dark × keyboard**; run the form flow end to end; Lighthouse sanity (perf/a11y).
- Fix everything found. Finalize `progress-tracker.md`.
- Derive `PRODUCT.md` (from `project-overview.md`) and `DESIGN.md` (from `ui-tokens.md` + `ui-rules.md`) for the next phase.
- **DoD:** `tsc`/`lint`/`build` all clean; every DoD above met; QA matrix passes; PRODUCT.md + DESIGN.md written.

## Phase 6 — `/impeccable` elevation pass (automatic)
- Run the `/impeccable` elevation directive (conversion-sharpened hierarchy, committed modern craft, domain graphics, both themes battle-tested) across **all three pages**, not just Home.
- Act on every finding until clean; run any follow-up it recommends (`audit`/`animate`/`delight`).
- If the pass rewrites fundamentals (rescue, not refinement), update the relevant context file and note it in the final summary.
- **DoD:** `/impeccable` returns clean; both themes polished to equal standard; site visibly outclasses a template/default generation; final summary presented.

---

### Global definition of "done"
Working, not just written: every in-scope page + flow + state (idle/loading/empty/success/error) implemented, verified running in both themes on mobile + desktop, keyboard-accessible, `tsc`/`lint`/`build` green, no ban violations, no hard-coded design values.
