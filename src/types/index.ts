/**
 * src/types/index.ts
 *
 * Shared TypeScript interfaces for the GEO WIND TURBINE website.
 *
 * Naming convention:
 *  - Suffix the interface with the domain noun (ProductCard, not Product)
 *  - Keep optional fields last in each interface
 *  - Comment fields whose valid values are constrained (e.g., icon names)
 */

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href:  string;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroStat {
  value:  string;
  label:  string;
  /** Optional short suffix appended after the counter (e.g. "+", "%") */
  suffix?: string;
}

// ─── Benefits (Why GEO Wind Turbine) ─────────────────────────────────────────

export interface BenefitCard {
  icon:        string; /** Lucide icon name, kebab-case */
  /** Path relative to /public, e.g. "/assets/images/foo.png" */
  image?:      string;
  title:       string;
  description: string;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductCard {
  id:          string;
  name:        string;
  tagline:     string;
  image:       string; /** Absolute path under /public */
  specs:       ProductSpec[];
  highlights:  string[];
  /** Optional badge text shown on the card (e.g. "Most Popular") */
  badge?:      string;
}

// ─── Projects & Installations ─────────────────────────────────────────────────

export interface ProjectCard {
  id:       string;
  title:    string;
  location: string;
  sector:   string;
  image:    string;
  /** Client name or PLACEHOLDER sentinel — see lib/data.ts */
  client:   string;
  /** ⚠️ UNVERIFIED — Year of installation, replace with verified data */
  year?:     string;
  /** ⚠️ UNVERIFIED — Installed capacity string e.g. "2.4 kW", replace with verified data */
  capacity?: string;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id:         string;
  name:       string; /** Set to PLACEHOLDER_NAME to trigger "Coming Soon" banner */
  role:       string;
  company:    string;
  quote:      string;
  /** Star rating 1–5 */
  rating:     number;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FAQItem {
  id:       string;
  question: string;
  answer:   string;
  /** Optional grouping label shown in a filter row */
  category?: string;
}

// ─── Industries ───────────────────────────────────────────────────────────────

export interface IndustryCard {
  id:          string;
  title:       string;
  description: string;
  icon:        string; /** Lucide icon name, kebab-case */
  /** Path relative to /public, e.g. "/assets/images/foo.png" */
  image?:      string;
  /** Representative use-cases or sub-sectors for this industry */
  useCases:    string[];
}

// ─── Complete Project Solutions ───────────────────────────────────────────────

export interface SolutionCard {
  id:          string;
  icon:        string; /** Lucide icon name, kebab-case */
  /** Path relative to /public, e.g. "/assets/images/foo.png" */
  image?:      string;
  title:       string;
  description: string;
}

// ─── Our Process ──────────────────────────────────────────────────────────────

export interface ProcessStep {
  step:        number; /** 1-based display index */
  title:       string;
  description: string;
  /** Short action label shown on the timeline connector */
  phase:       string;
}

// ─── Why Work With Us ─────────────────────────────────────────────────────────

export interface WhyUsItem {
  icon:        string;
  title:       string;
  description: string;
}
