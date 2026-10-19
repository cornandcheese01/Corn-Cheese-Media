"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { GlassButton } from "@/components/ui/glass-button";
import { Logo } from "@/components/ui/logo";
import { EASE } from "@/components/ui/reveal";
import { contact, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The header sits over the page rather than in it. While it overlaps a dark
 * region (the homepage hero) it inverts to the white lockup on transparent;
 * past it, it settles into a quiet glass bar on white.
 *
 * Home is not a nav item — the logo returns users here from any page.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24);
      // Pages opt into the inverted header by marking regions [data-dark-region].
      // Check every one — a page can have several (the Solutions page has a dark
      // band per category plus the closing CTA), and the header is over a dark
      // region if it overlaps any of them.
      let over = false;
      document.querySelectorAll<HTMLElement>("[data-dark-region]").forEach((region) => {
        const rect = region.getBoundingClientRect();
        if (rect.top <= 40 && rect.bottom > 76) over = true;
      });
      setOverDark(over);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const inverted = overDark && !menuOpen;

  return (
    <>
      <header
        data-site-header
        className={cn(
          "fixed inset-x-0 top-0 z-[200] transition-[background-color,backdrop-filter,border-color] duration-500 ease-brand",
          scrolled && !inverted
            ? "border-b border-line/80 bg-white/70 backdrop-blur-[12px]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Corn & Cheese Media — home"
            data-cursor="link"
            className="relative -ml-1 flex items-center py-2"
          >
            <span className={cn("transition-opacity duration-500", inverted ? "opacity-0" : "opacity-100")}>
              <Logo variant="dark" height={50} priority />
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-500",
                inverted ? "opacity-100" : "opacity-0",
              )}
            >
              <Logo variant="light" height={50} />
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor="link"
                  className={cn(
                    "group relative font-display text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-400 ease-brand",
                    inverted
                      ? "text-white/80 hover:text-white"
                      : active
                        ? "text-ink"
                        : "text-grey hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-brand group-hover:scale-x-100",
                      active && "scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <GlassButton
                href={site.cta.href}
                tone={inverted ? "onDark" : "light"}
                className="rounded-full px-6 py-3 text-[0.72rem]"
              >
                {site.cta.label}
              </GlassButton>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-cursor="link"
              className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span
                className={cn(
                  "block h-px w-6 transition-all duration-500 ease-brand",
                  menuOpen ? "translate-y-[3.5px] rotate-45 bg-ink" : inverted ? "bg-white" : "bg-ink",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 transition-all duration-500 ease-brand",
                  menuOpen ? "-translate-y-[3.5px] -rotate-45 bg-ink" : inverted ? "bg-white" : "bg-ink",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[190] bg-white lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div className="shell flex h-full flex-col justify-between pb-12 pt-[104px]">
              <nav className="flex flex-col" aria-label="Mobile">
                {site.nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.12 + i * 0.06 }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      className="block py-6 font-display text-[2.25rem] font-semibold leading-none tracking-tightest text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.36 }}
                className="flex flex-col gap-6"
              >
                <GlassButton href={site.cta.href} className="rounded-full self-start">
                  {site.cta.label}
                </GlassButton>
                <div className="font-body text-sm text-grey">
                  <a href={`mailto:${contact.email}`} className="block hover:text-ink">
                    {contact.email}
                  </a>
                  <a href={`tel:${contact.phoneHref}`} className="block hover:text-ink">
                    {contact.phoneDisplay}
                  </a>
                  <p className="mt-1">{contact.studio}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
