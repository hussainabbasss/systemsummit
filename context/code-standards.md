# Code Standards — System Summit

The whole codebase should read as if one careful person wrote it.

## TypeScript
- `strict` on. **No `any`** — use precise types or `unknown` + narrowing. No non-null `!` unless provably safe with a comment.
- Prefer `type` aliases for props and data shapes; `interface` only when declaration-merging is needed (rare here).
- Component props are always a named exported `type` (`type ButtonProps = {...}`), destructured in the signature.
- Discriminated unions for state (`FormState` by `status`) — never boolean soup (`isLoading && !isError && ...`).
- Content modules export `as const` typed data; derive types from data where possible.

## React / Next 16 (App Router)
- **Server Components by default.** Add `"use client"` only when the component uses state, effects, event handlers, or browser APIs — and push it as far down the tree as possible (a client leaf, not a client page).
- ⚠️ Before using a Next API you're unsure of (metadata, `next/font`, `next/image`, server actions, dynamic APIs, params), **read `node_modules/next/dist/docs/`** — this Next version diverges from older conventions (`AGENTS.md`).
- Server Actions live in a route's `actions.ts` with `"use server"` at top. They validate → call a `lib/` function → return typed state. **No JSX, no direct I/O** beyond the `lib/leads.ts` seam.
- Forms use `useActionState` (React 19) + progressive enhancement — the form must be usable before hydration where feasible; JS enhances validation UX.
- `export const metadata` (or `generateMetadata`) per page for title/description/OpenGraph. Root layout sets the template + brand defaults.
- No `useEffect` for anything derivable during render. Effects only for subscriptions (IntersectionObserver, media-query listener, storage).

## Naming
- **Components:** `PascalCase` files and exports (`SiteNav.tsx` → `export function SiteNav`). One primary component per file, default-less named exports.
- **Hooks:** `useCamelCase` (`useReveal`). **Lib utils / content:** `camelCase` files (`validation.ts`, `leads.ts`).
- **Types:** `PascalCase` (`WebsiteRequest`, `FormState`, `Offering`).
- **CSS custom props / tokens:** `--kebab-case` exactly as in `ui-tokens.md`.
- **Booleans:** `isX / hasX / canX`. **Handlers:** `handleX` (internal) / `onX` (props).
- Directories `kebab-case` route segments (`get-a-website`), `lowercase` for `components/*` groups.

## Styling
- Tailwind v4 utilities mapped to semantic tokens (`bg-bg`, `text-text`, `text-muted`, `bg-primary`, `border-border`, `rounded-md`) — **never** arbitrary color/spacing literals (`text-[#0C2454]`, `p-[13px]`). If a value isn't a token, add a token first.
- Use `var(--token)` inline style only for genuinely dynamic values (e.g. marquee duration, stagger delay); otherwise utilities.
- `cn()` helper for conditional classes; keep className strings readable, group by concern (layout | color | type | state).
- Component variants via a small explicit map object (`const styles = { primary: "...", accent: "..." }`) — no giant ternary chains, no `cva` dependency.
- Mobile-first: base styles are phone; layer `sm: md: lg:` upward.

## Accessibility as code
- Every `<img>`/`next/image` has `alt` (empty `alt=""` + `aria-hidden` for decorative). Every icon-only button has `aria-label`.
- Form fields wired: `<label htmlFor>`, `aria-invalid`, `aria-describedby` → error id. Errors announced (`role="alert"` / live region on the error container).
- Focus management: mobile menu traps focus & restores on close; on submit error, focus first invalid field.
- Never remove focus outlines without a stronger replacement (`--shadow-focus`).

## Errors & validation
- One validation source: `lib/validation.ts` exports `validateWebsiteRequest(data): { ok: true; value } | { ok: false; fieldErrors }`. Client calls it for instant feedback; server action calls the **same** function as the authority.
- Server action wraps `persistLead()` in try/catch → returns `{ status: "error", message }` on throw; never let an exception reach the client raw.
- User-facing messages are human and reassuring; technical detail goes to server logs only.

## File & import hygiene
- Import order: React/Next → third-party → `@/` absolute internal → relative → types. Use the `@/*` alias for cross-folder imports; relative only within the same folder.
- No default exports for components (named only) — except Next's required `page.tsx`/`layout.tsx` default exports.
- No dead code, no commented-out blocks left behind, no `console.log` in client code (server-side logging in `lib/leads.ts` is fine and marked).
- Keep components small; extract when a file exceeds ~150 lines or a JSX block repeats.

## Quality gates (run at every phase boundary)
- `npx tsc --noEmit` clean.
- `npm run lint` clean.
- `npm run build` succeeds.
- Manual: exercise the flow in **both themes**, mobile + desktop, keyboard-only.
- No hard-coded colors/spacing (grep for `#` hex and `px]` arbitrary values before calling a phase done).

## Comments
- Comment the *why*, not the *what*. Mark the backend seam clearly: `// TODO(backend): wire persistLead() to real email/DB/webhook`.
- Match surrounding density — this is a small, clean codebase; prefer self-explaining names over narration.
