"use client";

/**
 * Projects.tsx — Case Studies / Installations section
 *
 * Design: White background, 3-card grid with real gallery imagery.
 * Note: All project data is placeholder (⚠️) — do not publish until verified.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Building2, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";

// ── Tokens ────────────────────────────────────────────────────────────────────

const FOREST = "#26352B";
const CITRUS = "#A7C957";
const YELLOW = "#E8EF83";
const MUTED  = "#5A6B5C";
const BORDER = "#DFE5D9";

// ── Animations ────────────────────────────────────────────────────────────────

const gridReveal = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardAnim = (i: number) => ({
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 },
  },
});

// ── Component ─────────────────────────────────────────────────────────────────

export function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "0px 0px -60px 0px" };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ background: "#FFFFFF" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-10" style={{ background: CITRUS }} />
            <span
              className="text-[clamp(0.65rem,0.8vw,0.75rem)] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#69756A" }}
            >
              Installations
            </span>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="projects-heading"
              className="max-w-[520px] font-display text-[clamp(2.3rem,4.2vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.055em]"
              style={{ color: FOREST }}
            >
              Projects Installed{" "}
              <span style={{ color: "#5F8A2E" }}>Across India</span>
            </h2>

            <p
              className="max-w-[380px] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.85]"
              style={{ color: MUTED }}
            >
              Every installation backed by our in-house civil, electrical, and
              commissioning teams.
            </p>
          </div>
        </motion.div>

        {/* ── Project cards ─────────────────────────────────────────────────── */}
        <motion.div
          variants={shouldReduceMotion ? undefined : gridReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              variants={shouldReduceMotion ? undefined : cardAnim(i)}
              className="
                group relative flex flex-col overflow-hidden rounded-2xl border
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-[0_28px_60px_rgba(38,53,43,0.12)]
              "
              style={{ borderColor: BORDER }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={88}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                {/* Gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(38,53,43,0.7) 0%, transparent 60%)",
                  }}
                />

                {/* Sector tag on image */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[clamp(0.6rem,0.72vw,0.68rem)] font-bold uppercase tracking-[0.14em] text-white/90"
                    style={{ background: "rgba(38,53,43,0.7)" }}
                  >
                    <Building2 size={11} strokeWidth={2} />
                    {project.sector}
                  </span>
                </div>

                {/* Arrow */}
                <div
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{ background: YELLOW }}
                >
                  <ArrowUpRight size={16} style={{ color: FOREST }} />
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col bg-white p-6 sm:p-7">
                <h3
                  className="font-display text-[clamp(1rem,1.3vw,1.15rem)] font-bold leading-snug tracking-tight"
                  style={{ color: FOREST }}
                >
                  {project.title}
                </h3>

                <div
                  className="mt-3 inline-flex items-center gap-1.5 text-[clamp(0.72rem,0.88vw,0.82rem)]"
                  style={{ color: MUTED }}
                >
                  <MapPin size={13} strokeWidth={2} />
                  {project.location}
                </div>

                {/* Disclaimer note (placeholder data) */}
                <p
                  className="mt-auto pt-5 text-[clamp(0.6rem,0.72vw,0.68rem)] leading-snug"
                  style={{ color: "#B4BAB2" }}
                >
                  ⚠️ Illustrative — project details to be confirmed with client.
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
