// ─── Webinar Discovery Types ───────────────────────────────────────────────────

export type WebinarStatus = "live" | "upcoming" | "completed";
export type ViewMode = "grid" | "list";
export type SortOption = "date-asc" | "date-desc" | "popular";

export interface WebinarSpeaker {
  initials: string;
  name: string;
}

export interface Webinar {
  id: number;
  category: string;
  status: WebinarStatus;
  title: string;
  description: string;
  date: string;      // ISO date string e.g. "2025-05-15"
  time: string;      // Display string e.g. "10:00 AM GMT"
  duration: string;  // Display string e.g. "90 min"
  speakers: WebinarSpeaker[];
  registrations: number;
  /** Index into BANNERS array for the placeholder card artwork */
  banner: number;
}

export interface Category {
  id: string;
  label: string;
}

export interface BannerConfig {
  bg: string;
  icon: string;
}
