# Atharva Playschool — Website

A fast, bilingual (EN / मराठी) static website for a local playschool + tuition centre. Built with Vite + React + Tailwind CSS + Framer Motion. Designed as a multi-school template — deploying for a new school takes under an hour.

## Tech stack

- **Vite + React 18** — static SPA, no backend
- **Tailwind CSS v3** — custom design tokens
- **Framer Motion v11** — entrance animations, respects `prefers-reduced-motion`
- **React Router v6** — 6 routes, lazy-loaded per route
- **react-helmet-async** — per-page SEO meta tags
- **One config file** — `school.config.js` externalises all per-school data

---

## Fork-to-deploy guide

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

Edit **`school.config.js`** in the repo root. Every field has a comment. Key fields:

| Field | Description |
|---|---|
| `name` | School name |
| `tagline` | One-line tagline |
| `phone` | E.164 format for `tel:` links |
| `whatsapp` | No spaces/dashes — used in `wa.me` URL |
| `address` | Street, city, PIN |
| `teacher` | Name, title, experience, bio paragraphs, quote |
| `s3BaseUrl` | Your S3 bucket URL (or leave as-is for local dev) |
| `maps.embedUrl` | Google Maps embed iframe URL |
| `maps.shortUrl` | Short Google Maps link |
| `domain` | Your domain — used in SEO canonical URLs |
| `milestones` | School history timeline items |

### 3. Replace placeholder images

Drop real photos into `public/activities/` using these exact filenames:

```
art-1.jpg       art-2.jpg
story-1.jpg     story-2.jpg
dance-1.jpg
festival-1.jpg  festival-2.jpg
habits-1.jpg    habits-2.jpg
stage-1.jpg
```

For the teacher portrait, upload to S3 and set `teacher.photo` in `school.config.js`.  
For gallery photos, add items to `MEDIA.gallery.items` in `src/constants/media.js`.

### 4. Run locally

```bash
npm run dev
# → http://localhost:5173
```

### 5. Deploy to Netlify

```bash
npm run build
# → dist/ folder is ready
```

**Option A — drag and drop:** Go to [app.netlify.com](https://app.netlify.com), drag the `dist/` folder.

**Option B — Git deploy:**
1. Push to GitHub
2. Connect repo in Netlify → Build command: `npm run build`, Publish dir: `dist`
3. Netlify auto-deploys on every push

The included `netlify.toml` handles SPA routing and asset caching automatically.

**Option C — Vercel:**
```bash
npx vercel --prod
```

### 6. Post-deploy checklist

- [ ] Replace emoji favicon with a real `.ico` / `.png` in `index.html`
- [ ] Upload an `og-image.jpg` (1200×630) to `public/` for social sharing
- [ ] Set real `maps.embedUrl` in `school.config.js` (Google Maps → Share → Embed)
- [ ] Test `tel:` link opens dialer on a real mobile device
- [ ] Test WhatsApp link opens with pre-filled message
- [ ] Submit `https://your-domain/` to [Google Search Console](https://search.google.com/search-console)
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) — target ≥ 85 mobile

---

## Project structure

```
school.config.js          ← per-school config (the only file that changes)
src/
  constants/media.js      ← all image/video URLs centralised here
  locales/en.json         ← English strings
  locales/mr.json         ← Marathi strings
  context/LanguageContext ← EN/मराठी toggle, localStorage persist
  components/
    common/               ← Navbar, Footer, CTAButton, PageHero, SEO, ...
    home/                 ← Hero, Highlights, ActivityPreview, Testimonials
    activities/           ← ActivitySection, ActivityPageHero
    about/                ← TeacherProfile, PhilosophySection, TimelineSection
    programs/             ← ProgramCard, ComparisonTable
    contact/              ← ContactForm, ContactInfo, MapEmbed
    gallery/              ← GalleryGrid, GalleryCard, Lightbox
  pages/                  ← 6 route components
public/
  activities/             ← local placeholder images (replace with real photos)
```

---

## Customising for a new school

1. Edit `school.config.js` — name, contact, address, teacher, timing, fees
2. Replace images in `public/activities/` or switch to S3 in `src/constants/media.js`
3. Update `src/locales/en.json` + `src/locales/mr.json` if any school-specific strings need changing
4. Change gradient colours in page files if desired (the `gradient` prop on `PageHero`)
5. `npm run build` → deploy

**Estimated time to fork and launch for a new school: 45–60 minutes.**
