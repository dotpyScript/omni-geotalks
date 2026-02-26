import type { ReactNode } from "react";

export interface Step {
  id: string;
  num: string;
  label: string;
  tag: string;
  heading: ReactNode;
  body: string;
  checkItems: string[];
  centerLabel: string;
  outcomeText: ReactNode;
  ctaLabel: string;
  color: string;
}

export interface Guarantee {
  icon: string;
  title: string;
  sub: string;
}
