"use client";

/**
 * HowItWorks.tsx — Six-step VAWT operational walkthrough
 *
 * Layout on ≥1280px (xl:):
 *   - True 6-column grid: each step occupies one column
 *   - Number node sits at top of each column, perfectly centred
 *   - Connector line threads through all nodes (absolute, top of node row)
 *   - Cards alternate: odd steps below, even steps above (zigzag)
 *   - Full-width "End Result" strip underneath
 *
 * Layout on 768–1279px (md:):
 *   - 2-column grid, all cards below their node
 *
 * Layout on <768px (mobile):
 *   - Vertical stepper: circles left, cards right
 *
 * NOTE: Tailwind v4 — ALL new spacing values use inline styles to avoid
 * utility classes that haven't been compiled into the CSS bundle.
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  Wind,
  RefreshCw,
  Cog,
  Zap,
  ArrowRightLeft,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────────

const FOREST  = "#26352B";
const CITRUS  = "#A7C957";
const YELLOW  = "#E8EF83";
const MUTED   = "#5A6B5C";
const BORDER  = "#DFE5D9";
const SAGE_BG = "#F4F5EC";

// ── Step data ─────────────────────────────────────────────────────────────────

interface Step {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    step: 1,
    icon: Wind,
    title: "Wind Interaction",
    description:
      "Ambient wind engages the helical rotor blades from any horizontal direction, requiring no active yaw tracking or reorientation.",
  },
  {
    step: 2,
    icon: RefreshCw,
    title: "Rotor Movement",
    description:
      "Aerodynamic lift and drag forces cause the vertical-axis rotor to rotate continuously about its central shaft.",
  },
  {
    step: 3,
    icon: Cog,
    title: "Mechanical Transfer",
    description:
      "Rotational energy passes from the rotor shaft to the generator via a direct-drive or coupled mechanism.",
  },
  {
    step: 4,
    icon: Zap,
    title: "Electrical Generation",
    description:
      "The generator converts rotational energy into AC or DC electrical power ready for conditioning.",
  },
  {
    step: 5,
    icon: ArrowRightLeft,
    title: "Power Conversion",
    description:
      "An inverter or charge controller conditions the generated power to meet grid standards or battery storage requirements.",
  },
  {
    step: 6,
    icon: Share2,
    title: "Energy Integration",
    description:
      "Processed electricity feeds into the building grid, off-grid storage, or the utility network — project-configured.",
  },
];

// ── Animation variants ────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const lineReveal = {
  hidden:  { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.5, ease: EASE, delay: 0.15 },
  },
};

const nodeReveal = (i: number) => ({
  hidden:  { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay: 0.25 + i * 0.13 },
  },
});

const cardReveal = (i: number, dir: 1 | -1 = 1) => ({
  hidden:  { opacity: 0, y: 22 * dir },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: 0.4 + i * 0.1 },
  },
});

const tabletCard = (i: number) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.3 + i * 0.08 },
  },
});

const stepperItem = (i: number) => ({
  hidden:  { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.09 },
  },
});

const resultReveal = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.3 },
  },
};

// ── Shared card shell (desktop + tablet) ─────────────────────────────────────
// All spacing via inline styles — Tailwind v4 bundle may not include new utils.

function StepCard({ s, i }: { s: Step; i: number }) {
  const Icon = s.icon;
  const isOdd = i % 2 === 0; // steps 1, 3, 5

  return (
    <div
      className="group transition-all duration-300 hover:-translate-y-1"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        borderRadius: "1.125rem",
        padding: "1.25rem",
        background: "white",
        border: `1px solid ${BORDER}`,
        boxShadow: "0 4px 24px rgba(38,53,43,0.07)",
        height: "100%",
        boxSizing: "border-box",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 12px 36px rgba(38,53,43,0.13)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 24px rgba(38,53,43,0.07)";
      }}
    >
      {/* Icon badge */}
      <div
        className="group-hover:scale-110 transition-transform duration-300"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.625rem",
          background: isOdd ? YELLOW : "#EEF2E8",
          flexShrink: 0,
        }}
      >
        <Icon
          size={18}
          aria-hidden="true"
          style={{ color: isOdd ? FOREST : CITRUS }}
        />
      </div>

      {/* Text */}
      <div>
        <h3
          className="font-display font-bold tracking-tight"
          style={{
            color: FOREST,
            fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
            margin: 0,
          }}
        >
          {s.title}
        </h3>
        <p
          style={{
            color: MUTED,
            fontSize: "clamp(0.72rem, 0.88vw, 0.82rem)",
            lineHeight: 1.75,
            marginTop: "0.375rem",
            marginBottom: 0,
          }}
        >
          {s.description}
        </p>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "0px 0px -60px 0px" };

  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-heading"
      className="overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ background: SAGE_BG, paddingBottom: "clamp(2.5rem, 4vw, 3.5rem)" }}
    >
      <div
        className="mx-auto max-w-[1440px]"
        style={{ paddingLeft: "clamp(1.5rem, 5vw, 4rem)", paddingRight: "clamp(1.5rem, 5vw, 4rem)" }}
      >

        {/* ── Section header ───────────────────────────────────────────────── */}
        <div className="mb-16 flex flex-col items-center text-center sm:mb-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.65, ease: EASE }}
            className="mb-6 inline-flex items-center gap-3"
          >
            <span className="h-px w-10" style={{ background: CITRUS }} />
            <span
              className="font-bold uppercase"
              style={{
                color: MUTED,
                fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)",
                letterSpacing: "0.22em",
              }}
            >
              How It Works
            </span>
            <span className="h-px w-10" style={{ background: CITRUS }} />
          </motion.div>

          <motion.h2
            id="hiw-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="max-w-[520px] font-display font-extrabold leading-[1.07]"
            style={{
              color: FOREST,
              fontSize: "clamp(2.3rem, 4.2vw, 3.5rem)",
              letterSpacing: "-0.055em",
            }}
          >
            From Wind{" "}
            <span style={{ color: "#5F8A2E" }}>to Watts</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.65, ease: EASE, delay: 0.16 }}
            className="mt-5 max-w-[460px] leading-[1.85]"
            style={{
              color: MUTED,
              fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            }}
          >
            Six stages transform ambient wind into usable electricity —
            engineered for reliability at every step of the conversion chain.
          </motion.p>
        </div>

        {/* ════ DESKTOP ≥1280px ════ */}
        <div className="hidden xl:block">
          <div
            className="grid grid-cols-6"
            style={{ gap: "1rem" }}
          >
            {/* ROW A: above-line cards — even index (steps 2, 4, 6) */}
            {STEPS.map((s, i) => (
              <div key={`above-${s.step}`} style={{ minHeight: "10rem" }}>
                {i % 2 === 1 ? (
                  <motion.div
                    style={{ height: "100%" }}
                    variants={shouldReduceMotion ? undefined : cardReveal(i, -1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                  >
                    <StepCard s={s} i={i} />
                  </motion.div>
                ) : (
                  <div style={{ height: "100%" }} />
                )}
              </div>
            ))}

            {/* ROW B: connector line + number nodes */}
            <div
              className="relative col-span-6 flex items-center justify-around"
              style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
            >
              <motion.div
                className="absolute"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: "calc(100% / 12)",
                  right: "calc(100% / 12)",
                  height: "2px",
                  background: `linear-gradient(to right, ${CITRUS}, ${BORDER} 50%, ${CITRUS})`,
                  transformOrigin: "left center",
                }}
                variants={shouldReduceMotion ? undefined : lineReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              />
              {STEPS.map((s, i) => (
                <motion.div
                  key={`node-${s.step}`}
                  className="relative z-10 flex flex-col items-center"
                  variants={shouldReduceMotion ? undefined : nodeReveal(i)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                >
                  <div
                    className="flex items-center justify-center rounded-full font-display font-extrabold"
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      background: i % 2 === 0 ? FOREST : CITRUS,
                      color:      i % 2 === 0 ? YELLOW  : FOREST,
                      fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                      boxShadow: `0 0 0 4px ${SAGE_BG}`,
                    }}
                  >
                    {s.step}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ROW C: below-line cards — odd index (steps 1, 3, 5) */}
            {STEPS.map((s, i) => (
              <div key={`below-${s.step}`} style={{ minHeight: "10rem" }}>
                {i % 2 === 0 ? (
                  <motion.div
                    style={{ height: "100%" }}
                    variants={shouldReduceMotion ? undefined : cardReveal(i, 1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                  >
                    <StepCard s={s} i={i} />
                  </motion.div>
                ) : (
                  <div style={{ height: "100%" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ════ TABLET 768–1279px ════ */}
        <div className="hidden md:block xl:hidden">
          <div
            className="grid grid-cols-2"
            style={{ gap: "1.5rem" }}
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                variants={shouldReduceMotion ? undefined : tabletCard(i)}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                {/* Node + tick */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    className="flex items-center justify-center rounded-full font-display font-extrabold"
                    style={{
                      width: "3rem",
                      height: "3rem",
                      flexShrink: 0,
                      background: i % 2 === 0 ? FOREST : CITRUS,
                      color:      i % 2 === 0 ? YELLOW  : FOREST,
                      fontSize: "0.95rem",
                      boxShadow: `0 0 0 3px ${SAGE_BG}`,
                    }}
                  >
                    {s.step}
                  </div>
                  <div style={{ flex: 1, height: "1px", background: BORDER }} />
                </div>
                {/* Card */}
                <StepCard s={s} i={i} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ════ MOBILE <768px ════ */}
        <div className="md:hidden">
          {/*
            Vertical stepper:
            - Left gutter: 2.75rem node width + 0.75rem gap = 3.5rem
            - Vertical line runs down the left side, centred on the nodes
            - Cards fill the remaining width
          */}
          <div
            style={{
              position: "relative",
              paddingLeft: "3.5rem",   // gutter for circle + gap
            }}
          >
            {/* Vertical connecting line — centred on the circles (1.375rem from left of this div) */}
            <div
              style={{
                position: "absolute",
                top: "1.375rem",       // half-node offset from first circle top
                bottom: "1.375rem",    // mirror at bottom
                left: "1.375rem",      // half of 2.75rem node width
                width: "2px",
                background: BORDER,
              }}
            />

            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  variants={shouldReduceMotion ? undefined : stepperItem(i)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  style={{
                    position: "relative",
                    marginBottom: i === STEPS.length - 1 ? 0 : "1.25rem",
                  }}
                >
                  {/* Number circle — absolute, centred on the left line */}
                  <div
                    className="flex items-center justify-center rounded-full font-display font-extrabold"
                    style={{
                      position: "absolute",
                      left: "-3.5rem",         // pull back to left gutter
                      top: "1rem",             // aligns with top of card content
                      width: "2.75rem",
                      height: "2.75rem",
                      background: i % 2 === 0 ? FOREST : CITRUS,
                      color:      i % 2 === 0 ? YELLOW  : FOREST,
                      fontSize: "0.9rem",
                      boxShadow: `0 0 0 3px ${SAGE_BG}`,
                      zIndex: 1,
                    }}
                  >
                    {s.step}
                  </div>

                  {/* Card — full width of the right column */}
                  <div
                    style={{
                      borderRadius: "1.125rem",
                      padding: "1.25rem",
                      background: "white",
                      border: `1px solid ${BORDER}`,
                      boxShadow: "0 4px 20px rgba(38,53,43,0.07)",
                    }}
                  >
                    {/* Icon badge */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "0.5rem",
                        background: i % 2 === 0 ? YELLOW : "#EEF2E8",
                        marginBottom: "0.625rem",
                      }}
                    >
                      <Icon
                        size={16}
                        aria-hidden="true"
                        style={{ color: i % 2 === 0 ? FOREST : CITRUS }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display font-bold tracking-tight"
                      style={{
                        color: FOREST,
                        fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        color: MUTED,
                        fontSize: "clamp(0.78rem, 0.95vw, 0.88rem)",
                        lineHeight: 1.75,
                        marginTop: "0.375rem",
                        marginBottom: 0,
                      }}
                    >
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ════ END RESULT strip ════ */}
        <motion.div
          variants={shouldReduceMotion ? undefined : resultReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative overflow-hidden"
          style={{
            marginTop: "2.25rem",    // reduced from 3.5rem — tighter gap above Result
            borderRadius: "1.25rem",
            background: FOREST,
          }}
        >
          {/* Radial highlight */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 120% at 50% -20%, rgba(167,201,87,0.08) 0%, transparent 70%)",
            }}
          />

          <div
            className="relative"
            style={{
              padding: "2rem 2.5rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {/* Left: icon + label + description */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1.25rem",
                flex: 1,
                minWidth: "280px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexShrink: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0.75rem",
                  width: "3.25rem",
                  height: "3.25rem",
                  background: YELLOW,
                }}
              >
                <Zap size={22} style={{ color: FOREST }} aria-hidden="true" />
              </div>

              <div style={{ textAlign: "left" }}>
                <p
                  className="font-bold uppercase"
                  style={{
                    color: CITRUS,
                    fontSize: "clamp(0.65rem, 0.8vw, 0.72rem)",
                    letterSpacing: "0.18em",
                  }}
                >
                  The Result
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.78)",
                    fontSize: "clamp(0.88rem, 1.05vw, 1rem)",
                    lineHeight: 1.6,
                    marginTop: "0.25rem",
                  }}
                >
                  Clean, renewable electricity — delivered from wind speeds as
                  low as{" "}
                  <strong className="text-white">2 m/s</strong>, with zero
                  emissions and minimal maintenance.
                </p>
              </div>
            </div>

            {/* Right: stat pills */}
            <div
              style={{ display: "flex", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end", gap: "0.75rem" }}
            >
              {[
                { label: "Cut-in speed", value: "2 m/s" },
                { label: "Emissions",    value: "Zero"  },
                { label: "Directions",   value: "360°"  },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1.25rem",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    minWidth: "5rem",
                  }}
                >
                  <span
                    className="font-display font-extrabold"
                    style={{ color: YELLOW, fontSize: "1.3rem", lineHeight: 1.1 }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-medium uppercase"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      marginTop: "0.25rem",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
