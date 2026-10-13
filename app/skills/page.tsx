import type { Metadata } from "next";
import { site } from "@/lib/content";
import SkillsPage from "@/components/pages/skills";

const title = "Skills";
const description =
  "Two disciplines, one standard: web development and software development, each explored in depth, plus the shared toolbox.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    siteName: `${site.name} · ${site.role}`,
    title: `${site.name} · ${title}`,
    description,
    url: "/skills",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} · ${title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${title}`,
    description,
    images: ["/og.png"],
  },
};

export default function PAGE_NAME() {
  return <SkillsPage />;
}
