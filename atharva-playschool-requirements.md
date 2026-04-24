# 🏫 Playschool & Tuition Website — Product Requirements Document

> **Purpose**: This document is the single source of truth for building the website for a local playschool and tuition business based in Pune, India. It is intended to be consumed by an AI agent or developer to produce a production-ready, static frontend implementation.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technical Stack & Constraints](#2-technical-stack--constraints)
3. [Design System](#3-design-system)
4. [Site Architecture & Navigation](#4-site-architecture--navigation)
5. [Page Specifications](#5-page-specifications)
   - [5.1 Home Page](#51-home-page)
   - [5.2 Activities Page](#52-activities-page)
   - [5.3 About Us Page](#53-about-us-page)
   - [5.4 Programs Page](#54-programs-page)
   - [5.5 Contact Page](#55-contact-page)
   - [5.6 Gallery Page](#56-gallery-page)
6. [Global Components](#6-global-components)
7. [Media & Asset Strategy](#7-media--asset-strategy)
8. [Performance Requirements](#8-performance-requirements)
9. [Mobile Experience](#9-mobile-experience)
10. [SEO Requirements](#10-seo-requirements)
11. [Content Placeholders](#11-content-placeholders)
12. [Acceptance Criteria](#12-acceptance-criteria)

---

## 1. Project Overview

### Business Context

| Field | Details |
|-------|---------|
| Business Type | Playschool + Private Tuition Centre |
| Location | A/P - Karve, Tal - Karad, Maharashtra, India |
| Primary Audience | Parents of children aged 3–10 years |
| Primary Goal | Drive phone calls, WhatsApp inquiries, and physical visits |
| Secondary Goal | Build trust through cultural values, teacher credibility, and activity showcase |

### Business Lines

| Program | Age Group | Priority |
|---------|-----------|----------|
| Playschool | 3–5 years | **Primary** |
| Tuition Classes | 1st–10th Std | Secondary |

### Conversion Goals (in order of priority)
1. **Call Now** — Immediate phone call
2. **WhatsApp** — WhatsApp message inquiry
3. **Book a Visit** — Schedule a physical visit
4. **Contact Form** — Async inquiry

---

## 2. Technical Stack & Constraints

### Framework & Tooling

```
Framework       : React (Vite as build tool)
Styling         : Tailwind CSS (utility-first, no heavy CSS-in-JS)
Routing         : React Router v6 (client-side, static-friendly)
Animations      : Framer Motion (lightweight, tree-shakeable)
Icons           : Lucide React
Fonts           : Google Fonts (loaded with font-display: swap)
Build Output    : Static files (index.html + assets) — deployable on S3, Netlify, Vercel
```

### Hard Constraints

- ❌ No backend, no server-side rendering, no API calls (except media from S3)
- ❌ No heavy libraries (no Bootstrap, no MUI, no Ant Design)
- ❌ No autoplay videos with sound
- ✅ All media served from AWS S3 with proper CORS headers
- ✅ Code-split per route using `React.lazy` + `Suspense`
- ✅ Images use `loading="lazy"` and `srcset` for responsive sizes
- ✅ Videos use lazy-loaded `<video>` tags with `poster` images

### File Structure

```
src/
├── assets/            # Static local assets (logos, icons, fallback images)
├── components/
│   ├── common/        # Navbar, Footer, StickyBar, WhatsAppButton, SectionHeader
│   ├── home/          # HeroSection, HighlightCards, ActivityPreview, TestimonialsSnippet
│   ├── activities/    # ActivityCard, ActivitySection
│   ├── programs/      # ProgramCard, ProgramDetail
│   ├── about/         # TeacherProfile, PhilosophySection
│   ├── contact/       # ContactForm, MapEmbed, ContactInfo
│   └── gallery/       # GalleryGrid, VideoPlayer, MediaCard
├── pages/
│   ├── HomePage.jsx
│   ├── ActivitiesPage.jsx
│   ├── AboutPage.jsx
│   ├── ProgramsPage.jsx
│   ├── ContactPage.jsx
│   └── GalleryPage.jsx
├── constants/
│   ├── media.js       # All S3 URLs centralized here
│   ├── programs.js    # Program data
│   ├── activities.js  # Activity data
│   └── testimonials.js
├── hooks/
│   └── useIntersectionObserver.js  # For scroll-triggered animations
├── utils/
│   └── s3.js          # S3 URL builder helper
├── App.jsx
└── main.jsx
```

---

## 3. Design System

### Color Palette

```css
/* Primary — Sunshine Yellow */
--color-primary:        #FFD600;
--color-primary-dark:   #F5C200;
--color-primary-light:  #FFF3B0;

/* Secondary — Sky Blue */
--color-secondary:      #2196F3;
--color-secondary-dark: #1565C0;
--color-secondary-light:#BBDEFB;

/* Accent — Leaf Green */
--color-accent:         #4CAF50;
--color-accent-dark:    #2E7D32;
--color-accent-light:   #C8E6C9;

/* Warm Coral (CTA highlight) */
--color-cta:            #FF6B35;
--color-cta-dark:       #E55A25;

/* Neutrals */
--color-bg:             #FFFDF5;   /* Warm white background */
--color-surface:        #FFFFFF;
--color-text-primary:   #1A1A1A;
--color-text-secondary: #555555;
--color-text-muted:     #888888;
--color-border:         #E8E8E8;
```

### Typography

```
Display / Hero Headings : "Nunito" (Google Fonts) — weight 800, 900
Section Headings        : "Nunito" — weight 700
Body Text               : "Poppins" — weight 400, 500
CTA Buttons             : "Poppins" — weight 600
Accent / Labels         : "Poppins" — weight 600, uppercase, letter-spacing
```

#### Type Scale (mobile-first, rem)

| Token | Mobile | Desktop |
|-------|--------|---------|
| `text-hero` | 2.25rem | 3.75rem |
| `text-h1` | 1.875rem | 3rem |
| `text-h2` | 1.5rem | 2.25rem |
| `text-h3` | 1.25rem | 1.75rem |
| `text-body` | 1rem | 1.125rem |
| `text-small` | 0.875rem | 0.875rem |
| `text-label` | 0.75rem | 0.75rem |

### Spacing

Use Tailwind's default spacing scale. Key rules:
- Section vertical padding: `py-12` (mobile), `py-20` (desktop)
- Card padding: `p-5` (mobile), `p-8` (desktop)
- Component gap: `gap-4` (mobile), `gap-6` (desktop)

### Border Radius

```
Cards          : rounded-2xl (16px)
Buttons        : rounded-full (pill shape)
Images         : rounded-xl (12px)
Chips/Tags     : rounded-full
```

### Shadows

```
card-shadow    : 0 4px 24px rgba(0,0,0,0.08)
card-hover     : 0 8px 40px rgba(0,0,0,0.14)
button-shadow  : 0 4px 14px rgba(255,107,53,0.35)  /* for CTA */
```

### Animation Principles

- Entrance: `fadeInUp` (translateY 24px → 0, opacity 0 → 1, duration 0.5s)
- Stagger children: 0.1s delay per child
- Hover: `scale(1.03)` on cards, `scale(1.05)` on buttons
- Scroll-triggered via `IntersectionObserver` (no GSAP, no ScrollTrigger)
- No animations on reduced-motion (`prefers-reduced-motion: reduce`)

---

## 4. Site Architecture & Navigation

### Pages

| Route | Page | Priority |
|-------|------|----------|
| `/` | Home | P0 |
| `/activities` | Activities | P0 |
| `/about` | About Us | P1 |
| `/programs` | Programs | P1 |
| `/contact` | Contact | P1 |
| `/gallery` | Gallery | P2 |

### Navbar

- **Logo** left-aligned (custom school logo or text-based logo with emoji 🌟)
- **Nav links** right-aligned on desktop: Home · Activities · Programs · About · Gallery · Contact
- **CTA button** in navbar: "📞 Call Now" (coral background)
- **Mobile**: Hamburger menu → full-screen slide-down drawer
- **Sticky** on scroll with `backdrop-blur` and slight shadow

### Language Toggle (English ↔ Marathi)

- A clearly visible **EN / मराठी** toggle button must be present in the **top navbar**, right-aligned next to the "Call Now" CTA button
- On mobile, it must appear inside the hamburger drawer menu **and** as a small floating pill button (top-right corner, above the WhatsApp button) so it is always accessible without opening the menu
- Toggle behavior:
  - Default language: **English**
  - On click, switches entire website text to **Marathi** (Devanagari script)
  - State persists across page navigation (store in `localStorage`)
  - Button label updates to reflect the *other* language: shows `मराठी` when in English, shows `English` when in Marathi
- Implementation approach:
  - Use a lightweight **i18n context** (`React.createContext`) — no heavy library like i18next required
  - Two JSON files: `src/locales/en.json` and `src/locales/mr.json`
  - All user-facing strings must be sourced from these files — no hardcoded text in components
  - Marathi translations cover: all headings, subheadings, button labels, descriptions, nav links, form labels, and footer text
- Font handling:
  - Load **Noto Sans Devanagari** (Google Fonts) for Marathi rendering
  - Apply font swap dynamically on language toggle via a `lang` attribute on `<html>` tag (`lang="en"` or `lang="mr"`)
- Button styling:
  - Pill shape (`rounded-full`), outlined style (border: `--color-secondary`, background: transparent)
  - Active language shown with filled background (`--color-secondary`, white text)
  - Smooth transition on toggle (0.2s)
  - Minimum touch target: 44×44px

### Footer

- School name + tagline
- Quick links (all pages)
- Contact: phone, WhatsApp, address
- Social media icons (Facebook, Instagram, YouTube — placeholder links)
- Copyright

---

## 5. Page Specifications

### 5.1 Home Page

#### Section 1 — Hero

**Layout**: Full-viewport-height section, split layout on desktop (text left, image/illustration right). On mobile, stacked with image as background overlay.

**Content**:
```
Headline (H1):
  "Where Little Stars
   Begin to Shine ✨"

Subheadline:
  "Activity-based learning rooted in Indian values.
   Nurturing curious, confident, and joyful children."

Badges (3 inline pills):
  🏆 Experienced Teacher  |  🎨 Activity-Based Learning  |  🙏 Indian Values

CTA Buttons (row):
  [📞 Call Now]   [💬 WhatsApp]   [🗓️ Book a Visit]
```

**Visuals**:
- Hero image: Happy children in classroom/activity setting (S3 URL placeholder: `HERO_IMAGE_URL`)
- Subtle animated floating shapes (circles, stars) in background — CSS keyframe animations only
- Warm yellow-to-white gradient background

**Animations**:
- Headline fades in from left, subtext fades in from bottom (staggered, 0.1s delay)
- CTA buttons pop in with slight bounce
- Hero image slides in from right

---

#### Section 2 — Trust Highlights

**Layout**: 4-column grid (desktop), 2×2 grid (tablet), 1-column (mobile)

**Cards** (icon + title + short description):

| Icon | Title | Description |
|------|-------|-------------|
| 🛡️ | Safe Environment |  child-safe premises with attentive care |
| 👩‍🏫 | Experienced Teacher | Dedicated and passionate educators with years of experience |
| 🎨 | Activity-Based Learning | Learn through play, art, music, stories, and hands-on activities |
| 🙏 | Cultural Values | Rooted in Indian traditions — festivals, discipline, and respect |

**Style**: White rounded cards, colored icon background circle, subtle hover lift

---

#### Section 3 — Activity Preview

**Layout**: Horizontal scroll row on mobile, 3-column grid on desktop

**Items** (6 cards, each with image + label):
- Art & Craft 🎨
- Dance & Music 🎵
- Storytelling 📖
- Festival Celebrations 🪔
- Healthy Habits 🥗
- Stage Confidence 🎤

Each card: Square aspect ratio image (S3 placeholder), rounded corners, gradient overlay at bottom with activity name.

**CTA**: "Explore All Activities →" button linking to `/activities`

---

#### Section 4 — Testimonials Snippet

**Layout**: Horizontal scroll carousel (mobile), 3-column grid (desktop)

**Show 3 testimonials** (see content in §11).

Each card: Quoted text, parent name, child's class/age, star rating (⭐⭐⭐⭐⭐)

**CTA**: Does not need full testimonials page — snippet is sufficient.

---

#### Section 5 — Programs CTA Banner

**Layout**: Full-width banner, warm gradient background (yellow to orange)

**Content**:
```
"Admissions Open for 2024–25 🎒"
Playschool (Age 3–5)  |  Tuition Classes (1st–10th)
[View Programs]   [Contact Us]
```

---

### 5.2 Activities Page

> **This is the key differentiator page.** It must be visually rich, emotionally engaging, and clearly communicate the unique value of each activity.

**Page Header**: Large hero banner with colorful playful background, title "Our Activities 🎉", and subtitle "Every activity is designed to develop a skill, build a habit, or celebrate a value."

---

#### Activity 1 — Art & Craft 🎨

```
Title      : Art & Craft
Tagline    : "Creating little masterpieces, one brushstroke at a time"
Description: Children explore creativity through drawing, painting, clay modelling, 
             collage making, and seasonal craft projects. Each activity develops 
             fine motor skills, patience, and self-expression.
What child learns:
  - Fine motor skill development
  - Creative thinking and imagination
  - Concentration and patience
  - Pride in their own work
Media      : [ACTIVITY_ART_IMAGE_1], [ACTIVITY_ART_IMAGE_2], [ACTIVITY_ART_VIDEO]
```

---

#### Activity 2 — Storytelling & Learning 📖

```
Title      : Storytelling & Learning
Tagline    : "Stories that spark curiosity and build vocabulary"
Description: Interactive storytelling sessions using pictures, puppets, and props. 
             Children listen, imagine, and retell stories — building language skills 
             and moral values naturally.
What child learns:
  - Language and vocabulary development
  - Listening skills and focus
  - Moral values through stories
  - Confidence to express themselves
Media      : [ACTIVITY_STORY_IMAGE_1], [ACTIVITY_STORY_IMAGE_2]
```

---

#### Activity 3 — Dance & Music 🎵

```
Title      : Dance & Music
Tagline    : "Movement, rhythm, and joy — every day"
Description: Children learn basic classical and folk dance movements, sing rhymes 
             and devotional songs, and participate in group music activities. 
             Builds coordination, rhythm, and cultural connection.
What child learns:
  - Body coordination and rhythm
  - Cultural music appreciation
  - Teamwork and synchronization
  - Joyful expression through movement
Media      : [ACTIVITY_DANCE_IMAGE_1], [ACTIVITY_DANCE_VIDEO]
```

---

#### Activity 4 — Festival Celebrations 🪔

```
Title      : Festival Celebrations
Tagline    : "Teaching India's heritage through joy and colour"
Description: We celebrate major Indian Hindu festivals with age-appropriate 
             activities, stories, and decorations. Children learn the history, 
             meaning, and values behind each festival — instilling cultural pride 
             and spiritual awareness from an early age.

Festivals celebrated (non-exhaustive):
  - Diwali 🪔 — Light, victory of good, rangoli, diyas
  - Holi 🎨 — Colours, spring, friendship
  - Ganesh Chaturthi 🐘 — Devotion, community, eco-awareness
  - Navratri / Dussehra — Dance, courage, dharma
  - Makar Sankranti 🪁 — Harvest, kite flying, sesame sweets
  - Raksha Bandhan — Sibling bond, love, protection
  - Krishna Janmashtami — Devotion, stories of Krishna

What child learns:
  - Cultural identity and pride
  - History and meaning of traditions
  - Values like gratitude, devotion, community
  - Inclusive celebration and togetherness
Media      : [ACTIVITY_FESTIVAL_IMAGE_1], [ACTIVITY_FESTIVAL_IMAGE_2], [ACTIVITY_FESTIVAL_VIDEO]
```

---

#### Activity 5 — Healthy Habits & Discipline 🥗

```
Title      : Healthy Habits & Discipline
Tagline    : "Building lifelong habits when it matters most"
Description: We focus on foundational habits that shape a child's character and 
             health. Through gentle daily routines, children develop self-reliance 
             and mindfulness.

Key habits taught:
  🤲 Eating food independently with their own hands (no spoon dependency)
  📵 No mobile/screen usage during meal times
  🧼 Hand washing before and after meals
  🙏 Saying grace / gratitude before eating
  🕐 Following a daily time-table
  🗂️ Keeping their belongings organized

What child learns:
  - Self-reliance and independence
  - Healthy relationship with food
  - Discipline and respect for routines
  - Mindfulness and presence during meals
Media      : [ACTIVITY_HABITS_IMAGE_1], [ACTIVITY_HABITS_IMAGE_2]
```

---

#### Activity 6 — Confidence & Stage Exposure 🎤

```
Title      : Confidence & Stage Exposure
Tagline    : "Because every child deserves their moment to shine"
Description: We create regular opportunities for children to perform, participate, 
             and be celebrated — building stage confidence, public speaking comfort, 
             and a healthy sense of achievement from a young age.

Events organized:
  🎭 Annual Day Performance — Dance, drama, and cultural presentations
  🏆 Prize Distribution Ceremony — Recognizing effort and achievement
  🏃 Sports Day — Healthy competition, teamwork, physical fitness
  🎓 Graduation Day — Celebrating the transition with pride and ceremony

What child learns:
  - Stage confidence and reduced performance anxiety
  - Public speaking and presentation comfort
  - Sense of achievement and self-worth
  - Sportsmanship and teamwork
Media      : [ACTIVITY_STAGE_IMAGE_1], [ACTIVITY_STAGE_VIDEO]
```

---

**Activity Card Component Spec**:

Each activity renders as a full-section block (alternating image-left / text-right layout on desktop, stacked on mobile):
- Large colorful section with icon emoji
- Activity title (H2) + tagline (italic subtitle)
- Description paragraph
- "What Your Child Learns" — styled bullet list with checkmark icons
- Media grid: 2–3 images + optional video thumbnail with play button
- Divider between sections

---

### 5.3 About Us Page

#### Section 1 — Teacher Profile

**Layout**: Image left (circular portrait), content right. Stacked on mobile.

```
Photo        : [TEACHER_PHOTO_URL]  (circular, with decorative border)
Name         : [Teacher Name]
Title        : Founder & Head Teacher
Experience   : [X] years of experience in early childhood education
Qualifications: [Placeholder: e.g., B.Ed, Montessori Certified]

Bio (2–3 paragraphs):
  Para 1: Personal story — why they started the school, love for children
  Para 2: Teaching approach — activity-based, value-driven, child-centred
  Para 3: What makes this school different — the warmth, the culture, the outcomes

Quote (pull-quote style):
  "Every child is unique. My goal is not to teach them what to think, 
   but to help them love learning."
```

---

#### Section 2 — Teaching Philosophy

**Layout**: 3-column icon grid (desktop), stacked (mobile)

| Pillar | Description |
|--------|-------------|
| 🌱 Child-Led Learning | We follow the child's curiosity. Activities are designed to engage, not enforce. |
| 🙏 Values First | Respect, discipline, gratitude — these are not rules, they are habits we build daily. |
| 🎨 Learn by Doing | Worksheets alone don't teach. We learn through touch, movement, colour, and experience. |
| 🤝 Parent Partnership | We keep parents informed and involved — because education happens at home too. |
| 🌍 Cultural Rootedness | Indian heritage, stories, and festivals are woven into daily learning — not as a subject, but as a way of life. |
| ❤️ Safe & Nurturing | Every child should feel safe, seen, and celebrated. Our classroom is their second home. |

---

#### Section 3 — School Story / Timeline

Simple visual timeline (vertical on mobile, horizontal on desktop):
```
[Year Founded] — School established with vision of value-based early education
[Year]         — First Annual Day celebration
[Year]         — Expanded tuition centre (1st–10th)
[Year]         — [Any milestone]
Today          — Growing community of happy children and trusting parents
```

---

### 5.4 Programs Page

#### Program 1 — Playschool (Primary Focus)

```
Program Name   : Playschool
Target Age     : 3 to 5 years
Tagline        : "The best start to a lifetime of learning"

Overview:
  Our playschool program is built on the belief that the first 5 years are the most 
  critical for brain development. Every day is structured yet joyful — combining 
  structured learning with free play, cultural activities, and healthy habit formation.

What We Offer:
  📚 Pre-literacy and pre-numeracy foundations
  🎨 Daily art, craft, and creative expression
  🎵 Music, rhymes, and dance
  🙏 Moral stories and value education
  🪔 Festival celebrations and cultural awareness
  🌿 Healthy habits and independence training
  🎤 Stage activities and confidence building

Structure:
  Timing                   : [e.g., 10:00 AM – 1:00 PM]
  Days                     : Monday to Friday
  Student Teacher ratio    : 10 : 1 student to teacher
  Medium                   : Marathi / English 
  Fees                     : [Contact us for current fee structure]

Admission:
  Admissions open for [Year]. Limited seats available.
  [Book a Visit] button
```

---

#### Program 2 — Tuition Classes (Secondary Focus)

```
Program Name   : Tuition Classes
Target Group   : 1st Standard to 10th Standard
Tagline        : "Strong foundations, better results"

Overview:
  Our tuition program provides personalized academic support to school-going children. 
  Small batch sizes ensure every child gets individual attention. We focus not just 
  on marks, but on building genuine understanding.

Subjects Covered:
  Primary (1st–5th)  : All subjects — Maths, English, Marathi, Hindi, EVS
  Secondary (6th–10th): Maths, Science, English, Social Science, Hindi/Marathi

Teaching Style:
  ✅ Concept clarity over rote learning
  ✅ Homework support and doubt clearing
  ✅ Regular revision tests
  ✅ Parent progress updates

Structure:
  Timing        : [e.g., 4:00 PM – 7:00 PM] (weekdays), [9:00 AM – 12:00 PM] (weekends)
  Batch Size    : Maximum 8–10 students per batch
  Mode          : Offline (in-person)
  Fees          : [Contact us for current fee structure]
```

---

#### Program Comparison Table

| Feature | Playschool | Tuition |
|---------|-----------|---------|
| Age Group | 3–5 years | 6–16 years |
| Batch Size | Max 15 | Max 10 |
| Focus | Holistic development | Academic support |
| Activities | Yes (art, dance, festivals) | Limited (revision tests) |
| Cultural Component | Strong | Moderate |
| Parent Updates | Weekly | Monthly |

---

### 5.5 Contact Page

#### Contact Information Block

```
📞 Phone        : [PHONE_NUMBER]  → click-to-call link (tel:)
💬 WhatsApp     : [WHATSAPP_NUMBER] → wa.me link with pre-filled message
📍 Address      : [Full address, Pune, Maharashtra]
🕐 Office Hours : Mon–Sat, 9:00 AM – 6:00 PM
```

#### Embedded Map

```
Google Maps embed (iframe) for the school address.
Placeholder: Use a static maps image with a link to Google Maps as fallback.
iframe src: [GOOGLE_MAPS_EMBED_URL]
Height: 320px on mobile, 400px on desktop
```

#### Contact Form (Frontend Only)

```
Fields:
  - Parent Name (text, required)
  - Child's Name (text, required)
  - Child's Age (number, 1–10, required)
  - Program Interest (dropdown: Playschool / Tuition / Both)
  - Phone Number (tel, required)
  - Message (textarea, optional)

Submit Button: "Send Inquiry 📩"

Note: Form does NOT submit to any backend. On submit:
  → Show a success message: "Thank you! We'll call you within 24 hours. 🙏"
  → Optionally open WhatsApp with pre-filled message using form data
```

#### WhatsApp Pre-filled Message Template

```
https://wa.me/[WHATSAPP_NUMBER]?text=Hello%2C%20I%20am%20interested%20in%20admissions%20for%20my%20child.%20Please%20contact%20me.
```

---

### 5.6 Gallery Page

#### Layout

- Masonry grid (desktop), 2-column grid (mobile)
- Mixed media: photos and videos
- Filter tabs: All | Playschool | Activities | Festivals | Events | Tuition

#### Media Card Component

```
Photo card : Image (lazy loaded from S3), hover overlay with zoom effect
Video card : Poster image + play button overlay → opens in modal lightbox
```

#### Lightbox Modal

- Opens on click of any media card
- Shows full image or plays video
- Close button + keyboard ESC support
- Swipe-to-close on mobile

---

## 6. Global Components

### 6.1 Sticky Top Navbar

```jsx
// Behavior
- Transparent on hero sections, white with shadow on scroll (threshold: 50px)
- Smooth transition on scroll state change
- Active link highlighting via React Router NavLink

// Mobile
- Hamburger icon (3 lines → X on open)
- Full-screen overlay menu with slide-down animation
- Menu items: large, touch-friendly (min 48px height)
- Close on route change
```

### 6.2 Sticky Bottom Bar (Mobile Only)

```
Visible only on screens < 768px.
Fixed to bottom, always visible (above fold).
Two equal buttons:

[ 📞 Call Now ]    [ 💬 WhatsApp ]

Styling:
  - Background: white, top border, subtle shadow
  - Call button: coral/orange (#FF6B35)
  - WhatsApp button: green (#25D366)
  - Height: 60px
  - Text: Poppins Semi-Bold, 14px
  - Icons: Lucide React (Phone, MessageCircle)
```

### 6.3 Floating WhatsApp Button (Desktop)

```
Position: fixed, bottom-right (bottom: 24px, right: 24px)
Visible on screens ≥ 768px.
Circle button (56px diameter), WhatsApp green (#25D366)
WhatsApp icon (white)
Pulse animation (box-shadow pulse, subtle)
Tooltip on hover: "Chat with us on WhatsApp"
```

### 6.4 Section Header Component

```jsx
// Props: title, subtitle, align ('left' | 'center'), colorAccent
// Renders:
//   - Decorative colored underline / badge above title
//   - H2 title (Nunito, Bold)
//   - Subtitle paragraph (Poppins, muted color)
//   - Centered or left-aligned based on prop
```

### 6.5 CTA Button Component

```jsx
// Variants: primary (coral), secondary (blue), whatsapp (green), outline
// Sizes: sm, md, lg
// Always rounded-full (pill shape)
// Includes optional icon prop (Lucide icon component)
// Hover: slight scale up + darker shade
// Active: scale down slightly
```

### 6.6 Testimonial Card Component

```jsx
// Props: quote, parentName, childInfo, rating (1-5)
// Renders:
//   - Large quote mark (decorative, yellow)
//   - Quote text (italic)
//   - Star rating row
//   - Parent name + child info (e.g., "Priya M. — Mother of Aarav, Age 4")
//   - White card with soft shadow
```

---

## 7. Media & Asset Strategy

### S3 URL Pattern

All media assets are hosted on AWS S3. Use a centralized constants file:

```javascript
// src/constants/media.js

const S3_BASE = "https://[YOUR-BUCKET].s3.[REGION].amazonaws.com";

export const MEDIA = {
  hero: {
    heroImage:          `${S3_BASE}/hero/hero-main.webp`,
    heroImageMobile:    `${S3_BASE}/hero/hero-main-mobile.webp`,
  },
  activities: {
    artImage1:          `${S3_BASE}/activities/art-craft-1.webp`,
    artImage2:          `${S3_BASE}/activities/art-craft-2.webp`,
    artVideo:           `${S3_BASE}/activities/art-craft.mp4`,
    artVideoPoster:     `${S3_BASE}/activities/art-craft-poster.webp`,
    danceImage1:        `${S3_BASE}/activities/dance-music-1.webp`,
    danceVideo:         `${S3_BASE}/activities/dance-music.mp4`,
    festivalImage1:     `${S3_BASE}/activities/festival-1.webp`,
    festivalImage2:     `${S3_BASE}/activities/festival-2.webp`,
    festivalVideo:      `${S3_BASE}/activities/festival.mp4`,
    storyImage1:        `${S3_BASE}/activities/storytelling-1.webp`,
    habitsImage1:       `${S3_BASE}/activities/healthy-habits-1.webp`,
    stageImage1:        `${S3_BASE}/activities/stage-confidence-1.webp`,
    stageVideo:         `${S3_BASE}/activities/stage-confidence.mp4`,
  },
  gallery: {
    // Array of objects: { type: 'image'|'video', src, poster?, category, caption }
    items: []           // Populated as gallery grows
  },
  about: {
    teacherPhoto:       `${S3_BASE}/about/teacher-profile.webp`,
    classroomImage:     `${S3_BASE}/about/classroom.webp`,
  },
};
```

### Image Optimization Rules

| Rule | Detail |
|------|--------|
| Format | WebP with JPEG fallback (`<picture>` tag) |
| Compression | 80% quality for WebP |
| Responsive | `srcset` with 400w, 800w, 1200w variants |
| Lazy Loading | `loading="lazy"` on all below-fold images |
| Dimensions | Always specify `width` and `height` to prevent layout shift |
| Placeholder | Low-quality blur placeholder or dominant color placeholder |

### Video Optimization Rules

| Rule | Detail |
|------|--------|
| Format | MP4 (H.264) for compatibility |
| Compression | Target < 5MB per clip for mobile |
| Autoplay | Only muted, and only if `prefers-reduced-motion` is not set |
| Poster | Always include a poster image (first frame WebP) |
| Lazy Load | Use `IntersectionObserver` to load video `src` only when in viewport |
| Controls | Show native controls or custom play button |

---

## 8. Performance Requirements

### Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance (Mobile) | ≥ 85 |
| First Contentful Paint (FCP) | < 2.0s on 3G |
| Largest Contentful Paint (LCP) | < 3.5s on 3G |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total Blocking Time (TBT) | < 300ms |
| Bundle Size (initial JS) | < 150KB gzipped |

### Implementation Checklist

- [ ] Code-split each page route with `React.lazy` + `Suspense`
- [ ] Lazy load all images below the fold
- [ ] Lazy load video sources with `IntersectionObserver`
- [ ] Use `font-display: swap` for Google Fonts
- [ ] Preload hero image (`<link rel="preload">`)
- [ ] Minify and tree-shake with Vite production build
- [ ] Compress all S3 assets before upload (WebP, optimized MP4)
- [ ] Use `will-change` sparingly (only on animated elements)
- [ ] Debounce scroll event listeners
- [ ] Avoid render-blocking scripts

---

## 9. Mobile Experience

### Breakpoints (Tailwind defaults)

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Slight layout adjustments |
| `md` | 768px | Tablet — 2-column grids |
| `lg` | 1024px | Desktop — full layouts |
| `xl` | 1280px | Wide desktop |

### Touch & Interaction Rules

- All tappable targets: minimum 48×48px
- Sufficient padding between interactive elements (min 8px gap)
- No hover-only interactions — all have tap equivalents
- Swipe support on carousels and gallery lightbox
- Scroll-jacking: **avoided entirely**
- Forms: input font-size ≥ 16px to prevent iOS zoom on focus

### Mobile-First Layout Patterns

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Hero | Stacked, text over image | Side by side | Side by side |
| Highlights | 1 column | 2×2 grid | 4 columns |
| Activity preview | Horizontal scroll | 3 columns | 3 columns |
| Testimonials | Carousel (1 visible) | 2 columns | 3 columns |
| Programs | Stacked cards | 2 columns | 2 columns |
| Activity sections | Stacked | Stacked | Alternating L/R |
| Gallery | 2-col grid | 3-col grid | Masonry 4-col |
| Contact | Stacked | Stacked | 2 columns |

---

## 10. SEO Requirements

### Meta Tags (per page)

```html
<!-- Home -->
<title>Little Stars Playschool | Best Playschool in Pune | Activity-Based Learning</title>
<meta name="description" content="Enroll your child in the best playschool in Pune. Activity-based learning, Indian cultural values, experienced teacher. Call now for admissions.">
<meta name="keywords" content="playschool near me, best playschool in Pune, nursery school Pune, activity based playschool, Indian values playschool">

<!-- Activities -->
<title>Activities | Art, Dance, Festivals & More | Little Stars Playschool Pune</title>

<!-- Programs -->
<title>Programs | Playschool & Tuition Classes in Pune | Little Stars</title>

<!-- Contact -->
<title>Contact Us | Playschool Admissions Pune | Little Stars</title>
```

### Structured Data (JSON-LD)

Include on Home page:

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "[School Name]",
  "description": "Activity-based playschool and tuition centre in Pune",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Address]",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "[PIN]",
    "addressCountry": "IN"
  },
  "telephone": "[PHONE]",
  "url": "[WEBSITE_URL]",
  "openingHours": "Mo-Sa 09:00-18:00"
}
```

### Heading Structure

- Each page has exactly **one `<h1>`**
- Section titles use `<h2>`
- Sub-sections use `<h3>`
- No heading levels skipped

### Image Alt Text

- All images must have descriptive `alt` text
- Example: `alt="Children doing art and craft at Little Stars Playschool Pune"`

---

## 11. Content Placeholders

### School Information (to be filled by owner)

```
SCHOOL_NAME           = "[School Name]"
SCHOOL_TAGLINE        = "Where Little Stars Begin to Shine"
PHONE_NUMBER          = "[+91-XXXXXXXXXX]"
WHATSAPP_NUMBER       = "[+91-XXXXXXXXXX]"  (with country code, no spaces/dashes)
EMAIL                 = "[email@domain.com]"
ADDRESS_LINE_1        = "[Building/Street]"
ADDRESS_LINE_2        = "[Area/Locality]"
CITY                  = "Pune"
STATE                 = "Maharashtra"
PIN_CODE              = "[411XXX]"
GOOGLE_MAPS_URL       = "[Google Maps short link]"
GOOGLE_MAPS_EMBED_URL = "[Google Maps embed iframe src]"
FACEBOOK_URL          = "[facebook.com/...]"
INSTAGRAM_URL         = "[instagram.com/...]"
YOUTUBE_URL           = "[youtube.com/@...]"
TEACHER_NAME          = "[Teacher's Full Name]"
TEACHER_EXPERIENCE    = "[X] years"
YEAR_FOUNDED          = "[YYYY]"
```

### Sample Testimonials

```
Testimonial 1:
  Quote     : "My daughter has transformed completely since joining this playschool. 
               She is more confident, eats on her own, and keeps talking about the 
               festivals they celebrate at school. Best decision we made!"
  Parent    : Priya Sharma
  Child Info: Mother of Ananya, Age 4

Testimonial 2:
  Quote     : "The teacher's dedication is unmatched. My son Rohan looks forward to 
               school every single day. The activities are so thoughtful and he is 
               learning values that we don't even teach at home!"
  Parent    : Rajesh Kulkarni
  Child Info: Father of Rohan, Age 4.5

Testimonial 3:
  Quote     : "We enrolled for tuition classes for our 7th standard daughter, and the 
               results speak for themselves. Small batches mean real attention. 
               Highly recommended!"
  Parent    : Sunita Patil
  Child Info: Mother of Shreya, 7th Standard
```

---

## 12. Acceptance Criteria

### Functionality

- [ ] All 6 pages render correctly on Chrome, Firefox, Safari (mobile + desktop)
- [ ] All navigation links work correctly
- [ ] Call Now button opens phone dialer on mobile
- [ ] WhatsApp button opens WhatsApp with pre-filled message
- [ ] Book a Visit button links to contact page or opens modal
- [ ] Contact form shows success state on submit (no backend required)
- [ ] Gallery lightbox opens, navigates, and closes correctly
- [ ] Sticky bottom bar visible on mobile, hidden on desktop
- [ ] Floating WhatsApp button visible on desktop, hidden on mobile (sticky bar handles it)

### Performance

- [ ] Lighthouse performance score ≥ 85 on mobile
- [ ] No console errors on any page
- [ ] All images have alt text
- [ ] Page does not shift layout on load (CLS < 0.1)

### Design & UX

- [ ] Design matches playful, bright, mobile-first aesthetic
- [ ] All text is legible on mobile (minimum 16px body text)
- [ ] All touch targets are at least 48×48px
- [ ] Animations do not play if `prefers-reduced-motion` is enabled
- [ ] Dark mode is NOT required (light mode only)

### Language Toggle

- [ ] EN / मराठी toggle is visible in navbar on desktop
- [ ] Toggle is accessible on mobile (inside drawer + floating pill)
- [ ] Entire website switches to Marathi on toggle — no hardcoded English strings remain
- [ ] Language preference persists across page refreshes (localStorage)
- [ ] Marathi text renders correctly using Noto Sans Devanagari font
- [ ] `<html lang>` attribute updates on toggle
- [ ] Button clearly shows which language you will switch *to*, not the current language


### Code Quality

- [ ] Component-based architecture (no monolithic page files)
- [ ] All S3 URLs centralized in `src/constants/media.js`
- [ ] No hardcoded colors outside Tailwind config / CSS variables
- [ ] Consistent code formatting (Prettier config included)
- [ ] README.md included with setup instructions and S3 asset guide

---

*Document Version: 1.0*
*Last Updated: April 2026*
*Owner: School Admin*
*Intended Audience: Frontend Agent / Developer*
