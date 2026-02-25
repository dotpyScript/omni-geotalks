// ─── Category Types ────────────────────────────────────────────────────────────

export type CategoryId =
  | "gis"
  | "drones"
  | "agriculture"
  | "oilgas"
  | "remote"
  | "cadastral";

export type IconKey = CategoryId;

export interface CategoryStat {
  webinars: number;
  speakers: number;
  hours: number;
}

export interface Category extends CategoryStat {
  id: CategoryId;
  tag: string;
  name: string;
  description: string;
  featured?: boolean;
  icon: IconKey;
  gradient: string;
  patternColor: string;
}

export type CardVariant = "featured" | "standard";
