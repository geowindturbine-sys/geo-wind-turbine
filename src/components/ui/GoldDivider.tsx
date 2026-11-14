/**
 * @file components/ui/GoldDivider.tsx
 * @description Thin decorative divider between major sections.
 *
 * The name is kept for backwards compatibility with existing imports.
 * The colour has been updated from gold to the Soft Sage border palette
 * as part of the Citrus Earth rebrand.
 *
 * Uses the --gradient-divider CSS variable so it automatically picks up
 * any future colour-system changes without touching this component.
 */

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className }: GoldDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-full${className ? ` ${className}` : ""}`}
      style={{
        background:
          "var(--gradient-divider, linear-gradient(90deg, transparent 0%, #DFE5D9 50%, transparent 100%))",
      }}
    />
  );
}
