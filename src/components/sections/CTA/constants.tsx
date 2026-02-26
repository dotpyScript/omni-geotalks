import type { DiamondConfig, SocialItem, SocialProofItem, NavLink, ContactItem } from "./types";

// ─── CTA Section ──────────────────────────────────────────────────────────────

export const DIAMONDS: DiamondConfig[] = [
  { top: "18%", left: "8%",  delay: "0s"    },
  { top: "60%", left: "12%", delay: "2s"    },
  { top: "30%", left: "55%", delay: "4s"    },
  { top: "75%", left: "72%", delay: "1.5s"  },
  { top: "15%", left: "88%", delay: "3s"    },
];

export const TRUST_ITEMS: string[] = [
  "Free to attend, always",
  "No account required",
  "Unsubscribe anytime",
];

export const SOCIAL_PROOF: (SocialProofItem | null)[] = [
  { num: 2800, label: "Professionals registered", suffix: "+" },
  null,
  { num: 38,   label: "Countries represented",    suffix: ""  },
  null,
  { num: 54,   label: "Sessions delivered",        suffix: ""  },
  null,
  { num: 97,   label: "Attendee satisfaction",     suffix: "%" },
];

export const INTEREST_OPTIONS: string[] = [
  "GIS & Spatial Mapping",
  "UAV & Drone Surveys",
  "Precision Agriculture",
  "Oil & Gas Geospatial",
  "Remote Sensing & SAR",
  "Land Administration",
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER_SOCIALS: SocialItem[] = [
  { icon: "in", href: "#", label: "LinkedIn"   },
  { icon: "𝕏",  href: "#", label: "Twitter/X"  },
  { icon: "▶",  href: "#", label: "YouTube"    },
  { icon: "✉",  href: "#", label: "Email"      },
];

export const WEBINAR_LINKS: NavLink[] = [
  { label: "Upcoming Sessions",    href: "#" },
  { label: "Past Recordings",      href: "#" },
  { label: "GIS & Mapping",        href: "#" },
  { label: "Drone Surveys",        href: "#" },
  { label: "Precision Agriculture",href: "#" },
  { label: "Oil & Gas",            href: "#" },
  { label: "Remote Sensing",       href: "#" },
  { label: "Land Administration",  href: "#" },
];

export const COMPANY_LINKS: NavLink[] = [
  { label: "About IEGS",        href: "#" },
  { label: "Our Services",      href: "#" },
  { label: "Speaker Programme", href: "#" },
  { label: "Become a Speaker",  href: "#" },
  { label: "Partner With Us",   href: "#" },
  { label: "Careers",           href: "#" },
  { label: "Press & Media",     href: "#" },
  { label: "Blog",              href: "#" },
];

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: "◎",
    text: (
      <>
        Plot 14, Trans-Amadi Industrial Layout,
        <br />
        Port Harcourt, Rivers State, Nigeria
      </>
    ),
  },
  { icon: "◷", text: "Mon – Fri, 8:00 AM – 5:00 PM WAT" },
  { icon: "✉", text: "webinars@iegs.com.ng"              },
  { icon: "☏", text: "+234 (0) 803 000 0000"             },
];
