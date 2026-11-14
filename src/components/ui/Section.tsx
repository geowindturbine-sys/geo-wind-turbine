/**
 * @file components/ui/Section.tsx
 * @description Semantic <section> wrapper with consistent vertical padding.
 *
 * The optional `background` prop makes it easy to alternate between the
 * primary Warm Ivory and the Pale Natural secondary background without
 * repeating Tailwind class strings across every section component.
 *
 * @example
 *   <Section id="benefits" background="secondary">
 *     <Container>…</Container>
 *   </Section>
 */

import { cn } from "@/lib/utils";

type SectionBackground = "default" | "secondary" | "white";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Controls the section background colour */
  background?: SectionBackground;
}

const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  default:   "bg-[var(--color-bg)]",
  secondary: "bg-[var(--color-bg-secondary)]",
  white:     "bg-[var(--color-surface)]",
};

export function Section({
  children,
  id,
  className,
  background = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 lg:py-28",
        BACKGROUND_CLASSES[background],
        className
      )}
    >
      {children}
    </section>
  );
}
