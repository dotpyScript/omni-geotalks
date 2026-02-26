// ─── Webinar Discovery Section — Public API ───────────────────────────────────

export { default as WebinarDiscovery } from "./WebinarDiscovery";
export { default } from "./WebinarDiscovery";

// Sub-components
export { WebinarCard } from "./WebinarCard";
export { WebinarGrid } from "./WebinarGrid";
export { BannerPlaceholder } from "./BannerPlaceholder";
export { StatusBadge } from "./StatusBadge";
export { DiscoveryControls } from "./DiscoveryControls";
export { DiscoveryPagination } from "./DiscoveryPagination";
export { DiscoverySectionHeader } from "./DiscoverySectionHeader";

// Types & data
export type { Webinar, WebinarSpeaker, WebinarStatus, ViewMode, SortOption, Category, BannerConfig } from "./types";
export { WEBINARS, CATEGORIES, BANNERS, PER_PAGE } from "./data";
