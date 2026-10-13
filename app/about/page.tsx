import type { Metadata } from "next";
import { site } from "@/lib/content";
import AboutPage from "@/components/pages/about";

const title = "About";
const description =
  "The person behind the work: Aditya Kumar's story, current status as a BTech Computer Science student and freelance developer, and what drives the craft.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    siteName: `${site.name} · ${site.role}`,
    title: `${site.name} · ${title}`,
    description,
    url: "/about",
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
  return <AboutPage />;
}
