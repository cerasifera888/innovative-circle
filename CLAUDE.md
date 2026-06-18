# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Innovative Circle** — a single-page marketing landing site (MVP). It converts warm,
personally-referred leads into booked "fit calls" via a lead-capture form. One page serves two
audiences in clearly separated blocks: **Tech Solutions** (early-stage founders) and
**Merchants** (retail / e-commerce decision-makers).

- **Success metric:** form conversion rate — registrations ÷ visits. Target 20% in 60 days.
  Every change to the page or form should protect this funnel.
- **Copy source of truth:** the two spec PDFs in `~/Downloads`
  ("Info doc Innovative Circle Landing Page.pdf" and "Innovative Circle MVP Outlined.pdf").
  Marketing copy is transcribed verbatim — don't paraphrase it without being asked.
- **Status:** built and verified locally; **not deployed**. Netlify config is ready.

## Commands

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # static build → dist/
npm run preview   # serve the production build locally
```

Requires Node ≥ 20 (Netlify build pins Node 20 via `netlify.toml`).

## Stack & architecture

- **Astro 5** (default static output) + **Tailwind CSS v4** via the `@tailwindcss/vite` plugin.
- Self-hosted fonts (`@fontsource-variable/inter`); sitemap via `@astrojs/sitemap`.
- `src/pages/index.astro` composes section components from `src/components/`.
  `AudienceBlock.astro` is reused (props-driven) for both Tech Solutions and Merchants.
- `src/pages/success.astro` — no-JS form fallback / thank-you page.
- `src/layouts/Base.astro` — `<head>`, meta/OG tags, fonts, analytics slot.

### Tailwind v4 — read before styling
There is **no `tailwind.config.js`**. Design tokens live in `src/styles/global.css` inside an
`@theme {}` block. Custom color utilities derive from the token names:
`--color-ink` → `bg-ink`/`text-ink`/`border-ink`, plus `coal`, `graphite`, `hairline`, `mist`,
`fog`. Add or change palette there, not in a JS config.

## Design constraints (from the spec — do not drift)

- **Strict monochrome only:** black `#0A0A0A`, dark grey `#1F1F1F`, light grey `#E5E5E5`, white
  (plus a few intermediate greys for hairline borders / muted text). **No color accents.**
- Dark, minimal, premium / "club-like" feel (reference: peec.ai). Typeface: Inter.
- **The primary button is intentionally inverted on the dark theme — white background, black
  text.** A literal black-on-black button would be invisible. Keep it inverted.
- Tone of copy: premium, calm, confident, collaborative — never salesy.
- Mobile: every section must stack cleanly and CTAs stay large.

## Lead form — handle with care (`src/components/FitCallForm.astro`)

This is the conversion point and uses **Netlify Forms** (no backend). When editing it:

- Keep `name="fit-call"`, `data-netlify="true"`, the hidden `<input name="form-name">` (its value
  must match the form name), and the `bot-field` honeypot.
- The form **must remain in the statically rendered HTML** — Netlify detects it at deploy by
  parsing the built output. Do not move it behind client-only rendering or a conditional.
- Fields: `full-name`, `work-email`, `linkedin` (required), `company`, `role` (required),
  `whatsapp` (optional), `consent` (required — GDPR checkbox, EU leads).
- Progressive enhancement: with JS the form submits via fetch, shows inline success, and fires a
  `fit_call_request` analytics event; on failure or without JS it submits natively to `/success`.
  Preserve **both** paths.

## Pre-launch placeholders (intentionally fake — flagged in code)

- **Company logos** — text wordmarks in `SocialProof.astro`; real assets are pending from the
  client. Add to `public/logos/<slug>.svg` and swap each `<span>` for an `<img>`.
- Contact email (`Footer.astro`), OG image (`public/og-image.svg` → needs a 1200×630 PNG),
  analytics `data-domain` (`Base.astro`), production `site` URL (`astro.config.mjs` + `robots.txt`).

See [README.md](README.md) for the full Netlify deploy walkthrough and the launch checklist.

## Environment notes

- `npm install` warns that `esbuild` / `sharp` install scripts are skipped by a local
  script-allowlist policy. The build still works — no action needed.
- `npm audit` flags a few high-severity advisories in dev-only tooling (esbuild/vite). They don't
  affect the production static output; **do not** run `audit fix --force` (it pulls breaking majors).
