// ─── About Section Types ───────────────────────────────────────────────────────

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

export interface PillarItem {
  index: string;     // "01", "02" etc.
  title: string;
  description: string;
  icon: React.ReactNode;
}
