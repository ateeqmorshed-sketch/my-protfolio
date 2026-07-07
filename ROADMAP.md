# Portfolio roadmap

## Current state (v4 — latest)

- Light "gallery" design with sticky top header (rail retired)
- 5 case studies, each opening with REAL captured screenshots (Flutter app run via
  local CanvasKit patch; ONS/Doctor Ase/Green World stack booted from their repos —
  Green World shows real admin/shop/staff-app logins) + story-chip feature scenes
- 15 free tools (incl. Alberta Class 7 test that funnels to Labbaik App, and
  lease-vs-finance) with benefit-state preview images
- Bow & Ember concept restaurant (Calgary-time aware)
- Project estimator with pre-filled quote emails, FAQ (+ FAQPage schema),
  free website check-up offer
- Local SEO: Calgary title/geo meta/en_CA, ProfessionalService schema (areaServed
  Calgary/AB/Canada), canonicals on all 17 pages, sitemap.xml + robots.txt, fresh
  Calgary-branded og.png, 404.html
- Site copy contains no build-process/tooling mentions (owner request)

## Owner actions pending (highest value, only owner can do)

1. Merge branch → main (deploy workflow fires) · delete branch after merge
2. Google Search Console: submit sitemap
3. Google Business Profile (service-area, Calgary)
4. Buy ateeqmorshed.com → then swap canonical/sitemap URLs (one commit)
5. Ask Labbaik + ONS owners for one-line testimonials (never fabricate)

Working notes so any future session can continue exactly where this one stopped.
Branch: `claude/portfolio-project-sdr6a3`.

## Done

- [x] Portfolio site (hero, live-demo case cards, feature breakdowns, services, process, stack, contact)
- [x] Animated live demos on all five case-study mockups
- [x] Six free tools under `/apps/`, linked from the Free Tools section:
  - `apps/citizenship-test/` — Canadian citizenship mock exam (48-question bank)
  - `apps/crs-calculator/` — Express Entry CRS score calculator (2025 rules)
  - `apps/schengen/` — Schengen 90/180 rolling-window calculator
  - `apps/unit-price/` — grocery unit price comparator
  - `apps/invoice/` — invoice generator with print-to-PDF
  - `apps/zakat/` — zakat calculator with nisab from metal prices
- [x] OG image, apple-touch-icon, robots.txt, skip link, focus states, noscript fallback

## Done (v2)

- [x] Full redesign: light "gallery" theme, fixed identity rail, Bricolage/Archivo/Space Mono
- [x] Four more tools (10 total): `apps/g1-practice/`, `apps/clb-converter/`,
  `apps/presence-calculator/`, `apps/mortgage/`

## Monetization plan (owner asked for revenue)

The tools are traffic assets. Realistic revenue paths, in order of effort:
1. **Deploy + AdSense**: the immigration/driving tools target high-CPC keywords
   (mortgage, immigration). Needs the site live on a domain first, then an AdSense
   application. Reserve one ad slot per tool below the result card.
2. **Affiliates**: CLB converter + CRS calculator → IELTS/CELPIP prep course affiliate
   links; mortgage calculator → mortgage broker/rate-comparison referral programs
   (e.g. Ratehub-style partners); G1 practice → driving school cross-promo (Labbaik!).
3. **Client funnel**: every tool footer already links "need an app? get in touch".
4. **Paid tier later**: G1/citizenship banks can grow into a paid "full 300-question"
   version via Stripe payment link — only after free traffic proves demand.
Rule: never fake reviews/urgency; keep disclaimers on regulated topics.

## Done (v3)

- [x] Three restaurant business tools: `apps/qr-menu/`, `apps/table-booking/`, `apps/food-cost/`
- [x] **Bow & Ember** (`apps/bow-ember/`) — full concept restaurant for Calgary; Mountain-Time
  aware (live open-now status, auto brunch/lunch/dinner menu), WhatsApp reservations
- [x] GitHub Pages deploy workflow (`.github/workflows/pages.yml`) — fires when owner merges to main

## How to publish (owner action — one time)

1. Open https://github.com/ateeqmorshed-sketch/my-protfolio → "Compare & pull request"
   for branch `claude/portfolio-project-sdr6a3` → merge it into `main` (create main if prompted).
2. The Pages workflow deploys automatically → site at
   https://ateeqmorshed-sketch.github.io/my-protfolio/
   (check Actions tab for the run; first run may need Settings → Pages → Source: GitHub Actions).
3. Alternative/parallel: vercel.com/new → import the repo → deploy (preset: Other).

## Next (in priority order)

1. **Deploy**: merge to `main`, import repo on Vercel (preset "Other"). Needs Ateeq's go-ahead.
2. **Absolute OG URLs**: after deploy, replace relative `assets/og.png` references in `index.html` with the real domain.
3. **Real screen recordings**: record Labbaik App / ONS / Doctor Ase screens (needs network access to the live apps or local runs) and swap into case cards as `<video muted loop>`.
4. **Per-tool SEO**: sitemap.xml with the six tool URLs once the domain exists; unique OG images per tool.
5. **Tool ideas not yet built** (validated for usefulness/low competition):
   - Ontario G1 / BC knowledge-test practice (reuses citizenship-test engine — swap question bank)
   - IELTS ↔ CLB converter (tiny, pairs with CRS calculator)
   - Canadian rent increase checker (needs per-province guideline data with sources)
   - Prayer times widget for the Labbaik/ONS audience
6. **Analytics**: add a privacy-friendly counter (e.g. Plausible/GoatCounter) when there's a domain.
7. **Testimonials**: collect one line each from Labbaik and ONS owners — real quotes only.

## Content guardrails (keep)

- Never invent projects, metrics or testimonials.
- Tools must carry "estimate/unofficial" disclaimers where they touch legal/immigration/religious rules.
- Question banks and rule tables must cite their source (Discover Canada, IRCC CRS tables, EU 90/180 rule).
