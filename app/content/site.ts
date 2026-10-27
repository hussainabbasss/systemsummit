/** Central brand + navigation content. Components map over this, no hard-coded lists in JSX. */

export const brand = {
  name: "System Summit",
  tagline: "Digital Architects for Diplomacy",
  mission:
    "Every MUN, whatever its budget, deserves proper digital infrastructure, affordably.",
  email: "hello@systemsummit.com",
  responseSla: "We reply within 48 hours.",
} as const;

/** Parent company. System Summit is a NiqBrands product. */
export const niqbrands = {
  name: "NiqBrands LLC",
  short: "NiqBrands",
  belief: "At NiqBrands, we believe every academic conference deserves a website.",
  blurb:
    "System Summit is a NiqBrands company. NiqBrands builds focused digital products for academic and student communities.",
  logo: "/niqbrands.png",
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export const ctaLink = { label: "Get a Website", href: "/get-a-website" } as const;

export const footerLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Get a Website", href: "/get-a-website" },
];
