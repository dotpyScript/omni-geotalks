"use client";

import type { Webinar, ViewMode } from "./types";
import { WebinarCard } from "./WebinarCard";

// ─── WebinarGrid Props ─────────────────────────────────────────────────────────

interface WebinarGridProps {
  webinars: Webinar[];
  viewMode: ViewMode;
  /** Key prop passed from parent — changing it re-triggers card entrance animations */
  animationKey: number;
  onCardClick?: (id: number) => void;
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center text-center px-10 py-20 gap-4">
      <div className="text-[2.5rem] opacity-20 mb-2">◎</div>
      <h3
        className="font-cormorant text-[1.6rem] font-light"
        style={{ color: 'var(--ivory-dim)' }}
      >
        No webinars found
      </h3>
      <p className="text-[0.8rem]" style={{ color: 'var(--ivory-muted)' }}>
        Try adjusting your search or category filter
      </p>
    </div>
  );
}

// ─── WebinarGrid ───────────────────────────────────────────────────────────────
// Renders the paginated webinar cards in either grid or list layout.
// Grid: 3 columns → 2 at 1100px → 1 at 768px
// List: single full-width column

export function WebinarGrid({
  webinars,
  viewMode,
  animationKey,
  onCardClick,
}: WebinarGridProps) {
  const isList = viewMode === "list";

  return (
    <div
      key={animationKey}
      className={[
        "grid gap-6 transition-all duration-300",
        isList
          ? "grid-cols-1 gap-4"
          : [
              "grid-cols-3",
              "max-[1100px]:grid-cols-2",
              "max-md:grid-cols-1",
            ].join(" "),
      ].join(" ")}
    >
      {webinars.length > 0 ? (
        webinars.map((webinar, i) => (
          <WebinarCard
            key={webinar.id}
            webinar={webinar}
            listView={isList}
            index={i}
            onClick={onCardClick}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
