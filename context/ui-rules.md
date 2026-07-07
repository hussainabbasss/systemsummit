# UI Rules — System Summit

How the interface *feels* on top of the raw tokens. These are **law during the build**, not suggestions for the polish pass.

## The feeling to hit
Institutional but not stiff. Premium, calm, confident. The site should feel like it was built by people who obsess over the details of the thing they sell — because it is the thing they sell. Whitespace does the heavy lifting; teal is a scalpel, not a paint roller.

## Absolute bans (encoded from `/impeccable` — do not ship any of these)
- ❌ **Side-stripe accent borders** (the `border-left: 4px solid accent` card cliché).
- ❌ **Gradient text** (no `background-clip: text` rainbow headings). Headings are solid `--text`.
- ❌ **Glassmorphism by default** — no blurred translucent panels as a reflex. (One deliberate, subtle frosted nav-on-scroll is the *only* permitted exception, and only if it earns it.)
- ❌ **Hero-metric template** — no "10k+ / 99% / 24/7" three-stat bar bolted under the hero as filler.
- ❌ **Identical icon + heading + text card grids** — the four offerings must not be four visually-identical boxes in a row. Differentiate by size, emphasis, or layout (e.g. the Allotment Engine gets a distinct, larger treatment).
- ❌ **Uppercase tracked eyebrow above every section** — an eyebrow may appear at most once or twice across the whole site, only where it genuinely orients. Not a reflex.
- ❌ **01 / 02 / 03 section numbering** as decorative scaffolding.
- ❌ Generic stock-y hero imagery. Domain graphics are custom SVG/CSS.
- ❌ Pure-black text/shadows (use navy-tinted tokens).

## Cards — use sparingly
A card is justified only when content is a genuinely **separable, self-contained unit** (e.g. a single offering that stands alone, the form panel). Prose, the About narrative, and the hero are **not** cards — they sit directly on the canvas with type and space doing the work. When a card is used: `--bg-elevated`, `--radius-lg`/`xl`, `--shadow-sm` at rest → `--shadow-md` on hover, 1px `--border`. No accent stripes.

## Buttons
- **Primary** (one per view): fill `--primary`, text `--primary-text`, `--radius-md`, weight 600. Hover → `--primary-hover` + subtle lift (`translateY(-1px)` + `--shadow-md`). Active → settle. This is the *only* place teal-family leads on dark theme; on light theme primary is navy, and **teal is reserved for the single most important CTA** (the "Get a Website" action) so it truly punctuates.
- **Accent CTA** (the conversion action): on light theme this is where teal is allowed as a fill — `--accent` bg, `--text-on-accent` (dark navy) text, for exactly one button per view. Used for the Get-a-Website CTA in the hero and CTA bands.
- **Secondary:** transparent/`--bg-elevated` fill, 1px `--border-strong`, text `--text`. Hover raises border + faint surface tint.
- **Ghost / link-button:** text `--link`, underline on hover.
- Min touch target **44×44px**. Visible focus ring (`--shadow-focus`) on keyboard focus — never remove outlines without replacement.

## Inputs & the form (the conversion moment — make it effortless)
- Generous height (≥48px), `--radius-md`, 1px `--border`, `--bg-elevated`. Focus → `--border` becomes `--accent` + `--shadow-focus`.
- **Label always visible above the field** (never placeholder-as-label). Placeholder is a soft example, `--text-muted`.
- **Inline validation on blur / on submit**, not on every keystroke while first typing. Errors render below the field in `--danger` with an icon and are announced via `aria-describedby` + `aria-invalid`.
- Fewest fields possible — exactly the four required. No optional noise. One clear primary submit.
- **States are designed, not default:** idle → submitting (button shows spinner + "Sending…", inputs disabled) → success (form replaced by a calm confirmation panel with next-step microcopy) → error (message + fields preserved, focus moved to first error).
- Reassurance microcopy near the button ("We reply within 48 hours. No spam, ever.").

## Layout patterns
- Single centered content column, `--container-max`; prose/form use `--container-narrow`. Horizontal padding = `--gutter`.
- Vertical rhythm between sections = `--section-y`. Be generous; whitespace is the premium signal.
- Mobile-first: design the phone layout first, enhance up. Breakpoints ~`640 / 768 / 1024 / 1280`.
- Alignment is deliberate — establish a baseline grid feel; don't center everything by default. The hero can be left-aligned for a confident, editorial stance.

## Nav & footer (consistent across all three pages)
- **Nav:** logo (left, links home) + links (Home, About) + a persistent **"Get a Website" primary/accent CTA** (right) + theme toggle. Sticky, `--bg-elevated` with a hairline `--border` bottom that appears on scroll. Mobile: logo + toggle + hamburger → full-height sheet menu (`--z-modal`), focus-trapped, `Esc` to close, scroll locked.
- **Footer:** logo + tagline "Digital Architects for Diplomacy" + nav links + a short mission line + copyright. Sits on `--bg-inverse` (navy) with `--text-on-inverse`. Teal used only for one hover/underline accent.
- Current page indicated in nav via `aria-current="page"` + a teal underline.

## Motion & micro-interactions
- **Reveal on scroll enhances already-visible content** — content is in the DOM and readable with JS off / motion reduced. The reveal only adds a subtle fade + 12px rise via `--ease-out`; it **never gates visibility** behind a scroll class. Stagger children ~60ms where a group enters together.
- Marquee: continuous CSS `translateX` loop, duration `--marquee-duration`, pauses on hover, duplicated track for seamless wrap. Edges fade to canvas via a mask.
- Micro-interactions where they matter: button hover lift, input focus glow, theme-toggle icon cross-fade/rotate, nav CTA subtle emphasis. Nowhere else — no animating for its own sake.
- **Every animation has a `prefers-reduced-motion: reduce` alternative:** marquee stops (or shows a static row), reveals become instant (content just present), transitions collapse to near-zero. Never a hard requirement for motion to read the page.

## Theme toggle
- A first-class, visible control in the nav (and reachable in the mobile sheet). Sun/moon (or equivalent) icon button, 44px target, `aria-pressed`/`aria-label` reflecting state. Smooth icon transition. Persists to `localStorage`; initial state from storage → `prefers-color-scheme` → light. No FOUC (pre-paint script).
- **Both themes are first-class.** Every screen, graphic, shadow, and the form's states must be verified in *both* light and dark as part of each build phase — not retrofitted.

## Accessibility (non-negotiable)
- Semantic landmarks: one `<header>`, `<main>`, `<footer>`; headings in order (one `<h1>` per page).
- All interactive elements keyboard-operable, visible focus, logical tab order. Skip-to-content link.
- Color is never the only signal (errors have icon + text; current nav item has underline + `aria-current`).
- Respect reduced motion and `prefers-color-scheme`. Contrast per `ui-tokens.md` in both themes.
- Images: logo has descriptive `alt`; decorative SVG graphics are `aria-hidden`. Marquee has an accessible label describing it as a list of partner MUNs.

## Domain graphics (custom, both themes)
Build product-relevant visuals as SVG/CSS in the brand language — they must clarify, persuade, or orient, never fill:
- A restrained **allotment-engine diagram** conveying inputs (experience · committee level · agenda weight) → engine → *EB reviews & issues* (emphasize human-in-the-loop).
- Subtle geometric motifs echoing the logo's mountain/river "S" (architectural line-work), used quietly as section accents — not wallpaper.
- Placeholder MUN "logos" for the marquee as tasteful monochrome SVG wordmarks/crests, tinted with `--text-muted` so they read as a unified partner row (no clashing colors).
All graphics sit on token colors and are verified in light + dark.
