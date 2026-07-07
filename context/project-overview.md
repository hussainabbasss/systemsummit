# Project Overview — System Summit

## What it is
A premium three-page **marketing website** for **System Summit**, a specialized software agency that builds digital infrastructure *exclusively* for **Model United Nations (MUN) conferences**. The site is itself the sales pitch: System Summit sells beautifully-built websites, so this site must be the most polished thing in the room — a live proof of craft.

Brand voice is anchored by the logo tagline: **"Digital Architects for Diplomacy."**

## Who it is for
- **Secretaries-General & Directors-General** planning a conference and evaluating whether to build in-house (Google Forms + spreadsheets) or hire a specialist.
- **Executive Board (EB) members & organising teams** who feel the operational pain of registration, payments, and country allotment.
- **School / university MUN society leads** on tight budgets who assume "proper" infrastructure is out of reach.

Most of these people are students, evaluating on a **phone**, often late at night. Mobile-first is not optional — it is the primary experience.

## The problem it solves
MUNs cobble their digital backbone together from Google Forms, spreadsheets, manual payment tracking, and email chains. It is fragile, unprofessional to delegates, and eats the EB's time. System Summit's thesis: **every MUN, regardless of budget, deserves proper digital infrastructure — affordably.**

## What System Summit offers (the substance behind the site)
1. **Custom conference websites** — a real branded home for the conference, not a Linktree.
2. **Delegate registration & payment portals** — one clean flow from sign-up to paid, no spreadsheets.
3. **EB admin dashboard** — the organising team's control room for delegates, committees, and status.
4. **Merit-Logic Allotment Engine** *(the standout product)* — an AI-assisted engine that weighs **delegate experience**, **committee level**, and **agenda weight** to *suggest* country allotments. The Executive Board **reviews and issues** — the engine advises, humans decide. This human-in-the-loop framing is a trust feature and must never be described as "automatic allotment."

## Primary user flows
1. **Land → get convinced → convert.** Home hero ("Get a website for your MUN") → primary CTA → **Get a Website** form → submit → success confirmation.
2. **Land → investigate credibility → convert.** Home → About (mission + specialization) → nav CTA → Get a Website form.
3. **Direct intent.** Any page → persistent nav "Get a Website" button → form → submit.

## Pages (exactly three)
- **Home (`/`)** — Clean, confident landing. Hero with headline **"Get a website for your MUN"** + one primary CTA to `/get-a-website`. Below the hero, an **auto-scrolling logo marquee** of MUNs worked with (placeholder logos for now). Minimal, whitespace-heavy. A compact "what we build" section (the four offerings, allotment engine highlighted) and a closing CTA band are in scope as supporting content — but the hero and its single CTA lead.
- **About (`/about`)** — Narrative page positioning System Summit as a *highly specialized* MUN agency. Leads with the belief: **every MUN has a right to digital infrastructure, affordably.** Builds the story: why MUNs deserve better than Google Forms → what "digital infrastructure for diplomacy" means → specialization as strength (we do one thing, for one community, better than a generalist ever could). Ends on a CTA.
- **Get a Website (`/get-a-website`)** — The conversion page. A single, effortless, trustworthy form: **Name, Email, MUN Name, Phone Number**, and a **"Get a Website"** submit button. Inline validation, clear success state, reassuring microcopy (no spam, we reply within X, etc.). This is the money page — friction is the enemy.

## In scope
- Three fully responsive, accessible, fast pages with consistent nav + footer.
- Logo in nav and footer (`public/logo.png`).
- Auto-scrolling MUN logo marquee (placeholder logos, built as SVG/CSS).
- Get-a-Website form with client + server-side validation, loading / success / error states, submitted via a **Next.js Server Action**.
- Dark / light theme toggle (light default), persisted, respecting `prefers-color-scheme`.
- Brand-accurate design system (navy-dominant, teal-punctuated) built to `/impeccable` standards.
- Domain-relevant graphics (the allotment-engine concept, "infrastructure for diplomacy" motifs) built as SVG/CSS in both themes.

## Out of scope (for this build)
- Real backend persistence / CRM / email delivery of leads — the Server Action validates and returns success; wiring it to a real destination (email, DB, Slack) is a later `/backend` concern. Leave a single, clearly-marked integration point.
- The actual products (conference websites, registration portal, EB dashboard, live allotment engine) — this site *markets* them; it does not implement them.
- Authentication, delegate accounts, payments, admin dashboards.
- A blog, pricing page, case-study detail pages, multi-language i18n. (Copy should not paint us into a corner if these are added later.)

## Assumptions (please correct at review)
1. **Exactly three pages** as specified — no pricing, services detail, or contact page beyond the form. The Get-a-Website form doubles as the contact path.
2. **Form submission has no live backend yet.** The Server Action validates and returns a success result; persistence is stubbed behind one integration function. No email is actually sent in this build.
3. **Placeholder MUN logos** are acceptable — I'll generate tasteful fabricated MUN wordmark/crest SVGs (e.g. "HARVARD MUN", "GENEVA MUN"). No real third-party logos, to avoid trademark issues. Swappable later.
4. **Light theme is the default** (matches the dark-navy-on-light logo and the airy premium brief); dark theme ships via the toggle.
5. **No CMS** — copy lives in typed content files in the repo for easy editing.
6. **Tech stack** stays on what's scaffolded: Next.js 16 (App Router), React 19, TypeScript, Tailwind v4. No extra UI/animation libraries unless justified — motion via CSS + a tiny scroll-reveal utility.
7. **Fonts:** Sora (headings/display) + Inter (body), self-hosted via `next/font/google`. Correctable if you have a brand font.
8. **Contact/response promise copy** ("we reply within 48 hours") is placeholder wording — confirm the real SLA.
9. **Logo has no dark-theme variant supplied** — in dark theme the logo sits on a light-navy chip/surface so it stays legible without editing the asset.
