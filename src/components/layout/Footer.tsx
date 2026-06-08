import Link from "next/link";
import { SITE, SOCIAL } from "@/lib/constants";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/shared/Icons";

const SOCIAL_LINKS = [
  { href: SOCIAL.github, label: "GitHub", icon: GithubIcon },
  { href: SOCIAL.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: SOCIAL.instagram, label: "Instagram", icon: InstagramIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          {SITE.name} · {SITE.domain} · {year}
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
