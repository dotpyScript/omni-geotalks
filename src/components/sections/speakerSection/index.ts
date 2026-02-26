// ─── Speakers Section — Public API ────────────────────────────────────────────

export { default as SpeakersSection } from "./SpeakersSection";
export { default } from "./SpeakersSection";

// Sub-components
export { SpotlightPanel } from "./SpotlightPanel";
export { SpotlightPortrait } from "./SpotlightPortrait";
export { SpeakerRoster } from "./SpeakerRoster";
export { RosterItem } from "./RosterItem";
export { SpeakerAvatar } from "./SpeakerAvatar";
export { RoleBadge } from "./RoleBadge";
export { ExpertiseMarquee } from "./ExpertiseMarquee";
export { SpeakersSectionHeader } from "./SpeakersSectionHeader";

// Data & types
export type { Speaker, SpeakerRole } from "./types";
export { SPEAKERS, EXPERTISE_TAGS } from "./data";
