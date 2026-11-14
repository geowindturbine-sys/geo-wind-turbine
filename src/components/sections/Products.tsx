"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TURBINE_CONFIGS, type TurbineConfig } from "@/lib/data";

// ─── Design tokens ────────────────────────────────────────────────────────────
const SAGE   = "#EEF2E8";
const FOREST = "#26352B";
const CITRUS = "#A7C957";
const OLIVE  = "#344B38";
const MUTED  = "#5A6B5C";
const BORDER = "#DFE5D9";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getCardsVisible(w: number): number {
  if (w >= 1024) return 3;
  if (w >= 640)  return 2.1;
  return 1.1;
}
const GAP = 24;

// ─── ConfigCard ───────────────────────────────────────────────────────────────
interface ConfigCardProps {
  config: TurbineConfig;
  index:  number;
  cardWidth: number;
  reducedMotion: boolean;
  onEnquire: (configName: string) => void;
}

function ConfigCard({ config, index, cardWidth, reducedMotion, onEnquire }: ConfigCardProps) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const cardVariants = {
    hidden:  { opacity: 0, y: reducedMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:            cardWidth > 0 ? `${cardWidth}px` : "100%",
        flexShrink:       0,
        scrollSnapAlign:  "start",
        borderRadius:     16,
        overflow:         "hidden",
        backgroundColor:  "#FFFFFF",
        border:           `1px solid ${BORDER}`,
        display:          "flex",
        flexDirection:    "column",
        boxShadow:        hovered
          ? "0 20px 48px rgba(38,53,43,0.14)"
          : "0 4px 16px rgba(38,53,43,0.07)",
        transform:        hovered && !reducedMotion ? "translateY(-6px)" : "translateY(0)",
        transition:       "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* ── Photo block ── */}
      <div
        style={{
          position:  "relative",
          width:     "100%",
          paddingTop: "57%",   /* ~57% of card width → photo occupies ~57% of card height */
          overflow:  "hidden",
          flexShrink: 0,
        }}
      >
        {/* Config number badge */}
        <div
          style={{
            position:        "absolute",
            top:             16,
            right:           16,
            zIndex:          2,
            backgroundColor: FOREST,
            color:           CITRUS,
            fontFamily:      "'Inter', 'DM Sans', sans-serif",
            fontSize:        11,
            fontWeight:      700,
            letterSpacing:   "0.12em",
            textTransform:   "uppercase",
            padding:         "5px 10px",
            borderRadius:    6,
          }}
        >
          {config.configNumber}
        </div>

        <Image
          src={config.image}
          alt={config.title}
          fill
          sizes="(max-width: 639px) 90vw, (max-width: 1023px) 48vw, 33vw"
          quality={85}
          style={{
            objectFit:   "cover",
            objectPosition: "center",
            transform:   hovered && !reducedMotion ? "scale(1.05)" : "scale(1)",
            transition:  "transform 0.55s ease",
          }}
        />
      </div>

      {/* ── Card body ── */}
      <div
        style={{
          display:        "flex",
          flexDirection:  "column",
          flex:           1,
          padding:        "28px 28px 32px",
          gap:            20,
        }}
      >
        {/* Title */}
        <h3
          style={{
            margin:      0,
            fontFamily:  "'Inter', 'DM Sans', sans-serif",
            fontSize:    20,
            fontWeight:  700,
            lineHeight:  1.25,
            color:       FOREST,
          }}
        >
          {config.title}
        </h3>

        {/* Description */}
        <p
          style={{
            margin:      0,
            fontFamily:  "'Inter', 'DM Sans', sans-serif",
            fontSize:    14,
            lineHeight:  1.65,
            color:       MUTED,
          }}
        >
          {config.description}
        </p>

        {/* Application highlights */}
        <ul
          style={{
            margin:         0,
            padding:        0,
            listStyle:      "none",
            display:        "flex",
            flexDirection:  "column",
            gap:            10,
            flex:           1,
          }}
        >
          {config.applicationHighlights.map((highlight, i) => (
            <li
              key={i}
              style={{
                display:    "flex",
                alignItems: "flex-start",
                gap:        10,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                fontSize:   13,
                lineHeight: 1.5,
                color:      FOREST,
              }}
            >
              {/* Minimal leaf/chevron bullet */}
              <span
                aria-hidden
                style={{
                  flexShrink:      0,
                  marginTop:       3,
                  width:           16,
                  height:          16,
                  borderRadius:    "50%",
                  backgroundColor: CITRUS,
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M2 4L4 6L6 2" stroke={FOREST} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <button
          onClick={() => onEnquire(config.ctaConfig)}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            marginTop:       8,
            width:           "100%",
            padding:         "14px 20px",
            borderRadius:    10,
            border:          "none",
            backgroundColor: btnHovered ? OLIVE : FOREST,
            color:           CITRUS,
            fontFamily:      "'Inter', 'DM Sans', sans-serif",
            fontSize:        13,
            fontWeight:      700,
            letterSpacing:   "0.04em",
            cursor:          "pointer",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            gap:             8,
            transition:      "background-color 0.2s ease",
          }}
        >
          Enquire About {config.ctaConfig} Configuration
          {/* Arrow nudge */}
          <span
            style={{
              display:    "inline-block",
              transform:  btnHovered && !reducedMotion ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.2s ease",
            }}
          >
            →
          </span>
        </button>
      </div>
    </motion.div>
  );
}

// ─── NavButton ────────────────────────────────────────────────────────────────
interface NavButtonProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

function NavButton({ direction, disabled, onClick }: NavButtonProps) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={direction === "prev" ? "Previous turbine" : "Next turbine"}
      style={{
        width:           44,
        height:          44,
        borderRadius:    "50%",
        border:          `1px solid ${BORDER}`,
        backgroundColor: disabled ? "transparent" : hov ? FOREST : "#FFFFFF",
        color:           disabled ? BORDER : hov ? CITRUS : FOREST,
        cursor:          disabled ? "default" : "pointer",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        fontSize:        18,
        transition:      "background-color 0.2s, color 0.2s",
        flexShrink:      0,
      }}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

// ─── Products (main export) ───────────────────────────────────────────────────
export function Products() {
  const trackRef      = useRef<HTMLDivElement>(null);
  const [trackWidth,  setTrackWidth]  = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  // ResizeObserver — same pattern as Industries.tsx
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setTrackWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const totalCards = TURBINE_CONFIGS.length;
  const visible    = getCardsVisible(trackWidth);
  const isDesktop  = trackWidth >= 1024;
  const isMobile   = trackWidth < 640;

  // Card width in pixels (all sizing via inline style — Tailwind v4 constraint)
  const cardWidth = trackWidth > 0
    ? Math.floor(
        (trackWidth - GAP * (Math.floor(visible) - 1)) / visible
      )
    : 340;

  const scrollStep = cardWidth + GAP;

  const scrollToIndex = useCallback((idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * scrollStep, behavior: "smooth" });
    setActiveIndex(idx);
  }, [scrollStep]);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const next = Math.max(0, Math.min(totalCards - 1, activeIndex + dir));
    scrollToIndex(next);
  }, [activeIndex, totalCards, scrollToIndex]);

  // Track scroll position → update active dot
  useEffect(() => {
    const el = trackRef.current;
    if (!el || isDesktop) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / scrollStep);
      setActiveIndex(Math.max(0, Math.min(totalCards - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isDesktop, scrollStep, totalCards]);

  // Enquiry handler (placeholder — WhatsApp to be connected later)
  const handleEnquire = useCallback((configName: string) => {
    const msg = encodeURIComponent(
      `Hi, I'd like to enquire about the ${configName} Turbine Configuration.`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }, []);

  // ── Section entrance animation ──
  const headerVariants = {
    hidden:  { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="turbines"
      aria-labelledby="turbines-heading"
      style={{ backgroundColor: SAGE, padding: "96px 0 72px" }}
    >
      {/* ── Section header ── */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          maxWidth:   1200,
          margin:     "0 auto",
          padding:    "0 24px",
          marginBottom: 56,
          display:    "flex",
          flexDirection: isDesktop ? "row" : "column",
          alignItems: isDesktop ? "flex-end" : "flex-start",
          justifyContent: "space-between",
          gap:        24,
        }}
      >
        <div>
          {/* Eyebrow */}
          <p
            style={{
              margin:        "0 0 10px",
              fontFamily:    "'Inter', 'DM Sans', sans-serif",
              fontSize:      11,
              fontWeight:    700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         CITRUS,
            }}
          >
            Our Turbines
          </p>
          {/* Heading */}
          <h2
            id="turbines-heading"
            style={{
              margin:     0,
              fontFamily: "'Inter', 'DM Sans', sans-serif",
              fontSize:   isDesktop ? 42 : isMobile ? 28 : 34,
              fontWeight: 800,
              lineHeight: 1.15,
              color:      FOREST,
              maxWidth:   560,
            }}
          >
            Explore Our Wind&nbsp;Turbine Range
          </h2>
        </div>

        {/* Desktop nav arrows */}
        {isDesktop && (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <NavButton
              direction="prev"
              disabled={activeIndex === 0}
              onClick={() => scrollBy(-1)}
            />
            <NavButton
              direction="next"
              disabled={activeIndex >= totalCards - Math.floor(visible)}
              onClick={() => scrollBy(1)}
            />
          </div>
        )}
      </motion.div>

      {/* ── Card track ── */}
      <div
        style={{
          maxWidth: 1200,
          margin:   "0 auto",
          padding:  "0 24px",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display:              "flex",
            gap:                  GAP,
            overflowX:            isDesktop ? "visible" : "auto",
            scrollSnapType:       isDesktop ? "none" : "x mandatory",
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            scrollbarWidth:       "none",
            msOverflowStyle:      "none",
            /* align card heights */
            alignItems:           "stretch",
          }}
        >
          {TURBINE_CONFIGS.map((config, i) => (
            <ConfigCard
              key={config.id}
              config={config}
              index={i}
              cardWidth={isDesktop ? cardWidth : cardWidth}
              reducedMotion={reducedMotion}
              onEnquire={handleEnquire}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile dot indicators ── */}
      {!isDesktop && (
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            alignItems:     "center",
            gap:            8,
            marginTop:      28,
          }}
        >
          {TURBINE_CONFIGS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to turbine ${i + 1}`}
              style={{
                width:           i === activeIndex ? 24 : 8,
                height:          8,
                borderRadius:    4,
                border:          "none",
                padding:         0,
                cursor:          "pointer",
                backgroundColor: i === activeIndex ? FOREST : BORDER,
                transition:      "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Bottom disclaimer ── */}
      <motion.p
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        style={{
          maxWidth:  1200,
          margin:    "40px auto 0",
          padding:   "0 24px",
          fontFamily:"'Inter', 'DM Sans', sans-serif",
          fontSize:  12,
          lineHeight: 1.6,
          color:     MUTED,
          textAlign: "center",
        }}
      >
        Final turbine configuration and specifications are determined following project and site assessment.
      </motion.p>
    </section>
  );
}
