"use client";

/**
 * Navbar.tsx — Premium fixed navigation
 *
 * Changes from original:
 * - Announcement bar (dismissible) above the main nav
 * - Logo enlarged: icon 48px, "GEO" at text-xl, subtitle at text-[11px]
 * - Nav links: 16–17px, weight 500/600, dark forest-green (#3D5244 inactive, #26352B active)
 * - CTA button: dark forest-green bg, pure white text, 16px, 46–48px height, lime-green arrow section
 * - Scroll state: adds bottom border separator when scrolled
 * - Mobile menu: larger text, same full-screen overlay pattern
 * - Anchor scroll via Lenis (window.__lenis) for smooth #hash navigation
 * - All horizontal padding via inline styles (Tailwind v4 spacing utilities unreliable)
 */

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Wind, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import type Lenis from "lenis";

// ── Announcement bar content ──────────────────────────────────────────────────
const ANNOUNCEMENT = "🇮🇳  Made in India · Now serving 15+ states across the country";

// ── Animation variants ────────────────────────────────────────────────────────
const EASE_CURVE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_CURVE },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: EASE_CURVE },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: EASE_CURVE },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [announcementVisible, setAnnouncement] = useState(true);

  const pathname = usePathname();

  // ── Scroll detection ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      // Hide announcement bar after user starts scrolling
      if (window.scrollY > 60) setAnnouncement(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu open ──────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Close on route change ───────────────────────────────────────────────────
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // ── Escape key ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Smooth anchor scrolling via Lenis ───────────────────────────────────────
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("/#")) return;
      e.preventDefault();
      setMenuOpen(false);
      const target = href.slice(1); // e.g. "#enquiry"
      const lenis = (window as typeof window & { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.scrollTo(target, { offset: -100, duration: 1.4 });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => setMenuOpen(false);

  // ── Navbar height offset (used by hero pt- and mobile menu pt-) ─────────────
  // 36px announcement + 100px nav = 136px; without announcement: 100px
  const navbarHeight = announcementVisible ? 136 : 100;

  return (
    <>
      {/* ── FIXED HEADER ─────────────────────────────────────────────────────── */}
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          transition-all duration-500
          ${scrolled
            ? "bg-[#FAF9F2]/92 shadow-[0_2px_32px_rgba(38,53,43,0.08)] backdrop-blur-xl border-b border-[#DFE5D9]"
            : "bg-[#FAF9F2]/96 backdrop-blur-sm"
          }
        `}
      >
        {/* ── Announcement bar ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {announcementVisible && (
            <motion.div
              initial={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_CURVE }}
              className="overflow-hidden"
            >
              <div
                className="relative flex items-center justify-center bg-[#26352B]"
                style={{ minHeight: "36px", paddingLeft: "40px", paddingRight: "40px", paddingTop: "6px", paddingBottom: "6px" }}
              >
                <p
                  className="font-medium tracking-wide text-[#E8EF83] text-center"
                  style={{ fontSize: "clamp(0.6rem, 1.8vw, 0.78rem)", lineHeight: 1.4 }}
                >
                  {ANNOUNCEMENT}
                </p>
                <button
                  onClick={() => setAnnouncement(false)}
                  aria-label="Dismiss announcement"
                  className="text-[#A7C957]/70 hover:text-[#E8EF83] transition-colors duration-200 absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main nav row ───────────────────────────────────────────────────── */}
        <nav
          id="main-nav"
          aria-label="Main navigation"
          className="mx-auto h-[100px] max-w-[1440px] items-center"
          style={{ paddingLeft: "clamp(24px, 4.5vw, 72px)", paddingRight: "clamp(24px, 4.5vw, 72px)" }}
        >
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3.5"
            aria-label="GEO Wind Turbine home"
            style={{ justifySelf: "start" }}
          >
            <div
              className="
                flex h-12 w-12 items-center justify-center
                rounded-full bg-[#26352B]
                shadow-[0_2px_12px_rgba(38,53,43,0.20)]
                transition-transform duration-500
                group-hover:rotate-[-15deg]
              "
            >
              <Wind size={22} strokeWidth={1.6} className="text-[#E8EF83]" />
            </div>

            <div className="flex flex-col leading-none">
              <span
                className="font-display font-extrabold tracking-[-0.05em] text-[#26352B]"
                style={{ fontSize: "20px" }}
              >
                GEO
              </span>
              <span
                className="font-semibold uppercase tracking-[0.18em] text-[#69756A]"
                style={{ marginTop: "3px", fontSize: "clamp(0.62rem, 0.78vw, 0.72rem)" }}
              >
                Wind Turbine
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul id="desktop-nav-links" className="items-center" role="list" style={{ gap: "22px", justifyContent: "center", justifySelf: "center" }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="group relative"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontSize: "16px",
                    fontWeight: isActive(link.href) ? 600 : 500,
                    color: isActive(link.href) ? "#26352B" : "#3D5244",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.href)) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#26352B";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.href)) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#3D5244";
                    }
                  }}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`
                      absolute bottom-1 left-4 right-4
                      h-[2px] origin-left rounded-full
                      bg-[#A7C957]
                      transition-transform duration-300
                      ${isActive(link.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA — Let's Talk */}
          <div id="desktop-cta" style={{ justifySelf: "end" }}>
            <Link
              href="/#enquiry"
              onClick={(e) => handleAnchorClick(e, "/#enquiry")}
              className="group inline-flex items-center rounded-full bg-[#26352B] transition-all duration-300 hover:bg-[#3D5244] hover:shadow-[0_8px_28px_rgba(38,53,43,0.22)]"
              style={{
                gap: "12px",
                paddingLeft: "20px",
                paddingRight: "8px",
                minHeight: "48px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#FFFFFF",
                textDecoration: "none",
                boxShadow: "0 2px 12px rgba(38,53,43,0.18)",
              }}
            >
              Let&apos;s Talk
              {/* Lime-green arrow section */}
              <span
                className="flex items-center justify-center rounded-full bg-[#E8EF83] text-[#26352B] transition-transform duration-300 group-hover:rotate-45"
                style={{ height: "34px", width: "34px", flexShrink: 0 }}
              >
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            id="mobile-menu-btn"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full border border-[#DFE5D9]
              bg-white/60
              text-[#26352B]
              transition-all duration-300
              hover:bg-[#EEF2E8]
            "
            style={{ marginLeft: "auto" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* ── MOBILE NAVIGATION OVERLAY ─────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed inset-0 z-40
              bg-[#FAF9F2]
              flex flex-col
              overflow-y-auto
            "
            style={{ paddingTop: navbarHeight }}
          >
            <div
              className="flex flex-1 flex-col pb-10"
              style={{ paddingLeft: "28px", paddingRight: "28px", paddingTop: "32px" }}
            >

              {/* Nav links */}
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col" role="list">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.href}
                      custom={index}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="border-b border-[#DFE5D9]/70"
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          handleAnchorClick(e, link.href);
                          closeMenu();
                        }}
                        tabIndex={menuOpen ? 0 : -1}
                        className="
                          flex items-center justify-between
                          py-5
                          font-display text-[22px] font-semibold
                          text-[#26352B]
                          transition-colors
                          hover:text-[#A7C957]
                        "
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className="font-bold text-[#A7C957] tabular-nums"
                            style={{ fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)" }}
                          >
                            0{index + 1}
                          </span>
                          {link.label}
                        </span>
                        <ChevronRight size={20} className="text-[#DFE5D9]" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom CTA */}
              <motion.div
                className="mt-auto"
                style={{ paddingTop: "32px" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 + 0.1, duration: 0.3 }}
              >
                <Link
                  href="/#enquiry"
                  onClick={(e) => {
                    handleAnchorClick(e, "/#enquiry");
                    closeMenu();
                  }}
                  tabIndex={menuOpen ? 0 : -1}
                  className="
                    flex items-center justify-between
                    rounded-2xl bg-[#26352B]
                    font-semibold text-white
                    transition-all duration-300
                    hover:bg-[#3D5244]
                  "
                  style={{
                    paddingLeft: "28px",
                    paddingRight: "28px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                    color: "#FFFFFF",
                    textDecoration: "none",
                  }}
                >
                  Discuss Your Project
                  <ArrowUpRight size={22} className="text-[#E8EF83]" />
                </Link>

                <p
                  className="text-center uppercase tracking-[0.2em] text-[#69756A]"
                  style={{ marginTop: "24px", fontSize: "clamp(0.62rem, 0.78vw, 0.72rem)" }}
                >
                  Engineering a Better Wind Future
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
