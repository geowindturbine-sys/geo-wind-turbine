"use client";

/**
 * Footer — Premium 5-column footer on Deep Forest background.
 *
 * Columns: Brand | Navigation | Products | Locations | Contact
 * - Brand: Wind icon logo, tagline, 3 social links
 * - Navigation: main nav links
 * - Products: GW-50, GW-250, GW-1200 links
 * - Locations: 6 Indian city links (SEO/GEO pages)
 * - Contact: ⚠️ Placeholder contact info (replace before launch)
 *
 * Uses "use client" because links have hover state handlers.
 *
 * ⚠️ UNVERIFIED — Contact details are placeholders.
 */

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Wind, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LinkItem {
  label: string;
  href:  string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCT_LINKS: LinkItem[] = [
  { label: "GW-50 — 50W Compact",   href: "/products/gw-50"   },
  { label: "GW-250 — 250W Mid-Range",href: "/products/gw-250"  },
  { label: "GW-1200 — 1.2kW Flagship",href: "/products/gw-1200"},
];

const LOCATION_LINKS: LinkItem[] = [
  { label: "Mumbai",    href: "/locations/maharashtra/mumbai"      },
  { label: "Delhi",     href: "/locations/delhi/new-delhi"         },
  { label: "Bangalore", href: "/locations/karnataka/bangalore"     },
  { label: "Chennai",   href: "/locations/tamil-nadu/chennai"      },
  { label: "Hyderabad", href: "/locations/telangana/hyderabad"     },
  { label: "Pune",      href: "/locations/maharashtra/pune"        },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const colHeadStyle: React.CSSProperties = {
  fontSize:      "clamp(0.62rem, 0.75vw, 0.7rem)",
  fontWeight:    700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color:         "rgba(255,255,255,0.35)",
  marginBottom:  "1rem",
  display:       "block",
};

// ─── Hover-aware link ─────────────────────────────────────────────────────────

function FooterLink({ href, label }: LinkItem) {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <Link
        href={href}
        style={{
          fontSize:        "clamp(0.78rem, 0.92vw, 0.86rem)",
          color:           hovered ? "#A7C957" : "rgba(255,255,255,0.5)",
          transition:      "color 180ms",
          display:         "inline-block",
          textDecoration:  "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
      </Link>
    </li>
  );
}

// ─── Social icon button ───────────────────────────────────────────────────────

function SocialBtn({
  href,
  label,
  icon: Icon,
}: {
  href:  string;
  label: string;
  icon:  LucideIcon;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          "2.1rem",
        height:         "2.1rem",
        borderRadius:   "0.5rem",
        background:     hovered ? "rgba(167,201,87,0.15)" : "rgba(255,255,255,0.07)",
        border:         `1px solid ${hovered ? "rgba(167,201,87,0.4)" : "rgba(255,255,255,0.1)"}`,
        color:          hovered ? "#A7C957" : "rgba(255,255,255,0.45)",
        transition:     "all 180ms",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={15} />
    </a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      style={{
        background: "#26352B",
        width:      "100%",
        overflow:   "hidden",
      }}
      aria-label="Site footer"
    >
      {/* Top divider */}
      <div
        style={{
          height:     "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(167,201,87,0.3) 50%, transparent 100%)",
        }}
      />

      {/* Main footer content */}
      <div
        style={{
          maxWidth: "1440px",
          margin:   "0 auto",
          padding:  "clamp(2.5rem, 5vw, 4.5rem) clamp(1.25rem, 4vw, 4rem)",
        }}
      >
        {/* 5-column grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
          style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)", alignItems: "start" }}
        >
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        "0.6rem",
                marginBottom:"1.1rem",
                textDecoration:"none",
              }}
            >
              <div
                style={{
                  width:          "2.1rem",
                  height:         "2.1rem",
                  borderRadius:   "0.5rem",
                  background:     "linear-gradient(135deg, #A7C957 0%, #7FAA3A 100%)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                }}
              >
                <Wind size={16} style={{ color: "#26352B" }} strokeWidth={2.2} />
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <span
                  style={{
                    display:    "block",
                    fontFamily: "var(--font-manrope, Manrope, system-ui, sans-serif)",
                    fontSize:   "clamp(0.82rem, 0.95vw, 0.9rem)",
                    fontWeight: 800,
                    color:      "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  GEO Wind
                </span>
                <span
                  style={{
                    display:   "block",
                    fontSize:  "clamp(0.6rem, 0.72vw, 0.68rem)",
                    color:     "#A7C957",
                    fontWeight:600,
                    letterSpacing:"0.06em",
                  }}
                >
                  Turbine
                </span>
              </div>
            </Link>

            <p
              style={{
                fontSize:    "clamp(0.75rem, 0.88vw, 0.82rem)",
                color:       "rgba(255,255,255,0.4)",
                lineHeight:  1.65,
                marginBottom:"1.25rem",
                maxWidth:    "200px",
              }}
            >
              Premium vertical-axis wind turbines for the built environment.
              Made in India.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <SocialBtn href="https://linkedin.com" label="LinkedIn" icon={Linkedin} />
              <SocialBtn href="https://twitter.com"  label="Twitter"  icon={Twitter}  />
              <SocialBtn href="https://youtube.com"  label="YouTube"  icon={Youtube}  />
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <span style={colHeadStyle}>Navigation</span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {NAV_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          {/* Col 3 — Products */}
          <div>
            <span style={colHeadStyle}>Products</span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {PRODUCT_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          {/* Col 4 — Locations */}
          <div>
            <span style={colHeadStyle}>Locations</span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {LOCATION_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          {/* Col 5 — Contact */}
          <div>
            <span style={colHeadStyle}>Contact</span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: Phone, text: "⚠️ +91 00000 00000" },
                { icon: Mail,  text: "⚠️ contact@geowindturbine.com" },
                { icon: MapPin,text: "⚠️ India" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <Icon size={14} style={{ color: "rgba(167,201,87,0.6)", marginTop: "0.15rem", flexShrink: 0 }} />
                  <span style={{ fontSize: "clamp(0.72rem, 0.85vw, 0.8rem)", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop:  "clamp(2rem, 4vw, 3.5rem)",
            paddingTop: "1.5rem",
            borderTop:  "1px solid rgba(255,255,255,0.08)",
            display:    "flex",
            flexWrap:   "wrap",
            gap:        "0.75rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: "clamp(0.68rem, 0.8vw, 0.75rem)", color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} GEO Wind Turbine. All rights reserved.
          </p>

          <span
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.4rem",
              fontSize:      "clamp(0.65rem, 0.78vw, 0.72rem)",
              color:         "rgba(255,255,255,0.3)",
              background:    "rgba(255,255,255,0.05)",
              border:        "1px solid rgba(255,255,255,0.08)",
              borderRadius:  "999px",
              padding:       "0.3rem 0.75rem",
            }}
          >
            🇮🇳 Made in India
          </span>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms",          href: "/terms"   },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{ fontSize: "clamp(0.68rem, 0.8vw, 0.75rem)", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
