/**
 * @file components/ui/Container.tsx
 * @description Responsive page-width container.
 *
 * Wraps section content to a readable max-width and applies consistent
 * horizontal padding. All section components use this for layout.
 *
 * @example
 *   <Container>
 *     <h2>Section Title</h2>
 *   </Container>
 */

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  /** Extra Tailwind classes for special-case layout overrides */
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
