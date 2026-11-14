"use client";

/**
 * SmoothScrollProvider.tsx
 *
 * Wraps the app with Lenis smooth scrolling. Lenis is synced with
 * Framer Motion's global animation frame so both libraries share
 * the same RAF loop — no double-tick jank.
 *
 * Usage: wrap <body> children in layout.tsx with this provider.
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // RAF loop — drives Lenis each frame
    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Expose lenis on window for anchor-link scrolling from anywhere
    // e.g. window.__lenis?.scrollTo("#enquiry")
    (window as typeof window & { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
