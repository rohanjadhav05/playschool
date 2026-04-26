# Atharva Playschool — Website

A fast, bilingual (EN / मराठी) static website for a local playschool + tuition centre. Built with Vite + React + Tailwind CSS + Framer Motion. Designed as a multi-school template — deploying for a new school takes under an hour.

## Tech stack

- **Vite + React 18** — static SPA, no backend
- **Tailwind CSS v3** — custom design tokens
- **Framer Motion v11** — entrance animations, respects `prefers-reduced-motion`
- **React Router v6** — lazy-loaded routes
- **react-helmet-async** — per-page SEO meta tags
- **Vitest + @testing-library/react** — unit test suite
- **One config file** — `school.config.js` externalises all per-school data

---

## Fork-to-deploy guide (v2 shape)

### Prerequisites

- Node.js 18+ and npm
- A Netlify or Vercel account (free tier works)
- (Optional) An S3-compatible bucket for photos

### 1. Fork & clone

```bash
git clone https://github.com/YOUR_USERNAME/atharva-playschool.git
cd atharva-playschool
npm install
```

### 2. Fill in school details

Edit **`school.config.js`** in the repo root. The v2 config has three top-level exports:

#### `BRAND` — brand-wide fields (same across all branches)

| Field | Description |
|---|---|
| `name` | School name |
| `tagline` | One-line tagline |
| `yearFounded` | Year established |
| `s3BaseUrl` | S3 bucket root URL (used in `src/constants/media.js`) |
| `domain` | Your domain — used in SEO canonical URLs |
| `social` | `{ facebook, instagram, youtube }` links |
| `milestones` | School history timeline items |

#### `FOUNDER` — the school founder / head teacher

| Field | Description |
|---|---|
| `name`, `title`, `experience` | Displayed on the About page |
| `photo` | S3 URL to portrait image |
| `bio` | Array of bio paragraph strings |
| `quote` | Pull-quote used in the teacher profile section |

#### `BRANCHES` — array of branch objects

Each branch object supports:

| Field | Description |
|---|---|
| `slug` | URL-safe identifier, unique across branches (letters/digits/hyphens) — appears in `/branches/:slug` |
| `name` | Full branch name shown in headings |
| `shortName` | Short label used in selector, footer, WA messages |
| `isPrimary` | `true` for the main/original branch — at most one per config |
| `address` | `{ line1, line2, city, state, pin }` |
| `phone` | 10–15 digits, no `+` or spaces (e.g. `9423975130`) |
| `whatsapp` | 10–15 digits with country code (e.g. `919423975130`) |
| `email` | Optional contact email |
| `timing` | `{ playschool, tuition }` — time range strings |
| `batchSize` | `{ playschool, tuition }` — max student counts |
| `branchTeacher` | Optional per-branch teacher (`null` hides the section) |
| `photos` | Array of image URLs shown on the branch detail page |
| `maps` | `{ embedUrl, shortUrl, lat, lng }` |
| `admissionStatus` | `'open'` \| `'waitlist'` \| `'closed'` |

### 3. Replace placeholder images

Drop real photos into `public/activities/`:

```
art-1.jpg       art-2.jpg
story-1.jpg     story-2.jpg
dance-1.jpg
festival-1.jpg  festival-2.jpg
habits-1.jpg    habits-2.jpg
stage-1.jpg
```

Per-branch photos live under S3: `{s3BaseUrl}/branches/{slug}/photo-1.webp` etc.  
Shared photos (hero, teacher portrait) live under `{s3BaseUrl}/shared/...`.

### 4. Run locally

```bash
npm run dev     # → http://localhost:5173
npm test        # → vitest unit suite (28 tests)
npm run build   # → production dist/
```

### 5. Deploy to Netlify

The included `netlify.toml` handles SPA routing and asset caching automatically.

**Option A — drag and drop:** Go to [app.netlify.com](https://app.netlify.com), drag the `dist/` folder.

**Option B — Git deploy:**
1. Push to GitHub
2. Connect repo in Netlify → Build command: `npm run build`, Publish dir: `dist`
3. Netlify auto-deploys on every push

**Option C — Vercel:**
```bash
npx vercel --prod
```

### 6. Post-deploy checklist

- [ ] Replace emoji favicon with a real `.ico` / `.png` in `index.html`
- [ ] Upload an `og-image.jpg` (1200×630) to `public/` for social sharing
- [ ] Set real `maps.embedUrl` in each branch (Google Maps → Share → Embed a map)
- [ ] Set real `maps.lat` + `maps.lng` for each branch (from Google Maps)
- [ ] Test `tel:` link opens dialer on a real mobile device for each branch
- [ ] Test WhatsApp link pre-fills the correct branch name in the message
- [ ] Submit `https://your-domain/` to [Google Search Console](https://search.google.com/search-console)
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) — target ≥ 85 mobile

---

## v1 → v2 migration guide

If you have a v1 `school.config.js` (single `SCHOOL` export), migrate it in three steps:

### Step 1 — Wrap brand fields under `BRAND`

```js
// Before (v1)
export const SCHOOL = {
  name: 'My School',
  tagline: '...',
  yearFounded: '2019',
  s3BaseUrl: '...',
  domain: '...',
  social: { ... },
  milestones: [ ... ],
  ...
}

// After (v2)
export const BRAND = {
  name: 'My School',
  tagline: '...',
  yearFounded: '2019',
  s3BaseUrl: '...',
  domain: '...',
  social: { ... },
  milestones: [ ... ],
  fees: 'Contact us for current fee structure',
  officeHours: 'Mon–Sat, 9:00 AM – 6:00 PM',
  admissionYear: '2025–26',
}
```

### Step 2 — Move teacher to `FOUNDER`

```js
// Before (v1)
teacher: { name, title, experience, photo, bio, quote }

// After (v2) — top-level export
export const FOUNDER = {
  name: '...', title: '...', experience: '...', qualifications: '...',
  photo: '...', bio: [ ... ], quote: '...',
}
```

### Step 3 — Move location fields into `BRANCHES`

Wrap your single location in a one-element array with `isPrimary: true`:

```js
export const BRANCHES = [
  {
    slug: 'main',
    name: 'My School — Main Branch',
    shortName: 'Main',
    isPrimary: true,
    address: { line1: '...', line2: '...', city: '...', state: '...', pin: '...' },
    phone: '9999999999',           // digits only, no +
    whatsapp: '919999999999',      // country code + digits, no +
    email: 'contact@myschool.in',
    timing: { playschool: '10am–1pm', tuition: '4pm–7pm' },
    batchSize: { playschool: 40, tuition: 15 },
    branchTeacher: null,
    photos: [],
    maps: {
      embedUrl: 'https://www.google.com/maps/embed?pb=...',
      shortUrl: 'https://maps.app.goo.gl/...',
      lat: 17.29,
      lng: 74.18,
    },
    admissionStatus: 'open',
  },
]
```

> **Single-branch note:** a config with `branches.length === 1` still works. The "Find Your Branch" section on the homepage auto-hides itself, the contact page stays as a direct form, and the navbar omits the branch selector.

### Add the backward-compat shim (optional, during migration)

If you have existing components that read from `SCHOOL`, keep them working by deriving the shim at the bottom of `school.config.js`:

```js
const _primary = BRANCHES.find((b) => b.isPrimary) || BRANCHES[0]

export const SCHOOL = {
  name: BRAND.name,
  tagline: BRAND.tagline,
  phone: `+91-${_primary.phone}`,
  whatsapp: `+${_primary.whatsapp}`,
  ...
}
```

Remove this once all components have been migrated to `useBranch()`.

---

## Project structure (v2)

```
school.config.js           ← per-school config (BRAND, FOUNDER, BRANCHES)
vitest.config.js           ← vitest + jsdom setup
src/
  utils/
    branches.js            ← getPrimaryBranch, getBranchBySlug, validateBranches
    validateConfig.js      ← run before render — throws on malformed config
    whatsapp.js            ← buildWaUrl(branch) — shared URL builder
  context/
    LanguageContext.jsx    ← EN/मराठी toggle, localStorage persist
    BranchContext.jsx      ← selectedBranch, setBranch, branches — localStorage persist
  hooks/
    useBranch.js           ← convenience wrapper over BranchContext
    useBranchFromRoute.js  ← resolves :slug param → branch object or null
  constants/media.js       ← all image/video URLs centralised here
  locales/en.json          ← English strings
  locales/mr.json          ← Marathi strings (130 keys, parity with en.json)
  components/
    common/                ← Navbar, Footer, CTAButton, PageHero, BranchSelector, BranchSwitchPrompt
    branches/              ← BranchCard, BranchHeroSection, BranchInfoBlock, BranchesMap, BranchContactForm
    home/                  ← HeroSection, TrustHighlights, ActivityPreview, Testimonials, ProgramsCTABanner
    activities/            ← ActivitySection, ActivityPageHero
    about/                 ← TeacherProfile, PhilosophySection, TimelineSection
    programs/              ← ProgramCard, ComparisonTable
    gallery/               ← GalleryGrid, GalleryCard, Lightbox
  pages/
    HomePage.jsx           ← hub: hero + BranchSwitchPrompt + highlights + programs CTA
    BranchesIndexPage.jsx  ← /branches — grid + map
    BranchPage.jsx         ← /branches/:slug — detail, setBranch on mount
    BranchContactPage.jsx  ← /branches/:slug/contact — branch-specific form
    ContactTriagePage.jsx  ← /contact — triage: pick your branch
    ActivitiesPage.jsx     ← /activities (shared across branches)
    AboutPage.jsx          ← /about (FOUNDER + milestones)
    ProgramsPage.jsx       ← /programs (brand-level)
    GalleryPage.jsx        ← /gallery
public/
  activities/              ← local placeholder images (replace with real photos)
```

---

## S3 path conventions

```
{s3BaseUrl}/
  shared/
    hero-main.webp          ← hub homepage hero
    hero-main-mobile.webp
  about/
    teacher-profile.webp
    classroom.webp
  branches/
    {slug}/
      hero.webp             ← branch detail page hero
      photo-1.webp          ← branch photos strip (branch.photos[])
      photo-2.webp
      ...
  activities/
    art-1.webp
    ...
```

---

## Customising for a new school

1. Edit `school.config.js` — `BRAND`, `FOUNDER`, and `BRANCHES`
2. Replace images in `public/activities/` or switch to S3 in `src/constants/media.js`
3. Update `src/locales/en.json` + `src/locales/mr.json` for school-specific strings
4. `npm run build` → deploy

**Estimated time to fork and launch for a new school: 45–60 minutes.**
