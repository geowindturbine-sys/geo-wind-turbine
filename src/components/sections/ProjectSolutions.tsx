"use client";

/**
 * ProjectSolutions.tsx — Complete Solutions / Project Delivery
 *
 * Eight-stage animated project journey on a sage background.
 *
 * Animation design:
 *  - Cards reveal sequentially, 600ms stagger, fade + gentle rise (20px)
 *  - Active card glows softly in lime while revealing
 *  - Connecting line fills progressively as each phase is revealed
 *  - Desktop: snake path 01→04 right, vertical down, 08→05 left
 *  - Mobile: prominent vertical line left of card column, glowing dot tracks phase
 *  - Once complete, all cards remain fully visible — no replay on re-scroll
 *  - prefers-reduced-motion: show all cards immediately, no line animation
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  Cpu,
  DraftingCompass,
  MapPin,
  HardHat,
  Zap,
  Wrench,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { PROJECT_SOLUTIONS } from "@/lib/data";

// ── Design tokens ─────────────────────────────────────────────────────────────

const SAGE_BG       = "#F4F5EC";
const FOREST        = "#24352B";
const MUTED         = "#657568";
const LIME          = "#A5C94F";
const ICON_BG       = "#EAF0DF";
const GLASS         = "rgba(255,255,255,0.72)";
const GLASS_BORDER  = "rgba(36,53,43,0.12)";
const LINE_TRACK    = "rgba(36,53,43,0.10)";
const EASE          = [0.22, 1, 0.36, 1] as const;

// ── Timing (ms) ───────────────────────────────────────────────────────────────

const CARD_DURATION  = 620;   // how long each card's fade+rise lasts
const CARD_STAGGER   = 650;   // gap between each card's START
const INITIAL_DELAY  = 300;   // pause before first card
const GLOW_LINGER    = 800;   // how long the glow stays after last card

// ── WhatsApp config ───────────────────────────────────────────────────────────

const WHATSAPP_NUMBER  = ""; // e.g. "447911123456" — no + or spaces
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello GEO WIND TURBINE Team, I am interested in discussing a wind energy project. " +
  "I would like to know more about your turbine solutions and project requirements."
);
const WHATSAPP_HREF =
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
    : "#enquiry";

// ── Icon map ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  "cpu":               Cpu,
  "drafting-compass":  DraftingCompass,
  "map-pin":           MapPin,
  "hard-hat":          HardHat,
  "zap":               Zap,
  "wrench":            Wrench,
  "check-circle":      CheckCircle2,
  "shield-check":      ShieldCheck,
};

// ── Brief descriptions (overrides data.ts verbose text) ───────────────────────

const PHASE_DESC: Record<string, string> = {
  "sol-technology":    "Turbine units configured for your project requirements.",
  "sol-engineering":   "Detailed mechanical and electrical planning.",
  "sol-site":          "Evaluating wind resources, location and site conditions.",
  "sol-civil":         "Foundations and mounting structures prepared for installation.",
  "sol-electrical":    "Wiring, inverters, protection and power connections.",
  "sol-install":       "Professional turbine assembly and installation.",
  "sol-commissioning": "Testing, performance verification and system handover.",
  "sol-maintenance":   "Ongoing inspection, monitoring and technical assistance.",
};

// ── Individual phase card ─────────────────────────────────────────────────────

interface PhaseCardProps {
  solution:     { id: string; icon: string; title: string; description: string };
  index:        number;
  isActive:     boolean;    // currently being revealed (glow)
  isRevealed:   boolean;    // already past — stay fully visible
  reducedMotion: boolean;
}

function PhaseCard({ solution, index, isActive, isRevealed, reducedMotion }: PhaseCardProps) {
  const Icon        = ICON_MAP[solution.icon] ?? HelpCircle;
  const stepLabel   = String(index + 1).padStart(2, "0");
  const description = PHASE_DESC[solution.id] ?? solution.description;
  const [hovered, setHovered] = useState(false);

  const visible = isRevealed || reducedMotion;
  const glowing = isActive && !reducedMotion;
  const lifted  = hovered || glowing;

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
      animate={
        reducedMotion
          ? undefined
          : visible
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
      }
      transition={{ duration: CARD_DURATION / 1000, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        background:          GLASS,
        backdropFilter:      "blur(16px)",
        WebkitBackdropFilter:"blur(16px)",
        border:              `1px solid ${lifted ? LIME + "55" : GLASS_BORDER}`,
        boxShadow: glowing
          ? `0 0 0 1px ${LIME}33, 0 8px 28px rgba(36,53,43,0.10), 0 0 28px ${LIME}26`
          : hovered
            ? `0 12px 32px rgba(36,53,43,0.12), 0 0 24px ${LIME}18`
            : "0 2px 8px rgba(36,53,43,0.06), 0 6px 20px rgba(36,53,43,0.07)",
        transform:   hovered ? "translateY(-5px)" : "translateY(0)",
        transition:  "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease",
        padding:     "1.75rem",
        cursor:      "default",
        // Keep unrevealed cards invisible but in-flow so grid doesn't collapse
        visibility:  visible ? "visible" : "hidden",
      }}
    >
      {/* Top lime accent bar */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-[3px] w-full"
        style={{
          background:   `linear-gradient(90deg, ${LIME}, transparent)`,
          opacity:      lifted ? 0.9 : 0,
          transition:   "opacity 0.4s ease",
          borderRadius: "0.5rem 0.5rem 0 0",
        }}
      />

      {/* Watermark number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1 select-none font-bold leading-none"
        style={{
          fontFamily: "var(--font-jakarta, sans-serif)",
          fontSize:   "clamp(2.8rem, 5vw, 3.8rem)",
          color:      glowing ? `${LIME}28` : "rgba(36,53,43,0.045)",
          transition: "color 0.4s ease",
        }}
      >
        {stepLabel}
      </span>

      {/* Icon + phase pill */}
      <div className="mb-4 flex items-center gap-2.5">
        <div
          className="flex shrink-0 items-center justify-center rounded-xl"
          style={{
            background: ICON_BG,
            width:      "2.75rem",
            height:     "2.75rem",
            transform:  hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          <Icon size={20} aria-hidden="true" style={{ color: LIME }} strokeWidth={1.75} />
        </div>

        <span
          className="rounded-full px-2.5 py-0.5 text-[0.63rem] font-bold uppercase tracking-[0.16em]"
          style={{ background: `${LIME}22`, color: LIME }}
        >
          Phase {stepLabel}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-bold leading-snug tracking-tight"
        style={{
          fontSize:   "clamp(0.9rem, 1.1vw, 1.05rem)",
          color:      FOREST,
          fontFamily: "var(--font-jakarta, sans-serif)",
        }}
      >
        {solution.title}
      </h3>

      {/* Description */}
      <p
        className="mt-2 flex-1 leading-[1.75]"
        style={{ fontSize: "clamp(0.78rem, 0.95vw, 0.875rem)", color: MUTED }}
      >
        {description}
      </p>
    </motion.div>
  );
}

// ── Desktop snake progress lines ──────────────────────────────────────────────
// Path: 01→02→03→04 (left→right), vertical down on right, 08←07←06←05 (right→left)
// progress 0–1 drives three segments proportionally.

interface DesktopLinesProps {
  progress: number; // 0–1
}

function DesktopLines({ progress }: DesktopLinesProps) {
  // Segment breakpoints (each ~⅓ of journey)
  const seg1End = 0.46;  // row 1 horizontal
  const seg2End = 0.56;  // vertical connector
  const seg3End = 1.00;  // row 2 horizontal

  const seg1 = Math.min(progress / seg1End, 1);
  const seg2 = progress < seg1End ? 0 : Math.min((progress - seg1End) / (seg2End - seg1End), 1);
  const seg3 = progress < seg2End ? 0 : Math.min((progress - seg2End) / (seg3End - seg2End), 1);

  const lineBase: React.CSSProperties = {
    position:     "absolute",
    borderRadius: "2px",
    overflow:     "hidden",
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 hidden lg:block"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Row 1 track */}
      <div style={{ ...lineBase, top: "calc(25% - 1px)", left: "12.5%", right: "12.5%", height: "2px", background: LINE_TRACK }}>
        <div style={{ height: "100%", width: `${seg1 * 100}%`, background: `linear-gradient(90deg, ${LIME}, ${LIME}bb)`, borderRadius: "2px", transition: "width 0.35s ease" }} />
      </div>

      {/* Vertical right connector */}
      <div style={{ ...lineBase, top: "25%", height: "50%", right: "calc(12.5% - 1px)", width: "2px", background: LINE_TRACK }}>
        <div style={{ width: "100%", height: `${seg2 * 100}%`, background: LIME, borderRadius: "2px", transition: "height 0.35s ease" }} />
      </div>

      {/* Row 2 track (right→left) */}
      <div style={{ ...lineBase, top: "calc(75% - 1px)", left: "12.5%", right: "12.5%", height: "2px", background: LINE_TRACK, display: "flex", justifyContent: "flex-end" }}>
        <div style={{ height: "100%", width: `${seg3 * 100}%`, background: `linear-gradient(270deg, ${LIME}, ${LIME}bb)`, borderRadius: "2px", transition: "width 0.35s ease" }} />
      </div>
    </div>
  );
}

// ── Mobile vertical progress line ─────────────────────────────────────────────
// Rendered as a sibling column beside the card column, so it stays
// left-aligned with the cards at any viewport width.

interface MobileLineProps {
  progress:    number; // 0–1
  activeIndex: number; // which phase is currently revealing (-1 = none/done)
  total:       number;
}

function MobileLine({ progress, activeIndex, total }: MobileLineProps) {
  // Dot position: fraction along line = (activeIndex + 0.5) / total
  const dotFraction = activeIndex >= 0 ? (activeIndex + 0.5) / total : progress;

  return (
    <div
      className="lg:hidden"
      aria-hidden="true"
      style={{
        position:   "absolute",
        left:       0,
        top:        0,
        bottom:     0,
        width:      "2px",
        // Centre the line in the 3rem gutter we give the card column on mobile
        marginLeft: "1.4rem",
        zIndex:     0,
      }}
    >
      {/* Track */}
      <div
        style={{
          position:     "absolute",
          inset:        0,
          background:   LINE_TRACK,
          borderRadius: "2px",
        }}
      />

      {/* Fill */}
      <div
        style={{
          position:     "absolute",
          top:          0,
          left:         0,
          right:        0,
          height:       `${progress * 100}%`,
          background:   `linear-gradient(180deg, ${LIME}, ${LIME}cc)`,
          borderRadius: "2px",
          transition:   "height 0.5s ease",
        }}
      />

      {/* Glowing dot — tracks the active phase */}
      {activeIndex >= 0 && (
        <div
          style={{
            position:     "absolute",
            left:         "50%",
            top:          `${dotFraction * 100}%`,
            transform:    "translate(-50%, -50%)",
            width:        "10px",
            height:       "10px",
            borderRadius: "50%",
            background:   LIME,
            boxShadow:    `0 0 0 4px ${LIME}30, 0 0 12px ${LIME}60`,
            transition:   "top 0.5s ease, box-shadow 0.3s ease",
          }}
        />
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ProjectSolutions() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef         = useRef<HTMLElement>(null);
  const isInView           = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });

  const [revealedCount, setRevealedCount] = useState(0);
  const [activeIndex,   setActiveIndex]   = useState(-1);
  const total = PROJECT_SOLUTIONS.length;

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setRevealedCount(total);
      setActiveIndex(-1);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < total; i++) {
      // Each card starts revealing at INITIAL_DELAY + i * CARD_STAGGER
      const revealAt = INITIAL_DELAY + i * CARD_STAGGER;

      const revealTimer = setTimeout(() => {
        setRevealedCount(i + 1);
        setActiveIndex(i);
      }, revealAt);
      timers.push(revealTimer);

      // Clear glow after last card
      if (i === total - 1) {
        const clearTimer = setTimeout(() => {
          setActiveIndex(-1);
        }, revealAt + GLOW_LINGER);
        timers.push(clearTimer);
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [isInView, shouldReduceMotion, total]);

  const progress  = shouldReduceMotion ? 1 : revealedCount / total;
  const viewport  = { once: true, margin: "0px 0px -60px 0px" };

  return (
    <section
      ref={sectionRef}
      id="solutions"
      aria-labelledby="solutions-heading"
      className="overflow-hidden"
      style={{
        background:    SAGE_BG,
        paddingTop:    "clamp(4rem, 7vw, 6rem)",
        paddingBottom: "clamp(5rem, 8vw, 7rem)",
      }}
    >
      <div
        className="mx-auto w-full max-w-[1440px]"
        style={{
          paddingLeft:  "clamp(1.5rem, 5vw, 4rem)",
          paddingRight: "clamp(1.5rem, 5vw, 4rem)",
        }}
      >

        {/* ── Heading ── */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10" style={{ background: LIME }} />
            <span
              className="font-bold uppercase tracking-[0.22em]"
              style={{ fontSize: "clamp(0.6rem, 0.78vw, 0.72rem)", color: LIME }}
            >
              Complete Project Solutions
            </span>
            <span className="h-px w-10" style={{ background: LIME }} />
          </div>

          <h2
            id="solutions-heading"
            className="font-extrabold leading-[1.08] tracking-[-0.055em]"
            style={{
              fontSize:   "clamp(2.1rem, 4vw, 3.4rem)",
              color:      FOREST,
              fontFamily: "var(--font-jakarta, sans-serif)",
            }}
          >
            Your Project.<br />
            Our Expertise.<br />
            <span style={{ color: LIME }}>From Start to Finish.</span>
          </h2>

          <p
            className="mt-5 max-w-[580px] leading-[1.85]"
            style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)", color: MUTED }}
          >
            From engineering and site preparation to installation and ongoing support,
            we bring every stage of your wind energy project together.
          </p>
        </motion.div>

        {/* ── Journey grid ── */}
        {/*
          Mobile layout: a flex row with a 3rem left column holding the
          vertical line, and the card column taking the remaining width.
          Desktop: reverts to a simple 4-col grid with absolute lines.
        */}

        {/* Desktop grid + lines */}
        <div className="relative hidden lg:block">
          <DesktopLines progress={progress} />
          <div
            className="relative grid grid-cols-4 gap-5"
            style={{ zIndex: 1 }}
          >
            {PROJECT_SOLUTIONS.map((s, i) => (
              <PhaseCard
                key={s.id}
                solution={s}
                index={i}
                isActive={activeIndex === i}
                isRevealed={i < revealedCount}
                reducedMotion={!!shouldReduceMotion}
              />
            ))}
          </div>
        </div>

        {/* Mobile/tablet layout */}
        <div className="relative lg:hidden">
          {/* Vertical line — sits in the absolute layer */}
          <MobileLine
            progress={progress}
            activeIndex={activeIndex}
            total={total}
          />

          {/* Cards indented from the line */}
          <div
            className="relative flex flex-col gap-4"
            style={{ paddingLeft: "3.5rem", zIndex: 1 }}
          >
            {PROJECT_SOLUTIONS.map((s, i) => (
              <PhaseCard
                key={s.id}
                solution={s}
                index={i}
                isActive={activeIndex === i}
                isRevealed={i < revealedCount}
                reducedMotion={!!shouldReduceMotion}
              />
            ))}
          </div>
        </div>

        {/* ── CTA panel — always below all cards ── */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            marginTop:   "clamp(3rem, 5vw, 4.5rem)",
            background:  GLASS,
            backdropFilter:       "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border:    `1px solid ${GLASS_BORDER}`,
            boxShadow: "0 4px 24px rgba(36,53,43,0.08), 0 1px 4px rgba(36,53,43,0.05)",
          }}
        >
          {/* Ambient lime wash */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 100% at 50% 115%, ${LIME}16 0%, transparent 70%)`,
            }}
          />

          <div
            className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
            style={{
              padding: "clamp(1.75rem, 3vw, 2.5rem) clamp(1.75rem, 3.5vw, 3rem)",
            }}
          >
            {/* Copy */}
            <div style={{ maxWidth: "560px" }}>
              <h3
                className="font-bold leading-snug tracking-tight"
                style={{
                  fontSize:   "clamp(1.05rem, 1.6vw, 1.45rem)",
                  color:      FOREST,
                  fontFamily: "var(--font-jakarta, sans-serif)",
                }}
              >
                Ready to Start Your Wind Energy Project?
              </h3>
              <p
                className="mt-2 leading-[1.8]"
                style={{ fontSize: "clamp(0.83rem, 1vw, 0.95rem)", color: MUTED }}
              >
                Tell us about your location and energy requirements. Let&apos;s explore the
                right GEO Wind Turbine configuration for your site.
              </p>
            </div>

            {/* Button */}
            <CtaButton />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ── CTA Button (isolated for hover state) ─────────────────────────────────────

function CtaButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WHATSAPP_HREF}
      {...(WHATSAPP_NUMBER ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex shrink-0 items-center gap-2.5 rounded-full font-semibold"
      style={{
        background:  LIME,
        color:       FOREST,
        padding:     "0.9rem 2.1rem",
        fontSize:    "clamp(0.85rem, 1vw, 0.95rem)",
        boxShadow:   hovered
          ? `0 6px 28px ${LIME}55`
          : `0 4px 18px ${LIME}44`,
        transform:   hovered ? "translateY(-3px)" : "translateY(0)",
        transition:  "box-shadow 0.3s ease, transform 0.3s ease",
        whiteSpace:  "nowrap",
      }}
    >
      {WHATSAPP_NUMBER ? (
        <MessageCircle size={18} aria-hidden="true" strokeWidth={2} />
      ) : (
        <span
          style={{
            display:    "inline-block",
            transform:  hovered ? "translateX(3px)" : "translateX(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <ArrowRight size={18} aria-hidden="true" strokeWidth={2} />
        </span>
      )}
      Discuss Your Project
    </a>
  );
}
