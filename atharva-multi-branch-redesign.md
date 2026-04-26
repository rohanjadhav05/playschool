# Multi-Branch Playschool Website — Redesign & Architecture

> **Document purpose:** Evolve the existing single-school Atharva Playschool website (already built through Phase 6 — see `PHASES.md`) into a multi-branch product supporting 3 branches today, scalable to N. This is a **delta document** — it builds on `atharva-playschool-design.md` and `atharva-playschool-requirements.md`, not a from-scratch redesign.
>
> **Author:** Frontend architecture review
> **Status:** Proposal (pre-implementation)
> **Related docs:** `atharva-playschool-design.md` (v1 design), `atharva-playschool-requirements.md` (PRD), `PHASES.md` (phased build plan), `homepage-wireframe.html` (v1 wireframe)

---

## Table of Contents

1. [Context: What Already Exists](#1-context-what-already-exists)
2. [What Actually Needs to Change](#2-what-actually-needs-to-change)
3. [The Core Decision: Multi-Branch Information Architecture](#3-the-core-decision-multi-branch-information-architecture)
4. [Site Architecture (v2)](#4-site-architecture-v2)
5. [Data Model Evolution](#5-data-model-evolution)
6. [Component-Level Breakdown](#6-component-level-breakdown)
7. [UI/UX Design Guidelines (Delta from v1)](#7-uiux-design-guidelines-delta-from-v1)
8. [Color Palette & Typography (Confirmed from v1)](#8-color-palette--typography-confirmed-from-v1)
9. [Mobile Responsiveness Strategy](#9-mobile-responsiveness-strategy)
10. [Wireframe-Style Layout Descriptions](#10-wireframe-style-layout-descriptions)
11. [Media Strategy & Performance](#11-media-strategy--performance)
12. [Animation, Iconography, CTA Placement](#12-animation-iconography-cta-placement)
13. [Implementation Notes (React + Vite)](#13-implementation-notes-react--vite)
14. [Migration Plan (v1 → v2)](#14-migration-plan-v1--v2)
15. [Trade-offs & Open Questions](#15-trade-offs--open-questions)

---

## 1. Context: What Already Exists

Before proposing a redesign, it is worth being explicit about what the existing system already does well — because most of it should be **kept**, not replaced.

The existing v1 system has:

- A **complete design system** (`atharva-playschool-requirements.md` §3): warm yellow / sky blue / leaf green / coral palette; Nunito + Poppins typography; defined spacing, radius, shadow, and motion tokens.
- A **mobile-first 6-page site** (Home, Activities, About, Programs, Contact, Gallery) built on React + Vite + Tailwind + Framer Motion.
- A **config-driven architecture**: `school.config.js` for scalars, `src/data/*.json` for arrays (activities, testimonials, programs, media). This is the *real* product — Atharva is the pilot of a Tier-2/3 Indian playschool template.
- A **bilingual EN/मराठी toggle** with `LanguageContext`, flat JSON locales, Devanagari font swap.
- **WhatsApp-first conversion**: sticky bottom bar (mobile), floating button (desktop), tel: + wa.me deep links, pre-filled messages.
- Reviewed and locked-in design decisions from CEO + Eng + Design + DX reviews (see `atharva-playschool-design.md` "Gstack Review Report").

**The existing system was built for a single-branch model.** The PRD's `school.config.js` assumes one school name, one phone number, one address, one Google Maps embed. Multi-branch is the meaningful architectural change.

---

## 2. What Actually Needs to Change

A redesign brief that says "make it modern, attractive, and mobile-first" against an already-modern, already-mobile-first site is mostly a request for **two real things**:

1. **Multi-branch support** — a structural change requiring new data model, new routing, new components, and new UX patterns for branch selection.
2. **Visual refresh opportunities** — places where the v1 design can become more distinctive without throwing away the design system.

Everything else asked for in the brief (color palette, typography, sections like Home/About/Activities/Contact, mobile-first, lazy loading, CDN) **already exists in v1**. This document does not re-derive those — it cites them and focuses on the genuine deltas.

**Scope of this redesign:**

| Change Category | Scope |
|---|---|
| Multi-branch data model | NEW — primary work |
| Branch selector UX | NEW — primary work |
| Branch detail pages | NEW — primary work |
| Routing changes | MODIFIED |
| Homepage hero (branch-aware CTA) | MODIFIED |
| Contact page (branch-scoped) | MODIFIED |
| Activities, About, Gallery | MOSTLY UNCHANGED — content is shared across branches |
| Design system (colors, typography, spacing) | UNCHANGED — keep v1 |
| Performance, lazy loading, CDN | UNCHANGED — already in v1 PRD §8 |

---

## 3. The Core Decision: Multi-Branch Information Architecture

This is the single most consequential decision in the redesign. Three viable patterns exist; each has different trade-offs.

### Pattern A — Branch as a Selector (Single-Site)

One website. A persistent branch dropdown in the navbar. Selecting a branch filters branch-specific content (address, phone, photos, maps) but core content (activities, philosophy, programs) is shared.

- **Pros:** Simplest data model. SEO-friendly (one domain). Cheapest to maintain. Branch-agnostic content (Activities, About) doesn't duplicate.
- **Cons:** Each branch has weaker individual SEO ("Atharva Playschool Karad" vs the homepage). Less of a sense that each branch is "real."
- **Best when:** Branches are operationally similar, share teachers/curriculum, and the brand is the asset.

### Pattern B — Branch as a Sub-route (Hub + Spokes)

One website with `/branches/karad`, `/branches/satara`, `/branches/kolhapur` as full sub-sites. Homepage is a "hub" that lists branches; each branch has its own scoped Home/Contact/Gallery. Activities and About remain shared at the top level.

- **Pros:** Each branch gets a dedicated, indexable URL. Local SEO ("playschool in Satara") works naturally. Still one codebase, one deploy.
- **Cons:** More routes (~10 instead of 6). Navigation becomes two-level. Slightly more complex state.
- **Best when:** Branches operate independently enough that parents in Satara genuinely want a Satara-specific page.

### Pattern C — Multi-Tenant (Per-Branch Subdomains)

Each branch is a separate deployment: `karad.atharvaplays.in`, `satara.atharvaplays.in`. Same codebase, different config per deploy.

- **Pros:** Maximum SEO independence. Each branch can have its own domain. Aligns with the existing "template" model.
- **Cons:** 3× the deploys, 3× the DNS, parents can't easily browse branches. Defeats the "see all our branches" benefit.
- **Best when:** Branches are franchises, not co-owned locations.

### Recommendation: **Pattern B (Hub + Spokes)**

Reasoning:

1. The existing design doc already established that the *real* product is a configurable template. Pattern B preserves that — `school.config.js` becomes `school.config.js` with a `branches[]` array, and the existing template logic still applies.
2. Three branches in adjacent Maharashtra cities (Karad, plus two more) likely share teachers, curriculum, and brand — these stay shared at the top level. Only branch-specific content (address, photos, contact) lives per-branch.
3. Local SEO matters in Tier-2 India ("playschool near me" is a real search). Sub-routes give each branch an indexable URL without the operational cost of separate deploys.
4. A parent comparing branches can do so in one site — important when word of mouth ("my cousin in Karad sends her kid there") is the primary acquisition channel established in the v1 design.

Pattern A is the fallback if the team wants to ship faster. Pattern C is rejected for this stage.

---

## 4. Site Architecture (v2)

```
/                              Hub homepage — all branches visible, branch selector prominent
/branches                      All branches list/map view
/branches/:branchSlug          Branch-specific home (hero, photos, contact, map)
/branches/:branchSlug/contact  Branch-specific contact form + map
/activities                    SHARED — same across all branches
/about                         SHARED — philosophy, founder story (brand-level)
/programs                      SHARED — playschool + tuition structure
/gallery                       SHARED, with optional ?branch=karad filter
/contact                       Top-level contact → triages to branch picker
*                              NotFoundPage (already in v1)
```

**Why some pages stay shared:**

- **Activities** are the curriculum — same at every branch. Duplicating creates confusion and content drift.
- **About** is the founder/teaching philosophy — brand-level, not branch-level.
- **Programs** describe the product (Playschool, Tuition) — operationally identical across branches.
- **Gallery** is one pool with a branch filter — parents enjoy seeing the brand's range.

**Why some pages branch-fork:**

- **Home** has branch-specific photos, teacher, and CTAs. The hub version pivots to "Find your branch."
- **Contact** must be branch-specific (different phone numbers, different addresses).
- **Branches** is the new index page.

### Routing diagram

```
Hub Home (/)
 ├── Branch Selector → /branches/:slug
 ├── Activities (shared)
 ├── About (shared)
 ├── Programs (shared)
 ├── Gallery (shared, filterable)
 └── Branches index (/branches)
       ├── /branches/karad
       │     └── /branches/karad/contact
       ├── /branches/satara
       │     └── /branches/satara/contact
       └── /branches/kolhapur
             └── /branches/kolhapur/contact
```

---

## 5. Data Model Evolution

The single biggest code change. The existing `school.config.js` shape (from `atharva-playschool-design.md`) was:

```js
// v1 (single branch — current)
export const SCHOOL = {
  name, tagline, phone, whatsapp,
  address: { line1, line2, city },
  teacher: { name, experience, photo },
  s3BaseUrl, maps: { embedUrl, shortUrl },
  social, domain,
  /* ... */
};
```

### Proposed v2 shape

Brand-level fields stay top-level. Branch-specific fields move into a `branches[]` array. Each branch gets a `slug` (used for routing and config keys).

```js
// school.config.js — v2
export const SCHOOL = {
  // Brand-level (shared across branches)
  brand: {
    name: "Atharva Playschool",
    tagline: "Where Little Stars Begin to Shine",
    yearFounded: "YYYY",
    s3BaseUrl: "https://your-bucket.s3.ap-south-1.amazonaws.com",
    domain: "atharvaplays.in",
    social: { facebook, instagram, youtube },
  },

  // Founder/lead teacher — brand-level (most playschools have one founder, multiple branch teachers)
  founder: {
    name: "...",
    title: "Founder & Lead Educator",
    experience: "X years",
    photo: "founder-photo.webp",   // resolved against s3BaseUrl
  },

  // Branch list — order = display order on hub
  branches: [
    {
      slug: "karad",                          // URL: /branches/karad
      name: "Karad — Karve Branch",           // display name
      shortName: "Karad",                     // for selectors/breadcrumbs
      isPrimary: true,                        // 1 branch may be marked primary (default selected)
      address: {
        line1: "...",
        line2: "Karve, Karad",
        city: "Karad",
        state: "Maharashtra",
        pin: "415110",
      },
      phone: "919876543210",                  // digits-only — same rule as v1
      whatsapp: "919876543210",
      email: "karad@atharvaplays.in",         // optional
      timing: {
        playschool: "10:00 AM – 1:00 PM",
        tuition: "4:00 PM – 7:00 PM",
      },
      batchSize: { playschool: 15, tuition: 10 },
      branchTeacher: { name, experience, photo },   // optional — branch-specific lead
      photos: [                               // branch-specific hero/gallery photos
        "branches/karad/hero.webp",
        "branches/karad/classroom-1.webp",
        "branches/karad/outdoor.webp",
      ],
      maps: {
        embedUrl: "...",
        shortUrl: "...",
        lat: 17.2853, lng: 74.1842,           // for the all-branches map view
      },
      admissionStatus: "open",                // open | waitlist | closed
    },
    { slug: "satara",   /* ... */ },
    { slug: "kolhapur", /* ... */ },
  ],
};
```

### Validation contract (extension of v1's `validateConfig`)

The existing `validateConfig(SCHOOL)` from the DX review must be extended:

- `SCHOOL.brand.name`, `brand.s3BaseUrl` — required
- `SCHOOL.branches` — must be a non-empty array
- For each branch: `slug`, `name`, `address`, `phone`, `whatsapp`, `maps.embedUrl` — required
- `slug` must be URL-safe (`/^[a-z0-9-]+$/`) and unique across branches
- Exactly zero or one branch may have `isPrimary: true`
- Phone/WhatsApp must match the digits-only format (`/^\d{10,15}$/`)

Errors should follow the v1 format: `field name + description + example`.

### Why splitting brand vs. branches matters for the template

The v1 design doc was emphatic: "If deploying school #2 takes more than 30 minutes, the template model breaks." Multi-branch makes this more, not less, important — because school #2 may itself have multiple branches. By cleanly separating `brand` from `branches[]`, a new school template fork only needs to:

1. Update `brand` (name, domain, S3 base, social).
2. Replace the `branches[]` array with their own list.
3. Replace `src/data/*.json` (placeholder content from DX review still applies).

This preserves the < 30-min TTHW claim from the v1 DX review.

---

## 6. Component-Level Breakdown

New, modified, and unchanged components. Names follow v1 convention (`src/components/<area>/<Component>.jsx`).

### New components

| Component | Location | Responsibility |
|---|---|---|
| `BranchSelector` | `common/` | Dropdown + active-branch indicator in navbar. Persists selection in `localStorage` as `selectedBranchSlug`. |
| `BranchCard` | `branches/` | Card for `/branches` index: photo, name, address, contact CTAs, "View this branch →". |
| `BranchHeroSection` | `branches/` | Branch-specific hero on `/branches/:slug`. Branch photos, address, branch teacher (if present), branch-specific CTAs. |
| `BranchesMap` | `branches/` | Single map showing all branch markers (uses `lat`/`lng` per branch). Click marker → branch route. |
| `BranchInfoBlock` | `branches/` | Branch contact card: phone, WhatsApp, address, timing, embedded map. Used on `/branches/:slug` and `/branches/:slug/contact`. |
| `BranchSwitchPrompt` | `common/` | Inline prompt on hub home: "Find your nearest branch" with 3 large cards. |

### Modified components

| Component | Change |
|---|---|
| `Navbar` | Adds `BranchSelector` to the right cluster (between language toggle and Call CTA on desktop; inside hamburger drawer on mobile). |
| `HeroSection` (Home) | Hub variant: less branch-specific, leads with "Find your branch" CTA. Removes single-school address. |
| `StickyBottomBar` | Call/WhatsApp buttons now resolve from the **selected branch**, not from a single global config. If no branch is selected, opens a branch-picker modal first. |
| `WhatsAppButton` (desktop) | Same change — resolves from selected branch. |
| `Footer` | Lists all branches with phone numbers (footer becomes a branch directory). |
| `ContactPage` (top-level `/contact`) | Becomes a branch-triage page: "Which branch are you contacting?" → branch contact pages. |
| `ProgramsCTABanner` | "Admissions Open" copy adds branch indicator: "Admissions Open at all 3 branches" or branch-scoped if selector is active. |

### Unchanged components

These v1 components are kept as-is (they are brand-level, not branch-level):

- `ActivityCard`, `ActivitySection` (Activities page) — curriculum is shared
- `TeacherProfile` (About page — for the founder; branch teachers use a smaller variant in `BranchHeroSection`)
- `PhilosophySection`, `TestimonialsSnippet`
- `LanguageContext` and the toggle
- `SectionHeader`, `CTAButton` design-system primitives
- `SchoolImage` (from the v1 design review — broken-image fallback wrapper)

### `BranchSelector` — UX recommendation

The brief asked for a comparison: dropdown vs. cards vs. tabs. Recommendation by context:

| Context | Pattern | Reason |
|---|---|---|
| Navbar (always visible) | **Compact dropdown with current branch label** | Tabs don't scale beyond 3–4 branches; cards take too much navbar space. |
| Hub homepage hero | **Three large cards** with photo + city + admission status | High-intent moment — parent is choosing where to send their child, photos help. |
| `/branches` index | **Cards in a 1-col (mobile) / 3-col (desktop) grid** | Discovery context, photos help. |
| Within branch page | **Sticky "Switch branch ▾" pill below navbar** | Lets a parent compare without navigating back up. |

The dropdown is the spine; cards are used at decision points; tabs are avoided (they don't scale and they fail on mobile when text wraps).

---

## 7. UI/UX Design Guidelines (Delta from v1)

The v1 design system stays. These are *additions* for multi-branch.

### 7.1 Branch identity, without per-branch theming

Each branch should feel like a distinct location, but the brand should not fragment. Practical rules:

- **Same color palette across all branches** — the v1 yellow/blue/coral system. Do not give each branch its own accent color; that fragments the brand for no benefit and creates a visual maintenance problem.
- **Branch differentiation comes from photography**, not theme. Each branch supplies its own hero image, classroom photos, and outdoor photos.
- **One small branch chip** (text label like "Karad Branch") on hero sections of branch pages. No flag-style branch badges, no per-branch logos.

### 7.2 Empty / partial branch states

Real-world: not every branch will have all photos on day 1. The design must degrade gracefully:

- If a branch has no hero photo: fall back to a brand-level hero illustration (warm yellow gradient with the brand mark). Do not show a broken image or grey placeholder.
- If a branch has no `branchTeacher`: do not show that section at all (do not show "Teacher: TBD").
- If a branch has fewer than 3 photos: show what exists, do not pad with stock.

This is a spec extension of the v1 design review's "Empty state" decision — same principle, applied per-branch.

### 7.3 Trust hierarchy (v1 principle, restated)

The v1 design doc established that "trust before features" — teacher and cultural values appear above the fold. For multi-branch, the trust hierarchy gets one new rung at the top:

1. **Brand trust** (founder, years operating, philosophy) — shared, on the hub home.
2. **Branch trust** (this specific location's teacher, this branch's photos, parents whose kids attend *this* branch) — on branch pages.
3. **Activity proof** (festivals, art, stage events) — shared.
4. **Social proof** (testimonials, optionally per-branch) — both shared and branch-specific where available.

A parent in Satara wants to know two things: (1) is the brand real, (2) is *the Satara location* good. The hub answers (1), branch pages answer (2).

### 7.4 Avoid: anti-patterns specific to multi-branch sites

Patterns that look reasonable but fail in this context:

- **A "compare branches" table.** A parent picks the closest branch, not the best-by-metric branch. The v1 design review already removed comparison tables for the same reason.
- **Per-branch testimonial walls.** Most branches won't have enough testimonials. Use a shared testimonial pool with optional `branch` tags.
- **A "Choose your branch" modal on first visit.** Friction. Detect via IP city if possible, otherwise default to `isPrimary: true` branch and let the parent switch.
- **Different navbars per branch.** The navbar must be brand-level. Branch context lives in the selector and breadcrumbs.

---

## 8. Color Palette & Typography (Confirmed from v1)

Re-confirming the v1 system here for completeness — these are not changing.

### Color palette

| Token | Hex | Use |
|---|---|---|
| `--color-primary` | `#FFD600` | Sunshine yellow — hero gradients, decorative |
| `--color-primary-dark` | `#F5C200` | Hover states |
| `--color-primary-light` | `#FFF3B0` | Image loading placeholders |
| `--color-secondary` | `#2196F3` | Sky blue — outline buttons, links |
| `--color-accent` | `#4CAF50` | Leaf green — activity highlights |
| `--color-cta` | `#FF6B35` | Coral — primary CTA (Call Now) |
| `--color-bg` | `#FFFDF5` | Warm white background |
| `--color-text-primary` | `#1A1A1A` | Body text |
| `--color-text-muted` | `#6B6B6B` | Muted (per v1 design review — corrected from #888 for WCAG AA) |

Why this palette works for parents and kids: warm yellow signals safety and joy without being childish; coral as the CTA is high-contrast against yellow without clashing; leaf green for accent ties into the cultural/values theme; warm white background is softer than pure white on Android LCD screens prevalent in the target market.

### Typography

- **Display / hero / section headings:** Nunito (weights 800, 900) — rounded, friendly, reads well in Devanagari pairing.
- **Body / CTAs / forms:** Poppins (weights 400, 500, 600).
- **Marathi:** Noto Sans Devanagari, swapped via `<html lang="mr">` attribute (per v1 design).
- **Accent / labels:** Poppins, uppercase, letter-spacing.

The Nunito + Poppins pairing is from v1 and should be kept. It is intentionally not the AI-default Inter/Geist, it pairs well with Devanagari, and it has shipped — replacing it now would be churn for no gain.

### Spacing, radius, shadow

All from v1 PRD §3 — unchanged. Cards `rounded-2xl`, buttons `rounded-full`, section padding `py-12` mobile / `py-20` desktop.

---

## 9. Mobile Responsiveness Strategy

The v1 site is already mobile-first. The multi-branch additions must not regress this.

### Breakpoint strategy (unchanged from v1)

| Breakpoint | Min width | Use |
|---|---|---|
| (default) | 0 | Mobile — primary target |
| `md` | 768px | Tablet — 2-column grids |
| `lg` | 1024px | Desktop — full layouts |

### Mobile-specific multi-branch decisions

1. **Branch selector on mobile** lives inside the hamburger drawer **and** as the second item in the sticky bottom bar context. It is *not* in the visible top navbar on mobile — that space is reserved for logo + language toggle + Call CTA, which are higher-frequency.
2. **Branch cards on mobile** stack to 1 column with full-width photos. Photos should be 16:9 to keep the page from becoming a long photo strip.
3. **Sticky bottom bar's Call/WhatsApp** auto-resolves to the selected branch's number. If no branch is selected, tapping opens a small bottom sheet with 3 branch options. This is the only "branch picker modal" allowed.
4. **The `/branches` index map view is desktop-only.** On mobile, the map collapses into a "View on Google Maps" button per branch card — embedded maps on mobile are slow, hard to interact with, and steal scroll. This is a deliberate trade-off.
5. **Safe-area insets** continue to apply per v1 design review: `<main>` gets `padding-bottom: calc(60px + env(safe-area-inset-bottom))` on mobile to account for the sticky bar plus Android gesture nav. (This was a pitfall called out in the design review learnings.)

### Touch targets

Minimum 48×48px on all branch selectors, branch card CTAs, and switch-branch pills. Continues v1's standard.

---

## 10. Wireframe-Style Layout Descriptions

Text wireframes for the screens that are new or meaningfully changed. The visual style follows the v1 wireframe aesthetic in `homepage-wireframe.html`.

### 10.1 Hub Homepage (`/`) — Mobile

```
┌──────────────────────────────────────┐
│ NAVBAR                               │
│ 🌟 Atharva   मराठी  📞 Call ▾Branch │
├──────────────────────────────────────┤
│ HERO  (warm yellow gradient)         │
│                                      │
│ Where Little Stars                   │
│ Begin to Shine ✨                    │
│                                      │
│ Activity-based learning rooted in    │
│ Indian values. 3 branches across     │
│ Maharashtra.                         │
│                                      │
│ [🏆 Experienced]  [🎨 Activities]    │
│ [🙏 Indian Values]                   │
│                                      │
│ [📞 Call Nearest]  [💬 WhatsApp]     │
│                                      │
│ [ HERO PHOTO — children, classroom ] │
├──────────────────────────────────────┤
│ FIND YOUR BRANCH (Section)           │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ [BRANCH PHOTO — Karad]         │  │
│ │ Karad — Karve Branch           │  │
│ │ 📍 Karve, Karad                │  │
│ │ Admissions Open                │  │
│ │ [ View Branch → ]              │  │
│ └────────────────────────────────┘  │
│ ┌────────────────────────────────┐  │
│ │ [BRANCH PHOTO — Satara]        │  │
│ │ Satara Branch  ...             │  │
│ └────────────────────────────────┘  │
│ ┌────────────────────────────────┐  │
│ │ [BRANCH PHOTO — Kolhapur]      │  │
│ │ Kolhapur Branch  ...           │  │
│ └────────────────────────────────┘  │
├──────────────────────────────────────┤
│ ACTIVITY PREVIEW (shared, unchanged) │
├──────────────────────────────────────┤
│ TESTIMONIALS (shared)                │
├──────────────────────────────────────┤
│ ADMISSIONS BANNER                    │
│ "Admissions Open at all 3 branches"  │
├──────────────────────────────────────┤
│ FOOTER                               │
│ Atharva Playschool                   │
│ Karad — 📞 [phone]                   │
│ Satara — 📞 [phone]                  │
│ Kolhapur — 📞 [phone]                │
├──────────────────────────────────────┤
│ STICKY: 📞 Call (selected)  💬 WA    │
└──────────────────────────────────────┘
```

Key changes from v1 hub: hero pivots from "single school CTA" to "find your branch" framing; new "Find Your Branch" section replaces the v1 single Trust Highlights position (Trust Highlights moves below activity preview to keep proof-first ordering from v1 design review).

### 10.2 Branches Index (`/branches`) — Desktop

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR (with active state on "Branches")                     │
├──────────────────────────────────────────────────────────────┤
│  Our Branches                                                │
│  Three locations, same warmth                                │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ [PHOTO]     │  │ [PHOTO]     │  │ [PHOTO]     │          │
│  │ Karad       │  │ Satara      │  │ Kolhapur    │          │
│  │ Karve       │  │ ...         │  │ ...         │          │
│  │ 📞 [phone]  │  │ 📞 [phone]  │  │ 📞 [phone]  │          │
│  │ ⭐ Open     │  │ ⭐ Open     │  │ Waitlist    │          │
│  │ [View →]    │  │ [View →]    │  │ [View →]    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  MAP (all 3 markers)                                   │ │
│  │                                                        │ │
│  │     📍Karad       📍Satara                             │ │
│  │              📍Kolhapur                                │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

On mobile: cards stack 1-column. Map is replaced by per-card "View on Maps" external link.

### 10.3 Branch Page (`/branches/karad`) — Mobile

```
┌──────────────────────────────────────┐
│ NAVBAR (Branch: Karad ▾)             │
├──────────────────────────────────────┤
│ Sticky:  ◀ All branches | Karad ▾    │
├──────────────────────────────────────┤
│ BRANCH HERO                          │
│ Karad — Karve Branch                 │
│ 📍 Karve, Karad, Maharashtra         │
│                                      │
│ [PHOTO — this branch's hero]         │
│                                      │
│ [📞 Call This Branch]  [💬 WhatsApp] │
│ [🗓 Book a Visit Here]               │
├──────────────────────────────────────┤
│ BRANCH TEACHER (if present)          │
│ [photo] Mrs. ___ — 12 years exp.     │
├──────────────────────────────────────┤
│ BRANCH PHOTOS (3-up scroll)          │
├──────────────────────────────────────┤
│ TIMING & CONTACT                     │
│ Playschool: 10 AM – 1 PM             │
│ Tuition:    4 PM – 7 PM              │
│ 📞 [phone]   💬 [whatsapp]           │
├──────────────────────────────────────┤
│ MAP (Google Maps embed)              │
├──────────────────────────────────────┤
│ "Same activities, same values"       │
│ → Link to /activities (shared)       │
├──────────────────────────────────────┤
│ FOOTER · STICKY                      │
└──────────────────────────────────────┘
```

The branch page is intentionally focused on *this branch's specifics* — it does not duplicate Activities or About content. It links to those shared pages.

### 10.4 Branch selector dropdown (open state)

```
┌─────────────────────┐
│ ▾ Karad             │
├─────────────────────┤
│ ✓ Karad             │   ← currently selected
│   Satara            │
│   Kolhapur          │
├─────────────────────┤
│ See all branches →  │   ← link to /branches
└─────────────────────┘
```

Positioned: right of language toggle, left of Call CTA on desktop. Inside hamburger on mobile.

---

## 11. Media Strategy & Performance

The v1 PRD §7 and §8 already specify image optimization (WebP, srcset, lazy loading), video optimization (lazy `<source>` via `IntersectionObserver`), and Lighthouse mobile target ≥ 85. These continue to apply. **What changes for multi-branch:**

### Per-branch S3 paths

Branch-specific media is namespaced under the branch slug. Continuing the existing `s3BaseUrl` + relative-path pattern from `src/data/media.json`:

```
{s3BaseUrl}/branches/karad/hero.webp
{s3BaseUrl}/branches/karad/classroom-1.webp
{s3BaseUrl}/branches/satara/hero.webp
...
{s3BaseUrl}/shared/activities/art-craft-1.webp     ← shared, unchanged
```

Branch-specific photos are referenced by relative path in the `branches[].photos` array. The `<SchoolImage>` wrapper (from v1 design review) resolves them against `s3BaseUrl`.

### Hero preload — per-route

The v1 PRD specified `<link rel="preload">` for the homepage hero. With multi-branch, the preloaded hero must be route-aware:

- `/` preloads the hub hero (brand-level).
- `/branches/:slug` preloads that branch's hero.

Since the site is statically built, this can be solved with React Helmet or — simpler — per-page `<link>` injection at route mount. For Vite static builds, the safe path is to set the preload tag on mount with `useEffect` and remove it on unmount. Don't preload all branch heroes in `index.html`; that wastes bandwidth on 3G.

### Lazy-loading branch thumbnails on the index

The `/branches` index has 3 cards today, scalable to N. All except the first should be `loading="lazy"` with `decoding="async"`. The first card uses `loading="eager"` so it appears immediately. This is a small detail that matters when the index grows to 10+ branches.

### CDN

The v1 design called for CloudFront (or Netlify CDN) in front of S3 for ap-south-1 → Maharashtra 4G performance. This is the same for multi-branch, and now matters more because branch hero images are the hot path on branch pages. **Recommendation:** if not already done in v1, configure CloudFront with `Cache-Control: public, max-age=31536000` for `/branches/*` and `/shared/*`. Branches photos rarely change; long cache is safe.

### Bandwidth-conscious alternatives to heavy assets

For the target market (Tier-2 Maharashtra, Android, often 4G), heavy assets are costly:

- **Replace branch hero videos with a hero image + short autoplay-muted clip ≤ 3MB**, lazy-loaded after first paint. The v1 design already lazy-loads videos; this is the same rule, just emphasized for branch pages.
- **Map embeds are heavy** (Google Maps iframe is ~500KB). On mobile, prefer a static map image (Google Static Maps API) with a tap-to-open-Maps overlay. The interactive iframe loads only on desktop.
- **Animation budget:** the v1 limit (Framer Motion only on mount, `useReducedMotion` respected) carries forward. Do not add scroll-driven animations to branch cards.

---

## 12. Animation, Iconography, CTA Placement

### Animations (subtle, per the brief)

The v1 motion vocabulary (Framer Motion `fadeInUp` with stagger) carries forward. Multi-branch adds two new moments worth animating:

1. **Branch card entrance on hub home** — staggered fade-in (0.1s per card). One-time on mount, not on scroll.
2. **Branch selector dropdown** — 150ms slide-down with subtle scale (0.98 → 1). No bounce.

Avoid: parallax, scroll-jacking, animated map zooms, transitioning between branches with full-page wipes. These trigger reduced-motion users and are slow on Android. The v1 design review's `useReducedMotion()` enforcement applies to all of the above.

### Iconography style (v1 rule — restated)

The v1 design review locked in a clear icon vocabulary that should be honored exactly:

- **Emoji** for decorative content contexts — branch admission status indicators (⭐ Open, ⏳ Waitlist), section emojis.
- **Lucide React** for interactive UI — map pin, phone, message-circle, chevron-down on the selector.
- **No custom illustrations for v1.**

For branch cards, use Lucide `MapPin` for addresses and `Phone` for call buttons; keep emoji for the warmth ("⭐ Admissions Open"). This avoids the AI-template look the v1 design review explicitly called out as a risk.

### CTA placement for conversion

The v1 conversion priority is unchanged: Call Now > WhatsApp > Book a Visit > Form. Multi-branch adds one nuance: **CTAs must be branch-aware before they fire**.

| Surface | CTA behavior |
|---|---|
| Hub home hero | "Call Nearest" with a small branch chooser. Default branch = `isPrimary` or geo-detected. |
| Branch page hero | "Call This Branch" — unambiguous, single phone number resolved. |
| Sticky bottom bar (mobile) | If branch selected: dial selected branch. If not: open small bottom sheet with 3 branch options. |
| Floating WhatsApp (desktop) | Same logic as sticky bar. |
| `/branches` index card | Per-card Call/WhatsApp inline. No global CTA on this page. |
| `/contact` (top-level) | Branch-triage page. No form on this page; direct to `/branches/:slug/contact`. |

The principle: a parent should never tap a Call button and reach the wrong branch, and never have to think about which branch they're calling.

---

## 13. Implementation Notes (React + Vite)

The existing stack stays: React 18, Vite, Tailwind, React Router v6, Framer Motion, `yet-another-react-lightbox`, `vite-imagetools`. No stack changes.

### File structure additions

```
src/
  contexts/
    BranchContext.jsx          ← NEW: { selectedBranch, setBranch, branches }
  components/
    common/
      BranchSelector.jsx       ← NEW
      BranchSwitchPrompt.jsx   ← NEW
    branches/
      BranchCard.jsx           ← NEW
      BranchHeroSection.jsx    ← NEW
      BranchInfoBlock.jsx      ← NEW
      BranchesMap.jsx          ← NEW (desktop only — gated on viewport)
  pages/
    BranchesIndexPage.jsx      ← NEW: /branches
    BranchPage.jsx             ← NEW: /branches/:slug
    BranchContactPage.jsx      ← NEW: /branches/:slug/contact
  hooks/
    useBranch.js               ← NEW: convenience hook over BranchContext
    useBranchFromRoute.js      ← NEW: resolves :slug param → branch object, throws on miss
  utils/
    branches.js                ← NEW: getPrimaryBranch, getBranchBySlug, validateBranches
```

### `BranchContext` — sketch

```jsx
// BranchContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { SCHOOL } from "../../school.config";

const BranchContext = createContext(null);
const STORAGE_KEY = "atharva.selectedBranchSlug";

export function BranchProvider({ children }) {
  const [selectedSlug, setSelectedSlug] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SCHOOL.branches.find(b => b.slug === stored)) return stored;
    return SCHOOL.branches.find(b => b.isPrimary)?.slug ?? SCHOOL.branches[0].slug;
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, selectedSlug); }, [selectedSlug]);

  const selectedBranch = SCHOOL.branches.find(b => b.slug === selectedSlug);

  return (
    <BranchContext.Provider value={{ selectedBranch, setBranch: setSelectedSlug, branches: SCHOOL.branches }}>
      {children}
    </BranchContext.Provider>
  );
}

export const useBranch = () => useContext(BranchContext);
```

### Routing change

```jsx
<Route path="/" element={<HubHomePage />} />
<Route path="/activities" element={<ActivitiesPage />} />
<Route path="/about" element={<AboutPage />} />
<Route path="/programs" element={<ProgramsPage />} />
<Route path="/gallery" element={<GalleryPage />} />
<Route path="/branches" element={<BranchesIndexPage />} />
<Route path="/branches/:slug" element={<BranchPage />} />
<Route path="/branches/:slug/contact" element={<BranchContactPage />} />
<Route path="/contact" element={<ContactTriagePage />} />
<Route path="*" element={<NotFoundPage />} />
```

All branch routes are `React.lazy()`-loaded per the v1 code-splitting rule.

### `validateConfig` extension

```js
// In main.jsx, before render
function validateConfig(s) {
  if (!s.brand?.name) throw new Error("school.config.js: missing brand.name");
  if (!s.brand?.s3BaseUrl) throw new Error("school.config.js: missing brand.s3BaseUrl");
  if (!Array.isArray(s.branches) || s.branches.length === 0) {
    throw new Error("school.config.js: branches[] must be a non-empty array");
  }
  const slugs = new Set();
  for (const b of s.branches) {
    if (!b.slug || !/^[a-z0-9-]+$/.test(b.slug)) {
      throw new Error(`Branch slug invalid: '${b.slug}' (must match /^[a-z0-9-]+$/, e.g. 'karad')`);
    }
    if (slugs.has(b.slug)) throw new Error(`Duplicate branch slug: ${b.slug}`);
    slugs.add(b.slug);
    if (!b.phone || !/^\d{10,15}$/.test(b.phone)) {
      throw new Error(`Branch ${b.slug}: phone must be digits only, e.g. '919876543210'`);
    }
    if (!b.maps?.embedUrl) throw new Error(`Branch ${b.slug}: missing maps.embedUrl`);
  }
  const primaries = s.branches.filter(b => b.isPrimary);
  if (primaries.length > 1) throw new Error("At most one branch may have isPrimary: true");
}
```

This follows the v1 DX review's error format: field name + description + example.

### Tests (v2 candidates, per the v1 eng review's deferral)

The v1 plan deferred unit tests. Multi-branch is a good time to introduce a minimal Vitest suite for the parts where bugs would silently corrupt routing or CTAs:

- `validateConfig` with malformed branches array → expected errors.
- `getBranchBySlug('karad')` returns the right branch, unknown slug returns `null`.
- `BranchContext` initializes from `localStorage` if valid, falls back to `isPrimary` if invalid, falls back to `branches[0]` if none primary.
- WhatsApp URL builder with branch phone: `wa.me/${branch.whatsapp}?text=...` — same regex as v1.

These are the high-ROI candidates flagged in `rohan-unknown-eng-review-test-plan-20260424-145610.md` style.

---

## 14. Migration Plan (v1 → v2)

The v1 site is in `Phase 6 Complete` per `PHASES.md`. The migration to multi-branch is a focused phase, not a rewrite.

### Phase 7 — Multi-branch foundation (estimated 3–4 days)

**Day 1: Data model + validation**

- Refactor `school.config.js` to brand + branches[] shape.
- Extend `validateConfig` with branch validation.
- Add placeholder data for 3 fake branches (e.g., "Sunflower Karad / Sunflower Pune / Sunflower Nashik") — continues the v1 DX review's "ship placeholder data, not real data" rule.
- Add `BranchContext`, `useBranch`, `useBranchFromRoute`.

**Day 2: Routes + branch components**

- Add `BranchesIndexPage`, `BranchPage`, `BranchContactPage`, `ContactTriagePage`.
- Build `BranchCard`, `BranchHeroSection`, `BranchInfoBlock`.
- Wire `BranchesMap` (desktop only).

**Day 3: Existing component updates**

- Update `Navbar` to include `BranchSelector`.
- Update `StickyBottomBar` and floating WhatsApp to resolve from selected branch.
- Update `Footer` to list all branches.
- Pivot `HomePage` to hub variant: new "Find Your Branch" section, hero copy update.

**Day 4: Polish, tests, docs**

- Add the high-ROI Vitest tests above.
- Update `README.md` to document the `branches[]` config shape.
- Update placeholder content in `src/data/`.
- Lighthouse pass on `/branches` and `/branches/:slug` (target ≥ 85, same as v1).
- Replace v1 wireframe with hub + branch wireframes.

### Backward compatibility

Forks of v1 use the single-school `school.config.js` shape. Provide a clear migration path in `README.md`:

```
v1 → v2 migration:
1. Wrap your top-level fields under `brand: { ... }` (name, tagline, s3BaseUrl, social, domain).
2. Move per-school location fields (address, phone, whatsapp, maps, timing, batchSize) into a single-element `branches: [{ ... }]` array.
3. Add `slug: 'main'` and `isPrimary: true` to that branch.
4. Add the new required fields per branch (lat, lng for the branches map).
```

A single-branch deployment in v2 is just `branches: [{ ... }]` with one entry. The hub home, when it has only one branch, can render the v1-style single-school home (hide the "Find Your Branch" section, show the single branch's hero). This keeps the template usable for school owners who only have one location.

---

## 15. Trade-offs & Open Questions

Honest call-outs of where this design has tension or open decisions.

### Trade-offs accepted

1. **Branch detail pages duplicate some patterns.** The branch hero, branch map, and branch contact form repeat structure across 3 pages. Acceptable: variation is the point; templating these would create awkward conditionals.
2. **Sticky bar branch resolution adds one tap if branch isn't selected.** A bottom-sheet picker is better than dialing the wrong branch. The cost of the friction is bounded (one tap, one time per session, persisted in `localStorage`).
3. **The `/contact` top-level page becomes a triage page, not a form.** Some parents will look for `/contact` expecting a form. The redirect-to-branch-contact pattern is cleaner than a generic form that doesn't know which branch to send to.
4. **Activities, About, and Programs stay shared even though some content might vary by branch** (e.g., a branch may not offer all activities). Mitigation: an optional `branches[].activitiesOffered: ['art', 'dance']` array can hide activity sections per branch in v2.1 if needed.

### Open questions for the school owner

1. **Branch identity:** Are the 3 branches operationally identical (same curriculum, same brand, same fees) or are they franchises with autonomy? The hub-and-spokes model assumes the former. If they're franchises, Pattern C (subdomains) becomes more attractive.
2. **Geo-detection on hub home:** Should the hub home auto-select the nearest branch by IP, or always default to `isPrimary`? Auto-detection improves UX for distant parents but adds dependency (an IP-to-city service or HTML5 geolocation prompt). Recommendation: skip in v2, revisit if usage data shows parents frequently switching branches on first visit.
3. **Per-branch admissions status:** The `admissionStatus: 'open' | 'waitlist' | 'closed'` field is in the proposed config. Is this real (does the school actively manage this) or aspirational? If aspirational, ship it as `'open'` everywhere and don't display the badge until usage is real.
4. **Per-branch pricing:** v1 explicitly ships `fees: "Contact us for current fee structure"` — no numbers. For multi-branch, do branches have different fees? If yes, this is a per-branch field. If no, it stays brand-level.
5. **Per-branch testimonials:** Should testimonials be tagged with branch? Recommend: optional `branch: 'karad'` field on testimonial entries; default unfiltered (brand-level). Show branch tag only on branch-specific pages.
6. **Branch teachers:** v1 has a single founder/lead teacher. Is the branch teacher concept real? If most branches share the founder as the figurehead, hide branch-teacher sections by default and only show them where `branchTeacher` is populated (already in the spec).

### Things explicitly out of scope for v2

- Per-branch theming or color variants.
- A "compare branches" page or table.
- Per-branch admissions form / payment integration.
- Per-branch language preference (the EN/मराठी toggle remains site-global).
- Branch-level analytics dashboards. (Plausible can tag `data-branch={slug}` on CTAs for basic per-branch click tracking; that's enough for v2.)
- A CMS or admin UI for non-technical branch managers to update their own page. The v1 DX review accepted this limitation; v2 inherits it.

---

## Summary

This redesign is deliberately **conservative on aesthetics and aggressive on architecture**. The v1 design system (colors, typography, motion, mobile-first, WhatsApp-first conversion) is good and battle-tested through 4 reviews — replacing it would be churn. The real product change is multi-branch, and the real product risk is fragmenting the brand or making CTAs branch-ambiguous.

The recommended path:

- **Pattern B** (hub + spokes) for information architecture.
- **`branches[]` array** in `school.config.js`, with brand-level fields preserved at the top.
- **Shared pages** for Activities, About, Programs, Gallery; **branch-forked pages** for Home, Contact, and the new Branch pages.
- **Branch selector** as a navbar dropdown (desktop) + drawer item (mobile), with cards at decision points.
- **Branch-aware CTAs** everywhere — never let a parent tap Call without knowing which branch they'll reach.
- **No design-system regression** — v1's palette, typography, and motion stay as-is.

Estimated build: **3–4 days** of focused work (Phase 7), assuming the v1 site is in the state described in `PHASES.md`.
