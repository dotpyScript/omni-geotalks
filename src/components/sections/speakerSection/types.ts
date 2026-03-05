// ─── Speaker Types ─────────────────────────────────────────────────────────────

export type SpeakerRole = "host" | "guest";

export interface Speaker {
  id: number;
  /** Two-letter initials shown in avatar, e.g. "AK" */
  initials: string;
  name: string;
  title: string;
  org: string;
  role: SpeakerRole;
  category: string;
  webinars: number;
  bio: string;
  linkedin: string;
  expertise: string[];
  /** CSS color string used for the per-speaker ambient glow, e.g. "rgba(0,80,160,0.3)" */
  accentColor: string;
  /** Optional speaker photo URL. Falls back to initials avatar when absent. */
  image?: string;
}
