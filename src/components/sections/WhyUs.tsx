"use client";

/**
 * WhyUs.tsx — Why Work With GEO section
 *
 * Design: Warm Ivory background, 4 large credibility cards in a 2×2 grid,
 * each with an oversized icon badge and bold supporting text.
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  Cog,
  Layers,
  Shield,
  Headphones,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { WHY_US_ITEMS } from "@/lib/data";

// ── Tokens ────────────────────────────────────────────────────────────────────

const IVORY  = "#FAF9F2";
const FOREST = "#26352B";
const CITRUS = "#A7C957";
const YELLOW = "#E8EF83";
const OLIVE  = "#344B38";
const MUTED  = "#5A6B5C";
const BORDER = "#DFE5D9";

const ICON_MAP: Record<string, LucideIcon> = {
  cog:        Cog,
  layers:     Layers,
  shield:     Shield,
  headphones: Headphones,
};

const ICON_TINTS = [
  { bg: `${CITRUS}1A`, color: "#5F8A2E" },
  { bg: `${YELLOW}33`, color: "#7A8A28" },
  { bg: `${CITRUS}1A`, color: "#5F8A2E" },
  { bg: `${YELLOW}33`, color: "#7A8A28" },
];

// ── Animations ────────────────────────────────────────────────────────────────

const gridReveal = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardAnim = (i: number) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.09 },
  },
});

// ── Component ─────────────────────────────────────────────────────────────────

export default function WhyUs() {
  const shouldReduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "0px 0px -60px 0px" };

  return (
    <section
      id="why-us"
      aria-labelledby="whyus-heading"
      className="overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ background: IVORY }}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mx-auto max-w-[600px] text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-10" style={{ background: CITRUS }} />
            <span
              className="text-[clamp(0.65rem,0.8vw,0.75rem)] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#69756A" }}
            >
              Why GEO Wind Turbine
            </span>
            <span className="h-px w-10" style={{ background: CITRUS }} />
          </div>

          <h2
            id="whyus-heading"
            className="font-display text-[clamp(2.3rem,4.2vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.055em]"
            style={{ color: FOREST }}
          >
            A Partner You Can{" "}
            <span style={{ color: "#5F8A2E" }}>Build On</span>
          </h2>

          <p
            className="mt-5 text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.85]"
            style={{ color: MUTED }}
          >
            Beyond the product — we bring engineering depth, project management
            discipline and ongoing support that wind energy projects demand.
          </p>
        </motion.div>

        {/* ── Cards ────────────────────────────────────────────────────────── */}
        <motion.div
          variants={shouldReduceMotion ? undefined : gridReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WHY_US_ITEMS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? HelpCircle;
            const tint = ICON_TINTS[i % ICON_TINTS.length];

            return (
              <motion.div
                key={item.title}
                variants={shouldReduceMotion ? undefined : cardAnim(i)}
                className="
                  group relative flex flex-col overflow-hidden
                  rounded-2xl border p-7 sm:p-8 lg:p-9
                  transition-all duration-300
                  hover:-translate-y-1.5
                  hover:shadow-[0_20px_52px_rgba(38,53,43,0.1)]
                "
                style={{ background: "#FFFFFF", borderColor: BORDER }}
              >
                {/* Top hover accent */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${CITRUS}, transparent)` }}
                />

                {/* Icon badge */}
                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: tint.bg }}
                >
                  <Icon size={28} style={{ color: tint.color }} strokeWidth={1.75} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3
                  className="font-display text-[clamp(1rem,1.3vw,1.2rem)] font-bold leading-snug tracking-tight"
                  style={{ color: FOREST }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="mt-3 flex-1 text-[clamp(0.82rem,1vw,0.95rem)] leading-[1.85]"
                  style={{ color: MUTED }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
