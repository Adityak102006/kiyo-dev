/**
 * ════════════════════════════════════════════════════════════════════
 *  SITE CONTENT: the only file you need to edit.
 *  Every string on the site flows from here. Anything that needs your
 *  input is wrapped in [ADD …] so it's impossible to miss.
 *  (No invented facts, links, names or metrics anywhere, by design.)
 * ════════════════════════════════════════════════════════════════════
 */

export const site = {
  name: "Aditya Kumar",
  role: "Web & Software Developer",
  /** [ADD DOMAIN]. Your production URL, e.g. "https://adityakumar.dev" (used for SEO/OG absolute URLs) */
  url: "https://aditya-portfolio.example.com",
  description:
    "Aditya Kumar is a web & software developer with 1.5 years of freelance experience, currently a BTech Computer Science student. Available for freelance and client work.",
};

/* Primary nav: one route per immersive page. */
export const nav = [
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

/* Legal anchor, surfaced in the footer and the contact form. Points at the
   Terms & Conditions band on /contact (which auto-expands on arrival). */
export const termsLink = { label: "Terms & Conditions", href: "/contact#terms" };

export const marqueeItems = [
  "Web Development",
  "Software Development",
  "Freelance & Client Work",
  "Available for Projects",
];

export const hero = {
  eyebrow: "Aditya Kumar · Web & Software Developer",
  headline: ["I build web & software", "that works hard", "and feels effortless."],
  accentLine: "and feels effortless.",
  sub: "1.5 years of freelance experience across web and software. BTech Computer Science student. Open for freelance and client work.",
  primaryCta: { label: "See my work", href: "/projects" },
  secondaryCta: { label: "Start a project", href: "/contact" },
};

/* Home chapter index: one line per immersive page. Contact gets its own CTA
   band below the index instead of a row. */
export const chapters = [
  { index: "01", label: "About", href: "/about", teaser: "The person behind the work: story, current status and what drives the craft." },
  { index: "02", label: "Skills", href: "/skills", teaser: "Two disciplines, one standard. Web and software, each explored in depth." },
  { index: "03", label: "Projects", href: "/projects", teaser: "Selected work: a quick overview first, then a closer look at each build." },
  { index: "04", label: "Experience", href: "/experience", teaser: "A timeline of learning by shipping: client work alongside a CS degree." },
];

export const homeCta = {
  title: "Have something to build?",
  blurb: "Tell me about your project: scope, timeline, anything useful. My inbox is open.",
  label: "Start a project",
  href: "/contact",
};

export const about = {
  statement: "Developer by discipline, builder by instinct.",
  paragraphs: [
    "I'm Aditya, a web & software developer who sweats the details users feel but never notice. For the past 1.5 years I've been freelancing, which means I've owned the whole journey: the first conversation, the first commit, the final handover.",
    "By day I'm a second-year BTech Computer Science student. By night (and most weekends) I'm building. Studying gives me the fundamentals; freelancing keeps them sharp.",
    "I like clean code, honest timelines and interfaces that respect people's time. If you have an idea that needs building, I'd love to hear it.",
  ],
  facts: [
    { value: "1.5", unit: "yrs", label: "Freelance experience" },
    { value: "2nd", unit: "yr", label: "BTech Computer Science" },
    { value: "3rd", unit: "sem", label: "Currently studying" },
  ],

  /* ── Page-only moments (/about) ── */
  status: {
    heading: "Right now",
    lines: [
      "BTech Computer Science & Engineering, 2nd year, 3rd semester.",
      "Freelance web & software development, 1.5 years and counting.",
      "Open for freelance and client work.",
    ],
  },
  interests: {
    heading: "Off the clock",
    body: "Most of my free time runs on music and stories. I sing, play instruments, and almost always have something playing in my headphones; when I'm not listening, I'm watching anime or reading my way through novels, manhwa and manga.",
  },
};

/** A skill chip. `learning` chips render ember-highlighted as in-progress. */
export type Skill = { name: string; learning?: boolean };

export const skills = {
  title: "Two disciplines. One standard.",
  /** Framing statement at the top of /skills. */
  pageIntro:
    "Everything I take on runs through the same filter: understand the problem, build it properly, ship it finished. The ember-marked skills are the ones I am learning right now, and every one of them was picked up the same way: by building and shipping a real project with it.",
  domains: [
    {
      index: "01",
      name: "Web Development",
      blurb:
        "Building for the browser: fast, accessible, carefully finished sites and web apps that feel effortless to use.",
      areas: [
        { name: "TypeScript", learning: true },
        { name: "React", learning: true },
        { name: "Tailwind CSS" },
        { name: "Framer Motion", learning: true },
        { name: "Vite", learning: true },
        { name: "JavaScript" },
        { name: "HTML & CSS" },
        { name: "Vercel" },
      ],
    },
    {
      index: "02",
      name: "Software Development",
      blurb:
        "Beyond the browser: reliable, maintainable software shaped around the problem it exists to solve.",
      areas: [
        { name: "Python" },
        { name: "Rust", learning: true },
        { name: "OpenCV", learning: true },
        { name: "Flask", learning: true },
        { name: "NumPy", learning: true },
        { name: "Yacc", learning: true },
        { name: "GenAI APIs" },
        { name: "CLI Tools" },
      ],
    },
  ],
  toolbox: ["Git & GitHub", "Linux", "Command Line", "Node.js", "Express", "Firebase"],
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  /** Optional source repo, shown as a secondary link on the project page. */
  repo?: string;
  /** Short one-liner for the overview card (falls back to description). */
  summary?: string;
  /** Case-study facts for the deep dive. */
  year?: string;
  role?: string;
  status?: string;
  /** Path under /public (e.g. "/images/project-1.jpg") → next/image handles sizing,
   *  lazy-loading and AVIF/WebP. Keep null to show the animated placeholder. */
  image: string | null;
  /** Width on large screens, in columns of the 12-col grid: 7, 5 or 12. */
  span: 7 | 5 | 12;
};

export const projects: Project[] = [
  {
    title: "TRINIVERSE · Motion Studio Website",
    description:
      "Website for TRINIVERSE, a Lucknow-based motion graphics studio: services, selected work gallery, showreel and inquiry form, wrapped in a bold cinematic dark identity.",
    tags: ["TypeScript", "Website", "Vercel"],
    href: "https://triniverse-website.vercel.app",
    repo: "https://github.com/Adityak102006/triniverse-website",
    summary: "Marketing site for a Lucknow motion graphics studio, live on Vercel.",
    year: "2026",
    role: "Solo build",
    status: "Live",
    image: null,
    span: 7,
  },
  {
    title: "Neptune Lens",
    description:
      "Reverse image search for your own machine: find similar images inside your local folders, Google Lens style, built entirely in Rust.",
    tags: ["Rust", "Image Search", "Local-first"],
    href: "https://github.com/Adityak102006/Neptune-lens",
    summary: "Reverse image search that runs entirely on your machine.",
    year: "2026",
    role: "Solo build",
    status: "Open source",
    image: null,
    span: 5,
  },
  {
    title: "Chandra-Link",
    description:
      "Team of six for Smart India Hackathon 2026 (Game of Nodes): a pipeline that matches and aligns lunar surface imagery across Chandrayaan-2's OHRC, TMC and IIRS sensors, despite big differences in resolution, spectrum and sun angle. Python pipeline with a web frontend.",
    tags: ["Python", "Computer Vision", "SIH 2026"],
    href: "https://github.com/codesbyashmit/chandra-link",
    summary: "Lunar image correspondence pipeline, built for Smart India Hackathon 2026.",
    year: "2026",
    role: "Team of six",
    status: "SIH 2026",
    image: null,
    span: 7,
  },
  {
    title: "S.I.L.L.Y · AI Assistant",
    description:
      "Socially Intelligent Language Learning and Yielding: a keyword-driven AI assistant built on a hand-written grammar, designed to run inside editors and terminals. A deliberate work in progress, with a full GUI on the roadmap.",
    tags: ["Yacc", "AI Assistant", "Grammar"],
    href: "https://github.com/Adityak102006/S.I.L.L.Y-Socially-Intelligent-Language-Learning-and-Yielding-",
    summary: "A keyword AI assistant built on a hand-written grammar.",
    year: "2023",
    role: "Solo build",
    status: "Work in progress",
    image: null,
    span: 5,
  },
];

/* Framing for /projects: overview grid at the top, then a full-width deep
   dive per project further down. */
export const projectsPage = {
  intro:
    "Start with the overview, then keep scrolling: every project gets its own full-width case study with room to breathe. Open a card to jump straight to it.",
  note: "Selected web, software and team projects · more on GitHub",
};

export const experience = {
  title: "Learning by shipping.",
  /** Framing statement at the top of /experience. */
  pageIntro:
    "The road so far, on one rail: client work and computer science moving in parallel, each one sharpening the other.",
  entries: [
    {
      role: "Freelance Web & Software Developer",
      org: "Self-employed",
      period: "Past 1.5 years · present",
      points: [
        "Client work across web and software development, from first conversation to final handover.",
        "Open to new freelance and client projects.",
      ],
    },
    {
      role: "BTech · Computer Science & Engineering",
      org: "[ADD INSTITUTE NAME]",
      period: "2nd year · 3rd semester · present",
      points: ["Studying computer science fundamentals alongside freelance work."],
    },
    {
      role: "Chandra-Link · Hackathon build",
      org: "Smart India Hackathon 2026 · Team Game of Nodes (team of six)",
      period: "2026",
      points: [
        "Built a cross-sensor image correspondence pipeline for Chandrayaan-2 optics: matching and aligning lunar surface imagery across the OHRC, TMC and IIRS sensors, despite big gaps in resolution, spectrum and sun angle.",
        "Python and OpenCV under the hood with a Flask web frontend, turning three very different sensors into one registered lunar map.",
      ],
    },
  ],
};

export const contact = {
  title: "Let's build something.",
  blurb: "Have a project, an idea, or just a question? My inbox is open. Tell me what you're building.",
  /** Shown in the contact details and used to pre-fill the form's email. */
  email: "adityak.2006.com@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Adityak102006" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-kumar-b89023381/" },
  ],
};

/* ── Terms & Conditions (/terms) ──
   Template copy rendered on the /terms page. It is a general template, not
   legal advice: review it with a qualified legal professional before relying
   on it for business use. */
export type TermSection = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
};

export const terms = {
  lead: "These terms govern freelance web and software development engagements with Aditya Kumar, for clients in India and internationally. They explain how projects, payments, ownership and everything in between are handled.",
  /** Shown as the last updated line on the /contact terms band. */
  lastUpdated: "12 October 2026",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      paragraphs: [
        "These terms apply to freelance web and software development services provided by Aditya Kumar, an independent developer based in India, to clients within India and internationally. In these terms, the developer is referred to as I or me, and the client as you.",
        "By engaging my services, requesting work, accepting a quote or proposal, or paying an invoice, you agree to these terms. Where a project is governed by a separate written agreement signed by both parties, that agreement takes priority for that project.",
      ],
    },
    {
      id: "services",
      title: "Services Offered",
      paragraphs: [
        "I provide freelance web development and software development services. This generally includes scoping, design and development, testing, delivery and basic post-delivery support for websites, web applications and software, as agreed for each project.",
        "The exact scope, deliverables, timeline and cost of every project are defined and finalized in a separate written quote, proposal or agreement shared before work begins. This page describes how engagements generally work; it is not a fixed price list and does not by itself confirm availability.",
      ],
    },
    {
      id: "engagement",
      title: "Project Engagement",
      paragraphs: [
        "Every engagement begins with a discussion of your requirements, after which I share a written quote or proposal covering the scope, deliverables, timeline, milestones and cost. Work begins once you accept the proposal and any agreed advance payment is received.",
        "If you later request work outside the agreed scope, such as new features, additional pages or changed requirements, I will flag it as out of scope and share a revised estimate before starting. Additional work proceeds only after your written approval, given by email or messaging, and is billed as agreed in the change request.",
      ],
    },
    {
      id: "payments",
      title: "Payment Terms",
      paragraphs: [
        "Quotes are issued in Indian Rupees (INR) by default. For international clients, quotes may be issued in USD or another mutually agreed currency as specified in the proposal.",
        "Projects generally follow an advance and milestone structure: an advance payment to schedule and begin the work, milestone payments as agreed deliverables are completed, and the balance at handover. The exact split for each project is stated in its proposal.",
        "For clients in India, payments are commonly accepted through UPI or bank transfer. For international clients, payments are processed through third-party platforms such as Payoneer, Wise or PayPal. The platform used for a project, and any transfer fees it applies, is confirmed in the proposal.",
        "Invoices state a due date, typically 7 to 14 days from issue. If an invoice remains unpaid after its due date, work may be paused and future milestones rescheduled until payment is received. You will always be notified before any work is paused.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      paragraphs: [
        "Ownership of all project deliverables, including source code, design assets and documentation, transfers to you in full once the project has been paid for completely. Until then, the deliverables remain my property and may not be published, resold or reused commercially.",
        "I may showcase completed projects in my portfolio and share them as work samples unless you request confidentiality. If a project should stay private, let me know in writing before or at handover and I will leave it out of my portfolio.",
        "I retain the right to reuse general knowledge, experience and generic, non-project-specific tools or code patterns developed during an engagement.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      paragraphs: [
        "Both parties agree to treat each other's confidential information with care. This includes project details, business information, credentials, documents and anything else shared during the engagement that is marked confidential or reasonably understood to be so.",
        "Confidential information is not disclosed to third parties, except where it is required to perform the work (for example, a hosting or third-party service used for your project) or where disclosure is required by law. This obligation continues after the engagement ends.",
      ],
    },
    {
      id: "revisions-and-refunds",
      title: "Revisions and Refunds",
      paragraphs: [
        "Each deliverable includes up to two rounds of revisions unless the proposal states otherwise. Additional revision rounds, or a significant change in direction after work has begun, are treated as out-of-scope work and quoted separately.",
        "If I am unable to deliver the agreed work for reasons within my control, you receive a refund of the amount paid for the undelivered portion of the project.",
        "If the engagement ends early, completed and approved milestones remain billable. Any advance paid for work not yet started is refunded, after deducting payment for work already delivered.",
      ],
    },
    {
      id: "client-responsibilities",
      title: "Client Responsibilities",
      paragraphs: ["Timely cooperation from you keeps a project on schedule. As the client, you agree to the following:"],
      points: [
        "Provide feedback, approvals and decisions within the timelines agreed in the project plan.",
        "Provide the content, materials, data and access needed for the work, such as accounts, hosting or repository access, or agree in the proposal that I will arrange them at additional cost.",
        "Keep a single point of contact for feedback and approvals wherever possible.",
        "Review deliverables promptly and raise concerns in writing within the agreed review window.",
        "Accept that delivery dates shift if feedback, content or access is delayed, and that I will keep you informed of any revised timeline.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      paragraphs: [
        "My services are delivered with professional care. However, I am not liable for indirect or consequential losses, including lost profits, lost business, lost data or missed opportunities arising from a project or its use.",
        "To the fullest extent permitted by applicable law, my total liability for any claim connected to a project is limited to the amount you paid me for that project.",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      paragraphs: [
        "Either party may end the engagement with written notice, typically for a material breach that is not corrected within a reasonable time, for non-payment, or when both parties agree to stop.",
        "When an engagement ends, completed and approved milestones are payable; work in progress is handed over as-is or completed to the nearest sensible stopping point as agreed; any advance for unstarted work is refunded; and each party returns or deletes the other's confidential information on request.",
      ],
    },
    {
      id: "international-clients",
      title: "International Clients",
      paragraphs: [
        "For engagements outside India, payments are commonly processed through third-party platforms such as Payoneer, Wise or PayPal. These platforms apply their own fees, exchange rates and processing timelines, which are outside my control. The platform and the handling of its fees are confirmed in each proposal.",
        "Currency conversion charges applied by your bank or payment platform, and any taxes, duties or similar charges applicable in your country on the payment or the services, are your responsibility.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law and Jurisdiction",
      paragraphs: [
        "These terms and any engagement under them are governed by and interpreted in accordance with the laws of India.",
        "Any dispute arising out of these terms or an engagement is subject to the exclusive jurisdiction of the courts in Rudrapur, Uttarakhand, India.",
        "As an alternative to the courts, if both parties agree in writing, a dispute may be resolved through arbitration in India under the Arbitration and Conciliation Act, 1996.",
      ],
    },
    {
      id: "tax-compliance",
      title: "Tax Compliance",
      paragraphs: [
        "I am responsible for my own tax obligations in India, including income tax and GST where and when it applies to me based on prevailing turnover thresholds. If GST applies to an invoice, it is listed separately.",
        "If the laws of your country require you to withhold tax on payments to me, meeting that obligation is your responsibility. Reasonable supporting documents, such as invoices or receipts, are provided on request.",
      ],
    },
    {
      id: "changes-to-terms",
      title: "Changes to These Terms",
      paragraphs: [
        "I may update these terms from time to time. The version that applies to an engagement is the one accepted when the engagement begins, or the current version when you later accept a new quote or proposal.",
        "Updates are published on this page with a revised last updated date. Continuing to work with me after an update means you accept the revised terms.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "For questions about these terms, or to discuss how they apply to a specific project, write to adityak.2006.com@gmail.com. I am happy to walk through anything that is unclear before we begin.",
      ],
    },
  ] as TermSection[],
};
