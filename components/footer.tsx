import Link from "next/link";
import { site, termsLink } from "@/lib/content";
import { BackToTop } from "./back-to-top";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col items-center justify-between gap-4 py-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <Link href={termsLink.href} className="py-2.5 transition-colors duration-300 hover:text-accent">
          {termsLink.label}
        </Link>
        <BackToTop />
      </div>
    </footer>
  );
}
