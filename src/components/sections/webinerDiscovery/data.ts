import type { Category, BannerConfig, Webinar } from './types';

// ─── Items per page ─────────────────────────────────────────────────────────────
export const PER_PAGE = 6;

// ─── Category filter pills ──────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Topics' },
  { id: 'gis', label: 'GIS & Mapping' },
  { id: 'drones', label: 'Drone Surveys' },
  { id: 'agriculture', label: 'Precision Agric' },
  { id: 'oil-gas', label: 'Oil & Gas' },
  { id: 'remote', label: 'Remote Sensing' },
];

// ─── Banner artwork configs ─────────────────────────────────────────────────────
export const BANNERS: BannerConfig[] = [
  {
    bg: 'linear-gradient(135deg, #0d1f35 0%, #0a1a2e 40%, #0d2535 100%)',
    icon: '🛰️',
  },
  {
    bg: 'linear-gradient(135deg, #1a1200 0%, #2a1f00 40%, #1a1500 100%)',
    icon: '🌍',
  },
  {
    bg: 'linear-gradient(135deg, #001a1a 0%, #002828 40%, #001f1f 100%)',
    icon: '✈️',
  },
  {
    bg: 'linear-gradient(135deg, #1a0d00 0%, #2a1800 40%, #1a1000 100%)',
    icon: '🌾',
  },
  {
    bg: 'linear-gradient(135deg, #0d0d1a 0%, #16162a 40%, #0d0d20 100%)',
    icon: '📡',
  },
  {
    bg: 'linear-gradient(135deg, #001a0d 0%, #002a18 40%, #001a10 100%)',
    icon: '🗺️',
  },
  {
    bg: 'linear-gradient(135deg, #1a0d1a 0%, #2a152a 40%, #1a0d1a 100%)',
    icon: '🔭',
  },
  {
    bg: 'linear-gradient(135deg, #1a1a00 0%, #2a2a00 40%, #1a1a00 100%)',
    icon: '⛽',
  },
];

// ─── Webinar data ───────────────────────────────────────────────────────────────
export const WEBINARS: Webinar[] = [
  {
    id: 1,
    category: 'gis',
    status: 'live',
    title: 'Advanced GIS Techniques for Urban Infrastructure Mapping',
    description:
      'Deep dive into cutting-edge GIS methodologies transforming how cities plan and manage critical infrastructure assets using AI-driven spatial analysis.',
    date: '2025-05-15',
    time: '10:00 AM GMT',
    duration: '90 min',
    speakers: [
      { initials: 'AK', name: 'Dr. A. Kalu' },
      { initials: 'SM', name: 'S. Musa' },
    ],
    registrations: 214,
    banner: 0,
  },
  {
    id: 2,
    category: 'drones',
    status: 'upcoming',
    title: 'Drone-Based Pipeline Surveillance & Leak Detection',
    description:
      'How UAV technology is revolutionising real-time monitoring of oil and gas pipelines across the Niger Delta region with Digital Twin integration.',
    date: '2025-05-22',
    time: '2:00 PM GMT',
    duration: '75 min',
    speakers: [
      { initials: 'RO', name: 'R. Okonkwo' },
      { initials: 'LB', name: 'L. Bello' },
    ],
    registrations: 187,
    banner: 1,
  },
  {
    id: 3,
    category: 'agriculture',
    status: 'upcoming',
    title: 'Precision Farming: Satellite Imagery & Crop Yield Analytics',
    description:
      'Leveraging multispectral satellite data and AI-driven analytics to predict and improve crop yields across West Africa.',
    date: '2025-06-03',
    time: '11:00 AM GMT',
    duration: '60 min',
    speakers: [{ initials: 'FN', name: 'F. Nwosu' }],
    registrations: 143,
    banner: 2,
  },
  {
    id: 4,
    category: 'oil-gas',
    status: 'upcoming',
    title: 'Geospatial Intelligence for Offshore Asset Management',
    description:
      'Integrating GIS and remote sensing for comprehensive offshore facility monitoring, risk assessment and regulatory compliance.',
    date: '2025-06-18',
    time: '10:00 AM GMT',
    duration: '90 min',
    speakers: [
      { initials: 'CE', name: 'C. Effiong' },
      { initials: 'OA', name: 'O. Adeyemi' },
      { initials: 'MJ', name: 'M. James' },
    ],
    registrations: 98,
    banner: 3,
  },
  {
    id: 5,
    category: 'remote',
    status: 'upcoming',
    title: 'SAR & Multispectral Remote Sensing for Environmental Monitoring',
    description:
      'Practical applications of Synthetic Aperture Radar in tracking deforestation, flooding and coastal erosion dynamics.',
    date: '2025-07-02',
    time: '2:00 PM GMT',
    duration: '90 min',
    speakers: [{ initials: 'BB', name: 'B. Bassey' }],
    registrations: 76,
    banner: 4,
  },
  {
    id: 6,
    category: 'gis',
    status: 'completed',
    title: 'Land Administration & Cadastral Mapping in Emerging Markets',
    description:
      'Exploring best practices for digital land registration and dispute resolution using geospatial technologies.',
    date: '2025-04-10',
    time: '10:00 AM GMT',
    duration: '75 min',
    speakers: [
      { initials: 'HI', name: 'H. Ibrahim' },
      { initials: 'PO', name: 'P. Ojo' },
    ],
    registrations: 302,
    banner: 5,
  },
  {
    id: 7,
    category: 'drones',
    status: 'completed',
    title: 'LiDAR Point Cloud Processing for Topographic Surveys',
    description:
      'End-to-end workflow for acquiring, processing and delivering LiDAR-derived products for engineering and construction.',
    date: '2025-03-25',
    time: '11:00 AM GMT',
    duration: '90 min',
    speakers: [{ initials: 'TW', name: 'T. Williams' }],
    registrations: 258,
    banner: 6,
  },
  {
    id: 8,
    category: 'oil-gas',
    status: 'upcoming',
    title: 'Digital Twin Technology in Oil Field Development Planning',
    description:
      'How geospatial digital twins are reducing exploration risk and accelerating field development decisions at NNPC.',
    date: '2025-07-15',
    time: '1:00 PM GMT',
    duration: '60 min',
    speakers: [
      { initials: 'JE', name: 'J. Ezeh' },
      { initials: 'NK', name: 'N. Kanu' },
    ],
    registrations: 54,
    banner: 7,
  },
];
