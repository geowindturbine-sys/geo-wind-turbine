/**
 * @file constants/theme.ts
 * @description Design token mirror for GEO Wind Turbine — Citrus Earth theme.
 *
 * PURPOSE
 * ───────
 * This file mirrors the CSS custom properties defined in globals.css (:root)
 * so that TypeScript/JS code (animation configs, inline styles, test helpers)
 * can reference tokens without string-guessing CSS variable names.
 *
 * SOURCE OF TRUTH
 * ───────────────
 * globals.css is the authoritative source. If you change a colour value,
 * update it in globals.css first, then update the matching hex here.
 * Adding or removing a token requires changes in both files.
 *
 * USAGE
 * ─────
 * In components (non-Tailwind logic only):
 *   import { theme } from "@/constants/theme";
 *   style={{ color: theme.colors.primary }}
 *
 * For Tailwind classes, use the CSS variable directly:
 *   className="text-[var(--color-primary)]"
 */

export const theme = {
  /** ── Colour Palette ─────────────────────────────────────────────────── */
  colors: {
    /* Backgrounds */
    bg:            "#FAF8EF", // Warm Ivory
    bgSecondary:   "#F1F3E9", // Pale Natural
    surface:       "#FFFFFF", // Card / modal surface
    surfaceAlt:    "#F1F3E9", // Nested panel / hover

    /* Brand — olive/green scale */
    primary:       "#344D32", // Deep Olive
    primaryDark:   "#263823", // Hover / pressed olive
    primaryLight:  "#4A6B47", // Light olive

    secondary:     "#6DAD65", // Leaf Green
    secondaryLight:"#8EC487", // Light leaf tint

    /* Accent */
    accent:        "#E8F06A", // Citrus Yellow
    accentDark:    "#D4DC4A", // Pressed citrus
    accentFg:      "#292F2A", // Text ON citrus backgrounds

    /* Borders */
    border:        "#DFE5D9", // Soft Sage
    borderSubtle:  "#EBF0E6", // Very light sage

    /* Typography */
    textPrimary:   "#292F2A", // Graphite — headings
    textBody:      "#3D4A3E", // Body copy
    textSecondary: "#70786F", // Labels, captions
    textDisabled:  "#B4BAB2", // Placeholder / inactive
    textOnPrimary: "#FFFFFF", // White text on olive
  },

  /** ── Typography ─────────────────────────────────────────────────────── */
  fonts: {
    /**
     * Plus Jakarta Sans — geometric humanist sans-serif. Covers both display
     * headings and body copy. Loaded via next/font/google in layout.tsx and
     * injected as --font-jakarta CSS variable.
     */
    display: "var(--font-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif)",
    sans:    "var(--font-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif)",
  },

  fontWeights: {
    regular:  "400",
    medium:   "500",
    semibold: "600",
    bold:     "700",
    extrabold:"800",
  },

  /** ── Spacing scale (rem) ────────────────────────────────────────────── */
  spacing: {
    xs:   "0.25rem",  //  4px
    sm:   "0.5rem",   //  8px
    md:   "1rem",     // 16px
    lg:   "1.5rem",   // 24px
    xl:   "2rem",     // 32px
    "2xl":"3rem",     // 48px
    "3xl":"4rem",     // 64px
    "4xl":"6rem",     // 96px
  },

  /** ── Border radius ──────────────────────────────────────────────────── */
  radius: {
    sm:   "0.375rem", //  6px
    md:   "0.75rem",  // 12px
    lg:   "1rem",     // 16px
    xl:   "1.5rem",   // 24px
    full: "9999px",
  },

  /** ── Box Shadows ────────────────────────────────────────────────────── */
  shadows: {
    card:     "0 1px 3px rgba(52,77,50,0.06), 0 4px 16px rgba(52,77,50,0.08)",
    cardHover:"0 4px 12px rgba(52,77,50,0.12), 0 12px 32px rgba(52,77,50,0.10)",
    btn:      "0 1px 2px rgba(52,77,50,0.20)",
    nav:      "0 1px 0 #DFE5D9, 0 4px 16px rgba(52,77,50,0.06)",
  },

  /** ── Gradients ──────────────────────────────────────────────────────── */
  gradients: {
    heroBg:   "linear-gradient(160deg, #FAF8EF 0%, #EDF0E5 100%)",
    cardBg:   "linear-gradient(145deg, #FFFFFF 0%, #F7F9F4 100%)",
    divider:  "linear-gradient(90deg, transparent 0%, #DFE5D9 50%, transparent 100%)",
    primary:  "linear-gradient(135deg, #4A6B47 0%, #344D32 60%, #263823 100%)",
  },

  /** ── Transitions ────────────────────────────────────────────────────── */
  transitions: {
    fast:   "150ms ease",
    base:   "250ms ease",
    spring: "400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

export type ThemeColors     = typeof theme.colors;
export type ThemeGradients  = typeof theme.gradients;
