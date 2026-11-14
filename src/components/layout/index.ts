/**
 * src/components/layout/index.ts
 *
 * Barrel file for layout components.
 * Both Navbar and Footer use default exports, so we re-export them
 * with explicit names using the `export { default as X }` pattern.
 */

export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
