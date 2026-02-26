"use client";

import { useState } from "react";

export default function FooterMidNewsletter() {
  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubDone(true);
  };

  return (
    /*
     * .footer-mid
     * Desktop: flex row, space-between, 40px horizontal padding
     * Mobile:  flex column, 24px padding
     * Subtle gold gradient background from left
     */
    <div
      className={[
        "relative z-[2]",
        "px-[60px] py-10",
        "border-b border-border",
        "flex items-center justify-between gap-10 flex-wrap",
        /* subtle gold wash from left */
        "max-md:flex-col max-md:px-6 max-md:py-8",
      ].join(" ")}
      style={{
        background:
          "linear-gradient(90deg, rgba(201,168,76,0.03), transparent 60%)",
      }}
    >
      {/* Left: label + heading (.footer-mid__left) */}
      <div>
        <div className="text-[0.62rem] tracking-[0.28em] uppercase text-gold mb-2">
          Stay Informed
        </div>
        <h4 className="font-cormorant text-[1.4rem] font-light text-ivory [&_em]:italic [&_em]:text-gold-light">
          Get webinar alerts <em>before seats fill up</em>
        </h4>
      </div>

      {/* Right: form or success (.footer-mid__form) */}
      {subDone ? (
        <div className="flex items-center gap-[10px] text-[0.8rem] text-gold-light tracking-[0.1em]">
          <span className="text-green">✓</span>
          You&apos;re subscribed. Watch your inbox.
        </div>
      ) : (
        <form
          className="flex gap-0 flex-1 max-w-[460px] max-md:max-w-full max-md:w-full"
          onSubmit={handleSub}
          noValidate
        >
          {/* Input — no right border, connects flush to the button */}
          <input
            className={[
              "flex-1 bg-obsidian-3",
              "border border-border border-r-0",
              "text-ivory font-dm text-[0.78rem]",
              "px-[18px] py-[13px] outline-none",
              "placeholder:text-ivory-muted",
              "transition-[border-color] duration-[250ms]",
              "focus:border-border-mid",
            ].join(" ")}
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/*
           * Submit button (.footer-mid__btn)
           * Clipped top-right corner only:
           * clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)
           * Expressed as inline style — single-corner clip can't be done with
           * the global clip-bevel-* utilities (which clip all 4 corners).
           */}
          <button
            type="submit"
            className={[
              "px-7 py-[13px]",
              "bg-gold border border-gold",
              "text-obsidian font-dm text-[0.72rem]",
              "tracking-[0.18em] uppercase font-medium",
              "cursor-pointer whitespace-nowrap",
              "transition-all duration-[250ms]",
              "hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)]",
            ].join(" ")}
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
            }}
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
