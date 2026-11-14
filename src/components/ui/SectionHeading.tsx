/**
 * @file components/ui/SectionHeading.tsx
 * @description Standard section heading with optional eyebrow label.
 *
 * Used at the top of every content section. The eyebrow label appears in the
 * olive primary colour; the title is a large, bold heading in graphite; the
 * subtitle is body-sized muted text.
 *
 * @example
 *   <SectionHeading
 *     eyebrow="Why GEO Wind Turbine"
 *     title="Industrial-grade wind energy for India"
 *     subtitle="End-to-end project delivery — technology, engineering, installation."
 *   />
 */

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase tracking label above the main title */
  eyebrow?: string;
  title: string;
  /** Optional subtitle below the title — 1–2 supporting sentences */
  subtitle?: string;
  /** Left-align instead of centre-align (default: "center") */
  align?: "left" | "center";
  /** Additional classes for one-off overrides */
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align     = "center",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "mb-14",
        isCentered ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        /* eyebrow class defined in globals.css — small, uppercase, olive */
        <p className="eyebrow mb-3">{eyebrow}</p>
      )}

      <h2
        className={cn(
          "text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl lg:text-5xl",
          "leading-tight tracking-tight max-w-3xl",
          isCentered && "mx-auto"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base text-[var(--color-text-secondary)] md:text-lg leading-relaxed",
            isCentered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
