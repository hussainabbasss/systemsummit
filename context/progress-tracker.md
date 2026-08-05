# Progress Tracker — System Summit

Legend: ⬜ not started · 🟡 in progress · ✅ done · ⚠️ blocked/needs decision

**Current state:** Phases 0–6 complete. Admin panel (Supabase) built: lead persistence, page-view tracking, allowlisted auth, `/admin` overview + leads triage. Build/lint/tsc green.

---

## Phase 0 — Foundations & tokens ✅
- ✅ `globals.css`: Tailwind import + `@theme` token map + light/dark token blocks + base layer + `dark` variant
- ✅ Sora + Inter via `next/font/google`, font vars wired in `layout.tsx`
- ✅ `lib/cn.ts`
- ✅ `lib/theme.ts` (key, types, pre-paint boot-script string)
- ✅ Brand `metadata` defaults (title template, description, OG, theme-color ×2)
- ✅ Verify: no theme flash; `tsc`/`lint`/`build` clean

## Phase 1 — App shell ✅
- ✅ `Container`, `Section`, `SkipLink`
- ✅ `Logo`, `Button`, `Icon` set
- ✅ `ThemeToggle` + persistence verified
- ✅ `SiteNav` (+ scroll hairline, active state, CTA)
- ✅ `MobileMenu` (focus trap, Esc, scroll-lock)
- ✅ `SiteFooter` (navy inverse)
- ✅ `content/site.ts`
- ✅ Wired into `layout.tsx`; verified on every route, both themes, keyboard

## Phase 2 — Home ✅
- ✅ `content/muns.ts`, `MunLogo`, `LogoMarquee` (reduced-motion safe)
- ✅ `Hero` (headline + single accent CTA)
- ✅ `content/offerings.ts`, `OfferingList` (non-uniform)
- ✅ `AllotmentEngineDiagram` (human-in-loop)
- ✅ `CtaBand`
- ✅ `Reveal`/`useReveal`
- ✅ Verified both themes / responsive / no bans

## Phase 3 — About ✅
- ✅ `MissionNarrative`
- ✅ `SpecializationPoints`
- ✅ CTA band + motif reuse
- ✅ `metadata`
- ✅ Verified both themes / responsive

## Phase 4 — Get a Website ✅
- ✅ `lib/validation.ts` (shared)
- ✅ `lib/leads.ts` (stub seam)
- ✅ `actions.ts` (`submitWebsiteRequest`)
- ✅ `Field`, `Input`
- ✅ `GetWebsiteForm` (states: idle/submitting/success/error)
- ✅ `FormSuccess`
- ✅ `metadata`
- ✅ Verified: client+server validation parity, a11y, both themes, responsive

## Phase 5 — Integration & QA ✅
- ✅ Consistency pass (nav/footer/metadata/favicon/`not-found.tsx`)
- ✅ Ban + hard-coded-value + a11y grep/audit
- ✅ QA matrix (mobile/tablet/desktop × light/dark × keyboard) + form E2E
- ✅ `PRODUCT.md` + `DESIGN.md` derived
- ✅ `tsc`/`lint`/`build` green

## Phase 6 — `/impeccable` elevation ✅
- ✅ Ran elevation directive across all three pages (both themes)
- ✅ Fixed findings (see log); no follow-up command needed — refinement, not rescue
- ✅ Context corrections noted (ui-tokens.md updated for the two token changes)
- ✅ Final summary presented

## Phase 7 — Admin panel + Supabase ✅
- ✅ `supabase/schema.sql` — `leads` + `page_views` with RLS (secret-key only)
- ✅ `@supabase/supabase-js` + `@supabase/ssr`; `lib/supabase/*` clients
- ✅ `persistLead()` writes to Supabase; form captures attribution headers
- ✅ `POST /api/track` + `PageViewTracker` on marketing layout
- ✅ `/admin` auth (email/password + `ADMIN_EMAILS` allowlist) via Next 16 `proxy.ts`
- ✅ Admin overview (lead counts + traffic) and leads triage (`new`/`contacted`/`archived`)
- ✅ Marketing chrome moved under `app/(site)`; admin has its own layout
- ✅ Plan: `context/admin-panel.md`

---

## Decisions / notes log
- 2026-07-08 — Client revisions: (1) dark-mode logo now uses black-bg.png (light art) in nav + always in footer, dropping the white chip (Logo `surface` prop swaps art by theme via `dark:` variant). (2) Navbar/mobile-menu impeccable pass: logo in the sheet header, active-page dot, refined spacing; confirmed no horizontal overflow (button in-bounds). (3) Footer + CTA-band contrast fixed (low-opacity on-inverse text was the "discoloration"; now solid/≥75%, measured >11:1). (4) Added NiqBrands LLC parent-company block to footer + a NiqBrandsSection on About (belief: every academic conference deserves a website) with niqbrands.png. (5) Removed all em dashes from the UI (rewritten as commas/colons/periods; 0 remain in rendered HTML). NOTE: preview screenshots unreliable this session (dev refetch churn + modal backdrop-blur); verified via computed styles, served-HTML greps, image-optimizer checks, and green tsc/lint/build.
- 2026-07-08 — /impeccable pass (refinement, not rescue). Elevated hero (architect's-elevation emblem: contours + meridian + summit range + teal river "S"; blueprint backdrop; staggered CSS load entrance, reduced-motion safe). Living pulse on the Allotment Engine core + wired input dots. Added `--accent-ink` token (AA-safe teal for small text, both themes). **Token fix:** dark-theme `--bg-inverse` flipped to off-white originally, making the CTA band + footer big light blocks at the page bottom in dark mode (broke 70/10 navy dominance) → changed to a grounded deep navy (0.15) in dark; `--text-on-inverse` now off-white in dark. Added a restrained teal spotlight glow to the CTA band + footer top hairline. **Bug fix:** MobileMenu off-canvas sheet caused horizontal page overflow on mobile (695px) → clipped with `overflow-hidden` on the fixed root. ui-tokens.md updated to match. All gates green; verified both themes × mobile/desktop.
- 2026-07-08 — Spec authored. Stack kept as scaffolded (Next 16 / React 19 / TS / Tailwind v4), zero new deps. Light theme default. Fonts: Sora + Inter. Form persistence stubbed at `lib/leads.ts` seam (no live backend this build). Placeholder MUN logos to be custom SVG (no real trademarks). Awaiting spec approval.
