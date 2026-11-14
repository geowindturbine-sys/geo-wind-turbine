/**
 * src/app/page.tsx
 *
 * Homepage — renders all 14 sections in order as defined by the Phase 4 brief.
 *
 * Section order:
 *  1  Hero            – above-the-fold hero with animated stats
 *  2  Introduction    – brand introduction / product overview
 *  3  Technology      – core VAWT technology differentiators
 *  4  HowItWorks      – 6-step operational walkthrough
 *  5  Benefits        – key benefit cards (existing)
 *  6  ProjectSolutions – complete project-solution offerings
 *  7  Industries       – sectors served
 *  8  Products         – product model cards (existing)
 *  9  Projects         – installation case studies (existing)
 * 10  Process          – engagement / delivery process timeline
 * 11  WhyUs            – credibility / why-choose-us
 * 12  Testimonials     – client quotes (existing)
 * 13  FAQ              – accordion FAQ with category filter
 * 14  Enquiry          – project enquiry form
 *
 * Existing section components use named exports; new ones use default exports.
 */

// ─── Existing section components (named exports) ──────────────────────────────
import { Hero }         from "@/components/sections/Hero";
import { Benefits }     from "@/components/sections/Benefits";
import { Products }     from "@/components/sections/Products";
import { Projects }     from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";

// ─── New section components (default exports) ─────────────────────────────────
import Introduction    from "@/components/sections/Introduction";
import Technology      from "@/components/sections/Technology";
import HowItWorks      from "@/components/sections/HowItWorks";
import ProjectSolutions from "@/components/sections/ProjectSolutions";
import Industries      from "@/components/sections/Industries";
import Process         from "@/components/sections/Process";
import WhyUs           from "@/components/sections/WhyUs";
import FAQ             from "@/components/sections/FAQ";
import Enquiry         from "@/components/sections/Enquiry";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Technology />
      <HowItWorks />
      <Benefits />
      <ProjectSolutions />
      <Industries />
      <Products />
      <Projects />
      <Process />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Enquiry />
    </>
  );
}
