export { default } from './WebinarShowcase';
export { default as WebinarShowcase } from './WebinarShowcase';
export { FeaturedSessionCard } from './FeaturedSessionCard';
export { SessionCard } from './SessionCard';
export { CategoryFilter } from './CategoryFilter';

// Re-export unchanged files
export { BannerPlaceholder } from '@/components/sections/webinerDiscovery/BannerPlaceholder';
export { StatusBadge } from '@/components/sections/webinerDiscovery/StatusBadge';
export {
  WEBINARS,
  CATEGORIES,
  BANNERS,
  PER_PAGE,
} from '@/components/sections/webinerDiscovery/data';
export type {
  Webinar,
  WebinarStatus,
  ViewMode,
  SortOption,
  Category,
  BannerConfig,
  WebinarSpeaker,
} from '@/components/sections/webinerDiscovery/types';
