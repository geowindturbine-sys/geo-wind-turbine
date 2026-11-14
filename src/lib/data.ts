/**
 * src/lib/data.ts
 *
 * Central content store for GEO WIND TURBINE website.
 *
 * ─── Data accuracy annotations ───────────────────────────────────────────────
 *
 *  ✅ FROM PRODUCT IMAGE  — Visible in a supplied product photograph; treat as
 *                           confirmed unless the client corrects it.
 *
 *  ⚠️ UNVERIFIED          — Placeholder value. MUST be replaced with client-
 *                           supplied data before going live.
 *
 *  🚫 DO NOT INVENT       — Field intentionally left neutral / omitted.
 *                           Do not add specific numbers, claims, or testimonials
 *                           without written confirmation from the client.
 *
 * ─── Sentinel pattern ────────────────────────────────────────────────────────
 *  Testimonials with name === PLACEHOLDER_NAME render a "Coming Soon" banner
 *  instead of fake quotes.  Replace with real entries before launch.
 *
 * ─── Image placeholder ───────────────────────────────────────────────────────
 *  GALLERY_IMAGE is a real marketing photograph used as a temporary stand-in
 *  for section cards that do not yet have dedicated assets.
 * ──────────────────────────────────────────────────────────────────────────── */

import type {
  NavLink,
  HeroStat,
  BenefitCard,
  ProductCard,
  ProjectCard,
  Testimonial,
  FAQItem,
  IndustryCard,
  SolutionCard,
  ProcessStep,
  WhyUsItem,
} from "@/types";

// ─── Sentinels & shared assets ────────────────────────────────────────────────

/** Triggers "Coming Soon" banner in Testimonials section. */
export const PLACEHOLDER_NAME = "Client Name";

/**
 * Real marketing photo used as a temporary placeholder wherever a
 * section-specific image has not yet been supplied.
 * ⚠️ UNVERIFIED — Replace each usage with the correct image before launch.
 */
export const GALLERY_IMAGE =
  "/assets/images/Vertical Wind Turbine in an Industrial Park.png";

// ─── Navigation ───────────────────────────────────────────────────────────────

/**
 * Top navigation links.
 * href values that begin with "/" are page routes; "#" anchors are for
 * one-page scroll targets on the homepage only.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Home",        href: "/"            },
  { label: "About Us",    href: "/about"        },
  { label: "Technology",  href: "/technology"   },
  { label: "Solutions",   href: "/solutions"    },
  { label: "Industries",  href: "/industries"   },
  { label: "Projects",    href: "/projects"     },
  { label: "Resources",   href: "/resources"    },
  { label: "Contact",     href: "/contact"      },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

/**
 * ⚠️ UNVERIFIED — All three values are illustrative placeholders.
 * Replace with figures the client approves before going live.
 * 🚫 DO NOT INVENT additional stats.
 */
export const HERO_STATS: HeroStat[] = [
  { value: "500", suffix: "+", label: "Units Deployed"      },
  { value: "20",  suffix: "+", label: "Years of Expertise"  },
  { value: "98",  suffix: "%", label: "Client Satisfaction" },
];

// ─── Benefits (Why GEO Wind Turbine) ─────────────────────────────────────────

export const BENEFITS: BenefitCard[] = [
  {
    icon:        "wind",
    title:       "Low Wind Speed Operation",
    description:
      "Engineered to generate power in conditions where conventional turbines stall, expanding viable deployment locations.",
  },
  {
    icon:        "volume-x",
    title:       "Near-Silent Performance",
    description:
      "The helical blade geometry minimises aerodynamic noise, making installations suitable for urban and occupied environments.",
  },
  {
    icon:        "compass",
    title:       "Omnidirectional Wind Response",
    description:
      "The vertical-axis design captures wind from any direction, eliminating the yaw-control systems required by horizontal-axis turbines.",
  },
  {
    icon:        "building-2",
    title:       "Adaptable to Built Environments",
    description:
      "Compact footprint and modular mounting options make deployment practical on rooftops, within industrial sites, and in urban settings.",
  },
  {
    icon:        "settings-2",
    title:       "Low Maintenance Architecture",
    description:
      "Ground-level generator placement simplifies servicing and reduces lifetime maintenance costs compared with elevated nacelle designs.",
  },
  {
    icon:        "leaf",
    title:       "Zero Operational Emissions",
    description:
      "Wind-powered generation with no combustion, no fuel cost, and no direct greenhouse gas output during operation.",
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────

/**
 * Specifications are drawn from the product photographs provided by the client.
 * Fields marked ✅ FROM PRODUCT IMAGE are confirmed from those images.
 * Fields marked ⚠️ UNVERIFIED must be validated by the client.
 */
export const PRODUCTS: ProductCard[] = [
  {
    id:      "gw-50",
    name:    "GW-50",
    tagline: "Compact urban and rooftop installations",
    image:   "/assets/images/GW-50 Wind Turbine in a Modern Industrial Landscape.png",
    specs: [
      { label: "Rated Power",     value: "50 W"    }, // ✅ FROM PRODUCT IMAGE
      { label: "Rotor Diameter",  value: "0.6 m"   }, // ✅ FROM PRODUCT IMAGE
      { label: "Cut-in Speed",    value: "2 m/s"   }, // ✅ FROM PRODUCT IMAGE
      { label: "Rated Wind Speed",value: "12 m/s"  }, // ✅ FROM PRODUCT IMAGE
    ],
    highlights: [
      "Roof-mount and pole-mount compatible",
      "Operates at low wind speeds",
      "Near-silent helical blade design",
    ],
  },
  {
    id:      "gw-250",
    name:    "GW-250",
    tagline: "Mid-scale commercial and campus deployments",
    image:   "/assets/images/GW-250 Vertical-Axis Wind Turbine.png",
    specs: [
      { label: "Rated Power",     value: "250 W"   }, // ✅ FROM PRODUCT IMAGE
      { label: "Rotor Diameter",  value: "1.2 m"   }, // ✅ FROM PRODUCT IMAGE
      { label: "Cut-in Speed",    value: "2 m/s"   }, // ✅ FROM PRODUCT IMAGE
      { label: "Rated Wind Speed",value: "12 m/s"  }, // ✅ FROM PRODUCT IMAGE
    ],
    highlights: [
      "Scalable in array configurations",
      "Omnidirectional wind capture",
      "Low vibration transmission",
    ],
  },
  {
    id:      "gw-1200",
    name:    "GW-1200",
    tagline: "Large-scale industrial and infrastructure sites",
    image:   "/assets/images/GW-1200 Vertical Wind Turbine Infographic.png",
    specs: [
      { label: "Rated Power",     value: "1.2 kW"  }, // ✅ FROM PRODUCT IMAGE
      { label: "Rotor Diameter",  value: "2.5 m"   }, // ✅ FROM PRODUCT IMAGE
      { label: "Cut-in Speed",    value: "2.5 m/s" }, // ✅ FROM PRODUCT IMAGE
      { label: "Rated Wind Speed",value: "12 m/s"  }, // ✅ FROM PRODUCT IMAGE
    ],
    highlights: [
      "Grid-tie and off-grid capable",
      "Heavy-duty structural frame",
      "Remote monitoring ready",
    ],
  },
];

// ─── Projects & Installations ─────────────────────────────────────────────────

/**
 * ⚠️ UNVERIFIED — All entries are illustrative placeholders.
 * Replace with verified project data supplied by the client.
 * 🚫 DO NOT INVENT project locations, clients, or deployment figures.
 */
export const PROJECTS: ProjectCard[] = [
  {
    id:       "proj-001",
    title:    "Industrial Campus Installation",
    location: "⚠️ Location TBC",
    sector:   "Manufacturing",
    image:    "/assets/images/Vertical Wind Turbine in an Industrial Park.png",
    client:   PLACEHOLDER_NAME,
  },
  {
    id:       "proj-002",
    title:    "Rooftop Array — Commercial Complex",
    location: "⚠️ Location TBC",
    sector:   "Commercial Infrastructure",
    image:    "/assets/images/Geo Wind Turbine Marketing Gallery.png",
    client:   PLACEHOLDER_NAME,
  },
  {
    id:       "proj-003",
    title:    "Resort Perimeter Wind Installation",
    location: "⚠️ Location TBC",
    sector:   "Resorts & Hospitality",
    image:    "/assets/images/GW-250 Vertical-Axis Wind Turbine.png",
    client:   PLACEHOLDER_NAME,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

/**
 * 🚫 DO NOT INVENT testimonials.
 * All entries use PLACEHOLDER_NAME; the section renders "Coming Soon" until
 * the client provides verified quotes.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id:      "t-001",
    name:    PLACEHOLDER_NAME,
    role:    "Facilities Director",
    company: "⚠️ UNVERIFIED",
    quote:   "⚠️ UNVERIFIED",
    rating:  5,
  },
  {
    id:      "t-002",
    name:    PLACEHOLDER_NAME,
    role:    "Head of Sustainability",
    company: "⚠️ UNVERIFIED",
    quote:   "⚠️ UNVERIFIED",
    rating:  5,
  },
  {
    id:      "t-003",
    name:    PLACEHOLDER_NAME,
    role:    "Plant Manager",
    company: "⚠️ UNVERIFIED",
    quote:   "⚠️ UNVERIFIED",
    rating:  5,
  },
];

// ─── Complete Project Solutions ───────────────────────────────────────────────

export const PROJECT_SOLUTIONS: SolutionCard[] = [
  {
    id:          "sol-technology",
    icon:        "cpu",
    title:       "Technology Supply",
    description: "GEO VAWT turbine units configured and specified for the deployment environment.",
  },
  {
    id:          "sol-engineering",
    icon:        "drafting-compass",
    title:       "Engineering Design",
    description: "Detailed mechanical and electrical engineering drawings tailored to site and load requirements.",
  },
  {
    id:          "sol-site",
    icon:        "map-pin",
    title:       "Site Assessment",
    description: "Wind resource evaluation, structural appraisal, and regulatory pre-screening for the target location.",
  },
  {
    id:          "sol-civil",
    icon:        "hard-hat",
    title:       "Civil & Structural Works",
    description: "Foundations, mounting structures, and civil preparation carried out by experienced partner contractors.",
  },
  {
    id:          "sol-electrical",
    icon:        "zap",
    title:       "Electrical Integration",
    description: "Grid-tie and off-grid cabling, inverter selection, protection systems, and metering installation.",
  },
  {
    id:          "sol-install",
    icon:        "wrench",
    title:       "Installation & Erection",
    description: "Professional assembly and erection of turbine units to manufacturer specifications and safety standards.",
  },
  {
    id:          "sol-commissioning",
    icon:        "check-circle",
    title:       "Commissioning",
    description: "System testing, performance verification, and handover documentation confirming the installation meets design targets.",
  },
  {
    id:          "sol-maintenance",
    icon:        "shield-check",
    title:       "Support & Maintenance",
    description: "Scheduled inspection programmes, remote monitoring, and responsive technical support throughout the asset lifecycle.",
  },
];

// ─── Industries We Serve ──────────────────────────────────────────────────────

export const INDUSTRIES: IndustryCard[] = [
  {
    id:          "ind-manufacturing",
    title:       "Manufacturing",
    description:
      "Factory sites and production campuses with high, continuous energy demand can use on-site VAWT generation to supplement grid electricity and support operational efficiency.",
    icon:        "factory",
    image:       "/assets/images/Golden-Hour Modern Manufacturing Facility.png",
    useCases:    ["Assembly plants", "Processing facilities", "Warehousing complexes"],
  },
  {
    id:          "ind-industrial-parks",
    title:       "Industrial Parks",
    description:
      "Multi-tenant industrial estates can deploy shared VAWT arrays to support common-area electricity requirements and sustainability initiatives.",
    icon:        "building",
    image:       "/assets/images/Golden-Hour Industrial Park Panorama.png",
    useCases:    ["Shared energy infrastructure", "Tenant sustainability programmes", "Common-area power"],
  },
  {
    id:          "ind-smart-cities",
    title:       "Smart Cities",
    description:
      "Urban planners can explore distributed wind generation alongside street-level infrastructure, public spaces, and suitable rooftop installations.",
    icon:        "landmark",
    image:       "/assets/images/Golden-Hour Smart City Boulevard.png",
    useCases:    ["Street furniture integration", "Public building rooftops", "Transport hubs"],
  },
  {
    id:          "ind-resorts",
    title:       "Resorts & Hospitality",
    description:
      "Resorts and hospitality developments can explore on-site renewable generation to complement their energy requirements and sustainability goals.",
    icon:        "palmtree",
    image:       "/assets/images/Golden Hour Luxury Mountain Resort.png",
    useCases:    ["Eco-resort certification", "Remote property power", "Guest-facing green credentials"],
  },
  {
    id:          "ind-commercial",
    title:       "Commercial Infrastructure",
    description:
      "Office parks, logistics centres, and commercial complexes can explore on-site wind generation across suitable rooftops and open areas.",
    icon:        "store",
    image:       "/assets/images/Dusk at the Modern Business Park.png",
    useCases:    ["Office campus microgrids", "Logistics and distribution centres", "Retail park energy"],
  },
  {
    id:          "ind-institutional",
    title:       "Institutional Facilities",
    description:
      "Universities, hospitals, and public institutions can explore distributed renewable generation to support energy resilience and sustainability objectives.",
    icon:        "school",
    image:       "/assets/images/Modern University Campus Entrance.png",
    useCases:    ["Campus energy resilience", "Government sustainability mandates", "Critical facility backup"],
  },
];

// ─── Our Process ──────────────────────────────────────────────────────────────

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step:        1,
    phase:       "Discovery",
    title:       "Initial Consultation",
    description:
      "We begin by understanding your site, energy requirements, and project objectives — aligning our scope to your specific goals.",
  },
  {
    step:        2,
    phase:       "Assessment",
    title:       "Site Assessment",
    description:
      "Our team evaluates wind resource, structural suitability, grid connection options, and local regulatory requirements.",
  },
  {
    step:        3,
    phase:       "Planning",
    title:       "Engineering & Planning",
    description:
      "Detailed engineering drawings, structural calculations, and project documentation are prepared and submitted for approval.",
  },
  {
    step:        4,
    phase:       "Build",
    title:       "Infrastructure & Installation",
    description:
      "Civil works, mounting structures, and electrical cabling are completed before turbine units are assembled and erected on site.",
  },
  {
    step:        5,
    phase:       "Launch",
    title:       "Commissioning",
    description:
      "Every system is tested and performance-verified against design parameters, with handover documentation provided to the client.",
  },
  {
    step:        6,
    phase:       "Support",
    title:       "Support & Maintenance",
    description:
      "We provide scheduled inspection programmes and responsive technical support throughout the full operational life of the asset.",
  },
];

// ─── Why Work With Us ─────────────────────────────────────────────────────────

export const WHY_US_ITEMS: WhyUsItem[] = [
  {
    icon:        "cog",
    title:       "Purpose-Built Technology",
    description:
      "Our VAWT units are engineered specifically for the environments in which they are deployed — not adapted from conventional turbine designs.",
  },
  {
    icon:        "layers",
    title:       "End-to-End Project Delivery",
    description:
      "From site assessment through commissioning, we coordinate every discipline so clients engage a single, accountable partner.",
  },
  {
    icon:        "shield",
    title:       "Engineering Rigour",
    description:
      "Every project is backed by detailed structural and electrical engineering, ensuring installations meet applicable standards and perform as designed.",
  },
  {
    icon:        "headphones",
    title:       "Responsive After-Sales Support",
    description:
      "Our technical team provides ongoing monitoring, scheduled servicing, and direct support — protecting your asset investment over the long term.",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS: FAQItem[] = [
  {
    id:       "faq-01",
    category: "Technology",
    question: "What type of wind turbine does GEO use?",
    answer:
      "GEO Wind Turbine produces vertical-axis wind turbines (VAWTs) with a helical blade geometry. Unlike the three-blade horizontal-axis turbines commonly associated with wind farms, our design rotates around a vertical shaft, capturing wind from any direction without yaw adjustment.",
  },
  {
    id:       "faq-02",
    category: "Technology",
    question: "What wind speed is required to generate power?",
    answer:
      "Our turbines are engineered to begin generating at low wind speeds — the GW-50 and GW-250 models have a cut-in speed of 2 m/s. This makes them viable in locations and built environments where conventional turbines would not operate effectively.",
  },
  {
    id:       "faq-03",
    category: "Technology",
    question: "How much noise do the turbines produce?",
    answer:
      "The helical blade design significantly reduces aerodynamic noise compared with conventional turbines. Our units are suitable for deployment in occupied and urban environments. Specific acoustic performance data is available upon request for site planning purposes.",
  },
  {
    id:       "faq-04",
    category: "Installation",
    question: "What sites are suitable for a GEO installation?",
    answer:
      "Our turbines are designed for rooftops, industrial campuses, perimeter fencing lines, and open ground. A site assessment determines wind resource adequacy, structural suitability, and grid connection options. We work across manufacturing, commercial, hospitality, and institutional sectors.",
  },
  {
    id:       "faq-05",
    category: "Installation",
    question: "Do you handle the entire project, or just the turbine supply?",
    answer:
      "We offer complete project delivery — from initial consultation and site assessment through engineering, civil works, electrical integration, installation, and commissioning. We also provide ongoing maintenance and monitoring. Clients can engage us for the full scope or for specific services.",
  },
  {
    id:       "faq-06",
    category: "Installation",
    question: "What approvals or permits are typically required?",
    answer:
      "Requirements vary by location, building type, and installation size. Our engineering and planning phase includes regulatory pre-screening, and we support clients through the documentation required for local authority and utility approvals.",
  },
  {
    id:       "faq-07",
    category: "Financial",
    question: "What is the typical project timeline from enquiry to commissioning?",
    answer:
      "Project timelines depend on site complexity, approval processes, and civil works requirements. We provide indicative schedules during the site assessment phase once scope is confirmed.",
  },
  {
    id:       "faq-08",
    category: "Financial",
    question: "Can the system connect to the grid or operate off-grid?",
    answer:
      "Both configurations are supported. Grid-tie installations feed surplus generation into the network, while off-grid or hybrid systems can be paired with battery storage for energy resilience. The appropriate configuration is determined during the engineering phase.",
  },
  {
    id:       "faq-09",
    category: "Maintenance",
    question: "What maintenance does a GEO turbine require?",
    answer:
      "The ground-level generator placement simplifies access and reduces maintenance complexity compared with nacelle-mounted designs. We offer scheduled inspection programmes and remote monitoring, with our technical team available for responsive support.",
  },
  {
    id:       "faq-10",
    category: "Maintenance",
    question: "What monitoring options are available?",
    answer:
      "Our installations can be equipped with remote monitoring systems that provide real-time generation data and performance alerts. Monitoring options are discussed during the project scoping phase.",
  },
  {
    id:       "faq-11",
    category: "General",
    question: "How do I begin a project enquiry?",
    answer:
      "Complete the enquiry form on this page with your project details — site location, estimated energy requirement, and industry sector. Our team will review your submission and contact you to arrange an initial consultation.",
  },
];

// ─── Turbine Configurations ────────────────────────────────────────────────────
// Provisional configuration categories — not confirmed product models.
// Do NOT display power ratings, rotor dimensions, cut-in speeds or other
// technical specifications; these are determined per project and site.

export interface TurbineConfig {
  id:                   string;
  configNumber:         string;   // "01" | "02" | "03"
  title:                string;   // e.g. "Compact Configuration"
  description:          string;
  applicationHighlights: string[]; // exactly 3 items
  image:                string;   // absolute path under /public
  ctaConfig:            string;   // passed to the WhatsApp / enquiry handler
}

export const TURBINE_CONFIGS: TurbineConfig[] = [
  {
    id:            "compact",
    configNumber:  "01",
    title:         "Compact Configuration",
    description:
      "Designed for space-constrained environments where low-profile integration is essential. Well-suited to sites where visual impact, structural loading, and acoustic performance are primary considerations.",
    applicationHighlights: [
      "Rooftop and elevated platform installations",
      "Urban and peri-urban deployments",
      "Low-wind and noise-sensitive environments",
    ],
    image:    "/assets/images/GW-50 Wind Turbine in a Modern Industrial Landscape.png",
    ctaConfig: "Compact",
  },
  {
    id:            "commercial",
    configNumber:  "02",
    title:         "Commercial Configuration",
    description:
      "A mid-range configuration balancing energy yield with site flexibility. Suited to commercial and light-industrial applications where consistent generation and straightforward installation logistics are priorities.",
    applicationHighlights: [
      "Commercial campuses and business parks",
      "Light industrial and logistics facilities",
      "Hybrid and grid-tie energy systems",
    ],
    image:    "/assets/images/GW-250 Vertical-Axis Wind Turbine.png",
    ctaConfig: "Commercial",
  },
  {
    id:            "industrial",
    configNumber:  "03",
    title:         "Industrial Configuration",
    description:
      "Built for high-demand industrial sites with the structural capacity to support larger installations. Engineered for robust, long-cycle operation in demanding wind and environmental conditions.",
    applicationHighlights: [
      "Heavy industrial and manufacturing facilities",
      "Port, infrastructure, and remote-site energy supply",
      "Large-scale standalone or array deployments",
    ],
    image:    "/assets/images/GW-1200 Vertical Wind Turbine Infographic.png",
    ctaConfig: "Industrial",
  },
];
