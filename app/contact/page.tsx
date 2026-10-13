import type { Metadata } from "next";
import { contact, site } from "@/lib/content";
import ContactPage from "@/components/pages/contact";

const title = "Contact & Terms";
const description =
  "Get in touch with Aditya Kumar about freelance web and software development, and read the Terms & Conditions that govern engagements.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    siteName: `${site.name} · ${site.role}`,
    title: `${site.name} · ${title}`,
    description,
    url: "/contact",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} · ${title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${title}`,
    description,
    images: ["/og.png"],
  },
};

/* Structured data for the contact portion. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "freelance inquiries",
    email: contact.email,
    availableLanguage: "en",
  },
};

export default function Contact() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactPage />
    </>
  );
}
