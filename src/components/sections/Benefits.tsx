"use client";

/**
 * Benefits.tsx — "Our Technology" section  (replaces the former
 * "WHY GEO WIND TURBINE – Built for India's Wind Conditions" section)
 *
 * Design: premium cinematic technology showcase.
 * Layout: two-column — turbine image left (object-contain) + tech content right.
 * Background: deep FOREST green, subtle radial lime glow, restrained SVG grid.
 * Content: three numbered technology highlights; no unverified specs.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// ── Design tokens ─────────────────────────────────────────────────────────────

const FOREST   = "#26352B";
const CITRUS   = "#A7C957";
const LEMON    = "#E8EF83";
const WHITE95  = "rgba(255,255,255,0.95)";
const WHITE70  = "rgba(255,255,255,0.70)";
const WHITE55  = "rgba(255,255,255,0.55)";
const BORDER   = "rgba(255,255,255,0.09)";
const BORDER30 = "rgba(255,255,255,0.30)";

// ── Animation helpers ─────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE, delay } },
});

const fadeIn = (delay = 0) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE, delay } },
});

const slideLeft = (delay = 0) => ({
  hidden:  { opacity: 0, x: -40, scale: 0.97 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.95, ease: EASE, delay } },
});

const slideRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE, delay } },
});

// ── Technology highlights ─────────────────────────────────────────────────────

const TECH = [
  {
    num: "01",
    title: "Vertical-Axis Architecture",
    body: "A vertical-axis configuration designed to capture wind from multiple horizontal directions without requiring active yaw alignment.",
  },
  {
    num: "02",
    title: "Helical Rotor Design",
    body: "A distinctive helical blade configuration that enables continuous rotational engagement with changing wind conditions.",
  },
  {
    num: "03",
    title: "Integrated Power Generation",
    body: "A mechanical-to-electrical conversion system designed to transform rotor movement into usable electrical output.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function Benefits() {
  const reduce = useReducedMotion();
  const VP = { once: true, margin: "0px 0px -60px 0px" };

  return (
    <section
      id="our-technology"
      aria-labelledby="ot-heading"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ background: FOREST }}
    >

      {/* ── Subtle technical grid background ───────────────────────────────── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.04 }}
      >
        <defs>
          <pattern id="ot-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={CITRUS} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ot-grid)" />
      </svg>

      {/* ── Soft radial centred glow ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(167,201,87,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Fine lime accent line — top edge ──────────────────────────────── */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${CITRUS} 30%, ${CITRUS} 70%, transparent 100%)`,
          opacity: 0.3,
        }}
      />

      {/* ── Main content wrapper ────────────────────────────────────────────── */}
      <div
        className="relative mx-auto max-w-[1440px]"
        style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
      >
        {/* ── Two-column layout ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-20">

          {/* ══════════════════════════════════════════════════════════════════
              LEFT — Turbine image, object-contain, prominent
          ═══════════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={reduce ? undefined : slideLeft(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="relative mx-auto w-full order-1 lg:order-1"
            style={{ maxWidth: "520px" }}
          >
            {/* Green atmospheric glow behind turbine */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                transform: "translate(-50%, -50%)",
                width: "120%",
                height: "120%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at center, rgba(167,201,87,0.15) 0%, rgba(167,201,87,0.06) 40%, transparent 72%)",
                filter: "blur(36px)",
                zIndex: 0,
              }}
            />

            {/* Secondary warm-centre highlight for depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                transform: "translate(-50%, -50%)",
                width: "55%",
                height: "55%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)",
                filter: "blur(18px)",
                zIndex: 0,
              }}
            />

            {/* The turbine image — object-cover crops the right-side empty space */}
            <div
              className="relative"
              style={{ aspectRatio: "2 / 3", zIndex: 1 }}
            >
              <Image
                src="/assets/images/Exploded Helical Wind Turbine Assembly (1).png"
                alt="Exploded-view engineering diagram of GEO helical vertical-axis wind turbine assembly"
                fill
                quality={95}
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
                style={{ objectPosition: "20% center" }}
              />
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT — Eyebrow, heading, paragraph, tech highlights, CTA
          ═══════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col order-2 lg:order-2">

            {/* Eyebrow */}
            <motion.div
              variants={reduce ? undefined : fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-8 shrink-0" style={{ background: CITRUS }} />
              <span
                className="text-[clamp(0.6rem,0.78vw,0.72rem)] font-bold uppercase tracking-[0.22em]"
                style={{ color: CITRUS }}
              >
                Our Technology
              </span>
              <span className="h-px w-10" style={{ background: BORDER }} />
            </motion.div>

            {/* Main heading */}
            <motion.h2
              id="ot-heading"
              variants={reduce ? undefined : fadeUp(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="font-display font-extrabold leading-[1.06] tracking-[-0.055em]"
              style={{ fontSize: "clamp(2.1rem,3.8vw,3.3rem)" }}
            >
              <span style={{ color: WHITE95 }}>Engineered Around the{" "}</span>
              <span style={{ color: CITRUS }}>Wind.</span>
            </motion.h2>

            {/* Supporting paragraphs */}
            <motion.div
              variants={reduce ? undefined : fadeUp(0.18)}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="mt-6 max-w-[480px]"
              style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
            >
              <p
                className="leading-[1.85]"
                style={{ fontSize: "clamp(0.9rem,1.1vw,1.05rem)", color: WHITE55 }}
              >
                At the heart of GEO Wind Turbine is a vertical-axis helical architecture
                designed to capture wind from changing directions and convert rotational
                motion into usable electrical energy.
              </p>
              <p
                className="leading-[1.85]"
                style={{ fontSize: "clamp(0.88rem,1.05vw,1rem)", color: "rgba(255,255,255,0.40)" }}
              >
                Our engineering approach focuses on aerodynamic performance, mechanical
                reliability, and adaptable installation configurations.
              </p>
            </motion.div>

            {/* Three technology highlights */}
            <div className="mt-10 flex flex-col" style={{ gap: 0 }}>
              {TECH.map((pt, i) => (
                <motion.div
                  key={pt.num}
                  variants={reduce ? undefined : slideRight(0.28 + i * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VP}
                  className="group relative cursor-default py-6"
                  style={{
                    borderTop: `1px solid ${BORDER}`,
                    ...(i === TECH.length - 1 ? { borderBottom: `1px solid ${BORDER}` } : {}),
                  }}
                >
                  {/* Hover left accent bar */}
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 top-0 w-[2px] origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
                    style={{ background: CITRUS }}
                  />

                  <div
                    className="flex items-start transition-all duration-300 group-hover:pl-2"
                    style={{ paddingLeft: "1rem", gap: "1.25rem" }}
                  >
                    {/* Number */}
                    <span
                      className="shrink-0 font-display font-bold tracking-[0.12em]"
                      style={{
                        color: CITRUS,
                        fontSize: "clamp(0.65rem,0.9vw,0.8rem)",
                        lineHeight: "1.8",
                        marginTop: "1px",
                      }}
                    >
                      {pt.num}
                    </span>

                    {/* Text */}
                    <div>
                      <h3
                        className="font-display font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-white"
                        style={{
                          fontSize: "clamp(0.95rem,1.2vw,1.1rem)",
                          color: WHITE70,
                        }}
                      >
                        {pt.title}
                      </h3>
                      <p
                        className="mt-2 leading-[1.8] transition-opacity duration-300 group-hover:opacity-80"
                        style={{
                          fontSize: "clamp(0.82rem,0.98vw,0.93rem)",
                          color: WHITE55,
                          maxWidth: "420px",
                        }}
                      >
                        {pt.body}
                      </p>
                    </div>

                    {/* Subtle lime dot — right edge, visible on hover */}
                    <div
                      className="ml-auto mt-1 h-1.5 w-1.5 shrink-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: LEMON, flexShrink: 0 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fine tech detail line — bottom of content */}
            <motion.div
              variants={reduce ? undefined : fadeIn(0.65)}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="mt-8 flex items-center gap-4"
            >
              <span className="h-px flex-1" style={{ background: BORDER }} />
              <span
                className="text-[0.68rem] font-bold uppercase tracking-[0.2em]"
                style={{ color: "rgba(167,201,87,0.45)" }}
              >
                Vertical-Axis Helical Architecture
              </span>
              <span className="h-px flex-1" style={{ background: BORDER }} />
            </motion.div>

          </div>
          {/* end right column */}
        </div>
        {/* end two-column grid */}
      </div>
      {/* end content wrapper */}

    </section>
  );
}
