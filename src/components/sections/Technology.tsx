"use client";

/**
 * Technology.tsx — "Our Technology" section  (Section 3)
 *
 * Design: premium editorial engineering showcase.
 * Layout: two-column — exploded-view turbine image (left) + tech content (right).
 *
 * Key design decisions:
 * - Image sits DIRECTLY on the forest-green background (no white card).
 * - Soft radial glow behind the assembly separates it from background.
 * - Three numbered technology points replace the previous 6-card bento grid.
 * - Thin ruled separators between tech points; hover reveals lime accent.
 * - Subtle SVG technical grid pattern in background.
 * - Full prefers-reduced-motion support.
 *
 * Content: drawn only from verified VAWT architecture — no invented specs.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// ── Design tokens ─────────────────────────────────────────────────────────────

const FOREST  = "#26352B";
const CITRUS  = "#A7C957";
const LEMON   = "#E8EF83";
const WHITE55 = "rgba(255,255,255,0.55)";
const WHITE70 = "rgba(255,255,255,0.70)";
const BORDER  = "rgba(255,255,255,0.09)";

// ── Animation helpers ─────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  },
});

const fadeIn = (delay = 0) => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay },
  },
});

const slideLeft = (delay = 0) => ({
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.95, ease: EASE, delay },
  },
});

// ── Technology content ────────────────────────────────────────────────────────

const TECH_POINTS = [
  {
    num: "01",
    title: "Vertical-Axis Architecture",
    body:
      "The vertical-axis configuration captures wind from different directions without requiring directional alignment mechanisms.",
  },
  {
    num: "02",
    title: "Helical Rotor Design",
    body:
      "The twisted blade geometry distributes aerodynamic loading throughout the rotation cycle, supporting smooth and balanced operation.",
  },
  {
    num: "03",
    title: "Modular Engineering",
    body:
      "A modular product architecture accommodates different installation configurations and project requirements across the GEO product range.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Technology() {
  const reduce = useReducedMotion();
  const VP = { once: true, margin: "0px 0px -60px 0px" };

  return (
    <section
      id="technology"
      aria-labelledby="tech-heading"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ background: FOREST }}
    >

      {/* ── Subtle technical grid background ───────────────────────────────── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.045 }}
      >
        <defs>
          <pattern
            id="tech-grid"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={CITRUS}
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" />
      </svg>

      {/* ── Fine lime accent line — top edge ──────────────────────────────── */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${CITRUS} 30%, ${CITRUS} 70%, transparent 100%)`,
          opacity: 0.3,
        }}
      />

      {/* ── Main content wrapper ─────────────────────────────────────────────── */}
      <div
        className="relative mx-auto max-w-[1440px]"
        style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
      >

        {/* ── Section eyebrow — centred on mobile, left-aligned on desktop ─── */}
        <motion.div
          variants={reduce ? undefined : fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="mb-10 flex items-center gap-3 sm:mb-14"
        >
          <span className="h-px w-8 shrink-0" style={{ background: CITRUS }} />
          <span
            className="text-[clamp(0.6rem,0.78vw,0.72rem)] font-bold uppercase tracking-[0.22em]"
            style={{ color: CITRUS }}
          >
            Our Technology
          </span>
          <span className="h-px flex-1" style={{ background: BORDER }} />
        </motion.div>

        {/* ── Two-column editorial grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-24">

          {/* ═══════════════════════════════════════════════════════════════════
              LEFT COLUMN — Exploded-view turbine image on bare background
          ══════════════════════════════════════════════════════════════════════ */}
          <motion.div
            variants={reduce ? undefined : slideLeft(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="relative mx-auto w-full"
            style={{ maxWidth: "520px" }}
          >
            {/* Radial ambient glow — sits behind the image */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-0"
              style={{
                transform: "translate(-50%, -50%)",
                width: "110%",
                height: "110%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at center, rgba(167,201,87,0.13) 0%, rgba(167,201,87,0.05) 45%, transparent 72%)",
                filter: "blur(32px)",
              }}
            />

            {/* Secondary warm-white centre glow for depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-0"
              style={{
                transform: "translate(-50%, -50%)",
                width: "60%",
                height: "60%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* The image itself — no container card, no border */}
            <div className="relative z-10" style={{ aspectRatio: "4 / 5" }}>
              <Image
                src="/assets/images/Exploded Helical Wind Turbine Assembly.png"
                alt="Exploded-view engineering diagram of GEO helical vertical-axis wind turbine assembly"
                fill
                quality={95}
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain"
                style={{ objectPosition: "center center" }}
              />
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════════
              RIGHT COLUMN — Heading, intro, three tech points
          ══════════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col">

            {/* Heading */}
            <motion.h2
              id="tech-heading"
              variants={reduce ? undefined : fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="font-display font-extrabold leading-[1.06] tracking-[-0.055em]"
              style={{ fontSize: "clamp(2.1rem,3.8vw,3.3rem)" }}
            >
              <span style={{ color: "rgba(255,255,255,0.95)" }}>
                Engineering a Different
                <br />
                Way to{" "}
              </span>
              <span style={{ color: CITRUS }}>Harness Wind.</span>
            </motion.h2>

            {/* Supporting paragraph */}
            <motion.p
              variants={reduce ? undefined : fadeUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="mt-6 max-w-[480px] leading-[1.85]"
              style={{
                fontSize: "clamp(0.9rem,1.1vw,1.05rem)",
                color: WHITE55,
              }}
            >
              At GEO Wind Turbine, our vertical-axis helical architecture brings
              together aerodynamic design, precision engineering and modular
              construction to develop wind energy solutions for diverse
              installation environments.
            </motion.p>

            {/* Three technology points */}
            <div className="mt-10 flex flex-col" style={{ gap: 0 }}>
              {TECH_POINTS.map((pt, i) => (
                <motion.div
                  key={pt.num}
                  variants={reduce ? undefined : fadeUp(0.28 + i * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VP}
                  className="group relative cursor-default py-6"
                  style={{
                    borderTop: `1px solid ${BORDER}`,
                    ...(i === TECH_POINTS.length - 1
                      ? { borderBottom: `1px solid ${BORDER}` }
                      : {}),
                  }}
                >
                  {/* Hover left accent bar */}
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 top-0 w-[2px] origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
                    style={{ background: CITRUS }}
                  />

                  <div className="flex items-start gap-5 pl-4 transition-all duration-300 group-hover:pl-6">

                    {/* Number indicator */}
                    <span
                      className="shrink-0 font-display text-[clamp(0.65rem,0.9vw,0.8rem)] font-bold tracking-[0.12em]"
                      style={{ color: CITRUS, lineHeight: "1.8", marginTop: "1px" }}
                    >
                      {pt.num}
                    </span>

                    {/* Text */}
                    <div>
                      <h3
                        className="font-display font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-white"
                        style={{
                          fontSize: "clamp(0.95rem,1.2vw,1.15rem)",
                          color: WHITE70,
                        }}
                      >
                        {pt.title}
                      </h3>
                      <p
                        className="mt-2 leading-[1.8] transition-colors duration-300 group-hover:opacity-80"
                        style={{
                          fontSize: "clamp(0.82rem,0.98vw,0.95rem)",
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
                      style={{ background: LEMON }}
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
              <span
                className="h-px flex-1"
                style={{ background: BORDER }}
              />
              <span
                className="text-[0.68rem] font-bold uppercase tracking-[0.2em]"
                style={{ color: "rgba(167,201,87,0.45)" }}
              >
                Vertical-Axis Helical Architecture
              </span>
              <span
                className="h-px flex-1"
                style={{ background: BORDER }}
              />
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
