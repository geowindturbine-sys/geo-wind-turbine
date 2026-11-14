"use client";

/**
 * FAQ.tsx — Frequently Asked Questions
 *
 * Design: Pale Sage background, category filter chips, single-open accordion.
 * Uses native state — no Radix dependency needed.
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/data";

// ── Tokens ────────────────────────────────────────────────────────────────────

const SAGE   = "#EEF2E8";
const FOREST = "#26352B";
const CITRUS = "#A7C957";
const YELLOW = "#E8EF83";
const OLIVE  = "#344B38";
const MUTED  = "#5A6B5C";
const BORDER = "#DFE5D9";

// ── Category logic ────────────────────────────────────────────────────────────

function useCategories(items: typeof FAQ_ITEMS) {
  return useMemo(() => {
    const cats = items
      .map((i) => i.category)
      .filter((c): c is string => Boolean(c));
    return ["All", ...Array.from(new Set(cats))];
  }, [items]);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function FAQ() {
  const shouldReduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "0px 0px -60px 0px" };

  const categories = useCategories(FAQ_ITEMS);
  const [active, setActive] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.category === active)),
    [active],
  );

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="overflow-hidden py-20 sm:py-28 lg:py-36"
      style={{ background: SAGE }}
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
              style={{ color: "#69756A" }}
            >
              FAQ
            </span>
            <span className="h-px w-10" style={{ background: CITRUS }} />
          </div>

          <h2
            id="faq-heading"
            className="font-display text-[clamp(2.3rem,4.2vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.055em]"
            style={{ color: FOREST }}
          >
            Common{" "}
            <span style={{ color: "#5F8A2E" }}>Questions</span>
          </h2>

          <p
            className="mt-5 text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.85]"
            style={{ color: MUTED }}
          >
            Everything you need to know before beginning your wind energy project.
          </p>
        </motion.div>

        {/* ── Category filter chips ─────────────────────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-10 flex flex-wrap justify-center gap-2.5"
          role="group"
          aria-label="Filter by category"
        >
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                onClick={() => { setActive(cat); setOpenId(null); }}
                className="rounded-full px-4 py-2 text-[clamp(0.72rem,0.88vw,0.82rem)] font-semibold transition-all duration-200"
                style={{
                  background: isActive ? FOREST : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : MUTED,
                  border: `1.5px solid ${isActive ? FOREST : BORDER}`,
                }}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* ── Accordion ────────────────────────────────────────────────────── */}
        <div className="mx-auto mt-10 max-w-[840px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              {filtered.map((item, i) => {
                const isOpen = openId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                    className="overflow-hidden rounded-2xl border"
                    style={{ background: "#FFFFFF", borderColor: isOpen ? CITRUS : BORDER }}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-6 sm:p-7 text-left"
                    >
                      <span
                        className="font-display text-[clamp(0.9rem,1.15vw,1.05rem)] font-bold leading-snug"
                        style={{ color: FOREST }}
                      >
                        {item.question}
                      </span>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300"
                        style={{
                          background: isOpen ? FOREST : "#F4F5EC",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <ChevronDown
                          size={16}
                          style={{ color: isOpen ? "#FFFFFF" : MUTED }}
                          strokeWidth={2.5}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div
                            className="border-t px-6 pb-6 pt-5 sm:px-7 sm:pb-7"
                            style={{ borderColor: BORDER }}
                          >
                            <p
                              className="text-[clamp(0.85rem,1.05vw,1rem)] leading-[1.85]"
                              style={{ color: MUTED }}
                            >
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
