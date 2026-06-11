import Link from "next/link";
import type { Project } from "@/lib/types";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ProjectCard } from "@/components/projects/ProjectCard";

type FeaturedProjectsProps = {
  projects: Project[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {projects.length > 0 && (
          <>
            <AnimatedSection>
              <div className="flex items-baseline justify-between">
                <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
                  Selected Work
                </h2>
                <Link
                  href="/projects"
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  View all →
                </Link>
              </div>
            </AnimatedSection>
            
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {projects.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.1} className="h-full">
                  <ProjectCard project={project} />
                </AnimatedSection>
              ))}
            </div>
          </>
        )}

        {/* Currently Building Section */}
        <AnimatedSection delay={0.4} className="mt-24 border-t border-border pt-12">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            Currently Building
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Exploring multi-modal AI agents and local inference optimization. 
            Currently reading through the latest diffusion model papers and fine-tuning 
            small language models for code generation tasks.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
