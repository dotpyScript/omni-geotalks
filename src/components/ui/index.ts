// components/ui/index.ts
// ─── Barrel export — import from "@/components/ui" ───────────────────────────

export { Button, IconButton } from './Button';
export type {
  ButtonProps,
  IconButtonProps,
  ButtonVariant,
  ButtonSize,
} from './Button';

export {
  Card,
  EventCard,
  CardStatusBadge,
  CardCategoryTag,
  SpeakerAvatar,
  SpeakerAvatarGroup,
  PlatformChip,
  SpotlightBar,
} from '../sections/heroSection/Card';
export type {
  CardProps,
  EventCardProps,
  CardBadgeProps,
  CardVariant,
  CardStatus,
  SpeakerAvatarProps,
  SpeakerAvatarGroupProps,
} from '../sections/heroSection/Card';

export {
  StatCounter,
  StatsGrid,
  HeroStats,
} from '../sections/heroSection/StatCounter';
export type {
  StatCounterProps,
  StatsGridProps,
  HeroStatsProps,
  StatItem,
  StatVariant,
} from '../sections/heroSection/StatCounter';

export { Countdown } from '../sections/heroSection/Countdown';
export type {
  CountdownProps,
  CountdownVariant,
} from '../sections/heroSection/Countdown';

export { Marquee, IEGS_TICKER_ITEMS } from '../sections/heroSection/Marquee';
export type {
  MarqueeProps,
  MarqueeItem,
  MarqueeVariant,
  MarqueeDirection,
} from '../sections/heroSection/Marquee';
