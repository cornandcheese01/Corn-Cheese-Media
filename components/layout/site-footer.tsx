import Link from "next/link";
import { FiMail, FiMapPin, FiMessageCircle, FiPhone } from "react-icons/fi";

import { Logo } from "@/components/ui/logo";
import { contact, site } from "@/content/site";

/**
 * A quiet agency footer, not a mega-footer. Contact details, navigation and
 * the lockup — nothing that isn't in the approved content.
 *
 * Grey-toned throughout (a soft grey ground, grey body copy) rather than the
 * page's white — it reads as its own quiet band under the site, distinct from
 * "just more page." Studio appears exactly once, down here, not repeated in
 * the list above it.
 */
const CONTACT_ROWS = [
  { icon: FiMail, label: contact.email, href: `mailto:${contact.email}` },
  { icon: FiPhone, label: contact.phoneDisplay, href: `tel:${contact.phoneHref}` },
  {
    icon: FiMessageCircle,
    label: `WhatsApp ${contact.whatsappDisplay}`,
    href: `https://wa.me/${contact.whatsappHref}`,
    external: true,
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-[#F0F1F3]">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link href="/" aria-label="Corn & Cheese Media — home" data-cursor="link" className="inline-block">
              <Logo variant="dark" height={30} />
            </Link>
            <p className="mt-6 max-w-sm font-body text-[1rem] text-grey">
              A Data Plus Advertising Company.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="kicker">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cursor="link"
                    className="font-body text-[0.95rem] text-grey transition-colors duration-300 hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={site.cta.href}
                  data-cursor="link"
                  className="font-body text-[0.95rem] text-grey transition-colors duration-300 hover:text-brand"
                >
                  {site.cta.label}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="kicker">Get in touch</h2>
            <ul className="mt-5 space-y-3.5">
              {CONTACT_ROWS.map(({ icon: Icon, label, href, ...rest }) => (
                <li key={label}>
                  <a
                    href={href}
                    data-cursor="link"
                    target={"external" in rest ? "_blank" : undefined}
                    rel={"external" in rest ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2.5 font-body text-[0.95rem] text-grey transition-colors duration-300 hover:text-brand"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-grey/70 transition-colors duration-300 group-hover:text-brand"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line/80 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-[0.8rem] text-grey">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2 font-body text-[0.8rem] text-grey">
            <FiMapPin aria-hidden="true" className="h-3.5 w-3.5 text-grey/70" />
            Studio: {contact.studio}
          </p>
        </div>
      </div>
    </footer>
  );
}
