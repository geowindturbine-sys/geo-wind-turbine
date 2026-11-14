"use client";

/**
 * Process.tsx — Our Process / Engagement Steps section
 *
 * Design: Deep Forest dark background, 6-step horizontal timeline on desktop
 * with alternating card positions (above/below), vertical stepper on mobile.
 *
 * Reuses the HowItWorks visual language but with phase labels and a different
 * content focus (business engagement vs. physics of operation).
 */

import { motion, useReducedMotion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data";

// ── Tokens ────────────────────────────────────────────────────────────────────

const FOREST  = "#26352B";
const OLIVE   = "#344B38";
const CITRUS  = "#A7C957";
const YELLOW  = "#E8EF83";
const BORDER  = "rgba(255,255,255,0.08)";

const PHASE_COLORS: Record<string, { bg: string; text: string }> = {
  Discovery: { bg: `${YELLOW}26`, text: YELLOW },
  Assessment:{ bg: `${CITRUS}26`, text: CITRUS },
  Planning:  { bg: `${YELLOW}26`, text: YELLOW },
  Build:     { bg: `${CITRUS}26`, text: CITRUS },
  Launch:    { bg: `${YELLOW}26`, text: YELLOW },
  Support:   { bg: `${CITRUS}26`, text: CITRUS },
};

// ── Animations ────────────────────────────────────────────────────────────────

const lineReveal = {
  hidden:  { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const nodeReveal = (i: number) => ({
  hidden:  { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 + i * 0.12 },
  },
});

const cardReveal = (i: number) => ({
  hidden:  { opacity: 0, y: i % 2 === 0 ? 20 : -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 + i * 0.1 },
  },
});

const stepperItem = (i: number) => ({
  hidden:  { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  },
});

// ── Component ─────────────────────────────────────────────────────────────────

export default function Process() {
  const shouldReduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "0px 0px -60px 0px" };

  // Split 6 steps: above-line (even indices 1,3,5) + below-line (odd indices 0,2,4)
  const above = PROCESS_STEPS.filter((_, i) => i % 2 === 1);  // steps 2,4,6
  const below = PROCESS_STEPS.filter((_, i) => i % 2 === 0);  // steps 1,3,5

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ background: FOREST }}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[600px] text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-10" style={{ background: CITRUS }} />
            <span
              className="text-[clamp(0.65rem,0.8vw,0.75rem)] font-bold uppercase tracking-[0.22em]"
              style={{ color: "rgba(167,201,87,0.8)" }}
            >
              Our Process
            </span>
            <span className="h-px w-10" style={{ background: CITRUS }} />
          </div>

          <h2
            id="process-heading"
            className="font-display text-[clamp(2.3rem,4.2vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.055em] text-white"
          >
            How We{" "}
            <span style={{ color: YELLOW }}>Deliver</span>{" "}
            Your Project
          </h2>

          <p
            className="mt-5 text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.85]"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            A structured engagement model from initial consultation through
            to long-term operational support.
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            DESKTOP: Horizontal Timeline (lg+)
            ════════════════════════════════════════════════════════════════════ */}
        <div className="mt-20 hidden lg:block">
          <div className="relative">

            {/* ── Above-line cards (steps 2, 4, 6) ── */}
            <div className="mb-10 flex">
              {PROCESS_STEPS.map((step, i) => {
                const isAbove = i % 2 === 1;
                const phase   = PHASE_COLORS[step.phase] ?? PHASE_COLORS.Discovery;
                return (
                  <div key={`above-${step.step}`} className="flex-1 px-3">
                    {isAbove ? (
                      <motion.div
                        variants={shouldReduceMotion ? undefined : cardReveal(i)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="rounded-2xl border p-5 xl:p-6"
                        style={{ background: OLIVE, borderColor: BORDER }}
                      >
                        <span
                          className="mb-3 inline-block rounded-full px-2.5 py-1 text-[clamp(0.6rem,0.72vw,0.68rem)] font-bold uppercase tracking-[0.14em]"
                          style={{ background: phase.bg, color: phase.text }}
                        >
                          {step.phase}
                        </span>
                        <h3
                          className="font-display text-[clamp(0.9rem,1.1vw,1.05rem)] font-bold leading-snug text-white"
                        >
                          {step.title}
                        </h3>
                        <p
                          className="mt-2 text-[clamp(0.75rem,0.92vw,0.875rem)] leading-[1.75]"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                        >
                          {step.description}
                        </p>
                      </motion.div>
                    ) : (
                      <div className="invisible" aria-hidden="true" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Connector line ── */}
            <div className="relative flex items-center">
              <motion.div
                variants={shouldReduceMotion ? undefined : lineReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2"
                style={{
                  background: `linear-gradient(90deg, ${CITRUS}, ${YELLOW}, ${CITRUS})`,
                }}
              />

              {/* Step nodes */}
              {PROCESS_STEPS.map((step, i) => {
                const isCitrus = i % 2 === 0;
                return (
                  <div key={`node-${step.step}`} className="relative flex flex-1 justify-center">
                    <motion.div
                      variants={shouldReduceMotion ? undefined : nodeReveal(i)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewport}
                      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-display text-[clamp(0.85rem,1vw,0.95rem)] font-extrabold"
                      style={{
                        background: isCitrus ? CITRUS : YELLOW,
                        color: FOREST,
                        boxShadow: `0 0 0 4px ${FOREST}, 0 0 0 6px ${isCitrus ? CITRUS : YELLOW}44`,
                      }}
                    >
                      {String(step.step).padStart(2, "0")}
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* ── Below-line cards (steps 1, 3, 5) ── */}
            <div className="mt-10 flex">
              {PROCESS_STEPS.map((step, i) => {
                const isBelow = i % 2 === 0;
                const phase   = PHASE_COLORS[step.phase] ?? PHASE_COLORS.Discovery;
                return (
                  <div key={`below-${step.step}`} className="flex-1 px-3">
                    {isBelow ? (
                      <motion.div
                        variants={shouldReduceMotion ? undefined : cardReveal(i)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="rounded-2xl border p-5 xl:p-6"
                        style={{ background: OLIVE, borderColor: BORDER }}
                      >
                        <span
                          className="mb-3 inline-block rounded-full px-2.5 py-1 text-[clamp(0.6rem,0.72vw,0.68rem)] font-bold uppercase tracking-[0.14em]"
                          style={{ background: phase.bg, color: phase.text }}
                        >
                          {step.phase}
                        </span>
                        <h3
                          className="font-display text-[clamp(0.9rem,1.1vw,1.05rem)] font-bold leading-snug text-white"
                        >
                          {step.title}
                        </h3>
                        <p
                          className="mt-2 text-[clamp(0.75rem,0.92vw,0.875rem)] leading-[1.75]"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                        >
                          {step.description}
                        </p>
                      </motion.div>
                    ) : (
                      <div className="invisible" aria-hidden="true" />
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            MOBILE / TABLET: Vertical Stepper (< lg)
            ════════════════════════════════════════════════════════════════════ */}
        <div className="mt-14 lg:hidden">
          <div className="relative pl-14">
            {/* Vertical spine */}
            <div
              aria-hidden="true"
              className="absolute left-5 top-3 bottom-3 w-0.5"
              style={{ background: `linear-gradient(to bottom, ${CITRUS}, ${YELLOW})` }}
            />

            <ol className="space-y-8">
              {PROCESS_STEPS.map((step, i) => {
                const isCitrus = i % 2 === 0;
                const phase    = PHASE_COLORS[step.phase] ?? PHASE_COLORS.Discovery;
                return (
                  <motion.li
                    key={step.step}
                    variants={shouldReduceMotion ? undefined : stepperItem(i)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="relative"
                  >
                    {/* Node circle */}
                    <div
                      className="absolute -left-14 flex h-10 w-10 items-center justify-center rounded-full font-display text-[clamp(0.78rem,0.95vw,0.875rem)] font-extrabold"
                      style={{
                        background: isCitrus ? CITRUS : YELLOW,
                        color: FOREST,
                      }}
                    >
                      {String(step.step).padStart(2, "0")}
                    </div>

                    {/* Card */}
                    <div
                      className="rounded-2xl border p-6"
                      style={{ background: OLIVE, borderColor: BORDER }}
                    >
                      <span
                        className="mb-2.5 inline-block rounded-full px-2.5 py-1 text-[clamp(0.6rem,0.72vw,0.68rem)] font-bold uppercase tracking-[0.14em]"
                        style={{ background: phase.bg, color: phase.text }}
                      >
                        {step.phase}
                      </span>
                      <h3
                        className="font-display text-[clamp(0.95rem,1.15vw,1.1rem)] font-bold leading-snug text-white"
                      >
                        {step.title}
                      </h3>
                      <p
                        className="mt-2 text-[clamp(0.8rem,1vw,0.95rem)] leading-[1.75]"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>

      </div>
    </section>
  );
}
