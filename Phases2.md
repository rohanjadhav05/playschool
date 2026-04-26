# Development Phases v2 — Multi-Branch Migration

Based on `atharva-multi-branch-redesign.md` (Pattern B: Hub + Spokes).
Builds on the v1 implementation tracked in `PHASES.md` (Phases 1–6 ✅ complete).

> Goal: evolve the existing single-school site into a 3-branch hub + spokes product without regressing the v1 design system, mobile-first behavior, or WhatsApp-first conversion.
>
> Scope: data model, routing, branch components, branch-aware CTAs. Out of scope: per-branch theming, compare-branches table, CMS, payments, geo-detection.

---

## Phase 7 — Data Model + Branch Context
**Estimate:** 1 day
**Status:** ⬜ Not started
**Depends on:** Phase 6 (v1 complete)

### What to build

**`school.config.js` — refactor to v2 shape**
- Wrap brand-level fields under `brand: { name, tagline, yearFounded, s3BaseUrl, domain, social }`.
- Move founder/lead teacher under top-level `founder: { name, title, experience, photo, bio, quote }` (founder is brand-level, not branch-level).
- Replace per-school location fields with `branches: [...]` array. Each branch:
  - `slug` (URL-safe, unique), `name`, `shortName`
  - `isPrimary` (zero or one branch)
  - `address: { line1, line2, city, state, pin }`
  - `phone`, `whatsapp` (digits-only), optional `email`
  - `timing: { playschool, tuition }`, `batchSize: { playschool, tuition }`
  - `branchTeacher` (optional — per-branch lead, separate from founder)
  - `photos[]` — relative paths under `{s3BaseUrl}/branches/{slug}/...`
  - `maps: { embedUrl, shortUrl, lat, lng }`
  - `admissionStatus: 'open' | 'waitlist' | 'closed'`
- Seed 3 placeholder branches using fake names (per v1 DX rule — no real data leaks to forks).

**Validation — extend `validateConfig`**
- `brand.name`, `brand.s3BaseUrl` required.
- `branches` must be non-empty array.
- Per branch: `slug` matches `/^[a-z0-9-]+$/` and is unique; `phone`/`whatsapp` match `/^\d{10,15}$/`; `maps.embedUrl` required.
- At most one `isPrimary: true`.
- Errors follow v1 format: field + description + example. Run in `src/main.jsx` before render.

**`BranchContext`**
- New file `src/context/BranchContext.jsx` exposing `{ selectedBranch, setBranch, branches }`.
- Initial selection: `localStorage['atharva.selectedBranchSlug']` if valid → `isPrimary` branch → `branches[0]`.
- Persist on change.
- Wrap `<App />` in `<BranchProvider>` inside `src/main.jsx` (sibling to `LanguageProvider`).

**Helpers**
- `src/hooks/useBranch.js` — convenience hook over `BranchContext`.
- `src/hooks/useBranchFromRoute.js` — resolves `:slug` param → branch object; returns `null` for unknown slug (caller redirects to `/branches`).
- `src/utils/branches.js` — `getPrimaryBranch`, `getBranchBySlug`, `validateBranches`.

**Locale strings**
- Add branch-related keys to `src/locales/en.json` and `mr.json`: `branches.title`, `branches.findYours`, `branches.selectBranch`, `branches.callThis`, `branches.viewBranch`, `branches.admissionStatus.open|waitlist|closed`.

### Exit criteria
- `npm run dev` boots with the v2 config shape; no console errors.
- `validateConfig` throws on malformed branches array (verify by deliberately breaking config).
- `useBranch()` returns the primary branch on first load with no `localStorage`.
- Selection persists across page refresh.
- All v1 pages continue to render (data is not yet wired to selected branch — that is Phase 9).

---

## Phase 8 — Branch Routes + Branch Components
**Estimate:** 1–1.5 days
**Status:** ⬜ Not started
**Depends on:** Phase 7

### What to build

**Routes — add to `src/App.jsx`**
```
/branches                      → BranchesIndexPage (NEW)
/branches/:slug                → BranchPage (NEW)
/branches/:slug/contact        → BranchContactPage (NEW)
/contact                       → ContactTriagePage (REPLACE existing ContactPage)
```
All new pages `React.lazy()`-loaded per the v1 code-splitting rule.

**New pages**

`src/pages/BranchesIndexPage.jsx` (`/branches`)
- Page hero: "Our Branches — Three locations, same warmth".
- 1-col mobile / 3-col desktop grid of `BranchCard`.
- `BranchesMap` below the grid (desktop only — gated on `window.matchMedia('(min-width: 1024px)')`).
- On mobile: per-card "View on Maps" link replaces the embed.

`src/pages/BranchPage.jsx` (`/branches/:slug`)
- 404-redirect to `/branches` if `useBranchFromRoute()` returns null.
- On mount: call `setBranch(slug)` so all global CTAs sync.
- Sections (in order): `BranchHeroSection`, optional branch teacher block, branch photos strip, `BranchInfoBlock` (timing + contact), Google Maps embed, "Same activities, same values" link to `/activities`.
- Per-route `<link rel="preload">` for the branch hero image (mount/unmount via `useEffect`).

`src/pages/BranchContactPage.jsx` (`/branches/:slug/contact`)
- Branch-specific contact form (reuse v1 form fields).
- WhatsApp pre-fill includes branch name and `wa.me/{branch.whatsapp}`.
- `BranchInfoBlock` + maps embed.

`src/pages/ContactTriagePage.jsx` (`/contact`)
- Replaces v1 `ContactPage` — no form on this page.
- Heading: "Which branch are you contacting?"
- 3 large branch cards → `/branches/:slug/contact`.

**New components**

`src/components/branches/BranchCard.jsx` — photo, name, short address, admission-status pill (emoji ⭐/⏳/●), inline Call + WhatsApp buttons, "View Branch →" link.

`src/components/branches/BranchHeroSection.jsx` — branch hero photo, branch chip ("Karad Branch"), address line, branch-specific CTAs ("Call This Branch", WhatsApp, "Book a Visit Here").

`src/components/branches/BranchInfoBlock.jsx` — timing, batch sizes, phone/WhatsApp, embedded map. Reused on `BranchPage` and `BranchContactPage`.

`src/components/branches/BranchesMap.jsx` — single Google Maps embed showing all branch markers from `lat`/`lng`. Click marker → branch route. Desktop only.

`src/components/common/BranchSelector.jsx` — compact dropdown (chevron + current branch shortName). Items list all branches + "See all branches →" footer link to `/branches`. Used inside Navbar.

`src/components/common/BranchSwitchPrompt.jsx` — "Find your nearest branch" 3-card section for the hub homepage (separate from `BranchesIndexPage` — same data, hub-styled).

**Empty-state rules (per redesign §7.2)**
- Missing hero photo → brand-level yellow gradient fallback (no broken image).
- Missing `branchTeacher` → hide section (do not show "Teacher: TBD").
- Fewer than 3 photos → render what exists, no padding.

### Exit criteria
- `/branches`, `/branches/karad`, `/branches/karad/contact`, `/contact` all render.
- Unknown slug `/branches/foo` redirects to `/branches`.
- Navigating to `/branches/satara` updates the global selected branch.
- `BranchesMap` renders 3 markers on desktop; collapses to "View on Maps" links on mobile.
- All branch pages pass Lighthouse mobile ≥ 85 (same target as v1).

---

## Phase 9 — Existing Component Updates (Branch-Awareness)
**Estimate:** 1 day
**Status:** ⬜ Not started
**Depends on:** Phase 8

### What to build

**`Navbar`**
- Add `BranchSelector` to the right cluster on desktop, between language toggle and Call CTA.
- On mobile: move `BranchSelector` *inside* the hamburger drawer. Keep the visible mobile navbar limited to logo + language toggle + Call CTA.
- Add "Branches" link to nav menu (active on `/branches` and `/branches/*`).

**`StickyBottomBar` (mobile)**
- Resolve `tel:` and `wa.me` URLs from `useBranch().selectedBranch`, not from `SCHOOL` directly.
- If no branch selected (edge case — first visit before any selection): tap opens a small bottom sheet with 3 branch options before dialing. This is the only branch-picker modal in the app.

**`WhatsAppButton` (desktop floating)**
- Same change — pull number from selected branch.
- Pre-filled message includes branch name: `Hi, I'm interested in Atharva Playschool ({branch.shortName} branch).`

**`Footer`**
- Replace single contact block with 3-column branch directory (or vertical list on mobile): each branch's shortName, address line, phone, WhatsApp.
- Brand-level social links and copyright stay at the bottom.

**`HomePage` → hub variant**
- `HeroSection`: rewrite copy. Headline stays brand-level ("Where Little Stars Begin to Shine"). Subheadline mentions "3 branches across Maharashtra". Primary CTA changes to "Call Nearest" (resolves to selected branch). Remove single-school address line.
- Insert new `<BranchSwitchPrompt />` section between hero and `TrustHighlights` (or where `ActivityPreview` currently sits — see redesign §10.1 wireframe).
- Keep `ActivityPreview`, `TestimonialsSnippet`, `ProgramsCTABanner` unchanged in content.
- `ProgramsCTABanner`: copy update to "Admissions Open at all 3 branches" (or branch-scoped if selector is active and that branch's `admissionStatus !== 'open'`).

**Activities, About, Programs, Gallery — verify unchanged**
- These remain shared. Audit each page for any direct reads of `SCHOOL.phone` / `SCHOOL.address` / `SCHOOL.maps` and replace with `useBranch().selectedBranch.*` only where a CTA lives. Static content (curriculum, philosophy) stays brand-level.
- Optional `?branch=karad` filter on Gallery if media metadata supports it; otherwise defer.

**Locale audit**
- Run a grep for hardcoded English/Marathi strings introduced in Phase 8 components and fold them into `en.json` / `mr.json`.
- Verify Marathi translations for new keys render in Devanagari.

### Exit criteria
- Tapping the sticky Call button on `/branches/karad` dials Karad's number; on `/branches/satara` dials Satara's.
- Switching branches via the `BranchSelector` updates Footer's highlighted branch (or scroll target) and all global CTAs.
- Hub home shows the "Find Your Branch" section above the fold on desktop, after hero on mobile.
- `/contact` (top-level) is now a triage page — no form on it.
- No regressions on `/activities`, `/about`, `/programs`, `/gallery`.
- `npm run build` succeeds; no console warnings about missing keys.

---

## Phase 10 — Tests, Migration Docs, Polish
**Estimate:** 0.5–1 day
**Status:** ✅ Complete
**Depends on:** Phase 9

### What to build

**Vitest — minimal high-ROI suite (per redesign §13)**
- Add `vitest` + `@testing-library/react` to devDependencies.
- `validateConfig.test.js`: malformed branches array → expected error messages.
- `branches.test.js`: `getBranchBySlug` returns correct branch; unknown slug → `null`.
- `BranchContext.test.jsx`: initializes from localStorage if valid; falls back to `isPrimary`; falls back to `branches[0]` if no primary.
- `whatsapp.test.js`: URL builder uses branch's WhatsApp number and includes branch name in message.
- Add `npm test` script to `package.json`.

**Per-route hero preload**
- Implement the `useEffect`-based `<link rel="preload">` injection for `/` (hub hero) and `/branches/:slug` (branch hero) per redesign §11. Do not preload all branch heroes in `index.html`.

**Static map fallback (mobile)**
- Replace heavy iframe embeds on mobile with a static map image + tap-to-open overlay on `BranchPage` and `BranchContactPage`. Desktop keeps the interactive iframe.

**Lazy-loading branch thumbnails**
- `BranchesIndexPage`: first card `loading="eager"`, rest `loading="lazy" decoding="async"`.

**Documentation**
- Update `README.md` with the v1 → v2 config migration steps (per redesign §14):
  1. Wrap top-level fields under `brand: { ... }`.
  2. Move location fields into a single-element `branches: [{ slug: 'main', isPrimary: true, ... }]`.
  3. Add `lat`/`lng` per branch.
- Document the per-branch S3 path convention: `{s3BaseUrl}/branches/{slug}/...` and `{s3BaseUrl}/shared/...`.
- Note: a single-branch v2 config still works — hide the "Find Your Branch" section when `branches.length === 1` and render the hub hero as a v1-style branch hero.

**Replace v1 wireframe**
- Update or supersede `homepage-wireframe.html` with hub + branch wireframes matching redesign §10.

**Final acceptance pass**
- Lighthouse mobile ≥ 85 on `/`, `/branches`, `/branches/:slug`.
- No regression on v1 acceptance criteria from `PHASES.md` Phase 6.
- Plausible (or whatever analytics is wired): branch CTAs tagged with `data-branch={slug}` per redesign §15.

### Acceptance criteria checklist
- [x] v2 `school.config.js` shape with brand + branches[] in use
- [x] `validateConfig` rejects malformed branch arrays with clear messages
- [x] `/branches`, `/branches/:slug`, `/branches/:slug/contact` all render
- [x] Top-level `/contact` is a triage page, not a form
- [x] Sticky bottom bar dials the **selected** branch on every page
- [x] WhatsApp pre-fill includes branch name
- [x] Branch selector visible on desktop navbar; inside hamburger on mobile
- [x] Footer lists all branches
- [x] Hub home has "Find Your Branch" section
- [x] Branch pages use per-branch hero photo with brand-gradient fallback
- [x] `branchTeacher` section hidden when not present
- [x] Empty branch photo arrays do not break the page
- [x] Single-branch config still works (graceful hub degrade)
- [x] EN/मराठी toggle works on all new pages
- [x] Vitest suite passes (28/28)
- [ ] Lighthouse mobile ≥ 85 on new routes (run manually with real content)
- [x] No hardcoded branch data outside `school.config.js`
- [x] README documents v1 → v2 migration

---

## Migration Order (file-level)

To minimize broken intermediate states, land changes in this order:

1. **Config + validation** (`school.config.js`, `main.jsx`) — broken until step 2 lands, but isolated.
2. **`BranchContext` + helpers** (`src/context/BranchContext.jsx`, `src/hooks/useBranch.js`, `src/utils/branches.js`).
3. **New routes + pages** — additive, no v1 page changes yet.
4. **New components** (`src/components/branches/*`, `BranchSelector`, `BranchSwitchPrompt`).
5. **Modify global components** (`Navbar`, `StickyBottomBar`, `WhatsAppButton`, `Footer`).
6. **Pivot `HomePage` to hub variant**.
7. **Replace top-level `ContactPage` with triage page**.
8. **Tests + docs + polish**.

Steps 1–2 ship together. Step 5 is the first change visible to users — defer until 3–4 are stable on a feature branch.

---

## Trade-offs (carried from redesign §15)

- **Branch detail pages duplicate structure** — accepted; templating creates awkward conditionals.
- **One-tap friction when no branch selected on first visit** — accepted; `localStorage` removes it after first selection.
- **`/contact` is a triage page, not a form** — accepted; cleaner than a form that doesn't know which branch to route to.
- **Activities/About/Programs stay shared even if branches diverge later** — mitigation: optional `branches[].activitiesOffered: []` in v2.1 if needed.

## Open questions for the school owner

(Same as redesign §15 — flag these before Phase 7 kickoff.)

1. Are the 3 branches operationally identical, or franchises with autonomy?
2. Real `admissionStatus` data, or ship as `'open'` everywhere until usage is real?
3. Per-branch fees? (Currently fees are brand-level "Contact us...".)
4. Per-branch testimonials, or shared pool with optional branch tags?
5. Branch teachers real, or single founder figurehead across all branches?

---

## Summary

| Phase | Focus | Estimate | Status |
|-------|-------|----------|--------|
| 7 | Data model + `BranchContext` + validation | 1 day | ✅ Complete |
| 8 | Branch routes + branch components | 1–1.5 days | ✅ Complete |
| 9 | Make global components branch-aware; pivot hub home | 1 day | ✅ Complete |
| 10 | Vitest, per-route preload, mobile static maps, README migration guide | 0.5–1 day | ✅ Complete |

**Total estimate: 3.5–4.5 days of focused development** (matches redesign doc estimate).

**Non-goals (explicitly deferred):** per-branch theming, compare-branches table, per-branch admissions form / payments, per-branch language preference, branch-level analytics dashboard, CMS for non-technical branch managers.
