import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, RevealRule } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { contact, contactPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Now",
  description: contactPage.body,
};

const details = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "Phone", value: contact.phoneDisplay, href: `tel:${contact.phoneHref}` },
  {
    label: "WhatsApp",
    value: contact.whatsappDisplay,
    href: `https://wa.me/${contact.whatsappHref}`,
    external: true,
  },
  { label: "Studio", value: contact.studio, href: null },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        headline={"Let's talk\nabout your brand."}
        intro={contactPage.body}
      />

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <RevealRule className="mb-10" />
                <dl className="space-y-8">
                  {details.map((detail, i) => (
                    <Reveal key={detail.label} delay={i * 0.07} amount={0.1}>
                      <dt className="kicker mb-2">{detail.label}</dt>
                      <dd className="font-display text-[1.0625rem] font-semibold tracking-tight text-ink">
                        {detail.href ? (
                          <a
                            href={detail.href}
                            data-cursor="link"
                            target={detail.external ? "_blank" : undefined}
                            rel={detail.external ? "noopener noreferrer" : undefined}
                            className="relative inline-block transition-colors duration-400 ease-brand hover:text-brand"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          detail.value
                        )}
                      </dd>
                    </Reveal>
                  ))}
                </dl>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal amount={0.05}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
