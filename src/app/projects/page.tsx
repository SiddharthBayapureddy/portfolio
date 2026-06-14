import { createMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/data";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata = createMetadata({
  title: "Projects | Siddharth Bayapureddy",
  description: "A collection of my technical projects, open-source contributions, and experiments.",
});
export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <AnimatedSection>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Projects
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Projects across deep learning, generative AI, and full-stack
          development.
        </p>
      </AnimatedSection>
      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
