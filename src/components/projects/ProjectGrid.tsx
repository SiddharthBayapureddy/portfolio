"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ProjectCard } from "./ProjectCard";
import { TagFilter } from "./TagFilter";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags?.includes(activeTag))
    : projects;

  return (
    <div>
      {allTags.length > 0 && (
        <TagFilter
          tags={allTags}
          activeTag={activeTag}
          onTagChange={setActiveTag}
        />
      )}
      <div className="mt-8 grid gap-4">
        {filtered.map((project, i) => (
          <AnimatedSection key={project.id} delay={i * 0.05}>
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No projects match this filter.
          </p>
        )}
      </div>
    </div>
  );
}
