import { createMetadata } from "@/lib/metadata";
import { getExperiences } from "@/lib/data";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ExperienceList } from "@/components/experience/ExperienceList";

export const metadata = createMetadata({
  title: "Experience",
  description: "My professional journey and roles I've held.",
  path: "/experience",
});

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <AnimatedSection>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Experience
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          My professional journey so far. (Mostly vibecoding until it works).
        </p>
      </AnimatedSection>
      <div className="mt-12">
        <ExperienceList experiences={experiences} />
      </div>
    </div>
  );
}
