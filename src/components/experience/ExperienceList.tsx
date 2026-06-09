import type { Experience } from "@/lib/types";
import { ExperienceItem } from "./ExperienceItem";

type ExperienceListProps = {
  experiences: Experience[];
};

export function ExperienceList({ experiences }: ExperienceListProps) {
  if (experiences.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          My professional life is a blank canvas... or I just haven&apos;t added it to Supabase yet. 
          <br />
          <span className="italic">Check back after I stop vibecoding this section.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col">
      {experiences.map((exp) => (
        <ExperienceItem key={exp.id} experience={exp} />
      ))}
    </div>
  );
}
