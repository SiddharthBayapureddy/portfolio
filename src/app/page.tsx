import { createMetadata } from "@/lib/metadata";
import { getPinnedExperiences, getPinnedProjects, getSettings } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { AboutSummary } from "@/components/home/AboutSummary";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedExperiences } from "@/components/home/FeaturedExperiences";
import { BlackHoleClient } from "@/components/home/BlackHoleClient";

export const metadata = createMetadata();

export default async function HomePage() {
  const experiences = await getPinnedExperiences(3);
  const projects = await getPinnedProjects(3);
  const settings = await getSettings();

  return (
    <>
      <BlackHoleClient />
      <Hero settings={settings} />
      <AboutSummary settings={settings} />
      <FeaturedExperiences experiences={experiences} />
      <FeaturedProjects projects={projects} />
    </>
  );
}
