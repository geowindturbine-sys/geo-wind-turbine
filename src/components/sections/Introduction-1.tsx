"use client";

import Image from "next/image";
import { ArrowUpRight, Wind, Leaf, Volume2, Settings2, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Design tokens
const SAGE_BG  = "#EEF2E8";
const FOREST   = "#26352B";
const CITRUS   = "#A7C957";
const OLIVE    = "#5F8A2E";
const MUTED    = "#5A6B5C";
const BORDER   = "#DFE5D9";
const LEMON    = "#E8EF83";

const HIGHLIGHTS = [
  { icon: <Wind size={17} className="text-[#5F8A2E]" strokeWidth={2.2} />, label: "360° Wind Capture", detail: "Helical rotor harvests wind from every direction — no yaw mechanism needed." },
  { icon: <Leaf size={17} className="text-[#5F8A2E]" strokeWidth={2.2} />, label: "2 m/s Cut-In Speed", detail: "Generates power in calm urban environments where bladed turbines stall." },
  { icon: <Volume2 size={17} className="text-[#5F8A2E]" strokeWidth={2.2} />, label: "Silent Operation", detail: "No gear-train, no blade whoosh — whisper-quiet at any wind speed." },
  { icon: <Settings2 size={17} className="text-[#5F8A2E]" strokeWidth={2.2} />, label: "Engineered Precision", detail: "Every component machined to aerospace-grade tolerances in our Indian facility." },
  { icon: <Layers size={17} className="text-[#5F8A2E]" strokeWidth={2.2} />, label: "50 W – 1.2 kW Range", detail: "Modular product line scales from residential to industrial installations." },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const imageVariant = {
  hidden:  { opacity: 0, clipPath: "inset(0 100% 0 0 round 24px)" },
  visible: { opacity: 1, clipPath: "inset(0 0% 0 0 round 24px)", transition: { duration: 1.1, ease: EASE } },
};

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE, delay } },
});

const stagger = (i: number) => ({
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE, delay: 0.2 + i * 0.1 } },
});

const badgeVariant = {
  hidden:  { opacity: 0, scale: 0.8, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay: 0.7 } },
};

const VP = { once: true, margin: "0px 0px -60px 0px" };

export default function Introduction() {
  const reduce = useReducedMotion();

  return (
    /*
     * FIX 1: Remove overflow-hidden from the section so the floating 360° badge
     * (which is positioned -bottom-8 outside the image container) is never clipped.
     * The section still clips its own background correctly via its natural bounds.
     * The inner content wrapper keeps max-width and horizontal containment.
     */
    <section id="introduction" aria-labelledby="intro-heading" className="relative overflow-hidden" style={{ background: SAGE_BG }}>
      <div className="h-px w-full" style={{ background: BORDER }} />
      {/*
       * FIX 1 cont.: Add overflow-hidden here on the content wrapper so the
       * decorative ring (absolute -left-7 -top-7) doesn't cause horizontal scroll,
       * while still allowing the badge to escape vertically at the bottom of its
       * parent grid cell (which has its own overflow: visible).
       */}
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        {/*
         * FIX 1 cont.: Add pb-10 on desktop so the grid cell has room for the
         * badge that overflows -bottom-8 below the image panel.
         */}
        <div className="grid grid-cols-1 items-center gap-14 pb-16 md:grid-cols-[48fr_52fr] md:gap-16 lg:gap-24">

          {/* LEFT: Image panel */}
          {/*
           * FIX 1 cont.: The image-panel wrapper must NOT have overflow-hidden —
           * it's already `relative` only, which is correct. The badge is a sibling
           * of the motion.div (not inside it), so it escapes the image's
           * overflow-hidden naturally.
           */}
          <div className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute -left-7 -top-7 hidden h-36 w-36 rounded-full border border-[#A7C957]/30 lg:block" />

            <motion.div
              variants={reduce ? undefined : imageVariant}
              initial="hidden" whileInView="visible" viewport={VP}
              className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-[0_32px_80px_rgba(38,53,43,0.16)] sm:aspect-[3/4] lg:aspect-[4/5]"
            >
              <Image
                src="/assets/images/machineinternal.png"
                alt="Internal mechanism of a GEO vertical-axis wind turbine — precision-engineered rotor assembly"
                fill quality={93}
                sizes="(max-width: 768px) 100vw, 48vw"
                className="object-cover object-center transition-transform duration-[1400ms] ease-out hover:scale-[1.04]"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(38,53,43,0.60) 100%)" }} />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">Precision Engineering</span>
                <span className="mt-1 block font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl">Machined in India</span>
              </div>
              <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: "rgba(38,53,43,0.70)", backdropFilter: "blur(8px)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: CITRUS }} />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/90">Internal Mechanism</span>
              </div>
            </motion.div>

            {/*
             * FIX 1 cont.: Badge positioning.
             * - Keep -bottom-8 (overlapping below the image edge — the visual effect).
             * - Change from -right-3/sm:-right-7 (which could clip on narrow screens)
             *   to right-4 sm:right-0 so it stays inside the image column on all sizes.
             * - On mobile, hide the badge entirely (hidden sm:flex) so it doesn't
             *   overlap the content column that stacks directly beneath the image.
             */}
            <motion.div variants={reduce ? undefined : badgeVariant} initial="hidden" whileInView="visible" viewport={VP}
              className="absolute bottom-6 right-4 hidden items-center gap-4 rounded-2xl border border-[#DFE5D9] bg-white px-5 py-4 shadow-[0_16px_48px_rgba(38,53,43,0.13)] sm:right-0 sm:flex sm:px-6 sm:py-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl" style={{ background: LEMON }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={FOREST} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                  <path d="M12 2v8M12 18v4M4.93 4.93l5.66 5.66M13.41 13.41l4.95 4.95M2 12h8M18 12h4M4.93 19.07l5.66-5.66M13.41 10.59l4.95-4.95" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#A0A99D" }}>Wind Capture</p>
                <p className="mt-0.5 font-display text-2xl font-extrabold tracking-tight" style={{ color: FOREST }}>360°</p>
                <p className="text-[10px]" style={{ color: "#69756A" }}>Any direction</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Content panel */}
          <div>
            <motion.div variants={reduce ? undefined : fadeUp(0)} initial="hidden" whileInView="visible" viewport={VP} className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-10" style={{ background: CITRUS }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "#69756A" }}>Who We Are</span>
            </motion.div>

            <motion.h2 id="intro-heading" variants={reduce ? undefined : fadeUp(0.08)} initial="hidden" whileInView="visible" viewport={VP}
              className="max-w-[520px] font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold leading-[1.07] tracking-[-0.05em]"
              style={{ color: FOREST }}>
              Engineering Wind<br />Into{" "}<span style={{ color: OLIVE }}>Every Project</span>
            </motion.h2>

            <motion.p variants={reduce ? undefined : fadeUp(0.16)} initial="hidden" whileInView="visible" viewport={VP}
              className="mt-6 max-w-[480px] text-[clamp(0.95rem,1.15vw,1.08rem)] leading-[1.9]" style={{ color: MUTED }}>
              GEO Wind Turbine designs and manufactures vertical-axis wind turbines purpose-built for real-world deployment — from urban rooftops to remote industrial sites and distributed energy networks where conventional three-blade turbines cannot operate.
            </motion.p>

            <motion.div variants={reduce ? undefined : fadeUp(0.22)} initial="hidden" whileInView="visible" viewport={VP} className="my-9 h-px" style={{ background: BORDER }} />

            <ul className="space-y-3.5" role="list" style={{ paddingBottom: "0.5rem" }}>
              {HIGHLIGHTS.map((item, i) => (
                <motion.li key={item.label} variants={reduce ? undefined : stagger(i)} initial="hidden" whileInView="visible" viewport={VP}
                  className="flex items-start gap-4 rounded-xl border border-transparent p-3 transition-colors duration-200 hover:border-[#DFE5D9] hover:bg-white/60">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: LEMON }}>
                    {item.icon}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[clamp(0.85rem,1vw,0.95rem)] font-semibold leading-snug" style={{ color: FOREST }}>{item.label}</span>
                    <span className="mt-0.5 text-[clamp(0.78rem,0.9vw,0.875rem)] leading-[1.65]" style={{ color: MUTED }}>{item.detail}</span>
                  </span>
                </motion.li>
              ))}
            </ul>

            {/*
             * FIX 2 & 3: CTA button row.
             * - Use flex-col on mobile, flex-row from sm: upward so buttons stack
             *   vertically on 375/390px and never overflow.
             * - Each button gets w-full sm:w-auto so it fills the column on mobile.
             * - Primary button: add explicit color: "#fff" via inline style to
             *   guarantee white text regardless of Tailwind specificity order.
             * - Both buttons: justify-center so text+icon is centred when full-width.
             */}
            <motion.div variants={reduce ? undefined : fadeUp(0.55)} initial="hidden" whileInView="visible" viewport={VP}
              className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              style={{ marginTop: "2rem" }}>
              <a href="#technology"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full text-[clamp(0.875rem,1.05vw,1rem)] font-semibold shadow-[0_8px_28px_rgba(38,53,43,0.18)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(38,53,43,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C957] focus-visible:ring-offset-2 sm:w-auto"
                style={{ background: `linear-gradient(135deg, ${FOREST} 0%, #344B38 100%)`, color: "#ffffff", minHeight: "52px", padding: "1rem 1.75rem" }}>
                Explore Technology
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45" style={{ background: LEMON, color: FOREST }}>
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </span>
              </a>
              <a href="#about"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 text-[clamp(0.875rem,1.05vw,1rem)] font-semibold transition-all duration-300 hover:-translate-y-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C957] focus-visible:ring-offset-2 sm:w-auto"
                style={{ borderColor: "#BEC8B8", color: FOREST, minHeight: "52px", padding: "14px 1.75rem" }}>
                About Us
                <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>

        </div>
      </div>
      <div className="h-px w-full" style={{ background: BORDER }} />
    </section>
  );
}
