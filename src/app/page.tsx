import { createMetadata } from "@/lib/metadata";
import { getPinnedExperiences } from "@/lib/data";
import { PROJECTS } from "@/lib/portfolio-content";
import { Hero } from "@/components/home/Hero";
import { AboutSummary } from "@/components/home/AboutSummary";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedExperiences } from "@/components/home/FeaturedExperiences";

export const metadata = createMetadata();

export default async function HomePage() {
  const experiences = await getPinnedExperiences(3);
  // Use the newly added hardcoded projects for the portfolio revamp
  const projects = PROJECTS;

  return (
    <>
      <Hero />
      <AboutSummary />
      <FeaturedExperiences experiences={experiences} />
      <FeaturedProjects projects={projects} />
    </>
  );
}
