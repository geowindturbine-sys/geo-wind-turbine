"use client";

/**
 * src/components/sections/Enquiry.tsx
 *
 * Project enquiry form — premium two-column layout on Deep Forest background.
 * Left: sticky pitch with 3 trust points + contact info
 * Right: 11-field form with focus-aware citrus border highlights
 *
 * Submission: logs to console (TODO: replace with API route before launch).
 */

import { useState, useRef, type FormEvent, type ChangeEvent, type CSSProperties } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  ArrowRight,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  ShieldCheck,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface EnquiryForm {
  fullName:             string;
  companyName:          string;
  businessEmail:        string;
  phoneNumber:          string;
  city:                 string;
  state:                string;
  industry:             string;
  projectType:          string;
  estimatedRequirement: string;
  projectLocation:      string;
  message:              string;
}

const INITIAL_FORM: EnquiryForm = {
  fullName:             "",
  companyName:          "",
  businessEmail:        "",
  phoneNumber:          "",
  city:                 "",
  state:                "",
  industry:             "",
  projectType:          "",
  estimatedRequirement: "",
  projectLocation:      "",
  message:              "",
};

const INDUSTRY_OPTIONS = [
  "Commercial & Retail",
  "Education & Research",
  "Government & Public Sector",
  "Hospitality & Tourism",
  "Industrial & Manufacturing",
  "Real Estate & Infrastructure",
  "Other",
];

const PROJECT_TYPE_OPTIONS = [
  "Rooftop Installation",
  "Ground-Mount Installation",
  "Off-Grid / Remote Energy",
  "Hybrid Power System",
  "Feasibility Study",
  "Other",
];

const TRUST_POINTS = [
  {
    icon: Clock,
    title: "Response within 2 working days",
    desc:  "Our team reviews every enquiry personally.",
  },
  {
    icon: Zap,
    title: "Free feasibility discussion",
    desc:  "No obligation. We help you understand what's possible.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-end project support",
    desc:  "Site assessment, supply, installation, and after-sales.",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const sectionReveal = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const leftReveal = {
  hidden:  { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const rightReveal = {
  hidden:  { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

// ─── Styled field wrapper ─────────────────────────────────────────────────────

function Field({
  label,
  htmlFor,
  required = true,
  children,
}: {
  label:     string;
  htmlFor:   string;
  required?: boolean;
  children:  React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        style={{
          display:     "block",
          fontSize:    "clamp(0.72rem, 0.85vw, 0.8rem)",
          fontWeight:  600,
          color:       "rgba(255,255,255,0.75)",
          marginBottom: "0.375rem",
          letterSpacing: "0.01em",
        }}
      >
        {label}
        {!required && (
          <span style={{ marginLeft: "0.35rem", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
            (optional)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

// ─── Shared input style ───────────────────────────────────────────────────────

const inputBase: CSSProperties = {
  width:           "100%",
  borderRadius:    "0.6rem",
  background:      "rgba(255,255,255,0.07)",
  border:          "1px solid rgba(255,255,255,0.14)",
  color:           "#ffffff",
  padding:         "0.65rem 0.9rem",
  fontSize:        "clamp(0.78rem, 0.9vw, 0.85rem)",
  outline:         "none",
  transition:      "border-color 200ms, background 200ms, box-shadow 200ms",
};

function StyledInput({
  id,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  id:          string;
  name:        string;
  type?:       string;
  placeholder: string;
  required?:   boolean;
  value:       string;
  onChange:    (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete="off"
      style={{
        ...inputBase,
        background:  focused ? "rgba(167,201,87,0.08)" : "rgba(255,255,255,0.07)",
        borderColor: focused ? "#A7C957" : "rgba(255,255,255,0.14)",
        boxShadow:   focused ? "0 0 0 3px rgba(167,201,87,0.15)" : "none",
      }}
    />
  );
}

function StyledTextarea({
  id,
  name,
  rows,
  placeholder,
  required,
  value,
  onChange,
}: {
  id:          string;
  name:        string;
  rows:        number;
  placeholder: string;
  required?:   boolean;
  value:       string;
  onChange:    (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        resize:      "none",
        background:  focused ? "rgba(167,201,87,0.08)" : "rgba(255,255,255,0.07)",
        borderColor: focused ? "#A7C957" : "rgba(255,255,255,0.14)",
        boxShadow:   focused ? "0 0 0 3px rgba(167,201,87,0.15)" : "none",
      }}
    />
  );
}

function StyledSelect({
  id,
  name,
  required,
  value,
  options,
  placeholder,
  onChange,
}: {
  id:          string;
  name:        string;
  required?:   boolean;
  value:       string;
  options:     string[];
  placeholder: string;
  onChange:    (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputBase,
          appearance:  "none",
          cursor:      "pointer",
          paddingRight: "2.5rem",
          background:  focused ? "rgba(167,201,87,0.08)" : "rgba(255,255,255,0.07)",
          borderColor: focused ? "#A7C957" : "rgba(255,255,255,0.14)",
          boxShadow:   focused ? "0 0 0 3px rgba(167,201,87,0.15)" : "none",
        }}
      >
        <option value="" disabled style={{ background: "#26352B" }}>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: "#26352B" }}>{opt}</option>
        ))}
      </select>
      <ChevronDown
        size={16}
        style={{
          position:      "absolute",
          right:         "0.75rem",
          top:           "50%",
          transform:     "translateY(-50%)",
          pointerEvents: "none",
          color:         "rgba(255,255,255,0.4)",
        }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Enquiry() {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm]           = useState<EnquiryForm>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    console.log("[Enquiry] Form submitted:", form);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  }

  const motionProps = shouldReduceMotion
    ? { initial: false }
    : {
        initial:    "hidden" as const,
        whileInView: "visible" as const,
        viewport:   { once: true, margin: "0px 0px -60px 0px" },
      };

  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      style={{
        position:   "relative",
        background: "#26352B",
        overflow:   "hidden",
        width:      "100%",
      }}
    >
      {/* Background grid texture */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize:    "48px 48px",
          pointerEvents:     "none",
        }}
      />

      {/* Radial glow — top right */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          top:        "-20%",
          right:      "-10%",
          width:      "60%",
          height:     "80%",
          background: "radial-gradient(ellipse 60% 60% at 70% 30%, rgba(167,201,87,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Radial glow — bottom left */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          bottom:     "-10%",
          left:       "-5%",
          width:      "50%",
          height:     "60%",
          background: "radial-gradient(ellipse 55% 55% at 20% 70%, rgba(232,239,131,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position:   "relative",
          zIndex:     1,
          maxWidth:   "1440px",
          margin:     "0 auto",
          padding:    "clamp(4rem, 7vw, 7rem) clamp(1.25rem, 4vw, 4rem)",
        }}
      >
        {/* Section header */}
        <motion.div
          variants={sectionReveal}
          {...motionProps}
          style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 4vw, 4rem)" }}
        >
          <span
            style={{
              display:       "inline-block",
              fontSize:      "clamp(0.65rem, 0.78vw, 0.72rem)",
              fontWeight:    700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "#A7C957",
              marginBottom:  "0.75rem",
            }}
          >
            Start Your Project
          </span>
          <h2
            id="enquiry-heading"
            style={{
              fontFamily:    "var(--font-manrope, Manrope, system-ui, sans-serif)",
              fontSize:      "clamp(1.9rem, 3.5vw, 3rem)",
              fontWeight:    800,
              letterSpacing: "-0.04em",
              lineHeight:    1.1,
              color:         "#ffffff",
              marginBottom:  "1rem",
            }}
          >
            Tell Us About Your
            <br />
            <span style={{ color: "#A7C957" }}>Energy Goals</span>
          </h2>
          <p
            style={{
              fontSize:   "clamp(0.9rem, 1.1vw, 1.05rem)",
              color:      "rgba(255,255,255,0.6)",
              maxWidth:   "540px",
              margin:     "0 auto",
              lineHeight: 1.65,
            }}
          >
            Share your project details and our team will reach out to discuss
            feasibility, site requirements, and next steps.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr",
            gap:                 "clamp(2rem, 4vw, 4rem)",
            alignItems:          "start",
          }}
          className="md:grid-cols-[1fr_1.6fr]"
        >
          {/* ── Left column: pitch ── */}
          <motion.div
            variants={leftReveal}
            {...motionProps}
            style={{ position: "sticky", top: "7rem" }}
          >
            {/* Trust points */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    display:    "flex",
                    gap:        "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      flexShrink:    0,
                      width:         "2.5rem",
                      height:        "2.5rem",
                      borderRadius:  "0.6rem",
                      background:    "rgba(167,201,87,0.15)",
                      display:       "flex",
                      alignItems:    "center",
                      justifyContent:"center",
                      marginTop:     "0.1rem",
                    }}
                  >
                    <Icon size={18} style={{ color: "#A7C957" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize:   "clamp(0.82rem, 0.95vw, 0.9rem)",
                        fontWeight: 600,
                        color:      "#ffffff",
                        marginBottom:"0.2rem",
                      }}
                    >
                      {title}
                    </p>
                    <p style={{ fontSize: "clamp(0.72rem, 0.85vw, 0.8rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div
              style={{
                borderTop:  "1px solid rgba(255,255,255,0.1)",
                paddingTop: "1.5rem",
                display:    "flex",
                flexDirection: "column",
                gap:        "0.75rem",
              }}
            >
              {[
                { icon: Phone, text: "⚠️ +91 00000 00000" },
                { icon: Mail,  text: "⚠️ contact@geowindturbine.com" },
                { icon: MapPin,text: "⚠️ India" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Icon size={15} style={{ color: "rgba(167,201,87,0.6)", flexShrink: 0 }} />
                  <span style={{ fontSize: "clamp(0.72rem, 0.85vw, 0.8rem)", color: "rgba(255,255,255,0.45)" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column: form / success ── */}
          <motion.div variants={rightReveal} {...motionProps}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background:    "rgba(167,201,87,0.08)",
                    border:        "1px solid rgba(167,201,87,0.3)",
                    borderRadius:  "1.25rem",
                    padding:       "clamp(2rem, 4vw, 3.5rem)",
                    textAlign:     "center",
                  }}
                >
                  <div
                    style={{
                      width:          "5rem",
                      height:         "5rem",
                      borderRadius:   "50%",
                      background:     "rgba(167,201,87,0.15)",
                      border:         "2px solid rgba(167,201,87,0.4)",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      margin:         "0 auto 1.5rem",
                    }}
                  >
                    <CheckCircle2 size={36} style={{ color: "#A7C957" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily:  "var(--font-manrope, Manrope, system-ui, sans-serif)",
                      fontSize:    "clamp(1.3rem, 2vw, 1.6rem)",
                      fontWeight:  700,
                      color:       "#ffffff",
                      marginBottom:"0.75rem",
                    }}
                  >
                    Enquiry Received
                  </h3>
                  <p style={{ fontSize: "clamp(0.85rem, 1vw, 0.95rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                    Thank you for reaching out. Our team will review your project details
                    and contact you within 2 working days.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    background:    "rgba(255,255,255,0.04)",
                    border:        "1px solid rgba(255,255,255,0.1)",
                    borderRadius:  "1.25rem",
                    padding:       "clamp(1.5rem, 3vw, 2.5rem)",
                    display:       "flex",
                    flexDirection: "column",
                    gap:           "1.1rem",
                  }}
                >
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.1rem" }}>
                    <Field label="Full Name" htmlFor="fullName">
                      <StyledInput id="fullName" name="fullName" placeholder="Jane Smith" required value={form.fullName} onChange={handleChange} />
                    </Field>
                    <Field label="Company Name" htmlFor="companyName">
                      <StyledInput id="companyName" name="companyName" placeholder="Acme Corp" required value={form.companyName} onChange={handleChange} />
                    </Field>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.1rem" }}>
                    <Field label="Business Email" htmlFor="businessEmail">
                      <StyledInput id="businessEmail" name="businessEmail" type="email" placeholder="jane@acme.com" required value={form.businessEmail} onChange={handleChange} />
                    </Field>
                    <Field label="Phone Number" htmlFor="phoneNumber">
                      <StyledInput id="phoneNumber" name="phoneNumber" type="tel" placeholder="+91 98765 43210" required value={form.phoneNumber} onChange={handleChange} />
                    </Field>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.1rem" }}>
                    <Field label="City" htmlFor="city">
                      <StyledInput id="city" name="city" placeholder="Mumbai" required value={form.city} onChange={handleChange} />
                    </Field>
                    <Field label="State" htmlFor="state">
                      <StyledInput id="state" name="state" placeholder="Maharashtra" required value={form.state} onChange={handleChange} />
                    </Field>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.1rem" }}>
                    <Field label="Industry" htmlFor="industry">
                      <StyledSelect id="industry" name="industry" required value={form.industry} options={INDUSTRY_OPTIONS} placeholder="Select industry" onChange={handleChange} />
                    </Field>
                    <Field label="Project Type" htmlFor="projectType">
                      <StyledSelect id="projectType" name="projectType" required value={form.projectType} options={PROJECT_TYPE_OPTIONS} placeholder="Select type" onChange={handleChange} />
                    </Field>
                  </div>

                  {/* Row 5 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.1rem" }}>
                    <Field label="Estimated Requirement" htmlFor="estimatedRequirement" required={false}>
                      <StyledInput id="estimatedRequirement" name="estimatedRequirement" placeholder="e.g. 5 kW, 3 units" value={form.estimatedRequirement} onChange={handleChange} />
                    </Field>
                    <Field label="Project Location" htmlFor="projectLocation">
                      <StyledInput id="projectLocation" name="projectLocation" placeholder="Site address or area" required value={form.projectLocation} onChange={handleChange} />
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label="Message" htmlFor="message">
                    <StyledTextarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Describe your project, timeline, or any questions you have…"
                      required
                      value={form.message}
                      onChange={handleChange}
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      gap:            "0.5rem",
                      width:          "100%",
                      padding:        "0.85rem 1.5rem",
                      borderRadius:   "0.6rem",
                      background:     loading ? "#b8c860" : "#E8EF83",
                      color:          "#26352B",
                      fontWeight:     700,
                      fontSize:       "clamp(0.82rem, 0.95vw, 0.9rem)",
                      letterSpacing:  "0.01em",
                      border:         "none",
                      cursor:         loading ? "not-allowed" : "pointer",
                      transition:     "background 200ms, transform 100ms",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading)
                        (e.currentTarget as HTMLButtonElement).style.background = "#d4dc4a";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        loading ? "#b8c860" : "#E8EF83";
                    }}
                    onMouseDown={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
                    }}
                    onMouseUp={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
