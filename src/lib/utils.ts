/**
 * @file lib/utils.ts
 * @description Utility helpers shared across the codebase.
 */

/**
 * Merges Tailwind class strings, filtering falsy values.
 * Drop-in replacement for the `clsx` / `tailwind-merge` combo — no extra
 * dependency needed for this project's complexity level.
 *
 * @example
 *   cn("px-4", isActive && "bg-gold", undefined) // "px-4 bg-gold"
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
