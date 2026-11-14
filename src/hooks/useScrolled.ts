/**
 * @file hooks/useScrolled.ts
 * @description Returns `true` once the page has scrolled past `threshold` pixels.
 * Used by the Navbar to transition from transparent → bordered.
 *
 * @param threshold - pixels scrolled before the hook fires (default: 20)
 */
"use client";

import { useState, useEffect } from "react";

export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);

    // Set initial value in case page loads mid-scroll
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
