# UI Tokens — System Summit

The design-primitive registry. **Every visual value downstream references a token here.** No hard-coded colors, spacing, sizes, radii, or shadows in components. Tokens are authored to `/impeccable` standards so the polish pass refines rather than rewrites.

## Color strategy (stated deliberately)
**Committed navy, restrained teal.** ~70% of every screen is navy/neutral (ink, surfaces, off-white canvas); ~10% is teal, used *only* to punctuate the one thing that matters on a view — the primary CTA, a live indicator, a single underline. Teal never fills large areas and never appears twice competing on the same screen. The remaining ~20% is mid-blue and slate for secondary structure and muted text. This is a **restrained** strategy: confidence through discipline, not saturation.

## Scene sentence (justifies light-as-default)
*An MUN Secretary-General thumbs through agency options at 1 a.m. on their phone, then again on a laptop in a bright university common room the next morning — the site has to read as institutional, trustworthy, and premium in daylight and lamplight alike. So the **default theme is light**: an airy off-white canvas with deep-navy ink, matching the dark-on-light logo. The **dark theme** (toggle) serves that same late-night review, a calm deep-navy control room.*

## Brand source colors (canonical hex — must render true)
| Role | Hex | Notes |
|---|---|---|
| Navy (primary) | `#0C2454` | dominant — ink, headings, dark surfaces |
| Teal (accent) | `#14B4C8` | sparing punctuation only |
| Mid-blue (secondary) | `#185484` | secondary structure, links, hover |
| Off-white (background) | `#F7F9FC` | light canvas |
| Slate (muted text) | `#5A6B85` | secondary/muted copy |

Tokens are expressed in **OKLCH** (with the source hex noted) for perceptually-even manipulation. OKLCH values are tuned to render the brand hexes; treat the hex as canonical if they ever disagree.

## Token definitions (`app/globals.css`)

```css
:root {
  /* ---- Brand scales (OKLCH ≈ brand hex) ---- */
  --navy-900: oklch(0.20 0.075 264);   /* deepest navy */
  --navy-800: oklch(0.25 0.088 264);   /* #0C2454 primary navy */
  --navy-700: oklch(0.32 0.090 260);
  --midblue-600: oklch(0.44 0.088 247);/* #185484 secondary */
  --midblue-500: oklch(0.52 0.095 244);
  --teal-500: oklch(0.71 0.115 208);   /* #14B4C8 accent */
  --teal-400: oklch(0.78 0.105 205);   /* accent hover (lighter) */
  --teal-600: oklch(0.63 0.115 210);   /* accent active / on-light text-safe */
  --slate-500: oklch(0.53 0.038 262);  /* #5A6B85 muted */
  --slate-400: oklch(0.64 0.030 262);
  --slate-200: oklch(0.88 0.012 258);  /* hairline borders */
  --offwhite: oklch(0.98 0.005 250);   /* #F7F9FC */
  --white: oklch(1 0 0);

  /* ---- Semantic tokens (LIGHT theme = default) ---- */
  --bg: var(--offwhite);               /* page canvas */
  --bg-elevated: var(--white);         /* cards, form, nav surface */
  --bg-inverse: var(--navy-800);       /* navy CTA bands / footer */
  --surface-muted: oklch(0.965 0.006 250);
  --border: var(--slate-200);
  --border-strong: oklch(0.83 0.018 258);

  --text: var(--navy-800);             /* primary ink — ≥12:1 on --bg */
  --text-secondary: var(--midblue-600);
  --text-muted: var(--slate-500);      /* ≥4.5:1 on --bg */
  --text-on-inverse: var(--offwhite);  /* text on navy surfaces */
  --text-on-accent: var(--navy-900);   /* text on teal — dark ink for AA */

  --accent: var(--teal-500);
  --accent-hover: var(--teal-600);
  --accent-contrast: var(--navy-900);  /* readable on accent fill */
  --accent-ink: oklch(0.50 0.098 218); /* AA-safe teal for SMALL text on light tints (≥4.5:1) */
  --link: var(--midblue-600);
  --link-hover: var(--navy-800);
  --focus-ring: var(--teal-500);

  --primary: var(--navy-800);          /* primary button fill (light theme) */
  --primary-hover: var(--navy-900);
  --primary-text: var(--offwhite);

  --danger: oklch(0.58 0.19 25);
  --success: oklch(0.65 0.14 165);
}

[data-theme="dark"] {
  /* Deep-navy control room. Canvas is navy (NOT black, NOT warm) */
  --bg: oklch(0.19 0.060 264);         /* deep navy canvas */
  --bg-elevated: oklch(0.24 0.070 263);/* raised surfaces */
  /* Inverse bands (CTA band, footer) stay a grounded deep navy in dark — NOT
     off-white — so navy stays dominant per the 70/10 law (polish-pass fix). */
  --bg-inverse: oklch(0.15 0.052 264);
  --surface-muted: oklch(0.22 0.065 264);
  --border: oklch(0.34 0.045 260);
  --border-strong: oklch(0.42 0.050 258);

  --text: oklch(0.96 0.008 250);       /* off-white ink — ≥13:1 on --bg */
  --text-secondary: oklch(0.82 0.030 235);
  --text-muted: oklch(0.72 0.028 250); /* ≥4.5:1 on --bg */
  --text-on-inverse: var(--offwhite);  /* off-white on the deep-navy inverse band */
  --text-on-accent: var(--navy-900);

  --accent: var(--teal-400);           /* slightly brighter for dark */
  --accent-hover: var(--teal-500);
  --accent-contrast: var(--navy-900);
  --accent-ink: oklch(0.82 0.10 205);  /* bright teal, AA on dark surfaces */
  --link: var(--teal-400);
  --link-hover: oklch(0.86 0.09 205);
  --focus-ring: var(--teal-400);

  --primary: var(--teal-500);          /* on dark, primary CTA is teal-forward */
  --primary-hover: var(--teal-400);
  --primary-text: var(--navy-900);

  --danger: oklch(0.68 0.17 25);
  --success: oklch(0.72 0.13 165);
}
```

> **Contrast verified (must hold in both themes):** body/muted text ≥ 4.5:1, large headings ≥ 3:1. Teal is never used as small text on light canvas (use `--text` / `--midblue-600`); teal is a *fill/indicator*, and any text on teal uses `--text-on-accent` (dark navy). Re-check whenever a value changes.

## Typography
- **Display / headings:** **Sora** (`--font-sora`) — geometric, precise, "architectural." Weights 500/600/700.
- **Body / UI:** **Inter** (`--font-inter`) — weights 400/500/600.
- Exposed as CSS vars on `<html>` via `next/font`; mapped in `@theme` to `--font-display` / `--font-sans`.

```css
--font-display: var(--font-sora), ui-sans-serif, system-ui, sans-serif;
--font-sans:    var(--font-inter), ui-sans-serif, system-ui, sans-serif;

/* Type scale (fluid where it matters) */
--text-xs: 0.75rem;    --lh-xs: 1.4;
--text-sm: 0.875rem;   --lh-sm: 1.45;
--text-base: 1rem;     --lh-base: 1.6;
--text-lg: 1.125rem;   --lh-lg: 1.55;
--text-xl: 1.375rem;   --lh-xl: 1.4;
--text-2xl: 1.75rem;   --lh-2xl: 1.25;
--text-3xl: 2.25rem;   --lh-3xl: 1.15;
--text-display: clamp(2.5rem, 6vw + 0.5rem, 4.75rem); /* hero — max ≤ 6rem ✓ */
--lh-display: 1.05;

/* Letter-spacing — never tighter than -0.04em */
--tracking-display: -0.03em;   /* hero */
--tracking-heading: -0.02em;
--tracking-body: 0em;
--tracking-wide: 0.04em;       /* small labels, used sparingly (NOT an eyebrow on every section) */
```
Body copy line-length capped ~68ch (`--measure: 68ch`).

## Spacing scale (4px base)
```css
--space-1: 0.25rem;  --space-2: 0.5rem;  --space-3: 0.75rem; --space-4: 1rem;
--space-5: 1.25rem;  --space-6: 1.5rem;  --space-8: 2rem;    --space-10: 2.5rem;
--space-12: 3rem;    --space-16: 4rem;   --space-20: 5rem;   --space-24: 6rem;
--space-32: 8rem;    /* section rhythm on desktop */
--gutter: clamp(1.25rem, 5vw, 2rem);     /* page horizontal padding */
--section-y: clamp(4rem, 10vw, 8rem);    /* vertical rhythm between sections */
--container-max: 76rem;                   /* 1216px content cap */
--container-narrow: 44rem;                /* prose / form width */
```

## Radii
```css
--radius-sm: 0.375rem;  --radius-md: 0.625rem;  --radius-lg: 0.875rem;
--radius-xl: 1.25rem;   --radius-2xl: 1.75rem;  --radius-full: 999px;
```
Buttons & inputs use `--radius-md`; cards/surfaces `--radius-lg`/`--radius-xl`; pills `--radius-full`.

## Shadows (soft, navy-tinted — never pure black)
```css
--shadow-xs: 0 1px 2px oklch(0.25 0.088 264 / 0.06);
--shadow-sm: 0 2px 8px oklch(0.25 0.088 264 / 0.08);
--shadow-md: 0 8px 24px oklch(0.25 0.088 264 / 0.10);
--shadow-lg: 0 20px 48px oklch(0.25 0.088 264 / 0.14);
--shadow-focus: 0 0 0 3px oklch(0.71 0.115 208 / 0.45); /* teal focus halo */
```
Dark theme overrides shadows to deeper, lower-opacity navy so elevation still reads.

## Motion
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);   /* exponential-ish ease-out */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--dur-fast: 140ms;  --dur-base: 240ms;  --dur-slow: 480ms;
--marquee-duration: 40s;
```
All motion has a `prefers-reduced-motion: reduce` alternative (see `ui-rules.md`).

## Z-index scale (semantic — no magic numbers)
```css
--z-base: 0;
--z-dropdown: 100;
--z-sticky: 200;      /* sticky nav */
--z-modal-backdrop: 300;
--z-modal: 400;       /* mobile menu sheet */
--z-toast: 500;
--z-tooltip: 600;
```

## Theme wiring
- Tokens above live in `:root` / `[data-theme="dark"]` in `globals.css`.
- `@theme inline { --color-bg: var(--bg); ... }` maps semantic tokens to Tailwind utilities (`bg-bg`, `text-text`, `text-muted`, `bg-primary`, etc.) so components use utilities, not raw `var()`, wherever possible.
- Theme resolved pre-paint by an inline script setting `data-theme` on `<html>` from `localStorage` → else `prefers-color-scheme` (see `lib/theme.ts`). Default when nothing set: **light**.
