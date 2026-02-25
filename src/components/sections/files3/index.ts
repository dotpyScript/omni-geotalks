// ─── About Section — Public API ───────────────────────────────────────────────

export { default as AboutSection } from "./AboutSection";
export { default } from "./AboutSection";

// Sub-components
export { AboutHero } from "./AboutHero";
export { AboutStats } from "./AboutStats";
export { AboutPillars } from "./AboutPillars";
export { MilestoneTimeline } from "./MilestoneTimeline";
export { ManifestoBlock } from "./ManifestoBlock";
export { GeoMapDecoration } from "./GeoMapDecoration";
export { AboutCTA } from "./AboutCTA";
export { AboutCounter } from "./AboutCounter";

// Hooks
export { useInView } from "./useInView";

// Types & data
export type { StatItem, MilestoneItem, PillarItem } from "./types";
export { STATS, MILESTONES, MANIFESTO_LINES } from "./data";
