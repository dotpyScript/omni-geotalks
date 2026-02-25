import type {
  StatItem,
  PillarItem,
  TimelineItem,
} from '@/components/types/types';

export const STATS: StatItem[] = [
  {
    id: 'webinars',
    value: 54,
    label: 'Webinars Delivered',
    caption: 'Expert-led sessions since 2021',
    accentColor: '#c9a84c',
  },
  {
    id: 'nations',
    value: 18,
    label: 'African Nations',
    caption: 'Reached across the continent',
    accentColor: '#00d4ff',
  },
  {
    id: 'professionals',
    value: 6200,
    suffix: '+',
    label: 'Professionals Trained',
    caption: 'GIS, UAV, Remote Sensing & more',
    accentColor: '#00e5a0',
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    caption: 'Based on post-session feedback',
    accentColor: '#e8c97e',
  },
];

export const PILLARS: PillarItem[] = [
  {
    num: 'I',
    heading: 'Context-First Curriculum',
    body: "Every session is built from African data, African infrastructure, and African practitioner challenges — not adapted from foreign frameworks, but designed entirely for this continent's realities.",
    tag: 'Pedagogy',
  },
  {
    num: 'II',
    heading: 'AI & Digital Twin Integration',
    body: "IEGS curricula embed next-generation tools — AI-powered spatial analysis, real-time Digital Twins, machine learning for remote sensing — so practitioners lead tomorrow's landscape, not follow it.",
    tag: 'Innovation',
  },
  {
    num: 'III',
    heading: 'Practitioner-to-Practitioner',
    body: 'Our speakers are engineers in the field, scientists publishing findings, and policymakers shaping land law — not consultants. Real knowledge from the frontline, delivered live.',
    tag: 'Community',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2021',
    heading: 'The Founding',
    body: "Born from a conviction that Africa's geospatial professionals deserved world-class, locally grounded education — not borrowed curricula from overseas.",
  },
  {
    year: '2022',
    heading: 'First 340 Attendees',
    body: "Our inaugural series on GIS & Land Administration drew participants from 9 nations — proving the continent's appetite for expert knowledge exchange.",
    isAccent: true,
  },
  {
    year: '2023',
    heading: 'AI & Digital Twin Track',
    body: "Africa's first dedicated AI-powered geospatial and Digital Twin curriculum launched, equipping practitioners with tools shaping the next decade.",
  },
  {
    year: '2025',
    heading: 'Pan-African Network',
    body: 'Today, IEGS is the leading geospatial education platform across Sub-Saharan Africa — 18 nations, 6,200+ professionals, one ecosystem.',
    isAccent: true,
  },
];

export const MANIFESTO = [
  'We exist to close',
  'the knowledge gap between',
  "Africa's spatial data abundance",
  'and the professionals',
  'who transform it into',
  'decisions that shape nations.',
] as const;
