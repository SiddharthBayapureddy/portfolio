import Link from "next/link";
import type { Project } from "@/lib/types";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ProjectCard } from "@/components/projects/ProjectCard";

type FeaturedProjectsProps = {
  projects: Project[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-medium text-foreground">
              Featured projects
            </h2>
            <Link
              href="/projects"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              View all →
            </Link>
          </div>
        </AnimatedSection>
        <div className="mt-8 grid gap-4">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
