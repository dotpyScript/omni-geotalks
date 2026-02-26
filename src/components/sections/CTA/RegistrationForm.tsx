"use client";

import { useState } from "react";
import type { FormData } from "./types";
import { INTEREST_OPTIONS } from "./constants";

// ─── Success state ─────────────────────────────────────────────────────────────
function SuccessState() {
  return (
    /*
     * Shown after form submission.
     * Replicates the inline success div from the original with a green
     * checkmark circle and Cormorant confirmation heading.
     */
    <div className="flex flex-col items-center gap-4 py-10 px-5 text-center">
      {/* Green circle ✓ */}
      <div
        className={[
          "w-14 h-14 rounded-full",
          "flex items-center justify-center",
          "text-[1.4rem] text-green",
          "bg-[rgba(0,200,120,0.12)] border border-[rgba(0,200,120,0.3)]",
        ].join(" ")}
      >
        ✓
      </div>

      {/* Heading */}
      <div className="font-cormorant text-[1.5rem] font-light text-ivory">
        You&apos;re{" "}
        <em className="italic text-gold-light">confirmed.</em>
      </div>

      {/* Sub-copy */}
      <div className="text-[0.76rem] text-ivory-muted leading-[1.6]">
        Check your inbox for the confirmation email.
        <br />
        We look forward to seeing you.
      </div>
    </div>
  );
}

// ─── RegistrationForm ─────────────────────────────────────────────────────────
export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    interest: "",
    newsletter: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setSubmitted(true);
  };

  return (
    /*
     * .cta-card — clip-bevel-xl from globals.css
     * gradient background, gold top-bar via ::before pseudo → replaced with
     * an absolute <div> child so Tailwind can express it without @layer tricks.
     */
    <div
      className={[
        "relative overflow-hidden",
        "border border-border",
        "px-10 py-11",
        "clip-bevel-xl",
        /* top gold bar pseudo → sibling div below */
      ].join(" ")}
      style={{
        background: "linear-gradient(145deg, var(--obsidian-3), var(--obsidian-4))",
      }}
    >
      {/* Top accent bar — replicates .cta-card::before */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, var(--gold), var(--gold-light), transparent)",
        }}
      />

      {/* ── Card label (.cta-card__label) ───────────────────────────── */}
      <div
        className={[
          "flex items-center gap-[10px]",
          "text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3",
          /* ::after rule line */
          "after:flex-1 after:h-px after:content-['']",
        ].join(" ")}
        style={{
          /* gradient rule can't be done with Tailwind arbitrary bg on after: */
        }}
      >
        <span>Reserve Your Seat</span>
        {/* Rule line — explicit element since after: + gradient is tricky */}
        <span
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(90deg, var(--border), transparent)",
          }}
        />
      </div>

      {/* ── Card heading (.cta-card__heading) ───────────────────────── */}
      <h3 className="font-cormorant text-[1.9rem] font-light leading-[1.2] text-ivory mb-3 [&_em]:italic [&_em]:text-gold-light">
        Join the <em>Next Session</em>
      </h3>

      {/* ── Card sub (.cta-card__sub) ────────────────────────────────── */}
      <p className="text-[0.78rem] leading-[1.65] text-ivory-muted font-light mb-7">
        Fill in your details and we&apos;ll send you the confirmation link,
        webinar time in your timezone, and speaker briefing.
      </p>

      {/* ── Form or success state ────────────────────────────────────── */}
      {submitted ? (
        <SuccessState />
      ) : (
        <form
          className="flex flex-col gap-[14px]"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <input
              className={[
                "w-full bg-obsidian-2 border border-border",
                "text-ivory font-dm text-[0.8rem]",
                "px-4 py-[13px] outline-none",
                "tracking-[0.02em]",
                "placeholder:text-ivory-muted",
                "transition-[border-color,box-shadow] duration-[250ms]",
                "focus:border-border-mid focus:shadow-[0_0_0_3px_rgba(201,168,76,0.06)]",
              ].join(" ")}
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((p) => ({ ...p, firstName: e.target.value }))
              }
            />
            <input
              className={[
                "w-full bg-obsidian-2 border border-border",
                "text-ivory font-dm text-[0.8rem]",
                "px-4 py-[13px] outline-none",
                "tracking-[0.02em]",
                "placeholder:text-ivory-muted",
                "transition-[border-color,box-shadow] duration-[250ms]",
                "focus:border-border-mid focus:shadow-[0_0_0_3px_rgba(201,168,76,0.06)]",
              ].join(" ")}
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((p) => ({ ...p, lastName: e.target.value }))
              }
            />
          </div>

          {/* Email */}
          <input
            className={[
              "w-full bg-obsidian-2 border border-border",
              "text-ivory font-dm text-[0.8rem]",
              "px-4 py-[13px] outline-none",
              "tracking-[0.02em]",
              "placeholder:text-ivory-muted",
              "transition-[border-color,box-shadow] duration-[250ms]",
              "focus:border-border-mid focus:shadow-[0_0_0_3px_rgba(201,168,76,0.06)]",
            ].join(" ")}
            type="email"
            placeholder="Professional email address"
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({ ...p, email: e.target.value }))
            }
          />

          {/* Interest select */}
          <select
            className={[
              "w-full bg-obsidian-2 border border-border",
              "text-ivory-dim font-dm text-[0.78rem]",
              "px-4 py-[13px] outline-none cursor-pointer appearance-none",
              "transition-[border-color] duration-[250ms]",
              "focus:border-border-mid",
            ].join(" ")}
            value={formData.interest}
            onChange={(e) =>
              setFormData((p) => ({ ...p, interest: e.target.value }))
            }
          >
            <option value="">Area of interest…</option>
            {INTEREST_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          {/* Newsletter checkbox */}
          <label
            className={[
              "flex items-start gap-3 cursor-pointer",
              "text-[0.72rem] text-ivory-muted leading-[1.5]",
            ].join(" ")}
          >
            <input
              type="checkbox"
              className="w-4 h-4 mt-[1px] flex-shrink-0 cursor-pointer accent-gold"
              checked={formData.newsletter}
              onChange={(e) =>
                setFormData((p) => ({ ...p, newsletter: e.target.checked }))
              }
            />
            Subscribe to our newsletter for upcoming webinar announcements
            (you can unsubscribe at any time)
          </label>

          {/* Submit */}
          <button
            type="submit"
            className={[
              "w-full py-4",
              "text-[0.78rem] tracking-[0.2em] uppercase",
              "text-obsidian font-dm font-medium",
              "bg-gradient-to-br from-gold to-gold-light",
              "border-none cursor-pointer",
              "clip-bevel-md",
              "transition-all duration-300 relative overflow-hidden",
              "hover:shadow-[0_8px_28px_rgba(201,168,76,0.35)]",
              "hover:-translate-y-px",
            ].join(" ")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(135deg, var(--gold-light), var(--gold-pale))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "";
            }}
          >
            Reserve My Seat →
          </button>
        </form>
      )}

      {/* Note */}
      <p className="text-[0.62rem] text-ivory-muted mt-[14px] tracking-[0.04em] text-center leading-[1.5]">
        By registering, you agree to receive event-related emails from IEGS.
        We never share your data with third parties.
      </p>
    </div>
  );
}
