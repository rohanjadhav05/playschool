# TODOS — Atharva Playschool

Last updated: 2026-04-24 (DX review pass)

---

## P1 — Must resolve before launch

### TODO-3B: Collect real parent testimonials meeting the specificity standard
**What:** Collect 3 real parent testimonials from actual Atharva parents before launch. Each quote must include at least one specific observable outcome (e.g., "Ananya started eating independently after the second week" — not "she transformed completely"). No star ratings needed.
**Why:** The design review established that generic testimonials ("best decision we made," "dedication is unmatched") read as AI-generated placeholders to skeptical parents. A parent who got a WOM referral and checks the site should see proof that reinforces the referral, not marketing copy that undermines it.
**Suggested process:** Teacher identifies 2-3 parents who've seen specific changes in their child. Owner messages them on WhatsApp, asks for one specific thing their child does differently now. Owner writes it up in 2-3 sentences in English and Marathi. Commit to `src/data/testimonials.json`.
**Effort:** S (human 1-2 hours to collect, CC 15 min to format and commit)
**Blocked by:** Teacher/owner participation. Must launch with real testimonials, not sample placeholders.

---

### TODO-1: Photo collection workflow document
**What:** Write a step-by-step guide for collecting photos from the teacher and getting them into the repo.
**Why:** The teacher uses WhatsApp. Without a documented process, the content gap before launch is a people/process problem with no resolution path.
**Suggested workflow:** Teacher WhatsApps photos to school owner → compress to WebP (Squoosh.app) → commit to `src/assets/` → push → Netlify auto-deploys.
**Effort:** S (human 2 hours / CC 30 min to write the guide)
**Blocked by:** School owner's participation (need to agree on a WhatsApp number for asset collection)

---

### TODO-2: Fork-to-deploy README + test deployment
**What:** Write and test a fork → config → deploy README. Actually fork the repo and deploy a dummy school to validate the < 30 minute claim.
**Why:** The < 30 minute deploy SLA is the template model's core claim. Untested, it's a hypothesis. Tested, it's a promise you can make to school #2.
**Sections to cover:** Prerequisites (Node >= 18, npm, git, Netlify account), fork repo, fill school.config.js (field-by-field reference table with format comments), fill src/data/*.json, npm run dev preview, push to Netlify, post-deploy checklist. Two-section structure: Basic path (5-15 min, no videos) + S3 Videos appendix.
**Must include:** Deployment timer at the top (Start: ___ End: ___). Post-deploy checklist must include: replace placeholder data in src/data/, verify WhatsApp opens correct number, note that Netlify URL is immediately live but custom domain needs 24-48h DNS propagation.
**Must test:** Measure actual time using the timer. Document friction points. Fix anything that takes unexpectedly long. Target: basic path in 5-15 min.
**Effort:** M (human 3 hours / CC 1 hour)

---

### TODO-4B: Create placeholder template data in src/data/
**What:** Replace Atharva's real content in `src/data/` with obviously fake placeholder data before the template is published for school #2 use. Fake school name: "Sunflower Playschool." Fake teacher, fake testimonials with the right structure (name, child age, specific outcome), fake activities.
**Why:** A deployer who forks the template and doesn't fully replace all JSON content will launch their school's website with Atharva's testimonials, activities, and programs as their own. Silent launch bug that's hard to catch and trust-breaking if noticed.
**Suggested approach:** Create `src/data/` with fake data as part of initial implementation. The real Atharva data gets added as the deployer fills in real content per the post-deploy checklist.
**Effort:** S (human 30 min / CC 10 min)
**Blocked by:** Implementation of src/data/ structure (happens during build phase, not before).

---

## P2 — Before school #2

### TODO-3: Validate school #2 interest before Atharva launch
**What:** Get verbal interest from at least one other school owner before Atharva goes live.
**Why:** If no school #2 exists when Atharva launches, the template model is unvalidated. Approaching school #2 with a live demo is the most direct validation.
**How:** Show Atharva's live URL + "I can do the same for your school in 30 minutes" pitch.
**Blocked by:** Atharva launch (need a live demo)

---

### TODO-4: Do The Assignment (parent behavior validation)
**What:** Sit with 3 parents in Karad who enrolled their kids in a school in the last 12 months. Watch them evaluate a school website on their phone. Don't explain — observe.
**What to observe:** Do they scroll past the hero? What do they click first? Do they look at photos or read text? What makes them open WhatsApp?
**Why:** The trust-first hypothesis (activities + cultural values = trust) is reasonable but entirely unvalidated. 90 minutes of observation could reorder the homepage sections or reveal a signal we missed (e.g., batch size or teacher credentials matter more than activities).
**Note:** This is from The Assignment in the design doc. Not a code task. Do this before or during the build — not after launch.

---

## P3 — v2 (after school #2 is signed)

### TODO-5: Migrate photos from src/assets/ to S3 + CloudFront
**What:** Move committed photos to S3. Update media.js to use S3 URLs.
**Why:** As the gallery grows (100+ photos), committed assets slow down builds and repo clone times. S3 is the right long-term home.
**Trigger:** When gallery exceeds ~50 photos OR when school #2 has significantly different photos.

### TODO-6: Netlify "Deploy to Netlify" one-click button (Approach C)
**What:** GitHub template repo + Netlify deploy button. Anyone can fork and deploy with zero CLI.
**Why:** Scales the template model beyond personal outreach. Any school owner who finds the GitHub repo can deploy themselves.
**Trigger:** After school #2 is signed and the fork-to-deploy flow is validated.

### TODO-7: Pricing model validation
**What:** Test whether ₹2,000–5,000/year is the right price point.
**How:** Pitch school #2 at ₹3,000/year for setup + hosting support. See if they pay.
**Why:** The unit economics look fine (infrastructure ~₹500/school/year), but willingness to pay is unvalidated.
