# snketdesai.com

Personal founder hub for **Sanket Desai** — a single, fully static page: intro,
social links, and a grid of the products and sites I'm building.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**. No CMS, no
database — every byte is prerendered at build time and deployable to Vercel with
zero configuration.

**Design:** an editorial, warm-paper aesthetic with a single terracotta accent.
Display type in [Fraunces](https://fonts.google.com/specimen/Fraunces), body in
[Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) — both
self-hosted via `next/font` (no external font requests). Light theme by default
with a persisted dark-mode toggle, subtle scroll-reveal motion that honors
`prefers-reduced-motion`, and a faint grid texture.

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (fully static)
npm start        # serve the production build
npm run lint     # ESLint
```

> Requires Node 18.18+ (developed on Node 24).

---

## Edit your content — one file

**Everything you'll want to change lives in [`src/config/site.ts`](src/config/site.ts).**
It's a single typed object — no component code to touch.

| What to change | Field |
| --- | --- |
| Name, role, tagline | `name`, `role`, `tagline` |
| Canonical domain (used by metadata, sitemap, JSON-LD) | `url` |
| Social links (LinkedIn / X / GitHub) | `socials[]` |
| "Previously" brand strip | `experience[]` |
| Project cards | `projects[]` |

### Project cards

Each card in `projects[]` looks like this:

```ts
{
  name: "Interlinkmap",
  description: "Automated internal linking SaaS…",
  tag: "SaaS",            // SaaS | Directory | Local | Stealth | Live | Building
  url: "https://…",      // a string → the whole card links out (new tab)
}
```

- **`url: "https://…"`** → the entire card becomes a link (`target="_blank"`,
  `rel="noopener noreferrer"`) with a "Visit" arrow.
- **`url: null`** → the card renders as a **non-clickable teaser** with a dashed
  border and a pulsing **"Coming soon"** badge (this is how the stealth SaaS is
  shown). The type enforces `url: string | null`.
- Cards render in array order — reorder or delete freely.

> ⚠️ The placeholder cards currently use `url: "TODO"`. **Replace `"TODO"` with
> real URLs (or set `url: null`) before publishing** — a literal `"TODO"` will
> link to a broken `/TODO` path.

Optionally add `logo: "/logos/foo.png"` to a card (place the file in `public/`)
to replace the auto-generated monogram.

---

## Swap the avatar and OG image

**Avatar** — replace [`public/avatar.jpg`](public/avatar.jpg) with your own
square photo (≥ 400×400 recommended; it's displayed in a circle). Keep the
filename, or update `avatar` in `src/config/site.ts`.

**Social share image** — [`public/og.png`](public/og.png) (1200×630) is the
Open Graph / Twitter card image. Either drop in your own PNG at that path, or
regenerate the styled one after editing your name/tagline:

```bash
powershell -ExecutionPolicy Bypass -File scripts/make-og.ps1   # Windows
```

(The script is plain GDI+ — Windows only. On macOS/Linux just export a
1200×630 PNG by hand and save it as `public/og.png`.)

**Favicon** — edit [`src/app/icon.svg`](src/app/icon.svg) (and
[`src/app/apple-icon.svg`](src/app/apple-icon.svg) for iOS). Next.js generates
the favicon from these automatically.

---

## What's wired for SEO

- Full `metadata` export: title, description, **canonical**, Open Graph, and
  Twitter `summary_large_image` — see [`src/app/layout.tsx`](src/app/layout.tsx).
- JSON-LD **`Person`** structured data (name, url, jobTitle, `worksFor`,
  `sameAs` = your real social URLs) in the layout `<head>`.
- [`src/app/sitemap.ts`](src/app/sitemap.ts) → `/sitemap.xml`
- [`src/app/robots.ts`](src/app/robots.ts) → `/robots.txt`
- Semantic landmarks, one `<h1>`, descriptive `alt` text, `lang="en"`,
  skip-to-content link, AA contrast, visible focus rings.

When you change the domain, update **`url`** in `src/config/site.ts` — the
canonical tag, sitemap, robots host, and JSON-LD all derive from it.

---

## Deploy to Vercel

1. Push this repo to GitHub (a git repo is already initialized — just add a
   remote and push):
   ```bash
   git add -A && git commit -m "Update content"
   git remote add origin git@github.com:<you>/snketdesai-com.git
   git push -u origin main
   ```
2. In [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
   Vercel auto-detects Next.js; **no settings to change**. Click Deploy.
3. Add your domain **snketdesai.com** under the project's **Domains** tab and
   point your DNS at Vercel.

That's it — no env vars, no build config.

---

## Project structure

```
src/
  app/
    layout.tsx          # fonts, metadata, JSON-LD, theme no-flash script
    page.tsx            # assembles the single page
    globals.css         # design tokens + Tailwind v4 theme + dark variant
    sitemap.ts robots.ts icon.svg apple-icon.svg
  components/
    Hero.tsx Socials.tsx ExperienceStrip.tsx
    ProjectGrid.tsx ProjectCard.tsx        # card link vs. teaser logic
    ThemeToggle.tsx ThemeScript.tsx ScrollReveal.tsx
    Footer.tsx
  config/
    site.ts             # ← all content lives here
public/
  avatar.jpg og.png
scripts/
  make-og.ps1           # regenerate og.png
```

Only the theme toggle and scroll-reveal observer ship as client components;
everything else is a Server Component.
