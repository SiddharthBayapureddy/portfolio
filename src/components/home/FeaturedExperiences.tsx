import Link from "next/link";
import type { Experience } from "@/lib/types";
import { ExperienceItem } from "@/components/experience/ExperienceItem";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

type FeaturedExperiencesProps = {
  experiences: Experience[];
};

export function FeaturedExperiences({ experiences }: FeaturedExperiencesProps) {
  if (experiences.length === 0) return null;

  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Experience
            </h2>
            <Link
              href="/experience"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              All experience →
            </Link>
          </div>
          
          <div className="mt-12 space-y-0">
            {experiences.map((exp) => (
              <ExperienceItem key={exp.id} experience={exp} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
