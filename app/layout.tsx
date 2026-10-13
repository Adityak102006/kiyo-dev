import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { contact, site } from "@/lib/content";
import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { PageTransition } from "@/components/page-transition";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

/* Self-hosted via next/font (no render-blocking Google Fonts links).
   Display: Bricolage Grotesque, expressive and slightly unconventional.
   Body: Instrument Sans, clean and highly readable.
   Labels: JetBrains Mono, the developer's fingerprint. */
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url), // [ADD DOMAIN] in lib/content.ts → site.url
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} · ${site.role}`,
    title: `${site.name} · ${site.role}`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} · ${site.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#171210" },
  ],
};

/* JSON-LD with only the facts we actually know. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    knowsAbout: ["Web Development", "Software Development"],
    sameAs: contact.socials.filter((s) => s.href).map((s) => s.href),
  },
};

/* Runs before first paint: applies stored theme, else system preference → zero flash. */
const themeInit = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

/* Shared shell: nav, transitions, footer and grain live here so they never
   reload or flicker between routes. Only the page content swaps. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-fg"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main" className="relative">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
