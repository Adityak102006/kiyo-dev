"use client";

import Link from "next/link";
import { useState } from "react";
import type { ComponentProps, FormEvent } from "react";
import { contact, terms } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GhostNumber } from "../ui/ghost-number";
import { Magnetic } from "../ui/magnetic";
import { Reveal } from "../ui/reveal";
import { TermsAccordion } from "../terms-accordion";

/* Underline focus effect = scaleX transform (GPU friendly) */
function Field({ label, ...input }: { label: string } & ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{label}</span>
      <input
        {...input}
        placeholder={input.placeholder ?? `Your ${label.toLowerCase()}`}
        className="peer mt-2 w-full border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-transparent"
      />
      <span aria-hidden className="block h-px origin-left scale-x-0 bg-accent transition-transform duration-300 peer-focus:scale-x-100" />
    </label>
  );
}

/** /contact: short and direct. The form lives above the fold; the full Terms
 *  & Conditions follow below as a collapsed-by-default accordion. */
export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const wired = !contact.email.includes("[ADD"); // form activates once email is set in content.ts

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("botcheck")) return;

    setStatus("submitting");
    setNote("Sending message...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "5bb796fb-1344-468c-a00f-d80b68f0b4ee",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setNote("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("error");
        setNote(result.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setNote("Network error. Please try again or reach out directly via email.");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  const placeholder = "underline decoration-dashed decoration-line underline-offset-4";

  return (
    <>
      {/* ── Contact: the whole point of the page, above the fold ── */}
      <section aria-labelledby="contact-title" className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-28 sm:py-36">
        <GhostNumber n="05" className="left-2 top-6 sm:left-10" />

        <div className="shell relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent">
                <span aria-hidden className="inline-block h-px w-8 bg-accent" />
                05 · Contact
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 id="contact-title" className="mt-4 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-balance">
                {contact.title}
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{contact.blurb}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 space-y-5">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Email</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3">
                    <span className={cn("font-mono text-sm break-all", !wired && placeholder)}>{contact.email}</span>
                    <button
                      type="button"
                      onClick={copyEmail}
                      disabled={!wired}
                      className={cn(
                        "rounded-full border border-line px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300",
                        wired ? "hover:border-accent hover:text-accent" : "cursor-not-allowed opacity-50"
                      )}
                    >
                      {copied ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Elsewhere</p>
                  <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                    {contact.socials.map((s) => (
                      <li key={s.label}>
                        {s.href ? (
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center py-2 text-sm font-medium underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent"
                          >
                            {s.label} ↗
                          </a>
                        ) : (
                          <span className={cn("text-sm font-medium text-muted", placeholder)} title="Add your link in lib/content.ts">
                            {s.label} · [ADD LINK]
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-7">
            <form onSubmit={onSubmit} className="flex h-full flex-col gap-7 rounded-2xl border border-line bg-surface p-6 sm:p-9">
              <input type="checkbox" name="botcheck" style={{ display: "none" }} />
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Email" name="email" type="email" autoComplete="email" required />
              </div>
              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project: scope, timeline, anything useful."
                  className="peer mt-2 w-full resize-none border-b border-line bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-transparent"
                />
                <span aria-hidden className="block h-px origin-left scale-x-0 bg-accent transition-transform duration-300 peer-focus:scale-x-100" />
              </label>
              <p className="-mt-3 font-mono text-[11px] leading-relaxed text-muted">
                By sending a message you agree to the{" "}
                <Link
                  href="/contact#terms"
                  className="text-accent underline decoration-line underline-offset-4 transition-colors duration-300 hover:decoration-accent"
                >
                  Terms &amp; Conditions
                </Link>
                .
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                <p aria-live="polite" className="max-w-xs font-mono text-[11px] leading-relaxed text-muted">
                  {note}
                </p>
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-opacity duration-300 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      "Sending..."
                    ) : (
                      <>
                        Send message <span aria-hidden>↗</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ── Terms & Conditions: secondary, below the contact form ── */}
      <section id="terms" aria-labelledby="terms-title" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-bg-2 py-24 sm:py-32">
        <div className="shell max-w-4xl">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-accent">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              Legal
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="terms-title" className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Terms &amp; Conditions
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted">{terms.lead}</p>
          </Reveal>

          <Reveal delay={0.22} className="mt-12">
            <TermsAccordion />
          </Reveal>
        </div>
      </section>
    </>
  );
}
