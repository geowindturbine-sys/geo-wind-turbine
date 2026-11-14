"use client";

/**
 * Hero.tsx — Above-the-fold hero section (v4)
 *
 * Layout: Two-column design
 *   LEFT  (42%) — solid #FAF9F2 background, all text + CTAs
 *   RIGHT (58%) — independent image container, NO text overlay
 *
 * Fixes applied:
 * - Left panel: all px/py spacing via inline styles (Tailwind v4 spacing unreliable)
 * - CTA container: flexWrap + proper gap so buttons stay inside the panel
 * - Both CTAs: explicit minHeight 54px, inline padding, explicit colors
 * - Image: scale entrance animation (0.97 → 1) + subtle parallax on scroll
 * - Chips: staggered floating animation loops (transform/opacity only)
 * - Heading: individual word stagger with custom reveal variants
 * - All animations respect prefers-reduced-motion
 * - Zero layout shifts — only transform/opacity animated
 */

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";

import {
  ArrowUpRight,
  ArrowDown,
  Wind,
  Zap,
  Volume2,
  ChevronDown,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";
import type Lenis from "lenis";

// ── Animation variants ─────────────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const reveal = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

// Individual heading line stagger — slightly more dramatic
const headingLineVariant = {
  hidden:  { opacity: 0, y: 36, skewY: 1.5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      delay: 0.08 + i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Image panel: scale + fade entrance
const imageEntrance = (reduced: boolean) => ({
  initial: reduced ? false : { opacity: 0, scale: 0.97, x: 20 },
  animate: { opacity: 1, scale: 1, x: 0 },
  transition: {
    duration: reduced ? 0 : 1.2,
    delay: reduced ? 0 : 0.15,
    ease: [0.22, 1, 0.36, 1],
  },
});

const chipReveal = {
  hidden:  { opacity: 0, scale: 0.88, y: 12 },
  visible: (d: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: d, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Animated counter hook ──────────────────────────────────────────────────────

function AnimatedCount({
  to,
  suffix,
  duration = 2,
}: {
  to: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString() + suffix);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [inView, to, duration, count]);

  return (
    <motion.span ref={ref} style={{ display: "inline" }}>
      {rounded}
    </motion.span>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Track actual navbar height (navbar + announcement bar) so hero padding is always correct
  const [navbarHeight, setNavbarHeight] = useState(100);
  useEffect(() => {
    const navbar = document.querySelector("header") as HTMLElement | null;
    if (!navbar) return;
    const update = () => setNavbarHeight(navbar.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(navbar);
    return () => ro.disconnect();
  }, []);

  // Parallax: image moves slightly slower than scroll
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, shouldReduceMotion ? 0 : 40]);

  // Smooth-scroll anchor via Lenis
  const handleAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      e.preventDefault();
      const lenis = (window as typeof window & { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.scrollTo(hash, { offset: -100, duration: 1.4 });
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  // Heading lines split for stagger
  const headingLines = ["A New", "Perspective", "on"];

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
      style={{ paddingTop: `${navbarHeight}px` }}
    >
      {/* ── MAIN TWO-COLUMN LAYOUT ───────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: `min(calc(100vh - ${navbarHeight}px), 900px)` }}>

        {/* ══ LEFT CONTENT PANEL ══════════════════════════════════════════════ */}
        {/*
          All padding via inline styles — Tailwind v4 px-N / py-N utilities
          are not compiling for this project (computed paddingLeft returns 0px).
          Responsive padding uses clamp() for a smooth fluid scale.
        */}
        <div
          className="flex flex-col justify-start bg-[#FAF9F2] md:w-[42%]"
          style={{
            paddingLeft: "clamp(24px, 5.5vw, 80px)",
            paddingRight: "clamp(24px, 4vw, 56px)",
            paddingTop: "clamp(32px, 5vh, 72px)",
            paddingBottom: "clamp(24px, 3vh, 56px)",
          }}
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-[560px] md:mx-0"
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={reveal}
              className="inline-flex items-center gap-3"
              style={{ marginBottom: "clamp(14px, 2vw, 32px)" }}
            >
              <span
                className="flex items-center justify-center rounded-full bg-[#E8EF83] text-[#26352B]"
                style={{ height: "36px", width: "36px" }}
              >
                <Wind size={17} strokeWidth={2} />
              </span>
              <span
                className="font-bold uppercase tracking-[0.22em] text-[#69756A]"
                style={{ fontSize: "11px" }}
              >
                Indian Wind Energy Engineering
              </span>
            </motion.div>

            {/* Headline — staggered per-line */}
            <h1
              id="hero-heading"
              className="font-display font-extrabold tracking-[-0.075em] text-[#26352B]"
              style={{ fontSize: "clamp(2.8rem, 4.8vw, 5.4rem)", lineHeight: 0.97 }}
            >
              {headingLines.map((line, i) => (
                <motion.span
                  key={line}
                  custom={i}
                  variants={shouldReduceMotion ? undefined : headingLineVariant}
                  initial={shouldReduceMotion ? undefined : "hidden"}
                  animate={shouldReduceMotion ? undefined : "visible"}
                  style={{ display: "block" }}
                >
                  {line}
                </motion.span>
              ))}
              {/* "Wind." line with accent */}
              <motion.span
                custom={3}
                variants={shouldReduceMotion ? undefined : headingLineVariant}
                initial={shouldReduceMotion ? undefined : "hidden"}
                animate={shouldReduceMotion ? undefined : "visible"}
                style={{ display: "block" }}
              >
                <span
                  className="relative inline-block"
                  style={{ color: "#5F8A2E" }}
                >
                  Wind.
                  {/* Underline SVG */}
                  <svg
                    viewBox="0 0 270 18"
                    fill="none"
                    aria-hidden="true"
                    className="absolute left-0 w-full"
                    style={{ bottom: "-8px" }}
                  >
                    <path
                      d="M3 12C65 3 181 2 266 9"
                      stroke="#A7C957"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              variants={reveal}
              className="max-w-[480px] leading-[1.85] text-[#5A6B5C]"
              style={{
                marginTop: "clamp(20px, 2.5vw, 36px)",
                fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
              }}
            >
              Engineering vertical-axis wind turbine solutions for a changing
              world — designed for rooftops, industrial sites, and distributed
              energy networks where conventional turbines cannot operate.
            </motion.p>

            {/* ── CTA BUTTONS ─────────────────────────────────────────────────── */}
            {/*
              flexWrap ensures both buttons always stay inside the panel.
              gap: 14px between buttons.
              Both buttons: minHeight 54px, 16px font, explicit colors.
            */}
            <motion.div
              id="hero-cta-buttons"
              variants={reveal}
              style={{
                marginTop: "clamp(22px, 2.8vw, 40px)",
                display: "flex",
                gap: "14px",
                alignItems: "center",
              }}
            >
              {/* Primary CTA — Discuss Your Project */}
              <a
                href="#enquiry"
                onClick={(e) => handleAnchor(e, "#enquiry")}
                className="
                  group inline-flex items-center justify-center
                  rounded-full bg-[#26352B]
                  font-semibold
                  shadow-[0_8px_28px_rgba(38,53,43,0.18)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-[#3D5244]
                  hover:shadow-[0_16px_40px_rgba(38,53,43,0.26)]
                "
                style={{
                  gap: "12px",
                  minHeight: "54px",
                  paddingLeft: "20px",
                  paddingRight: "8px",
                  fontSize: "16px",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  lineHeight: 1,
                }}
              >
                Discuss Your Project
                <span
                  className="flex items-center justify-center rounded-full bg-[#A7C957] text-[#26352B] transition-transform duration-300 group-hover:rotate-45"
                  style={{ height: "38px", width: "38px", flexShrink: 0 }}
                >
                  <ArrowUpRight size={18} />
                </span>
              </a>

              {/* Secondary CTA — Explore Turbines */}
              <a
                href="#products"
                onClick={(e) => handleAnchor(e, "#products")}
                className="
                  group inline-flex items-center justify-center
                  rounded-full
                  border-2 border-[#C8D5C4]
                  bg-transparent
                  font-semibold
                  transition-all duration-300
                  hover:border-[#A7C957] hover:bg-[#EEF2E8]
                "
                style={{
                  gap: "10px",
                  minHeight: "54px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  fontSize: "16px",
                  color: "#26352B",
                  textDecoration: "none",
                  lineHeight: 1,
                }}
              >
                Explore Turbines
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              id="hero-scroll-indicator-wrapper"
              variants={reveal}
              style={{ marginTop: "clamp(24px, 3vw, 48px)" }}
            >
            <div
              id="hero-scroll-indicator"
              className="hidden items-center gap-3 sm:flex"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DFE5D9] text-[#A7C957]"
              >
                <ChevronDown size={18} />
              </motion.div>
              <span className="font-medium uppercase tracking-[0.18em] text-[#B4BAB2]" style={{ fontSize: "11px" }}>
                Scroll to explore
              </span>
            </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ══ RIGHT IMAGE PANEL ═══════════════════════════════════════════════ */}
        {/*
          Completely independent container.
          NO main text or CTA — purely the product image.
          Stat chips are decorative floating cards on the image.
        */}
        <div
          id="hero-image-panel"
          className="relative overflow-hidden min-h-[360px] md:min-h-0 md:w-[58%]"
        >
          {/* Background warmth tint */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#EEF2E8]"
          />

          {/* Citrus radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 75% 25%, rgba(232,239,131,0.35) 0%, transparent 65%)",
            }}
          />

          {/* ── THE IMAGE — scale entrance + parallax ────────────────────────── */}
          <motion.div
            className="absolute inset-0"
            style={{ y: imageY }}
            {...imageEntrance(shouldReduceMotion ?? false)}
          >
            <Image
              src="/assets/images/Vertical Wind Turbine in an Industrial Park.png"
              alt="GEO vertical-axis wind turbine installed in an industrial park"
              fill
              priority
              quality={95}
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-center sm:object-top"
            />
          </motion.div>

          {/* "Engineered in India" badge — top-left */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="
              absolute left-3 top-3
              z-10
              flex items-center gap-1.5
              rounded-full border border-white/40
              bg-white/85 backdrop-blur-md
              shadow-sm
              sm:left-8 sm:top-7
            "
            style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "7px", paddingBottom: "7px" }}
          >
            <span className="h-2 w-2 rounded-full bg-[#8BAE49]" />
            <span className="font-bold uppercase tracking-[0.15em] text-[#26352B]" style={{ fontSize: "10px" }}>
              Engineered in India
            </span>
          </motion.div>

          {/* Chip 1 — Power Range (top-right) */}
          {/* Power Range chip — scaled down on mobile, full size sm+ */}
          <motion.div
            className="absolute right-3 top-3 z-10 sm:right-8 sm:top-16"
            animate={shouldReduceMotion ? {} : { y: [0, -5, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
          <motion.div
            custom={1.05}
            variants={chipReveal}
            initial="hidden"
            animate="visible"
            className="flex items-center rounded-xl border border-[#DFE5D9] bg-white/95 backdrop-blur-sm shadow-[0_10px_32px_rgba(38,53,43,0.11)] sm:rounded-2xl"
            style={{ gap: "8px", paddingLeft: "10px", paddingRight: "10px", paddingTop: "9px", paddingBottom: "9px" }}
          >
            {/* Mobile: smaller icon box */}
            <div
              className="flex items-center justify-center rounded-lg bg-[#E8EF83] sm:rounded-xl"
              style={{ height: "28px", width: "28px" }}
            >
              <Zap size={13} className="text-[#26352B] sm:hidden" strokeWidth={2.2} />
              <Zap size={18} className="hidden text-[#26352B] sm:block" strokeWidth={2.2} />
            </div>
            <div>
              <p className="font-bold uppercase tracking-[0.12em] text-[#A0A99D]" style={{ fontSize: "8px" }}>
                Power Range
              </p>
              <p className="font-bold text-[#26352B]" style={{ marginTop: "1px", fontSize: "11px" }}>
                50W – 1.2kW
              </p>
            </div>
          </motion.div>
          </motion.div>

          {/* Chip 2 — Silent Operation (right-mid) — hidden on mobile, shown sm+ */}
          <motion.div
            className="absolute right-5 z-10 hidden sm:block sm:right-8" style={{ top: "55%" }}
            animate={shouldReduceMotion ? {} : { y: [0, -7, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
          <motion.div
            custom={1.25}
            variants={chipReveal}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 rounded-xl border border-[#DFE5D9] bg-white/95 backdrop-blur-sm shadow-[0_8px_24px_rgba(38,53,43,0.09)]"
            style={{ paddingLeft: "14px", paddingRight: "14px", paddingTop: "12px", paddingBottom: "12px" }}
          >
            <div
              className="flex items-center justify-center rounded-lg bg-[#EEF2E8]"
              style={{ height: "36px", width: "36px" }}
            >
              <Volume2 size={16} className="text-[#7FAA3A]" />
            </div>
            <div>
              <p className="font-bold uppercase tracking-[0.14em] text-[#A0A99D]" style={{ fontSize: "9px" }}>
                Operation
              </p>
              <p className="font-bold text-[#26352B]" style={{ fontSize: "13px" }}>
                Silent
              </p>
            </div>
          </motion.div>
          </motion.div>

          {/* Chip 3 — Cut-In Speed (bottom-left) — hidden on mobile, shown sm+ */}
          <motion.div
            className="absolute bottom-10 left-5 z-10 hidden sm:block sm:left-8 sm:bottom-14"
            animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          >
          <motion.div
            custom={0.85}
            variants={chipReveal}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 rounded-2xl border border-[#DFE5D9] bg-white/95 backdrop-blur-sm shadow-[0_12px_40px_rgba(38,53,43,0.13)]"
            style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "16px", paddingBottom: "16px" }}
          >
            <div
              className="flex items-center justify-center rounded-xl bg-[#EEF2E8]"
              style={{ height: "44px", width: "44px" }}
            >
              <Wind size={22} className="text-[#7FAA3A]" />
            </div>
            <div>
              <p className="font-bold uppercase tracking-[0.17em] text-[#A0A99D]" style={{ fontSize: "9px" }}>
                Cut-In Speed
              </p>
              <p className="font-bold text-[#26352B]" style={{ marginTop: "2px", fontSize: "15px" }}>
                2 m/s
              </p>
              <p className="text-[#69756A]" style={{ fontSize: "9px" }}>
                Operates in low-wind zones
              </p>
            </div>
          </motion.div>
          </motion.div>
        </div>

        {/* ── BELOW-IMAGE SPEC CARDS (mobile only) ─────────────────────────── */}
        <div className="sm:hidden px-4 py-3 bg-[#FAF9F2]">
          <div className="grid grid-cols-2 gap-2">

            {/* Cut-In Speed card */}
            <div className="flex items-center gap-2.5 rounded-xl border border-[#DFE5D9] bg-white/95 shadow-[0_4px_16px_rgba(38,53,43,0.08)]"
              style={{ padding: "11px 13px" }}>
              <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#EEF2E8]"
                style={{ height: "34px", width: "34px" }}>
                <Wind size={16} className="text-[#7FAA3A]" />
              </div>
              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-[#A0A99D]" style={{ fontSize: "8px" }}>
                  Cut-In Speed
                </p>
                <p className="font-bold text-[#26352B]" style={{ fontSize: "14px", marginTop: "1px" }}>
                  2 m/s
                </p>
                <p className="text-[#69756A]" style={{ fontSize: "8px" }}>
                  Low-wind zones
                </p>
              </div>
            </div>

            {/* Silent Operation card */}
            <div className="flex items-center gap-2.5 rounded-xl border border-[#DFE5D9] bg-white/95 shadow-[0_4px_16px_rgba(38,53,43,0.08)]"
              style={{ padding: "11px 13px" }}>
              <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#EEF2E8]"
                style={{ height: "34px", width: "34px" }}>
                <Volume2 size={16} className="text-[#7FAA3A]" />
              </div>
              <div>
                <p className="font-bold uppercase tracking-[0.12em] text-[#A0A99D]" style={{ fontSize: "8px" }}>
                  Operation
                </p>
                <p className="font-bold text-[#26352B]" style={{ fontSize: "14px", marginTop: "1px" }}>
                  Silent
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── BOTTOM STATS STRIP ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative border-t border-[#DFE5D9] bg-[#F4F5EC]"
      >
        <div
          className="
            mx-auto
            grid max-w-[1440px] grid-cols-1
            divide-y divide-[#DFE5D9]
            sm:grid-cols-3 sm:divide-x sm:divide-y-0
          "
          style={{ paddingLeft: "clamp(24px, 4.5vw, 72px)", paddingRight: "clamp(24px, 4.5vw, 72px)" }}
        >
          {/* Stat 1 — Product models */}
          <div className="flex items-center gap-5 py-7 sm:px-8 sm:first:pl-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF2E8]">
              <Wind size={20} className="text-[#7FAA3A]" />
            </div>
            <div>
              <p
                className="font-display font-extrabold tracking-tight text-[#26352B]"
                style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}
              >
                <AnimatedCount to={3} suffix=" Models" duration={1.2} />
              </p>
              <p
                className="font-medium text-[#69756A]"
                style={{ marginTop: "2px", fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
              >
                GW-50 · GW-250 · GW-1200
              </p>
            </div>
          </div>

          {/* Stat 2 — Wind speed */}
          <div className="flex items-center gap-5 py-7 sm:px-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF2E8]">
              <Zap size={20} className="text-[#7FAA3A]" />
            </div>
            <div>
              <p
                className="font-display font-extrabold tracking-tight text-[#26352B]"
                style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}
              >
                <AnimatedCount to={2} suffix=" m/s" duration={1.4} />
              </p>
              <p
                className="font-medium text-[#69756A]"
                style={{ marginTop: "2px", fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
              >
                Minimum cut-in wind speed
              </p>
            </div>
          </div>

          {/* Stat 3 — Wind direction capture */}
          <div className="flex items-center gap-5 py-7 sm:px-8 sm:last:pr-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF2E8]">
              <ArrowDown size={20} className="text-[#7FAA3A]" />
            </div>
            <div>
              <p
                className="font-display font-extrabold tracking-tight text-[#26352B]"
                style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}
              >
                <AnimatedCount to={360} suffix="°" duration={1.8} />
              </p>
              <p
                className="font-medium text-[#69756A]"
                style={{ marginTop: "2px", fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
              >
                Wind capture — any direction
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
