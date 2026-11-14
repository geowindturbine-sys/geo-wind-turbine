"use client";

/**
 * Industries.tsx — Industries We Serve
 *
 * Horizontal scroll-snap carousel of six image-led industry cards.
 * - Light warm-ivory background
 * - Native CSS scroll-snap, no heavy carousel library
 * - Prev / next nav arrows + dot-style scroll progress
 * - Framer Motion entrance animation (stagger, reduced-motion aware)
 * - Next.js <Image> for every industry photo (optimised, lazy)
 * - Hover: image zoom + card lift + arrow nudge
 *
 * Tailwind v4 constraint: ALL sizing values use inline style props.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/data";

// ── Design tokens ──────────────────────────────────────────────────────────────
const IVORY       = "#FAF9F2";
const FOREST      = "#26352B";
const LIME        = "#A5C94F";
const MUTED       = "#657568";
const CARD_BG     = "#FFFFFF";
const CARD_BORDER = "rgba(36,53,43,0.08)";
const EASE        = [0.22, 1, 0.36, 1] as const;

// ── Nav button ─────────────────────────────────────────────────────────────────
function NavButton({
  dir,
  disabled,
  onClick,
}: {
  dir:      "prev" | "next";
  disabled: boolean;
  onClick:  () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous cards" : "Next cards"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:          "2.75rem",
        height:         "2.75rem",
        borderRadius:   "50%",
        border:         `1px solid ${hovered && !disabled ? LIME + "88" : "rgba(36,53,43,0.14)"}`,
        background:     hovered && !disabled ? LIME : "transparent",
        color:          hovered && !disabled ? FOREST : disabled ? "rgba(36,53,43,0.25)" : FOREST,
        cursor:         disabled ? "not-allowed" : "pointer",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        opacity:        disabled ? 0.4 : 1,
        transition:     "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
        flexShrink:     0,
      }}
    >
      <Icon size={20} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}

// ── Individual card ────────────────────────────────────────────────────────────
interface CardProps {
  industry:     (typeof INDUSTRIES)[number];
  index:        number;
  reducedMotion: boolean;
  cardWidth:    number; // px, computed from track width
}

function IndustryCard({ industry, index, reducedMotion, cardWidth }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={reducedMotion ? undefined : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={industry.title}
      style={{
        width:        cardWidth > 0 ? `${cardWidth}px` : "340px",
        flexShrink:   0,
        scrollSnapAlign: "start",
        display:      "flex",
        flexDirection: "column",
        overflow:     "hidden",
        borderRadius: "1rem",
        background:   CARD_BG,
        border:       `1px solid ${hovered ? LIME + "44" : CARD_BORDER}`,
        boxShadow:    hovered
          ? "0 20px 56px rgba(36,53,43,0.13)"
          : "0 2px 12px rgba(36,53,43,0.06)",
        transform:    hovered ? "translateY(-6px)" : "translateY(0)",
        transition:   "box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* ── Image area — 62% padding-bottom keeps 16:9 ── */}
      <div
        style={{
          position:    "relative",
          width:       "100%",
          paddingBottom: "62%",
          overflow:    "hidden",
          flexShrink:  0,
        }}
      >
        {industry.image ? (
          <Image
            src={industry.image}
            alt={`${industry.title} — industry site photograph`}
            fill
            sizes="(max-width: 639px) 90vw, (max-width: 1023px) 48vw, 32vw"
            className="object-cover object-center"
            style={{
              transform:  hovered ? "scale(1.055)" : "scale(1)",
              transition: "transform 0.55s ease",
            }}
            priority={index < 3}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset:    0,
              background: `linear-gradient(135deg, ${LIME}22, ${FOREST}33)`,
            }}
          />
        )}

        {/* Industry number badge */}
        <span
          aria-hidden="true"
          style={{
            position:       "absolute",
            left:           "1rem",
            top:            "1rem",
            borderRadius:   "9999px",
            padding:        "0.2rem 0.65rem",
            fontSize:       "0.65rem",
            fontWeight:     700,
            textTransform:  "uppercase",
            letterSpacing:  "0.16em",
            background:     "rgba(250,249,242,0.90)",
            color:          FOREST,
            backdropFilter: "blur(6px)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* ── Text content ── */}
      <div
        style={{
          display:       "flex",
          flexDirection: "column",
          flex:          1,
          padding:       "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
          <h3
            style={{
              margin:     0,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              fontSize:   "clamp(1rem, 1.2vw, 1.15rem)",
              color:      FOREST,
            }}
          >
            {industry.title}
          </h3>

          {/* Arrow icon — nudges on hover */}
          <span
            aria-hidden="true"
            style={{
              marginTop:  "0.1rem",
              flexShrink: 0,
              transform:  hovered ? "translate(3px, -3px)" : "translate(0, 0)",
              transition: "transform 0.3s ease",
              color:      hovered ? LIME : MUTED,
              display:    "flex",
            }}
          >
            <ArrowRight size={18} strokeWidth={2} />
          </span>
        </div>

        <p
          style={{
            margin:     "0.75rem 0 0",
            flex:       1,
            lineHeight: 1.78,
            fontSize:   "clamp(0.8rem, 0.95vw, 0.875rem)",
            color:      MUTED,
          }}
        >
          {industry.description}
        </p>

        {/* Animated lime bottom bar */}
        <div
          aria-hidden="true"
          style={{
            marginTop:    "1.25rem",
            height:       "2px",
            borderRadius: "9999px",
            background:   `linear-gradient(90deg, ${LIME}, ${LIME}44)`,
            width:        hovered ? "100%" : "2.5rem",
            transition:   "width 0.45s ease",
          }}
        />
      </div>
    </motion.article>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Industries() {
  const shouldReduceMotion = useReducedMotion();
  const trackRef           = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx]   = useState(0);
  const [canScrollL, setCanScrollL] = useState(false);
  const [canScrollR, setCanScrollR] = useState(true);
  const [trackWidth, setTrackWidth] = useState(0);

  const total = INDUSTRIES.length;

  // Cards visible per breakpoint
  const getCardsVisible = useCallback((w: number) => {
    if (w >= 1024) return 3.1;   // show 3 + peek
    if (w >= 640)  return 2.15;  // show 2 + peek
    return 1.1;                   // show 1 + peek
  }, []);

  // Gap between cards in px
  const GAP = 20;

  // Computed card width based on track width
  const cardWidth = trackWidth > 0
    ? Math.floor((trackWidth - GAP * (Math.floor(getCardsVisible(trackWidth)) - 1)) / getCardsVisible(trackWidth))
    : 340;

  // Observe track width
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setTrackWidth(entry.contentRect.width);
    });
    ro.observe(el);
    setTrackWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // Scroll state
  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollL(scrollLeft > 8);
    setCanScrollR(scrollLeft < scrollWidth - clientWidth - 8);
    const step = cardWidth + GAP;
    setActiveIdx(Math.round(scrollLeft / step));
  }, [cardWidth]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollBy = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const step = cardWidth + GAP;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const step = cardWidth + GAP;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };

  const viewport = { once: true as const, margin: "0px 0px -60px 0px" };

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      style={{
        background:    IVORY,
        paddingTop:    "clamp(4rem, 7vw, 6.5rem)",
        paddingBottom: "clamp(4.5rem, 8vw, 7rem)",
        overflow:      "hidden",
      }}
    >
      {/* ── Inner container ── */}
      <div
        style={{
          maxWidth:    "1440px",
          margin:      "0 auto",
          paddingLeft:  "clamp(1.5rem, 5vw, 4rem)",
          paddingRight: "clamp(1.5rem, 5vw, 4rem)",
        }}
      >

        {/* ── Section header ── */}
        <div
          style={{
            display:        "flex",
            flexDirection:  trackWidth >= 1024 ? "row" : "column",
            alignItems:     trackWidth >= 1024 ? "flex-end" : "flex-start",
            justifyContent: trackWidth >= 1024 ? "space-between" : "flex-start",
            gap:            "2rem",
          }}
        >
          {/* Left: heading */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ maxWidth: "600px" }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display:     "flex",
                alignItems:  "center",
                gap:         "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ height: "1px", width: "2.5rem", background: LIME, display: "block" }} />
              <span
                style={{
                  fontWeight:    700,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  fontSize:      "clamp(0.6rem, 0.78vw, 0.72rem)",
                  color:         LIME,
                }}
              >
                Industries We Serve
              </span>
              <span style={{ height: "1px", width: "2.5rem", background: LIME, display: "block" }} />
            </div>

            <h2
              id="industries-heading"
              style={{
                margin:        0,
                fontWeight:    800,
                lineHeight:    1.08,
                letterSpacing: "-0.055em",
                fontSize:      "clamp(2.1rem, 4vw, 3.4rem)",
                color:         FOREST,
              }}
            >
              Built for{" "}
              <span style={{ color: LIME }}>Diverse</span>
              <br />
              <span style={{ color: LIME }}>Deployment.</span>
            </h2>
          </motion.div>

          {/* Right: description + desktop nav */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "1.5rem",
              maxWidth:      "420px",
              alignItems:    trackWidth >= 1024 ? "flex-end" : "flex-start",
              textAlign:     trackWidth >= 1024 ? "right" : "left",
            }}
          >
            <p
              style={{
                margin:     0,
                lineHeight: 1.85,
                fontSize:   "clamp(0.9rem, 1.1vw, 1rem)",
                color:      MUTED,
              }}
            >
              GEO Wind Turbines integrate into a wide range of sectors — wherever
              reliable, low-footprint wind energy can support on-site power generation.
            </p>

            {/* Desktop nav arrows */}
            {trackWidth >= 1024 && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              aria-label="Carousel navigation"
            >
              <NavButton dir="prev" disabled={!canScrollL} onClick={() => scrollBy("prev")} />
              <NavButton dir="next" disabled={!canScrollR} onClick={() => scrollBy("next")} />
            </div>
            )}
          </motion.div>
        </div>

        {/* ── Card track ── */}
        <div
          ref={trackRef}
          style={{
            display:                 "flex",
            gap:                     `${GAP}px`,
            overflowX:               "auto",
            scrollSnapType:          "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth:          "none",
            msOverflowStyle:         "none",
            marginTop:               "2.5rem",
            paddingBottom:           "1rem",
          }}
          // Hide scrollbar in webkit
          className="[&::-webkit-scrollbar]:hidden"
        >
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              index={i}
              reducedMotion={!!shouldReduceMotion}
              cardWidth={cardWidth}
            />
          ))}
        </div>

        {/* ── Bottom controls ── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            marginTop:      "1.5rem",
          }}
        >
          {/* Mobile nav arrows */}
          {trackWidth < 1024 && (
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            aria-label="Carousel navigation"
          >
            <NavButton dir="prev" disabled={!canScrollL} onClick={() => scrollBy("prev")} />
            <NavButton dir="next" disabled={!canScrollR} onClick={() => scrollBy("next")} />
          </div>
          )}

          {/* Dot progress */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "auto" }}
            role="tablist"
            aria-label="Card indicators"
          >
            {INDUSTRIES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Go to card ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                style={{
                  width:        i === activeIdx ? "1.75rem" : "0.5rem",
                  height:       "0.5rem",
                  borderRadius: "9999px",
                  background:   i === activeIdx ? LIME : `${LIME}44`,
                  border:       "none",
                  padding:      0,
                  cursor:       "pointer",
                  transition:   "width 0.35s ease, background 0.35s ease",
                  flexShrink:   0,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
