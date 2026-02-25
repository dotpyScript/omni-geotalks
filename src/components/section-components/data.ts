import type { StatItem, MilestoneItem } from './types';

// ─── Impact statistics ─────────────────────────────────────────────────────────

export const STATS: StatItem[] = [
  {
    value: 54,
    label: 'Webinars Hosted',
    sublabel: 'Expert-led sessions',
  },
  {
    value: 18,
    label: 'African Nations',
    sublabel: 'Reached & engaged',
  },
  {
    value: 6200,
    suffix: '+',
    label: 'Professionals Trained',
    sublabel: 'Across all disciplines',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    sublabel: 'Attendee feedback',
  },
];

// ─── Founding milestones / timeline ────────────────────────────────────────────

export const MILESTONES: MilestoneItem[] = [
  {
    year: '2021',
    title: 'The Founding Vision',
    description:
      "IEGS was born from a simple conviction: that Africa's geospatial professionals deserved world-class, contextually relevant education — not imported curricula that ignored local realities.",
  },
  {
    year: '2022',
    title: 'First Cohort',
    description:
      'Our inaugural webinar series on GIS & Land Administration drew 340 participants from 9 countries, proving the appetite for high-quality geospatial knowledge exchange on the continent.',
  },
  {
    year: '2023',
    title: 'AI & Digital Twin Track',
    description:
      "We launched Africa's first dedicated AI-powered geospatial and Digital Twin curriculum, equipping practitioners with the tools shaping the next decade of spatial intelligence.",
  },
  {
    year: '2025',
    title: 'Pan-African Network',
    description:
      'Today, IEGS is the leading geospatial education platform across Sub-Saharan Africa — connecting experts, governments, energy companies and academic institutions in one ecosystem.',
  },
];

// ─── Mission statement fragments (animated word-by-word reveal) ───────────────
// Each string is a line of the manifesto
export const MANIFESTO_LINES = [
  'We exist to close the knowledge gap',
  "between Africa's spatial data abundance",
  'and the professionals who transform it',
  'into decisions that shape nations.',
];
