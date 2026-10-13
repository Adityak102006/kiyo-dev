import type { Metadata } from "next";
import { site } from "@/lib/content";
import ProjectsPage from "@/components/pages/projects";

const title = "Projects";
const description =
  "Selected work by Aditya Kumar: freelance web and software projects, from quick overview to full-screen deep dives.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    siteName: `${site.name} · ${site.role}`,
    title: `${site.name} · ${title}`,
    description,
    url: "/projects",
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
  return <ProjectsPage />;
}
