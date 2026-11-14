/**
 * @file components/ui/Card.tsx
 * @description Generic content card primitive.
 *
 * Provides a consistent white card surface with a soft sage border,
 * controlled shadow, and optional hover elevation. Used across Benefits,
 * Products, Testimonials, and future pages.
 *
 * The `hover` prop enables the CSS shadow transition — only opt in when
 * the card is interactive or the section design calls for hover feedback.
 *
 * @example
 *   <Card hover>
 *     <h3>Feature Title</h3>
 *     <p>Short description of the feature.</p>
 *   </Card>
 */

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  /** Enables hover elevation (shadow + slight lift via CSS transition) */
  hover?: boolean;
  className?: string;
  /** Forwarded to the underlying <div> for aria purposes */
  role?: string;
}

export function Card({ children, hover = false, className, role }: CardProps) {
  return (
    <div
      role={role}
      className={cn(
        // Base card styles
        "rounded-xl bg-[var(--color-surface)]",
        "border border-[var(--color-border)]",
        "shadow-[var(--shadow-card)]",
        "transition-shadow duration-[var(--transition-base)]",
        // Optional hover elevation — adds shadow depth and slight border tint
        // Joined as a single string so cn (which only accepts string | falsy) is happy
        hover && "cursor-pointer hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-border-subtle)]",
        className
      )}
    >
      {children}
    </div>
  );
}
