# Aditya Kumar · Personal Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion 12

A multi-page portfolio with an original **"Ink & Ember"** identity: warm bone paper / espresso black with one ember-orange accent. The home page is a light landing (hero + marquee + chapter index); About, Skills, Projects and Experience are each immersive, multi-moment scroll journeys; Contact is short and direct with the Terms & Conditions folded in below the form. Built for performance with transform/opacity-only animations and AVIF/WebP images.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## ✏️ Editing content · `lib/content.ts` (the only file you need)

| What                | Where                                                       |
| ------------------- | ----------------------------------------------------------- |
| Hero copy           | `hero`                                                      |
| About paragraphs/facts | `about`                                                   |
| Skills + toolbox    | `skills` · chips flagged `learning: true` render ember-highlighted with a pulse dot |
| **Projects**        | `projects` · title, description, tags, `href`, `image`, `span` |
| Experience timeline | `experience`                                                |
| Email / socials | `contact` · the form opens a pre-filled email once `email` is set |
| Terms & Conditions copy    | `terms` (accordion band on `/contact#terms`, linked from the footer and the form) |
| Domain (SEO/OG)     | `site.url`                                                  |

Placeholders you'll want to fill (search for `[ADD`): **institute name, domain**.

### Adding a real project

1. Drop an image into `public/images/` (e.g. `project-1.jpg`).
2. In `lib/content.ts → projects`, set `image: "/images/project-1.jpg"`, plus `href`, title, description and tags.

`next/image` handles sizing, lazy-loading and AVIF/WebP conversion automatically. Keeping `image: null` shows the animated blueprint placeholder. `span` controls the card width on large screens (7, 5 or 12 of 12 grid columns).

### Swapping the About photo

`components/pages/about.tsx` renders `/images/aditya.webp`. Replace that file (square crop fits the frame best) or change the `src`. The frame reserves space, so there is no layout shift either way.

## Structure

```
app/            layout (fonts, SEO, JSON-LD, no-flash theme bootstrap, persistent header/footer + page transitions)
                page (home: hero + marquee + chapter index) · about · skills · projects · experience (immersive pages)
                contact (form + Terms & Conditions accordion; /terms redirects here with #terms)
components/     header · hero · marquee · chapters · footer · page-hero · next-chapter · terms-accordion · page-transition · theme-toggle · scroll-progress
components/pages/      about · skills · projects · experience · contact (page bodies)
components/ui/  Reveal · Magnetic · Tilt · Spotlight · GhostNumber (reusable motion primitives)
lib/            content.ts (all copy & data) · anim.ts (shared easing) · utils.ts
```

The Terms & Conditions are a general template. The copy lives in `lib/content.ts → terms` (last updated 12 October 2026); it renders as a collapsed-by-default accordion on `/contact`. Arriving via `#terms` (footer link, form agreement line, or the old `/terms` URL) auto-expands it.

## Design system notes

- **Palette**: defined once as CSS variables in `app/globals.css` and mapped into Tailwind tokens via `@theme inline`, so `bg-bg`, `text-fg`, `text-accent` etc. respond to the `.dark` class with no duplicated `dark:` classes.
- **Fonts**: Bricolage Grotesque (display), Instrument Sans (body), JetBrains Mono (labels); self-hosted through `next/font` (zero render-blocking requests).
- **Dark mode**: Tailwind class strategy on `<html>` with an inline pre-paint script (stored preference → system preference), `localStorage` persistence, and a soft 0.5s color crossfade on toggle.
- **Motion**: every animation runs on `transform`/`opacity` only; below-fold sections animate via `whileInView` (once) and load as lazy chunks; `useReducedMotion` disables motion for sensitive users; cursor effects are gated to fine pointers.
