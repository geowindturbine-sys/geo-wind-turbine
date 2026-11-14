"use client";

/**
 * @file components/sections/Testimonials.tsx
 * @description Client testimonials — Citrus Earth premium design.
 *
 * PLACEHOLDER GUARD
 * -----------------
 * All testimonials in lib/data.ts use PLACEHOLDER_NAME = "Client Name".
 * When that guard fires, the section renders a "Coming Soon" card instead of
 * fake testimonials. Replace TESTIMONIALS data with real, verified quotes
 * before launch.
 */

import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/data";
import type { Testimonial } from "@/types";

// ─── Sentinel ─────────────────────────────────────────────────────────────────

const PLACEHOLDER_NAME = "Client Name";
const isPlaceholder    = TESTIMONIALS[0]?.name === PLACEHOLDER_NAME;

// ─── Star rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "0.2rem" }} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={15}
          style={{
            fill:         i < rating ? "#A7C957" : "transparent",
            stroke:       i < rating ? "#A7C957" : "#C8D0C0",
            strokeWidth:  1.5,
          }}
        />
      ))}
    </div>
  );
}

// ─── Single testimonial card ──────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  delay = 0,
  motionProps,
}: {
  testimonial: Testimonial;
  delay?:      number;
  motionProps: Record<string, unknown>;
}) {
  const initials = testimonial.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      {...motionProps}
      variants={{
        hidden:  { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        background:   "#ffffff",
        borderRadius: "1.1rem",
        padding:      "clamp(1.25rem, 2.5vw, 1.75rem)",
        border:       "1px solid #DFE5D9",
        boxShadow:    "0 1px 3px rgba(38,53,43,0.05), 0 4px 16px rgba(38,53,43,0.07)",
        display:      "flex",
        flexDirection:"column",
        gap:          "1rem",
        height:       "100%",
        cursor:       "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#A7C957";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 12px rgba(38,53,43,0.1), 0 12px 32px rgba(38,53,43,0.08), 0 0 0 1px rgba(167,201,87,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#DFE5D9";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 3px rgba(38,53,43,0.05), 0 4px 16px rgba(38,53,43,0.07)";
      }}
    >
      {/* Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Quote */}
      <p
        style={{
          fontSize:   "clamp(0.85rem, 1vw, 0.95rem)",
          color:      "#3A4A3C",
          lineHeight: 1.7,
          flex:       1,
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          aria-hidden="true"
          style={{
            width:          "2.5rem",
            height:         "2.5rem",
            borderRadius:   "50%",
            background:     "#26352B",
            color:          "#E8EF83",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontFamily:     "var(--font-manrope, Manrope, system-ui, sans-serif)",
            fontSize:       "0.72rem",
            fontWeight:     700,
            flexShrink:     0,
          }}
        >
          {initials}
        </div>
        <div>
          <p style={{ fontSize: "clamp(0.8rem, 0.92vw, 0.88rem)", fontWeight: 700, color: "#26352B" }}>
            {testimonial.name}
          </p>
          <p style={{ fontSize: "clamp(0.7rem, 0.82vw, 0.78rem)", color: "#69756A" }}>
            {testimonial.role}
            {testimonial.company ? `, ${testimonial.company}` : ""}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? { initial: false }
    : {
        initial:     "hidden" as const,
        whileInView: "visible" as const,
        viewport:    { once: true, margin: "0px 0px -60px 0px" },
      };

  const headerMotion = shouldReduceMotion
    ? { initial: false }
    : {
        initial:     { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
        viewport:    { once: true, margin: "0px 0px -60px 0px" },
      };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      style={{
        position:   "relative",
        background: "#EEF2E8",
        overflow:   "hidden",
        width:      "100%",
      }}
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        style={{
          position:        "absolute",
          inset:           0,
          backgroundImage: "radial-gradient(circle, rgba(38,53,43,0.08) 1px, transparent 1px)",
          backgroundSize:  "24px 24px",
          pointerEvents:   "none",
        }}
      />

      <div
        style={{
          position:  "relative",
          zIndex:    1,
          maxWidth:  "1440px",
          margin:    "0 auto",
          padding:   "clamp(4rem, 7vw, 7rem) clamp(1.25rem, 4vw, 4rem)",
        }}
      >
        {/* Section header */}
        <motion.div {...headerMotion} style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}>
          <span
            style={{
              display:       "inline-block",
              fontSize:      "clamp(0.65rem, 0.78vw, 0.72rem)",
              fontWeight:    700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color:         "#7FAA3A",
              marginBottom:  "0.75rem",
            }}
          >
            Client Stories
          </span>
          <h2
            id="testimonials-heading"
            style={{
              fontFamily:    "var(--font-manrope, Manrope, system-ui, sans-serif)",
              fontSize:      "clamp(1.9rem, 3.5vw, 3rem)",
              fontWeight:    800,
              letterSpacing: "-0.04em",
              lineHeight:    1.1,
              color:         "#26352B",
              marginBottom:  "1rem",
            }}
          >
            What Our Clients Say
          </h2>
          <p
            style={{
              fontSize:   "clamp(0.9rem, 1.1vw, 1.05rem)",
              color:      "#69756A",
              maxWidth:   "520px",
              margin:     "0 auto",
              lineHeight: 1.65,
            }}
          >
            Real feedback from organisations using GEO Wind Turbines in their
            energy infrastructure.
          </p>
        </motion.div>

        {/* Content */}
        {isPlaceholder ? (
          /* Coming Soon placeholder */
          <motion.div
            {...headerMotion}
            style={{
              maxWidth:  "480px",
              margin:    "0 auto",
              textAlign: "center",
              padding:   "clamp(2rem, 4vw, 3.5rem)",
              background:"#ffffff",
              borderRadius: "1.25rem",
              border:    "2px dashed #A7C957",
              boxShadow: "0 1px 3px rgba(38,53,43,0.04), 0 8px 24px rgba(38,53,43,0.07)",
            }}
          >
            <div
              style={{
                width:          "4rem",
                height:         "4rem",
                borderRadius:   "50%",
                background:     "#EEF2E8",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                margin:         "0 auto 1.25rem",
              }}
            >
              <Star size={28} style={{ color: "#A7C957" }} />
            </div>
            <h3
              style={{
                fontFamily:   "var(--font-manrope, Manrope, system-ui, sans-serif)",
                fontSize:     "clamp(1.1rem, 1.6vw, 1.3rem)",
                fontWeight:   700,
                color:        "#26352B",
                marginBottom: "0.6rem",
              }}
            >
              Client Testimonials Coming Soon
            </h3>
            <p style={{ fontSize: "clamp(0.8rem, 0.95vw, 0.9rem)", color: "#69756A", lineHeight: 1.65 }}>
              We&rsquo;re collecting verified feedback from our clients. Check back soon
              to read their experiences with GEO Wind Turbine installations.
            </p>
          </motion.div>
        ) : (
          /* Live testimonial grid */
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "clamp(1rem, 2vw, 1.5rem)", alignItems: "start" }}
          >
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                delay={i * 0.1}
                motionProps={motionProps}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
