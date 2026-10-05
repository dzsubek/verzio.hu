# verzio.hu

Landing / brand page of a web agency. **The site is in Hungarian.** Working language with Claude can be English or Hungarian; everything user-facing is Hungarian.

> Project name/domain: `verzio.hu`. Agency name, services, tone and brand assets are not defined yet — see "Open decisions" and ask rather than invent.

## Language & copy (Hungarian)

- `<html lang="hu">`, `og:locale` = `hu_HU`. All UI text, meta tags, alt texts, aria-labels, form errors and 404 are Hungarian.
- Write natural, native Hungarian — not translated English. No machine-translation calques ("Vegye fel velünk a kapcsolatot" is fine; "Kezdjük el!" style hype is not).
- Default to informal-professional **tegező** tone only if the brand direction says so; otherwise **magázó** (Ön). Pick once, keep it consistent site-wide. (Open decision.)
- Use correct Hungarian typography: „…” quotes, – en dash for ranges, non-breaking space before units/numbers (`10&nbsp;000 Ft`), proper hyphenation (`hyphens: auto` works with `lang="hu"`).
- Fonts MUST support the `latin-ext` subset (ő, ű, Ő, Ű). Verify every chosen typeface renders these correctly — a fallback glyph for ő/ű is a bug.
- Date/number formats: `2026. október 5.`, decimal comma, thousands separated by space.
- Legal/GDPR bits (Adatkezelési tájékoztató, ÁSZF, cookie notice) are required for HU/EU; use placeholders clearly marked `TODO` until real texts exist.
- Keep copy in one place (a content file or the top of each section), not scattered across markup, so it's easy to review with the client.

## Design workflow (skills installed)

Three design toolkits are active for this project. Use them in this order for design work:

1. **`/impeccable`** (plugin `impeccable`, project scope) — primary driver: shape → craft → critique/audit → polish. Use for direction, layout, typography, motion, a11y/perf audits. Run `/impeccable teach` (or its setup flow) once so it records project design context.
2. **`design-taste-frontend`** (Leonxlnx/taste-skill, in `.claude/skills/`) — anti-slop rules for landing pages. It requires a one-line "Design Read" before code and exposes three dials: `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`. Agency brand page default: variance high, motion medium, density low — but override per the brief. Companions: `high-end-visual-design`, `full-output-enforcement` (never truncate files / leave `// ...rest` placeholders).
3. **`/ui-ux-pro-max`** (plugin `ui-ux-pro-max`) — lookup of palettes, font pairings, UX guidelines, and stack-specific rules. Use it for evidence-based choices (e.g. font pair with Hungarian support, palette for agency/creative product type), not as the aesthetic authority.

When these conflict: **brand brief > impeccable > taste-skill > ui-ux-pro-max**. Don't mix three aesthetics — pick one direction and commit.

Anti-defaults (agency pages are judged on originality): no AI-purple gradients, no centered hero over dark mesh, no three-identical-feature-cards row, no stock-photo handshake, no lorem ipsum, no "Rólunk / Szolgáltatásaink" boilerplate headings without a point of view.

## Page scope

Single-page landing + brand presence. Expected sections (adjust to brief): hero with a clear value prop and one primary CTA · services · selected work / case studies · process · about / team · social proof · contact (form + email/phone) · footer with legal links.

Primary conversion goal: **contact / "ajánlatkérés"**. Every section should push toward it; one primary CTA style, used consistently.

## Engineering rules

- Stack: **not chosen yet** (see Open decisions). Prefer the simplest thing that meets the design: static HTML/CSS/JS or a static-first framework (e.g. Astro) over a heavy SPA. Don't add a framework, UI kit or animation library the design doesn't need.
- Mobile-first, fluid type/spacing (`clamp()`), tested at 360 / 768 / 1280 / 1920 px. No horizontal scroll.
- Accessibility: WCAG 2.2 AA — contrast, visible focus, semantic landmarks, keyboard nav, labelled form fields, `prefers-reduced-motion` respected, motion never carries essential info.
- Performance targets: LCP < 2.5 s, CLS < 0.1, INP < 200 ms on mobile. Self-host fonts (`font-display: swap`, subset to latin + latin-ext), AVIF/WebP images with explicit width/height, lazy-load below the fold, no render-blocking third-party scripts.
- SEO (HU): unique `<title>` + meta description in Hungarian, canonical, Open Graph/Twitter cards, JSON-LD `Organization`/`ProfessionalService`, `sitemap.xml`, `robots.txt`.
- Privacy: no analytics/tracking/embeds (Google Fonts CDN, YouTube, maps) that set cookies or call third parties without a consent mechanism. Prefer self-hosted assets.
- Contact form: server-side validation, spam protection (honeypot/Turnstile), Hungarian error messages, no secrets in the client.
- Design tokens (color, type scale, spacing, radius, motion) live as CSS custom properties in one file; components consume tokens, never raw hex/px.
- Keep dependencies minimal; commit the lockfile; no unused packages.

## Commands

None yet — no stack chosen. Once scaffolded, document `dev`, `build`, `preview`, `lint` and the deploy command here.

## Open decisions (ask the user, don't guess)

- [ ] Agency name / logo / existing brand colors & fonts (or build identity from scratch?)
- [ ] Services offered and target clients (SMEs, startups, e-commerce…)
- [ ] Tone: tegező vs. magázó; playful vs. serious
- [ ] Reference sites the user likes / dislikes
- [ ] Stack & hosting (static host, Cloudflare Pages, Netlify, own server…)
- [ ] Contact form backend / email service
- [ ] Real case studies, team photos and testimonials available?
- [ ] English version later? (If yes, plan i18n routing now: `/` = hu, `/en/`.)

## Housekeeping

- Not a git repo yet. When initialised, commit `.claude/settings.json`, `.claude/skills/` and `skills-lock.json` so the design toolkit is reproducible.
- Plugin set is declared in `.claude/settings.json` (`impeccable@impeccable`, `ui-ux-pro-max@ui-ux-pro-max-skill`). Taste-skill is vendored via `npx skills add https://github.com/Leonxlnx/taste-skill` (pinned in `skills-lock.json`); update the same way.
