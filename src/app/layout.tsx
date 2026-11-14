/**
 * src/app/layout.tsx — Root layout
 *
 * Fonts are self-hosted via @fontsource-variable (woff2 files ship inside
 * node_modules — no network call to Google at build time or runtime).
 * CSS variable names are kept identical so globals.css needs no changes:
 *  --font-manrope  → used as var(--font-display)
 *  --font-dmsans   → used as var(--font-sans)
 *
 * Font weights covered by the variable fonts:
 *  Manrope:  100–800 (uses 400 500 600 700 800 in the design)
 *  DM Sans:  100–700 (uses 400 500 600 in the design)
 */

import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "@fontsource-variable/manrope";
import "@fontsource-variable/dm-sans";
import "@/app/globals.css";

// ─── Font CSS variables ───────────────────────────────────────────────────────
// @fontsource-variable imports inject the @font-face rules; we set the CSS
// variables that globals.css reads via inline style on <html>.
// The variable names deliberately mirror what next/font/google would have set.

const fontVars = {
  "--font-manrope": "'Manrope Variable', Manrope, system-ui, sans-serif",
  "--font-dmsans":  "'DM Sans Variable', 'DM Sans', system-ui, sans-serif",
} as React.CSSProperties;

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
      style={fontVars}
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
