import Link from "next/link";
import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";
import {
  ABOUT,
  EXPERIENCES,
  QUOTE,
  SKILLS,
} from "@/lib/portfolio-content";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Tag } from "@/components/shared/Tag";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "About",
  description: ABOUT.bio,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <AnimatedSection>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          About
        </h1>
      </AnimatedSection>

      <AnimatedSection className="mt-12" delay={0.05}>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-border bg-card">
            <Image
              src={ABOUT.profileImage}
              alt={ABOUT.name}
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>{ABOUT.bio}</p>
            <a
              href={SITE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
            >
              Download resume
            </a>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-16" delay={0.1}>
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Skills
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <Tag key={skill} label={skill} />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-16" delay={0.15}>
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Experience
        </h2>
        <div className="mt-6 space-y-8">
          {EXPERIENCES.map((item) => (
            <div
              key={`${item.role}-${item.company}`}
              className="border-l border-border pl-6"
            >
              <p className="font-mono text-xs text-muted-foreground">
                {item.duration}
              </p>
              <h3 className="mt-1 text-base font-medium text-foreground">
                {item.role}
              </h3>
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.company}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-16" delay={0.2}>
        <blockquote className="border-l border-border pl-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            &ldquo;{QUOTE.text}&rdquo;
          </p>
          <footer className="mt-2 font-mono text-xs text-muted-foreground">
            — {QUOTE.author}
          </footer>
        </blockquote>
      </AnimatedSection>

    </div>
  );
}
