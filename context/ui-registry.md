# UI Registry — System Summit

Living inventory of components. **Check here before creating any component** — reuse over recreate. Update the Status column as each is built.

Status: ⬜ not started · 🟡 in progress · ✅ built

## Layout & shell
| Component | Path | Purpose | Client? | Status |
|---|---|---|---|---|
| `RootLayout` | `app/layout.tsx` | Fonts, theme boot script, Nav + Footer, metadata | server | ✅ |
| `SiteNav` | `components/layout/SiteNav.tsx` | Sticky top nav: logo, links, CTA, theme toggle | server + client bits | ✅ |
| `MobileMenu` | `components/layout/MobileMenu.tsx` | Full-height sheet menu, focus-trapped | client | ✅ |
| `SiteFooter` | `components/layout/SiteFooter.tsx` | Navy footer: logo, tagline, links, mission, copyright | server | ✅ |
| `ThemeToggle` | `components/layout/ThemeToggle.tsx` | Light/dark toggle button, persisted, a11y | client | ✅ |
| `ThemeScript` | `lib/theme.ts` (string) | Inline pre-paint script setting `data-theme` | n/a | ✅ |
| `Container` | `components/layout/Container.tsx` | Max-width + gutter wrapper (`max`/`narrow` variants) | server | ✅ |
| `Section` | `components/layout/Section.tsx` | Vertical rhythm wrapper (`--section-y`), optional inverse bg | server | ✅ |
| `SkipLink` | `components/layout/SkipLink.tsx` | Skip-to-content a11y link | server | ✅ |

## UI primitives
| Component | Path | Purpose | Client? | Status |
|---|---|---|---|---|
| `Button` | `components/ui/Button.tsx` | Variants: `primary`, `accent`, `secondary`, `ghost`; sizes; asChild for links | server | ✅ |
| `Logo` | `components/ui/Logo.tsx` | `next/image` of `logo.png`, sized, links home; dark-safe chip variant | server | ✅ |
| `Field` | `components/ui/Field.tsx` | Label + input + help/error wiring (`aria-*`) | server | ✅ |
| `Input` | `components/ui/Input.tsx` | Styled text/email/tel input, error state | server | ✅ |
| `Reveal` | `components/ui/Reveal.tsx` | Scroll-reveal wrapper (enhances visible content) | client | ✅ |
| `useReveal` | `lib/useReveal.ts` | IntersectionObserver hook w/ reduced-motion guard | client | ✅ |
| `Badge` / `Pill` | (not built) | Small labels are inline spans where needed (e.g. "AI-assisted · Flagship") — no separate component warranted yet | server | ➖ |
| `Icon` | `components/ui/icons.tsx` | Inline SVG icon set (menu, close, sun, moon, arrow, check, offering glyphs) | server | ✅ |

## Marketing (Home / About)
| Component | Path | Purpose | Client? | Status |
|---|---|---|---|---|
| `Hero` | `components/marketing/Hero.tsx` | Home hero: headline "Get a website for your MUN" + primary CTA | server | ✅ |
| `HeroMotif` | `components/marketing/HeroMotif.tsx` | Decorative logo-derived mountain/river "S" line-work, both themes | server | ✅ |
| `LogoMarquee` | `components/marketing/LogoMarquee.tsx` | Auto-scrolling MUN partner row, CSS loop, reduced-motion safe | client (minimal) | ✅ |
| `MunLogo` | `components/marketing/MunLogo.tsx` | Single placeholder MUN wordmark/crest SVG, muted-tinted | server | ✅ |
| `OfferingList` | `components/marketing/OfferingList.tsx` | The four offerings, non-uniform layout (engine emphasized) | server | ✅ |
| `AllotmentEngineDiagram` | `components/marketing/AllotmentEngineDiagram.tsx` | SVG: inputs → engine → EB reviews & issues (human-in-loop) | server | ✅ |
| `CtaBand` | `components/marketing/CtaBand.tsx` | Closing navy band w/ single accent CTA to form | server | ✅ |
| `MissionNarrative` | `components/marketing/MissionNarrative.tsx` | About: mission-led prose blocks (not cards) | server | ✅ |
| `SpecializationPoints` | `components/marketing/SpecializationPoints.tsx` | About: "specialization as strength" content | server | ✅ |
| `NiqBrandsSection` | `components/marketing/NiqBrandsSection.tsx` | About: parent-company (NiqBrands) belief + mark | server | ✅ |

## Forms (Get a Website)
| Component | Path | Purpose | Client? | Status |
|---|---|---|---|---|
| `GetWebsiteForm` | `components/forms/GetWebsiteForm.tsx` | The 4-field conversion form, `useActionState`, states | client | ✅ |
| `FormSuccess` | `components/forms/FormSuccess.tsx` | Calm success panel replacing the form | server | ✅ |
| `submitWebsiteRequest` | `app/get-a-website/actions.ts` | `"use server"` action: validate → persist → FormState | server | ✅ |

## Content & lib (not components, tracked for reuse)
| Module | Path | Purpose | Status |
|---|---|---|---|
| `site` | `app/content/site.ts` | Nav/footer links, brand strings, SLA copy | ✅ |
| `offerings` | `app/content/offerings.ts` | Four offerings data | ✅ |
| `muns` | `app/content/muns.ts` | Placeholder MUN names for marquee | ✅ |
| `validation` | `lib/validation.ts` | Shared client/server form validators + types | ✅ |
| `leads` | `lib/leads.ts` | `persistLead()` stubbed integration seam | ✅ |
| `cn` | `lib/cn.ts` | className joiner | ✅ |

## Rules for this registry
- Before building anything, scan this table; if it exists, import it — do not make a second Button.
- When you build a component, flip its Status and add any new components you introduced.
- New shared primitive? Add it here first, then use it in ≥1 place before considering it "done."
