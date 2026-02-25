// ─── About Section Types ───────────────────────────────────────────────────────

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  caption: string;
  accentColor?: string;
}

export interface PillarItem {
  num: string;
  heading: string;
  body: string;
  tag: string;
}

export interface TimelineItem {
  year: string;
  heading: string;
  body: string;
  isAccent?: boolean;
}
