/**
 * src/app/layout.tsx — Root layout
 *
 * Loads Manrope (display/headings) and DM Sans (body) from Google Fonts via
 * next/font. Each font is exposed as a CSS variable on <html> so globals.css
 * can assign them to --font-display and --font-sans.
 *
 * Font weights loaded:
 *  Manrope: 400 500 600 700 800  (semibold through extrabold for headings)
 *  DM Sans: 400 500 600          (regular, medium, semibold for body)
 */

import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "@/app/globals.css";

// ─── Font definitions ─────────────────────────────────────────────────────────

const manrope = Manrope({
  subsets:  ["latin"],
  weight:   ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display:  "swap",
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  weight:   ["400", "500", "600"],
  variable: "--font-dmsans",
  display:  "swap",
});

// ─── Default metadata ─────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default:  "GEO Wind Turbine — Vertical-Axis Wind Turbines for the Built Environment",
    template: "%s | GEO Wind Turbine",
  },
  description:
    "GEO Wind Turbine designs and deploys helical vertical-axis wind turbines (VAWTs) for industrial, commercial, and urban environments. Complete project solutions from site assessment to commissioning.",
  keywords: [
    "vertical axis wind turbine",
    "VAWT",
    "helical wind turbine",
    "urban wind energy",
    "industrial wind turbine",
    "renewable energy India",
    "small wind turbine",
    "GEO Wind Turbine",
  ],
  robots: {
    index:  true,
    follow: true,
  },
  openGraph: {
    type:   "website",
    locale: "en_IN",
    title:  "GEO Wind Turbine — Vertical-Axis Wind Turbines for the Built Environment",
    description:
      "Purpose-built VAWTs for the built environment. Complete project solutions from feasibility through to commissioning and ongoing support.",
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface RootLayoutProps {
  children: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en-IN"
      className={`${manrope.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
