/**
 * @file lib/animations.ts
 * @description Reusable Framer Motion animation variants for GEO Wind Turbine.
 *
 * USAGE
 * ─────
 * Import the variant you need and spread it onto a <motion.*> element:
 *
 *   import { fadeUp, staggerContainer } from "@/lib/animations";
 *
 *   <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
 *               viewport={{ once: true }}>
 *     {items.map((item) => (
 *       <motion.div key={item.id} variants={fadeUp}>{item.title}</motion.div>
 *     ))}
 *   </motion.div>
 *
 * PRINCIPLES
 * ──────────
 * - Subtle: small y-offsets (20px max), short durations (0.4–0.6s).
 * - prefers-reduced-motion: set animate to { opacity: 1 } when motion is reduced
 *   (Framer Motion respects this via useReducedMotion — consumers can check it).
 * - viewport: { once: true } on all scroll-triggered animations avoids
 *   repeated re-triggering as the user scrolls up and down.
 * - No continuous animation here (no infinite loops) — only entry and hover.
 */

import type { Variants } from "framer-motion";

/* ── Entry animations ─────────────────────────────────────────────────────── */

/**
 * Fade in while sliding up 20px.
 * Use on individual cards, text blocks, and images.
 */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Fade in with no movement. Use for overlays, backgrounds, and
 * elements where vertical travel would look awkward.
 */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * Fade in while sliding in from the left. Use for left-aligned
 * hero text or sidebar-style content.
 */
export const fadeInLeft: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Fade in while sliding in from the right. Use for right-aligned
 * hero images or feature illustrations.
 */
export const fadeInRight: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Stagger container ────────────────────────────────────────────────────── */

/**
 * Wraps a list of children that each use fadeUp (or another entry variant).
 * The parent staggers child animations with a 0.1s delay between each.
 *
 * @example
 *   <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible"
 *              viewport={{ once: true, margin: "-80px" }}>
 *     {cards.map((c) => <motion.li key={c.id} variants={fadeUp}>…</motion.li>)}
 *   </motion.ul>
 */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.10,
      delayChildren:    0.05,
    },
  },
};

/**
 * Wider stagger (0.15s) for sections with fewer, larger elements
 * (e.g. a 3-column project grid).
 */
export const staggerContainerSlow: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.15,
      delayChildren:    0.05,
    },
  },
};

/* ── Hover / interaction ──────────────────────────────────────────────────── */

/**
 * Subtle lift effect for cards. Apply as whileHover on a motion element.
 * Pairs well with the CSS box-shadow transition on the card itself.
 *
 * @example
 *   <motion.div whileHover="hover" variants={cardHover}>…</motion.div>
 */
export const cardHover: Variants = {
  rest:  { y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  hover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
};

/* ── Accordion / collapse ─────────────────────────────────────────────────── */

/**
 * Height-animated reveal for accordion/collapse panels.
 * Apply as variants on a motion.div wrapping the panel content.
 *
 * NOTE: The parent must have overflow: hidden for this to work correctly.
 *
 * @example
 *   <motion.div
 *     variants={accordionPanel}
 *     initial="collapsed"
 *     animate={isOpen ? "open" : "collapsed"}
 *   >
 *     {children}
 *   </motion.div>
 */
export const accordionPanel: Variants = {
  open:      { height: "auto", opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  collapsed: { height: 0,      opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

/* ── Image reveal ─────────────────────────────────────────────────────────── */

/**
 * Scale up slightly from 0.95 while fading in — gives images a subtle
 * "reveal" feel without being distracting.
 */
export const imageReveal: Variants = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Shared viewport config ───────────────────────────────────────────────── */

/**
 * Default viewport option for whileInView animations.
 * once: true — fires once and stays in final state.
 * margin: "-80px" — triggers slightly before the element enters the viewport.
 */
export const defaultViewport = { once: true, margin: "-80px" } as const;
