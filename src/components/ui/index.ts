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
} from './Card';
export type {
  CardProps,
  EventCardProps,
  CardBadgeProps,
  CardVariant,
  CardStatus,
  SpeakerAvatarProps,
  SpeakerAvatarGroupProps,
} from './Card';

export { StatCounter, StatsGrid, HeroStats } from './StatCounter';
export type {
  StatCounterProps,
  StatsGridProps,
  HeroStatsProps,
  StatItem,
  StatVariant,
} from './StatCounter';

export { Countdown } from './Countdown';
export type { CountdownProps, CountdownVariant } from './Countdown';

export { Marquee, IEGS_TICKER_ITEMS } from './Marquee';
export type {
  MarqueeProps,
  MarqueeItem,
  MarqueeVariant,
  MarqueeDirection,
} from './Marquee';
