import { createMetadata } from "@/lib/metadata";
import { getPinnedProjects } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

export const metadata = createMetadata();

export default async function HomePage() {
  const projects = await getPinnedProjects(3);

  return (
    <>
      <Hero />
      <FeaturedProjects projects={projects} />
    </>
  );
}
