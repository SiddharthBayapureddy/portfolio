import { createMetadata } from "@/lib/metadata";
import { getPinnedProjects, getPinnedExperiences } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedExperiences } from "@/components/home/FeaturedExperiences";

export const metadata = createMetadata();

export default async function HomePage() {
  const [projects, experiences] = await Promise.all([
    getPinnedProjects(3),
    getPinnedExperiences(3),
  ]);

  return (
    <>
      <Hero />
      <FeaturedExperiences experiences={experiences} />
      <FeaturedProjects projects={projects} />
    </>
  );
}
