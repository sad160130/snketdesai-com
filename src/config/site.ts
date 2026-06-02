/**
 * Single source of truth for all site content.
 * Edit this file to change copy, links, and the project grid — no component
 * code needs to be touched.
 */

export type SocialKey = "linkedin" | "x" | "github";

export interface SocialLink {
  /** Stable key, also used to pick the icon. */
  key: SocialKey;
  /** Accessible label, e.g. "LinkedIn". */
  label: string;
  /** Full destination URL. */
  href: string;
}

/** Category / status shown as a tag on each project card. */
export type ProjectTag =
  | "SaaS"
  | "Directory"
  | "Local"
  | "Stealth"
  | "Live"
  | "Building";

export interface ProjectCard {
  /** Display name. Use null-friendly copy for unnamed/stealth work. */
  name: string;
  /** One-line description. */
  description: string;
  /** Category / status tag. */
  tag: ProjectTag;
  /**
   * Destination URL. When `null` the card renders as a non-clickable teaser
   * (e.g. the stealth SaaS) with a "Coming soon" badge instead of a link.
   */
  url: string | null;
  /** Optional path to a small logo/favicon in /public. Falls back to a monogram. */
  logo?: string;
}

export interface SiteConfig {
  /** Canonical production URL — no trailing slash. */
  url: string;
  name: string;
  role: string;
  tagline: string;
  /** Path (in /public) to the avatar image. */
  avatar: string;
  socials: SocialLink[];
  /** Brand names for the "Previously" strip — text only, no logos. */
  experience: string[];
  projects: ProjectCard[];
}

export const site: SiteConfig = {
  url: "https://snketdesai.com",
  name: "Sanket Desai",
  role: "Senior SEO Manager @ Capital One Shopping",
  tagline:
    "10 years scaling organic traffic for Fortune 500 and crypto media — now building SEO tools and content sites of my own.",
  avatar: "/avatar.jpg",

  socials: [
    {
      key: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/snket-desai/",
    },
    {
      key: "x",
      label: "X",
      href: "https://x.com/DesaiSnket1669",
    },
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/sad160130",
    },
    // Email intentionally omitted — will add a Google Workspace address later.
  ],

  experience: [
    "CoinDesk",
    "Capital One Shopping",
    "The Block",
    "Goldman Sachs",
    "JPMorgan Chase",
    "McAfee",
  ],

  projects: [
    {
      name: "Interlinkmap",
      description:
        "Automated internal linking SaaS. Matches new posts to existing pages and suggests anchor text + placement.",
      tag: "SaaS",
      url: "TODO",
    },
    {
      name: "Stealth SaaS",
      description:
        "Ad intelligence for niche agencies. Scan any niche + city to surface which local businesses are running Meta & Google ads — and, just as usefully, which aren't. Name + launch coming soon.",
      tag: "Stealth",
      url: null,
    },
    {
      name: "Eat Real Food NYC",
      description: "Curated directory of healthy restaurants in NYC.",
      tag: "Directory",
      url: "TODO",
    },
    {
      name: "ConsignmentStores.site",
      description: "National directory of consignment & thrift stores.",
      tag: "Directory",
      url: "TODO",
    },
    {
      name: "junkremovalconcordnc.com",
      description: "Local junk removal lead site.",
      tag: "Local",
      url: "TODO",
    },
  ],
};
