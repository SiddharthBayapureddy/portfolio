import { ABOUT } from "./portfolio-content";

export const SITE = {
  name: ABOUT.name,
  domain: "siddharthb.me",
  url: "https://siddharthb.me",
  tagline: ABOUT.title,
  email: "hello@siddharthb.me",
  resumePath: ABOUT.resumePath,
} as const;

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/siddharth-bayapureddy/",
  github: "https://github.com/SiddharthBayapureddy",
  instagram: "https://www.instagram.com/siddharth.b___/",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
