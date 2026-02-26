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

export interface DiamondConfig {
  top: string;
  left: string;
  delay: string;
}

export interface SocialItem {
  icon: string;
  href: string;
  label: string;
}

export interface SocialProofItem {
  num: number;
  label: string;
  suffix: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactItem {
  icon: string;
  text: React.ReactNode;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  interest: string;
  newsletter: boolean;
}
