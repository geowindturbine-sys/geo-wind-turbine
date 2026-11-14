/**
 * @file components/sections/ContactCTA.tsx
 * @description Full-width contact call-to-action + enquiry form — Citrus Earth theme.
 *
 * Form is intentionally client-side only (no server action) so it
 * works out-of-the-box. To wire up email submission:
 *   1. Create /api/contact/route.ts with a POST handler
 *   2. Replace the console.log in handleSubmit with a fetch() call
 *
 * ⚠️  PLACEHOLDER CONTACT DETAILS
 * ─────────────────────────────────
 * The address, phone number, and email below are placeholder values.
 * Replace with verified company contact information before launch.
 * Publishing fabricated contact details will mislead visitors and
 * direct enquiries to the wrong destination.
 *
 *   Address : Plot 42, Industrial Estate, Rajkot, Gujarat – 360 001  ⚠️ UNVERIFIED
 *   Phone   : +91 79 1234 5678                                        ⚠️ UNVERIFIED
 *   Email   : info@geowindturbine.in                                  ⚠️ UNVERIFIED
 */

"use client";

import { useState }       from "react";
import { Section }        from "@/components/ui/Section";
import { Container }      from "@/components/ui/Container";
import { GoldDivider }    from "@/components/ui/GoldDivider";
import { Button }         from "@/components/ui/Button";

interface FormState {
  name:    string;
  email:   string;
  phone:   string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", phone: "", message: "" };

/**
 * Shared input / textarea class string.
 * Focus ring uses the olive primary to match the Citrus Earth focus-visible
 * style defined in globals.css.
 */
const FIELD_CLASS = [
  "w-full rounded-lg bg-[var(--color-surface)] px-4 py-3",
  "text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)]",
  "border border-[var(--color-border)]",
  "focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30",
  "transition-colors duration-200",
].join(" ");

export function ContactCTA() {
  const [form,      setForm]      = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  /** Generic change handler — works for both <input> and <textarea>. */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <>
      <GoldDivider />

      <Section id="contact" background="white">
        <Container>

          {/* ── Heading row ── */}
          <div className="mb-14 flex flex-col items-center text-center">
            <p className="eyebrow mb-3">Get in Touch</p>
            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl">
              Ready to harness the wind?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Tell us about your site and energy goals — our engineers will prepare
              a tailored feasibility report within 48 hours, free of charge.
            </p>
          </div>

          {/* ── Two-column layout: contact info + form ── */}
          <div className="grid gap-12 md:grid-cols-2">

            {/* Left: Contact details */}
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="mb-5 text-xl font-bold text-[var(--color-text-primary)]">
                  Contact Information
                </h3>

                {/*
                 * ⚠️  All contact details below are PLACEHOLDER values.
                 * Replace with verified company data before launch.
                 */}
                <dl className="space-y-5 text-sm text-[var(--color-text-body)]">
                  <div>
                    <dt className="mb-1 text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                      Address
                    </dt>
                    <dd className="leading-relaxed">
                      GEO Wind Turbine Pvt. Ltd.<br />
                      {/* ⚠️ UNVERIFIED — placeholder address */}
                      Plot 42, Industrial Estate<br />
                      Rajkot, Gujarat – 360 001
                    </dd>
                  </div>

                  <div>
                    <dt className="mb-1 text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                      Phone
                    </dt>
                    <dd>
                      {/* ⚠️ UNVERIFIED — placeholder number */}
                      <a
                        href="tel:+917912345678"
                        className="transition-colors hover:text-[var(--color-primary)]"
                      >
                        +91 79 1234 5678
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="mb-1 text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                      Email
                    </dt>
                    <dd>
                      {/* ⚠️ UNVERIFIED — placeholder email */}
                      <a
                        href="mailto:info@geowindturbine.in"
                        className="transition-colors hover:text-[var(--color-primary)]"
                      >
                        info@geowindturbine.in
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Decorative divider */}
              <div
                className="h-0.5 w-20 rounded-full"
                style={{ background: "var(--gradient-primary)" }}
                aria-hidden="true"
              />

              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                Office hours: Mon – Sat, 9 AM – 6 PM IST
              </p>

              {/* Feature highlights — reinforces the value proposition at the contact stage */}
              <ul className="mt-2 space-y-3" aria-label="Why enquire">
                {[
                  "Free feasibility report within 48 hours",
                  "Site survey and wind assessment included",
                  "Turnkey delivery — permits to commissioning",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--color-text-body)]">
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold text-white"
                      style={{ background: "var(--color-secondary)" }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Enquiry form */}
            <div>
              {submitted ? (
                /* Success state */
                <div
                  className="flex flex-col items-center justify-center rounded-2xl p-10 text-center"
                  style={{
                    background: "var(--gradient-card-bg)",
                    boxShadow:  "var(--shadow-card)",
                  }}
                >
                  <span className="mb-4 text-5xl" role="img" aria-label="Success">
                    ✅
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                    Message received!
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    Our team will get back to you within 48 hours.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                /* Enquiry form */
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-6 md:p-8"
                  style={{
                    background: "var(--gradient-card-bg)",
                    boxShadow:  "var(--shadow-card)",
                  }}
                  noValidate
                  aria-label="Contact enquiry form"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]"
                      >
                        Full Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]"
                      >
                        Email Address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={FIELD_CLASS}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]"
                    >
                      Tell us about your project <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Site location, estimated capacity, timeline…"
                      className={`${FIELD_CLASS} resize-none`}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="mt-6 w-full justify-center"
                  >
                    Send Enquiry
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* ── Footer strip ── */}
          <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8">
            <p className="text-sm text-[var(--color-text-secondary)]">
              © {new Date().getFullYear()} GEO Wind Turbine Pvt. Ltd.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
              Clean Energy · Made in India
            </p>
          </div>

        </Container>
      </Section>
    </>
  );
}
