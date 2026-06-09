import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ArrowUpRight } from "lucide-react";

export const metadata = createMetadata({
  title: "About",
  description: "More about my background and experience.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <AnimatedSection>
        <h1 className="text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          About
        </h1>
      </AnimatedSection>

      <div className="mt-16 max-w-3xl space-y-24">
        {/* 1. Bio */}
        <AnimatedSection delay={0.1}>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m Siddharth Bayapureddy, a CS sophomore at BITS Pilani, Hyderabad. 
              I build at the intersection of artificial intelligence, machine learning, 
              and real-world problems — turning messy ideas into working software.
            </p>
            <p>
              When I&apos;m not writing code or exploring new ML architectures, 
              I&apos;m usually participating in ACM BPHC initiatives or finding ways 
              to make complex systems intuitive and fast.
            </p>
          </div>
        </AnimatedSection>

        {/* 2. Education */}
        <AnimatedSection delay={0.2}>
          <h2 className="mb-8 font-mono text-sm uppercase tracking-wider text-muted-foreground">
            Education
          </h2>
          <div className="border-l border-border pl-6 relative">
            <span className="absolute -left-[29px] top-1.5 size-2 rounded-full bg-border" />
            <p className="font-mono text-xs text-muted-foreground">
              2024 — Present
            </p>
            <h3 className="mt-2 text-lg font-medium text-foreground">
              B.E. Computer Science
            </h3>
            <p className="text-foreground">
              BITS Pilani, Hyderabad Campus
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Current CGPA: 9.1. Active member of ACM BPHC (Machine Learning & Generative AI).
            </p>
          </div>
        </AnimatedSection>

        {/* 3. Resume Button */}
        <AnimatedSection delay={0.3}>
          <a
            href={SITE.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Download Resume <ArrowUpRight className="size-4" />
          </a>
        </AnimatedSection>
      </div>
    </div>
  );
}
