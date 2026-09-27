import type { Metadata, Viewport } from "next";
import { Montserrat, Raleway } from "next/font/google";

import { Cursor } from "@/components/layout/cursor";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { hero, site } from "@/content/site";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  // Italic faces are loaded for real (not browser-synthesised oblique) —
  // the navigation is set in italic + bold.
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — We look at data before we look for ideas.`,
    template: `%s — ${site.name}`,
  },
  description: hero.subheadline,
  icons: { icon: "/brand/mark.png", apple: "/brand/mark.png" },
  openGraph: {
    title: site.name,
    description: hero.subheadline,
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${raleway.variable}`}>
      <body>
        <SmoothScroll>
          <Cursor />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
