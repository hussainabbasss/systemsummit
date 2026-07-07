# PRODUCT — System Summit

## What it is
A premium three-page marketing website for **System Summit**, a software agency that builds digital infrastructure **exclusively for Model United Nations (MUN) conferences**. The site is the sales pitch: System Summit sells beautifully-built websites, so this site must be the most polished thing in the room — its craft is the argument.

## Who it's for
MUN Secretaries-General, Directors-General, and Executive Board members — mostly students — evaluating whether to keep cobbling their conference together from Google Forms and spreadsheets, or hire a specialist. **They evaluate on phones, often late at night.** Mobile-first is the primary experience.

## The offer
- Custom conference websites
- Delegate registration & payment portals
- Executive Board (EB) admin dashboard
- **Merit-Logic Allotment Engine** (flagship): an AI-assisted engine that weighs delegate experience, committee level, and agenda weight to *suggest* country allotments. The EB reviews and issues — the engine advises, humans decide. Never describe it as "automatic allotment."

## Core belief (the north star for all copy)
**Every MUN, whatever its budget, deserves proper digital infrastructure — affordably.**

## Pages
1. **Home** — hero "Get a website for your MUN" + one primary CTA; auto-scrolling MUN partner marquee; a non-uniform "what we build" section (Allotment Engine emphasized); closing CTA band.
2. **About** — mission-led narrative: why MUNs deserve better than Google Forms → what "digital infrastructure for diplomacy" means → specialization as strength.
3. **Get a Website** — the conversion form (Name, Email, MUN Name, Phone + "Get a Website"), with designed loading/success/error states. This is the money page; friction is the enemy.

## Voice & register
Institutional but not stiff. Confident, calm, premium, specialist. Anchored by the logo tagline **"Digital Architects for Diplomacy."** We speak as people who live inside the MUN world (we know committee levels, agenda weight, allotment politics without a briefing). Never hype-y or generic-agency.

## Conversion intent
Every page funnels to the Get-a-Website form. One unmistakable primary action per screen. The form must feel effortless and trustworthy — four fields, inline validation, reassurance ("We reply within 48 hours. No spam, ever.").

## Constraints
Fully responsive (mobile-first), fast (static, no runtime font calls), accessible (WCAG AA, keyboard-complete, reduced-motion honored). Consistent nav + footer across all pages. Ships with a dark/light theme toggle; light is default.

## Out of scope
Real lead backend (stubbed at `lib/leads.ts`), auth, payments, the actual products. This site markets them; it doesn't implement them.
