import type { Metadata } from "next";
import { site } from "@/lib/content";
import ExperiencePage from "@/components/pages/experience";

const title = "Experience";
const description =
  "A timeline of learning by shipping: 1.5 years of freelance web and software development alongside a BTech Computer Science degree.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    siteName: `${site.name} · ${site.role}`,
    title: `${site.name} · ${title}`,
    description,
    url: "/experience",
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
  return <ExperiencePage />;
}
