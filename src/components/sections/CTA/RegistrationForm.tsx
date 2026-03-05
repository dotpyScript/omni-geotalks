"use client";

import { useState } from "react";
import type { FormData } from "./types";
import { INTEREST_OPTIONS } from "./constants";

// ─── Shared input className ────────────────────────────────────────────────────
const inputCls = [
  "w-full bg-(--obsidian-2) border border-(--border)",
  "text-(--ivory) font-dm text-[0.8rem]",
  "px-4 py-3.25 outline-none",
  "tracking-[0.02em]",
  "placeholder:text-(--ivory-muted)",
  "transition-[border-color,box-shadow] duration-250",
  "focus:border-(--border-mid) focus:shadow-[0_0_0_3px_var(--gold-dim)]",
].join(" ");

// ─── Success state ─────────────────────────────────────────────────────────────
function SuccessState() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 px-5 text-center">
      {/* Green circle ✓ */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-[1.4rem] text-(--green) bg-(--green-dim)"
        style={{ border: "1px solid color-mix(in srgb, var(--green) 30%, transparent)" }}
      >
        ✓
      </div>

      <div className="font-cormorant text-[1.5rem] font-light text-(--ivory)">
        You&apos;re{" "}
        <em className="italic text-(--gold-light)">confirmed.</em>
      </div>

      <div className="text-[0.76rem] text-(--ivory-muted) leading-[1.6]">
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
    <div
      className="relative overflow-hidden border border-(--border) px-10 py-11 clip-bevel-xl"
      style={{ background: "linear-gradient(145deg, var(--obsidian-3), var(--obsidian-4))" }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--gold), var(--gold-light), transparent)" }}
      />

      {/* Card label */}
      <div className="flex items-center gap-2.5 text-[0.6rem] tracking-[0.3em] uppercase text-(--gold) mb-3">
        <span>Reserve Your Seat</span>
        <span
          className="flex-1 h-px"
          style={{ background: "linear-gradient(90deg, var(--border), transparent)" }}
        />
      </div>

      {/* Card heading */}
      <h3 className="font-cormorant text-[1.9rem] font-light leading-[1.2] text-(--ivory) mb-3 [&_em]:italic [&_em]:text-(--gold-light)">
        Join the <em>Next Session</em>
      </h3>

      {/* Card sub */}
      <p className="text-[0.78rem] leading-[1.65] text-(--ivory-muted) font-light mb-7">
        Fill in your details and we&apos;ll send you the confirmation link,
        webinar time in your timezone, and speaker briefing.
      </p>

      {/* Form or success */}
      {submitted ? (
        <SuccessState />
      ) : (
        <form className="flex flex-col gap-3.5" onSubmit={handleSubmit} noValidate>
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <input
              className={inputCls}
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
            />
            <input
              className={inputCls}
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
            />
          </div>

          {/* Email */}
          <input
            className={inputCls}
            type="email"
            placeholder="Professional email address"
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          />

          {/* Interest select */}
          <select
            className={[
              "w-full bg-(--obsidian-2) border border-(--border)",
              "text-(--ivory-dim) font-dm text-[0.78rem]",
              "px-4 py-3.25 outline-none cursor-pointer appearance-none",
              "transition-[border-color] duration-250",
              "focus:border-(--border-mid)",
            ].join(" ")}
            value={formData.interest}
            onChange={(e) => setFormData((p) => ({ ...p, interest: e.target.value }))}
          >
            <option value="">Area of interest…</option>
            {INTEREST_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          {/* Newsletter checkbox */}
          <label className="flex items-start gap-3 cursor-pointer text-[0.72rem] text-(--ivory-muted) leading-normal">
            <input
              type="checkbox"
              className="w-4 h-4 mt-px shrink-0 cursor-pointer accent-(--gold)"
              checked={formData.newsletter}
              onChange={(e) => setFormData((p) => ({ ...p, newsletter: e.target.checked }))}
            />
            Subscribe to our newsletter for upcoming webinar announcements
            (you can unsubscribe at any time)
          </label>

          {/* Submit — fixed dark text on gold */}
          <button
            type="submit"
            className={[
              "w-full py-4",
              "text-[0.78rem] tracking-[0.2em] uppercase",
              "text-obsidian font-dm font-medium",
              "bg-linear-to-br from-(--gold) to-(--gold-light)",
              "border-none cursor-pointer clip-bevel-md",
              "transition-all duration-300 relative overflow-hidden",
              "hover:shadow-[0_8px_28px_var(--gold-glow)]",
              "hover:-translate-y-px",
            ].join(" ")}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "linear-gradient(135deg, var(--gold-light), var(--gold-pale))";
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
      <p className="text-[0.62rem] text-(--ivory-muted) mt-3.5 tracking-[0.04em] text-center leading-normal">
        By registering, you agree to receive event-related emails from IEGS.
        We never share your data with third parties.
      </p>
    </div>
  );
}
