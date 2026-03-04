"use client";

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    /*
     * .footer-bottom
     * Desktop: flex row, space-between, 60px horizontal padding
     * Mobile:  24px padding, wraps
     */
    <div
      className={[
        "relative z-2",
        "px-15 py-6",
        "flex items-center justify-between gap-6 flex-wrap",
        "max-md:px-6 max-md:py-5",
      ].join(" ")}
    >
      {/* Left: copyright + legal links (.footer-bottom__copy) */}
      <div className="flex items-center gap-4 flex-wrap text-[0.68rem] text-(--ivory-muted) tracking-[0.06em] font-light">
        <span>© {year} Indepth Earth Geospatial Services Ltd.</span>

        {/* Separator */}
        <span className="text-(--border-mid)">|</span>
        <a
          href="#"
          className="text-(--ivory-muted) no-underline transition-colors duration-200 hover:text-(--gold-light)"
        >
          Privacy Policy
        </a>

        <span className="text-(--border-mid)">|</span>
        <a
          href="#"
          className="text-(--ivory-muted) no-underline transition-colors duration-200 hover:text-(--gold-light)"
        >
          Terms of Use
        </a>

        <span className="text-(--border-mid)">|</span>
        <a
          href="#"
          className="text-(--ivory-muted) no-underline transition-colors duration-200 hover:text-(--gold-light)"
        >
          Cookie Settings
        </a>
      </div>

      {/* Right: "Made in" + scroll-to-top (.footer-bottom__right) */}
      <div className="flex items-center gap-5">
        {/* "Built with ◆ in Rivers State" (.footer-bottom__made) */}
        <div className="flex items-center gap-1.5 text-[0.62rem] text-(--ivory-muted) tracking-[0.08em]">
          Built with{" "}
          <span className="text-(--gold)">◆</span>{" "}
          in Rivers State, Nigeria
        </div>

        {/*
         * Scroll-to-top button (.footer-scroll-top)
         * clip-corner-sm from globals.css
         */}
        <button
          className={[
            "w-9.5 h-9.5",
            "flex items-center justify-center",
            "bg-(--obsidian-3) border border-(--border)",
            "text-(--ivory-muted) text-[0.85rem] cursor-pointer",
            "clip-corner-sm",
            "transition-all duration-250",
            "hover:border-(--gold) hover:text-(--gold) hover:bg-(--gold-dim)",
          ].join(" ")}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Back to top"
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
