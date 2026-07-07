# DESIGN — System Summit

Derived from `context/ui-tokens.md` + `context/ui-rules.md`. Tokens live in `app/globals.css` (`:root` + `[data-theme="dark"]`, mapped to Tailwind utilities via `@theme inline`).

## Color strategy
**Committed navy, restrained teal.** ~70% of every screen is navy/neutral (ink, surfaces, off-white canvas); ~10% is teal, punctuating *only* the single most important thing on a view (the primary/conversion CTA, one indicator, one underline). Teal never fills large areas or competes with itself on a screen. Remaining ~20% is mid-blue + slate for secondary structure and muted text.

## Scene sentence (light-as-default justification)
An MUN Secretary-General thumbs through agency options at 1 a.m. on a phone, then again on a laptop in a bright common room the next morning — the site must read institutional, trustworthy, and premium in daylight and lamplight. **Default = light** (airy off-white canvas, deep-navy ink, matching the dark-on-light logo). **Dark theme** (toggle) is a calm deep-navy control room. Both are first-class and polished to equal standard.

## Brand colors (canonical hex → OKLCH tokens)
- Navy `#0C2454` — primary ink / dark surfaces
- Teal `#14B4C8` — accent (sparing)
- Mid-blue `#185484` — secondary structure, links
- Off-white `#F7F9FC` — light canvas
- Slate `#5A6B85` — muted text

Contrast holds in both themes: body/muted ≥ 4.5:1, large headings ≥ 3:1. Teal is a fill/indicator, never small text on light; text on teal uses dark navy (`--text-on-accent`).

## Type
- **Display/headings:** Sora (500/600/700) — geometric, architectural.
- **Body/UI:** Inter (400/500/600).
- Hero clamp: `clamp(2.5rem, 6vw + 0.5rem, 4.75rem)` (max ≤ 6rem). Tracking never tighter than −0.04em (display −0.03em).

## Spacing / radii / shadows / motion
4px spacing base; `--section-y: clamp(4rem,10vw,8rem)`; container max 76rem, narrow 44rem. Radii sm→2xl (buttons/inputs md, cards lg/xl). Shadows are **navy-tinted, never pure black**. Motion: `--ease-out: cubic-bezier(0.16,1,0.3,1)`, durations 140/240/480ms. Semantic z-index scale (dropdown→sticky→modal→toast→tooltip).

## Absolute bans (law, not suggestions)
- No side-stripe accent borders
- No gradient text (headings are solid)
- No glassmorphism-by-default (one deliberate frosted nav-on-scroll is the only exception)
- No hero-metric "10k+/99%/24-7" stat bar
- No identical icon+heading+text card grids (offerings are non-uniform; the Engine gets a distinct larger treatment)
- No uppercase tracked eyebrow above every section (at most once or twice, only where it orients)
- No 01/02/03 section numbering
- No generic stock hero imagery — domain graphics are custom SVG/CSS
- No pure-black text/shadows

## System rules
- **Cards sparingly** — only for genuinely separable units (an offering, the form). Prose/hero/narrative sit on the canvas.
- **One primary action per view.** Teal reserved for the conversion CTA.
- **Reveal animations enhance already-visible content** — never gate visibility on a scroll class; content is in the DOM and readable with JS off / motion reduced.
- Every animation has a `prefers-reduced-motion` alternative (marquee stops → static row).
- Inputs: visible labels always, inline validation, designed idle/submitting/success/error states, 44px+ targets, visible focus rings.
- Theme toggle: first-class, persisted, pre-paint (no FOUC), a small delight.

## Domain graphics to push in polish
- The **Allotment Engine diagram** (inputs → engine suggests → EB reviews & issues; emphasize human-in-loop).
- Quiet geometric motifs echoing the logo's mountain/river "S" (architectural line-work), used as restrained section accents — not wallpaper.
- Placeholder MUN partner marks (monochrome, unified muted tint).
All graphics sit on token colors and must render correctly in **both themes**.
