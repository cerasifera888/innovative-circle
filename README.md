# Innovative Circle — Landing Page

A static, single-page landing site that converts warm, personally-referred leads into
booked "fit calls". Built with **Astro + Tailwind CSS v4**, output as pure static HTML and
designed to deploy on **Netlify** (with Netlify Forms handling lead capture — no backend).

> Brand: strict monochrome (black `#0A0A0A`, dark grey `#1F1F1F`, light grey `#E5E5E5`,
> white). Minimal, premium, club-like. Typeface: Inter (self-hosted via `@fontsource`).

---

## Local development

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # static build → ./dist
npm run preview    # serve the production build locally
```

Requirements: Node 18.20.8+, 20.3+, or 22+ (Netlify build pinned to Node 20).

---

## Project structure

```
src/
├─ layouts/Base.astro        # <head>, meta/OG tags, fonts, analytics slot
├─ components/
│  ├─ Header.astro           # sticky nav + CTA
│  ├─ Hero.astro             # H1 + abstract network backdrop
│  ├─ WhatIs.astro
│  ├─ HowItWorks.astro       # 3-step process
│  ├─ AudienceBlock.astro    # reused for Tech Solutions + Merchants
│  ├─ SocialProof.astro      # 8 participant logos (PLACEHOLDERS)
│  ├─ WhyDifferent.astro
│  ├─ FitCallForm.astro      # final CTA + Netlify form + inline success
│  ├─ Faq.astro
│  ├─ Footer.astro
│  └─ Button.astro
├─ pages/
│  ├─ index.astro            # the landing page
│  └─ success.astro          # no-JS form fallback / thank-you page
└─ styles/global.css         # Tailwind import + design tokens (@theme)
public/                      # favicon, og-image, robots.txt, (logos/ → add here)
```

---

## Netlify configuration (deploy when ready)

Everything is pre-wired; no code changes needed to go live.

### 1. Connect the repo
Netlify → **Add new site → Import an existing project** → pick this repo.
Build settings are read from [`netlify.toml`](./netlify.toml):

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `20` (via `NODE_VERSION`) |

### 2. Forms (lead capture) — already set up
The `fit-call` form in `FitCallForm.astro` uses `data-netlify="true"` + a hidden
`form-name` field, so Netlify auto-detects it in the built HTML at deploy. Captured fields:
`full-name`, `work-email`, `linkedin`, `company`, `role`, `whatsapp`, `consent`.

After the first deploy:
- **Site configuration → Forms** — confirm `fit-call` appears and submissions arrive.
- **Forms → Settings & notifications** — add an email notification (and/or a Slack/webhook)
  so the team is pinged on each new lead.
- Spam: a honeypot (`bot-field`) is included; optionally enable Netlify's reCAPTCHA.

Submission UX: with JS, users see an inline success state (no reload); without JS the form
posts natively and lands on `/success`.

### 3. Analytics — required for the 20% conversion goal
Success is measured as `registrations ÷ visits` (target: 20% in 60 days). Enable one:
- **Plausible** (recommended, privacy-friendly): uncomment the script in `Base.astro` and set
  `data-domain`. The form already fires a `fit_call_request` event on success.
- **GA4**: add the gtag snippet to `Base.astro`; the `fit_call_request` event is also fired.
- Netlify's built-in Analytics + Form submission count work as a server-side cross-check.

### 4. Custom domain
Netlify → **Domain management** → add the domain. Then update:
- `site` in `astro.config.mjs`
- the `Sitemap:` URL in `public/robots.txt`

---

## Before launch — replace these placeholders

- [ ] **Company logos** — drop official assets into `public/logos/<slug>.svg`
      (`guess`, `mars`, `balearia`, `diageo`, `decathlon`, `rakuten`, `schwarz`, `unilever`)
      and swap the `<span>` wordmark for an `<img>` in `SocialProof.astro`.
- [ ] **Contact email** — `contactEmail` in `Footer.astro`.
- [ ] **OG image** — replace `public/og-image.svg` with a 1200×630 PNG and update the path
      in `Base.astro` (social platforms don't render SVG cards).
- [ ] **Analytics domain** — `Base.astro`.
- [ ] **Production URL** — `site` in `astro.config.mjs` + `robots.txt`.
- [ ] **Privacy policy** — optionally link one from the consent line in `FitCallForm.astro`.

---

## Content source

All copy is taken verbatim from the project spec ("Info doc Innovative Circle Landing Page"
and "Innovative Circle MVP Outlined"). Edit copy directly in the component files.
