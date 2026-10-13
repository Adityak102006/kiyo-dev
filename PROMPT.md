# Portfolio Build Prompt · Aditya Kumar

Build a complete personal portfolio website for **Aditya Kumar** using this specification. Everything below is final: treat it as the source of truth for structure, design, content and behavior.

## 1 · Identity & Positioning

- Name: **Aditya Kumar**
- Role: **Web & Software Developer**
- Positioning: freelance web & software developer with **1.5 years of freelance experience**, currently a **BTech Computer Science student (2nd year, 3rd semester)**, open for freelance and client work
- Design identity name: **"Ink & Ember"**

## 2 · Tech Stack (non-negotiable)

- **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**
- `next/image` for all images (AVIF first, WebP fallback), `next/font` self-hosted fonts (no render-blocking Google Fonts links)
- Minimal dependencies, per-route code splitting, zero layout shift (CLS-free: aspect-ratio boxes for all media)
- Fully responsive **320–1920px**
- All site copy and data live in **one content file** (`lib/content.ts`) so content updates never require touching layout or animation code
- **No em-dashes anywhere** in copy, comments or docs; use "·" as separator, reword prose otherwise

## 3 · Design System

**Palette "Ink & Ember"** · warm bone paper / espresso black with one ember-orange accent. Define once as CSS variables, map into Tailwind via `@theme inline`, include a palette rationale comment:

| Token | Light | Dark |
|---|---|---|
| bg | #f7f4ec | #171210 |
| bg-2 | #efe9dc | #1d1713 |
| surface | #fdfbf5 | #231c15 |
| fg | #211a12 | #ece4d6 |
| muted | #6e6353 | #a79b8a |
| line | #e0d6c3 | #352b20 |
| accent | #d9481c | #ff6a3a |
| accent-fg | #fff6ef | #2a1206 |

No generic blue/purple gradients. Distinct and cohesive in both modes.

**Typography**: Bricolage Grotesque (display) · Instrument Sans (body) · JetBrains Mono (labels, eyebrows, meta) · all self-hosted via next/font.

**Dark mode**: Tailwind class strategy on `<html>`, inline pre-paint script (stored preference → system preference, **zero flash**), localStorage persistence, follows OS changes when no stored choice, soft ~0.5s color crossfade on toggle.

## 4 · Site Architecture

### Home `/` · landing only
- **Hero** (min-h-svh): mono eyebrow "Aditya Kumar · Web & Software Developer", 3-line display headline revealed line-by-line from overflow masks: *"I build web & software / that works hard / and feels effortless."* (last line in accent), sub copy, two CTAs (See my work → `/projects`, Start a project → `/contact`), hairline blueprint grid backdrop with parallax, cursor-follow glow + two ambient glow blobs, concentric **orbit rings SVG** (rotating dashed circles + pulsing ember core) bottom-right, meta strip with live **IST clock**, scroll-linked exit (content drifts down and fades, grid parallaxes up)
- **Marquee**: infinite CSS band (duplicated track, `translateX(-50%)`, 32s linear), items: Web Development · Software Development · Freelance & Client Work · Available for Projects, ember square separators
- **Chapter index**: numbered rows 01–04 (About, Skills, Projects, Experience) with one-line teasers, hover accent + arrow slide, closing **Contact CTA band** ("05 · Contact · Have something to build?")

### Immersive pages · each a multi-moment scroll journey
Shared patterns: a tall **PageHero** (chapter number + eyebrow, oversized display title, intro paragraph, huge outlined ghost number), sub-moments revealed progressively with generous whitespace (full-height-ish sections, py-28 to py-40, alternating bg/bg-2 bands), and a **prev/next chapter band** at the bottom of every page except Contact.

**`/about`** · three moments:
1. Identity: statement *"Developer by discipline, builder by instinct."* + intro paragraph
2. **Right now**: parallax photo frame (portrait photo, gradient overlay, caption "Aditya Kumar · Developer"), status lines (BTech CSE 2nd year 3rd semester · freelance 1.5 years and counting · open for work), three facts (1.5 yrs · 2nd yr · 3rd sem)
3. **Off the clock**: closer line *"I like clean code, honest timelines and interfaces that respect people's time. If you have an idea that needs building, I'd love to hear it."* + interests paragraph (verbatim): *"Most of my free time runs on music and stories. I sing, play instruments, and almost always have something playing in my headphones; when I'm not listening, I'm watching anime or reading my way through novels, manhwa and manga."*

**`/skills`** · title *"Two disciplines. One standard."* + intro about learning by shipping real projects. Then Web Development as its own full section, Software Development as its own full section, then the shared Toolbox. Skill chips carry a **learning status**:
- Web: TypeScript (learning) · React (learning) · Tailwind CSS · Framer Motion (learning) · Vite (learning) · JavaScript · HTML & CSS · Vercel
- Software: Python · Rust (learning) · OpenCV (learning) · Flask (learning) · NumPy (learning) · Yacc (learning) · GenAI APIs · CLI Tools
- Toolbox: Git & GitHub · Linux · Command Line · Node.js · Express · Firebase
- **Learning chips render ember-highlighted** (accent border, soft accent tint, pulsing ember dot) vs quiet default chips; legend line "● learning now · unmarked: comfortable"; screen readers announce "(currently learning)"

**`/projects`** · title *"Selected work."*
- Overview grid of **anchor cards**: 2-up from md (tablet), asymmetric 7/5 columns from lg: P·0X label, title, one-line summary, tag chips, "Open case study ↓" hint, tilt + cursor sheen hover, blueprint placeholder previews with big outlined ghost numbers
- Full-width **case studies** below (one per project): oversized media, description, **Year / Role / Status meta row**, tags, "Visit live site" (or "Visit project") button + "View source" link, alternating sides and backgrounds
- **Scrollspy dot rail** (right edge, xl screens): 4 dots tracking the active case study, labels on hover, click to jump
- Smooth anchor scrolling site-wide (gated behind `prefers-reduced-motion`)

**`/experience`** · title *"Learning by shipping."* · visual timeline: scroll-drawn ember rail (scaleY on scroll), entries alternating sides on large screens, pulsing nodes:
1. Freelance Web & Software Developer · Self-employed · past 1.5 years · present (client work from first conversation to final handover; open to new projects)
2. BTech · Computer Science & Engineering · `[ADD INSTITUTE NAME]` · 2nd year, 3rd semester, present
3. Chandra-Link · Hackathon build · Smart India Hackathon 2026 · Team Game of Nodes (team of six) · 2026 (cross-sensor image correspondence pipeline for Chandrayaan-2 optics: OHRC/TMC/IIRS alignment despite resolution, spectrum and sun-angle gaps; Python + OpenCV with a Flask web frontend)
- Closer: "The timeline is still being written." + open-for-work CTA to /contact

**`/contact`** · short, direct, frictionless (NOT immersive):
1. **Contact section above the fold**: h1 *"Let's build something."*, blurb, email + copy button, socials (GitHub, LinkedIn only · **no Twitter, no location**), form (name, email, message; agreement line "By sending a message you agree to the Terms & Conditions." linking `#terms`; submit opens a pre-filled `mailto:` with subject "Project inquiry from {name}"; magnetic submit button)
2. **Terms & Conditions band** (`id="terms"`, below contact): lead paragraph, "Last updated 12 October 2026" meta line, collapsed-by-default **accordion of 15 sections** with expand/collapse-all control; arriving via `#terms` (footer link, form agreement line, or the old `/terms` URL) auto-expands everything and scrolls to it
- `/terms` redirects (307) to `/contact#terms`

## 5 · Projects Data (all real)

| # | Title | Summary | Stack tags | Year · Role · Status | Links |
|---|---|---|---|---|---|
| 1 | TRINIVERSE · Motion Studio Website | Marketing site for a Lucknow motion graphics studio, live on Vercel | TypeScript, Website, Vercel | 2026 · Solo build · Live | live: https://triniverse-website.vercel.app · source: https://github.com/Adityak102006/triniverse-website |
| 2 | Neptune Lens | Reverse image search that runs entirely on your machine | Rust, Image Search, Local-first | 2026 · Solo build · Open source | https://github.com/Adityak102006/Neptune-lens |
| 3 | Chandra-Link | Lunar image correspondence pipeline, built for Smart India Hackathon 2026 | Python, Computer Vision, SIH 2026 | 2026 · Team of six · SIH 2026 | https://github.com/codesbyashmit/chandra-link (team project, contributor) |
| 4 | S.I.L.L.Y · AI Assistant | A keyword AI assistant built on a hand-written grammar | Yacc, AI Assistant, Grammar | 2023 · Solo build · Work in progress | https://github.com/Adityak102006/S.I.L.L.Y-Socially-Intelligent-Language-Learning-and-Yielding- |

Long descriptions: TRINIVERSE = "Website for TRINIVERSE, a Lucknow-based motion graphics studio: services, selected work gallery, showreel and inquiry form, wrapped in a bold cinematic dark identity." · Neptune Lens = "Reverse image search for your own machine: find similar images inside your local folders, Google Lens style, built entirely in Rust." · Chandra-Link = "Team of six for Smart India Hackathon 2026 (Game of Nodes): a pipeline that matches and aligns lunar surface imagery across Chandrayaan-2's OHRC, TMC and IIRS sensors, despite big differences in resolution, spectrum and sun angle. Python pipeline with a web frontend." · S.I.L.L.Y = "Socially Intelligent Language Learning and Yielding: a keyword-driven AI assistant built on a hand-written grammar, designed to run inside editors and terminals. A deliberate work in progress, with a full GUI on the roadmap."

## 6 · Contact Details (all real)

- Email: **adityak.2006.com@gmail.com**
- GitHub: **https://github.com/Adityak102006**
- LinkedIn: **https://www.linkedin.com/in/aditya-kumar-b89023381/**
- Socials show GitHub + LinkedIn only; no Twitter/X link, no location field

## 7 · Motion Language

- Shared easing curve `EASE = [0.22, 0.61, 0.21, 1]`
- **Reveal**: fade + rise on first scroll into view (`whileInView`, once, 0.7s, EASE)
- **Tilt**: subtle 3D card tilt toward cursor (fine pointers only)
- **Spotlight**: cursor-reactive glow across sections
- **Cursor sheen** on project media, **Magnetic** buttons (lean toward cursor, spring back)
- **GhostNumber**: huge outlined section numbers drifting at their own scroll pace
- Scroll-drawn timeline rail, thin scroll progress bar at top
- Page transitions: AnimatePresence `mode="popLayout"`, incoming mounts instantly while outgoing fades (0.45s EASE)
- Smooth anchor scrolling, `prefers-reduced-motion` gated
- **`useReducedMotion` disables all motion** (static renders / instant swaps)
- **Transform + opacity only** (never width/height/top/left), 60fps target on mid-range mobile

## 8 · SEO & Accessibility

- Per-page titles: "About · Aditya Kumar", "Skills · Aditya Kumar", "Projects · Aditya Kumar", "Experience · Aditya Kumar", **"Contact & Terms · Aditya Kumar"**, home: "Aditya Kumar · Web & Software Developer"
- OG + Twitter cards with `/og.png` (1200×630) on every page
- JSON-LD: ProfilePage/Person schema with `sameAs` = [GitHub, LinkedIn]; Person + ContactPoint on `/contact` (email included since it is real)
- Single H1 per page, clean heading hierarchy, semantic HTML, skip-to-content link
- aria-current on active nav item, aria-expanded on accordions and mobile menu, ESC closes menu, body scroll-lock while menu open, screen-reader labels where color alone conveys meaning

## 9 · Terms & Conditions Content Rules

- General freelance template, **15 sections**: Introduction · Services Offered · Project Engagement · Payment Terms · Intellectual Property · Confidentiality · Revisions and Refunds · Client Responsibilities · Limitation of Liability · Termination · International Clients · Governing Law and Jurisdiction · Tax Compliance · Changes to These Terms · Contact
- **No specific international-law compliance claims** (no GDPR, no US state laws); international handling stays general and payment/tax focused
- Payments: INR default (USD for international), advance + milestone structure, 7–14 day invoice terms, UPI/bank transfer (India), Payoneer/Wise/PayPal (international)
- Governing law: India · exclusive jurisdiction of courts in Rudrapur, Uttarakhand · optional arbitration under the Arbitration and Conciliation Act, 1996
- Tax: developer handles own Indian tax obligations incl. GST where applicable

## 10 · Hard Rules

1. **Never fabricate**: no invented work history, client names, testimonials, awards, stats/metrics, project names, social links or contact details. Anything unknown uses a clearly-marked `[ADD ...]` placeholder.
2. Remaining placeholders after this build: **institute name** (experience) · **site domain** (SEO/OG base URL, currently https://aditya-portfolio.example.com) · project screenshots (blueprint placeholders until real images are dropped in)
3. No em-dashes anywhere; use "·"
4. Theme toggle: no flash, respects system preference on first load
5. All images via next/image with reserved space (no CLS)
6. Content updatable end-to-end from the single content file without touching layout/animation logic
