# Development Phases — Atharva Playschool

Based on design doc (`atharva-playschool-design.md`) + PRD (`atharva-playschool-requirements.md`).

---

## Phase 1 — Foundation
**Estimate:** 1–2 days  
**Status:** ✅ Complete

### What to build
- Vite + React + Tailwind CSS + Framer Motion scaffold
- `school.config.js` config layer (all per-school variables — name, phone, WhatsApp, address, teacher, S3 base URL, maps, social links)
- Tailwind design system: colors, typography, shadows, border-radius from PRD §3
- React Router v6 + `React.lazy` + `Suspense` for all 6 routes
- Global components:
  - `Navbar` — sticky, transparent-on-hero, hamburger drawer on mobile, EN/मराठी toggle visible
  - `Footer` — school name, quick links, contact, social icons
  - `StickyBottomBar` — mobile-only, Call Now + WhatsApp buttons fixed to bottom
  - `WhatsAppButton` — desktop floating button, bottom-right, pulse animation
  - `SectionHeader` — reusable title + subtitle component
  - `CTAButton` — variants: primary (coral), secondary (blue), whatsapp (green), outline
- `LanguageContext` — `{ lang, setLang, t(key) }`, backed by `src/locales/en.json` + `src/locales/mr.json` stubs, persisted in `localStorage`
- Placeholder data in `src/data/` with fake school "Sunflower Playschool" (per TODO-4B — prevents real data leaking to school #2 forks)

### Exit criteria
- `npm run dev` shows a working shell
- All 6 routes render (even if blank pages)
- Navbar + Footer + StickyBottomBar visible and responsive
- Language toggle compiles and switches `localStorage` value
- No hardcoded colors or strings outside config/locales

---

## Phase 2 — Home Page
**Estimate:** 1–2 days  
**Status:** Not started  
**Depends on:** Phase 1

### What to build
- `HeroSection` — headline, subheadline, 3 badge pills, 3 CTA buttons (Call / WhatsApp / Book a Visit), hero image, floating background shapes, warm yellow gradient
- `TrustHighlights` — 4 cards (Safe Environment, Experienced Teacher, Activity-Based Learning, Cultural Values)
- `ActivityPreview` — 6-card horizontal scroll (mobile) / 3-col grid (desktop), each card: image + label + gradient overlay
- `TestimonialsSnippet` — 3 cards carousel (mobile) / 3-col grid (desktop), quote + parent name + child info + star rating
- `ProgramsCTABanner` — full-width gradient strip, admissions open callout, View Programs + Contact Us buttons
- Framer Motion entrance animations: fadeInUp, stagger children, hero image slide-in from right

### Exit criteria
- Home page matches wireframe from design doc
- Mobile layout correct (stacked hero, horizontal activity scroll, testimonials carousel)
- Desktop layout correct (split hero, 3-col grids)
- All 3 CTA buttons functional (tel: link, wa.me link, router link to /contact)
- Animations respect `prefers-reduced-motion`

---

## Phase 3 — Activities Page
**Estimate:** 1–2 days  
**Status:** Not started  
**Depends on:** Phase 1

### What to build
- Page hero banner (colorful header, title + subtitle)
- 6 full-section activity blocks, each containing:
  - Large emoji icon + title (H2) + tagline (italic)
  - Description paragraph
  - "What Your Child Learns" bullet list with checkmark icons
  - Media grid: 2–3 images + optional video thumbnail with play button overlay
- Alternating image-left / text-right layout on desktop, stacked on mobile
- Section dividers between activities
- Video `src` loaded lazily via `IntersectionObserver` (not at page load)

### Activities
1. Art & Craft 🎨
2. Storytelling & Learning 📖
3. Dance & Music 🎵
4. Festival Celebrations 🪔
5. Healthy Habits & Discipline 🥗
6. Confidence & Stage Exposure 🎤

### Exit criteria
- All 6 activity sections render with placeholder images
- Alternating L/R layout correct on desktop, stacked on mobile
- Video thumbnails show poster image; `src` only loaded when in viewport
- Page is the visually richest page on the site

---

## Phase 4 — About + Programs + Contact
**Estimate:** 1–2 days  
**Status:** Not started  
**Depends on:** Phase 1

### What to build

**About Page (`/about`)**
- Teacher profile: circular portrait, name, title, experience, qualifications, 2–3 paragraph bio, pull-quote
- Teaching philosophy: 6-pillar icon grid (Child-Led Learning, Values First, Learn by Doing, Parent Partnership, Cultural Rootedness, Safe & Nurturing)
- School story timeline: vertical (mobile), horizontal (desktop), milestones from `school.config.js`

**Programs Page (`/programs`)**
- Playschool card: full details, timing, batch size, admission CTA
- Tuition card: subjects, structure, batch size
- Program comparison table (Feature / Playschool / Tuition)
- "Admissions open" CTA with Book a Visit button

**Contact Page (`/contact`)**
- Contact info block: phone (tel: link), WhatsApp (wa.me), address, office hours
- Google Maps embed (iframe from `school.config.js`)
- Contact form: Parent Name, Child Name, Child Age, Program Interest (dropdown), Phone, Message
- On submit: show success message + optionally open WhatsApp with pre-filled form data (no backend)

### Exit criteria
- All 3 pages render correctly on mobile + desktop
- Contact form shows success state on submit
- WhatsApp pre-fill message opens correctly on form submit
- Maps iframe loads from config value
- Tel: and wa.me links work on mobile

---

## Phase 5 — Gallery + Bilingual Toggle
**Estimate:** 1–2 days  
**Status:** Not started  
**Depends on:** Phase 1, Phase 2

### What to build

**Gallery Page (`/gallery`)**
- Masonry grid (desktop 4-col), 2-col grid (mobile)
- Filter tabs: All | Playschool | Activities | Festivals | Events | Tuition
- Photo cards: lazy-loaded image, hover zoom overlay
- Video cards: poster image + play button overlay
- Lightbox modal: full image or video playback, close button, ESC key, swipe-to-close on mobile, prev/next navigation

**Bilingual Toggle (complete)**
- Fill `src/locales/mr.json` with Marathi translations for all strings (use Google Translate as base + teacher review)
- Apply Noto Sans Devanagari font via `lang` attribute on `<html>` tag on toggle
- Toggle instrumentation: `toggleClicks` counter in `localStorage` (increments on every `setLang` call)
- Floating language pill on mobile (above WhatsApp button, always accessible without opening drawer)
- Review toggle usage at 90 days: if < 3% of sessions, remove in v2; if ≥ 3%, promote as feature in school #2 pitch

### Exit criteria
- Toggle switches entire site to Marathi — no hardcoded English strings remain anywhere
- Marathi text renders correctly in Devanagari script
- `<html lang>` attribute updates on toggle
- Language preference persists across page refreshes
- Gallery filter tabs work correctly
- Lightbox opens, navigates, and closes (ESC + swipe)
- Toggle click count tracked in localStorage

---

## Phase 6 — Polish + Launch Prep
**Estimate:** 1 day  
**Status:** Not started  
**Depends on:** All previous phases

### What to build
- SEO meta tags per page (title, description, keywords) from PRD §10
- JSON-LD structured data on Home page (`EducationalOrganization` schema)
- `<link rel="preload">` for hero image in `index.html`
- `font-display: swap` on all Google Fonts
- `prefers-reduced-motion` guard on all Framer Motion animations
- `netlify.toml` with SPA redirect rule (`/* → /index.html, 200`)
- `README.md` — fork-to-deploy guide (per TODO-2): prerequisites, fork, fill `school.config.js`, fill `src/data/`, `npm run dev`, push to Netlify, post-deploy checklist
- Final pass: all acceptance criteria from PRD §12

### Acceptance criteria checklist (from PRD §12)
- [ ] All 6 pages render on Chrome, Firefox, Safari (mobile + desktop)
- [ ] Call Now opens phone dialer on mobile
- [ ] WhatsApp opens with pre-filled message
- [ ] Contact form shows success state
- [ ] Gallery lightbox opens, navigates, closes
- [ ] Sticky bottom bar visible on mobile, hidden on desktop
- [ ] Lighthouse mobile score ≥ 85
- [ ] No console errors on any page
- [ ] All images have descriptive alt text
- [ ] CLS < 0.1 (no layout shift on load)
- [ ] EN/मराठी toggle visible in navbar + mobile drawer + floating pill
- [ ] Language preference persists in localStorage
- [ ] All S3 URLs centralized in `src/constants/media.js`
- [ ] No hardcoded colors outside Tailwind config / CSS variables
- [ ] Prettier config included

---

## Summary

| Phase | Focus | Estimate | Status |
|-------|-------|----------|--------|
| 1 | Foundation — scaffold, config, design system, global components | 1–2 days | ✅ Complete |
| 2 | Home Page — hero, highlights, activities preview, testimonials | 1–2 days | Not started |
| 3 | Activities Page — 6 activity sections, media grid, video lazy-load | 1–2 days | Not started |
| 4 | About + Programs + Contact | 1–2 days | Not started |
| 5 | Gallery lightbox + full Marathi translations + toggle instrumentation | 1–2 days | Not started |
| 6 | Polish — SEO, performance, Netlify config, README, final checklist | 1 day | Not started |

**Total estimate: 7–11 days of focused development.**
