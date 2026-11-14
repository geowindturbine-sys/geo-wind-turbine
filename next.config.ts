/**
 * @file next.config.ts
 * @description Next.js configuration.
 *
 * Notes:
 * - Turbopack is enabled via the CLI flag (`next dev --turbopack`) — no config key needed.
 * - dangerouslyAllowSVG: true lets next/image serve the SVG placeholder images
 *   used during development. Replace with real .jpg/.jpeg images for production.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
