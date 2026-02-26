import type { Category } from "./types";

// ─── Category Data ─────────────────────────────────────────────────────────────
// AI & Digital Twin capabilities are embedded in sector descriptions
// and reflected in the tag taxonomy.

export const CATEGORIES: Category[] = [
  {
    id: "gis",
    tag: "Foundational",
    name: "GIS & Spatial Mapping",
    description:
      "Explore advanced geographic information systems methodologies — from urban infrastructure planning and land use analysis to real-time asset tracking and spatial data management across complex terrain. Powered by AI-driven pattern recognition and Digital Twin city models.",
    webinars: 14,
    speakers: 18,
    hours: 22,
    featured: true,
    icon: "gis",
    gradient:
      "radial-gradient(ellipse at 30% 70%, rgba(0,80,160,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 50%)",
    patternColor: "rgba(0,100,200,0.07)",
  },
  {
    id: "drones",
    tag: "High Demand",
    name: "UAV & Drone Surveys",
    description:
      "Master aerial survey methodologies using fixed-wing and multi-rotor platforms for topographic, structural and environmental applications. Integrates AI-powered photogrammetry and real-time Digital Twin generation.",
    webinars: 9,
    speakers: 11,
    hours: 14,
    icon: "drones",
    gradient:
      "radial-gradient(ellipse at 60% 40%, rgba(0,180,120,0.2) 0%, transparent 65%)",
    patternColor: "rgba(0,180,120,0.06)",
  },
  {
    id: "agriculture",
    tag: "Emerging",
    name: "Precision Agriculture",
    description:
      "Satellite and drone-derived insights for optimising crop yield, soil health and irrigation across West African farmlands. AI crop health models and Digital Twin farm simulations included.",
    webinars: 7,
    speakers: 9,
    hours: 11,
    icon: "agriculture",
    gradient:
      "radial-gradient(ellipse at 40% 60%, rgba(80,160,0,0.2) 0%, transparent 65%)",
    patternColor: "rgba(80,160,0,0.06)",
  },
  {
    id: "oilgas",
    tag: "Industry Focus",
    name: "Oil & Gas Geospatial",
    description:
      "Pipeline surveillance, offshore asset management and regulatory compliance using geospatial intelligence for Nigeria's energy sector. AI anomaly detection and Digital Twin pipeline monitoring covered.",
    webinars: 11,
    speakers: 14,
    hours: 18,
    icon: "oilgas",
    gradient:
      "radial-gradient(ellipse at 70% 30%, rgba(200,80,0,0.18) 0%, transparent 65%)",
    patternColor: "rgba(200,80,0,0.06)",
  },
  {
    id: "remote",
    tag: "Advanced",
    name: "Remote Sensing & SAR",
    description:
      "SAR, LiDAR and multispectral analysis for environmental monitoring, flood mapping and change detection. AI classification models and Digital Twin terrain reconstruction explored.",
    webinars: 8,
    speakers: 10,
    hours: 13,
    icon: "remote",
    gradient:
      "radial-gradient(ellipse at 50% 50%, rgba(0,120,200,0.2) 0%, transparent 65%)",
    patternColor: "rgba(0,120,200,0.06)",
  },
  {
    id: "cadastral",
    tag: "Policy & Law",
    name: "Land Administration",
    description:
      "Digital cadastral systems, land tenure security and dispute resolution in emerging African real estate markets. AI-assisted boundary adjudication and Digital Twin land registry systems.",
    webinars: 5,
    speakers: 7,
    hours: 8,
    icon: "cadastral",
    gradient:
      "radial-gradient(ellipse at 30% 70%, rgba(160,100,0,0.2) 0%, transparent 65%)",
    patternColor: "rgba(160,100,0,0.06)",
  },
];
