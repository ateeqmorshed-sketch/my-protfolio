# Portfolio roadmap

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
