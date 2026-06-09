import { createMetadata } from "@/lib/metadata";
import { getSkills } from "@/lib/data";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SkillCategoryBlock } from "@/components/skills/SkillCategoryBlock";
import type { Skill } from "@/lib/types";

export const metadata = createMetadata({
  title: "Skills",
  description: "Technologies, frameworks, and tools I work with.",
  path: "/skills",
});

export default async function SkillsPage() {
  const allSkills = await getSkills();
  
  // Group skills by category
  const groupedSkills = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(groupedSkills);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <AnimatedSection>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Skills
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The tools and technologies I use to build things. (Vibecoding until my free tier tokens run out).
        </p>
      </AnimatedSection>

      <div className="mt-12 space-y-12">
        {categories.length > 0 ? (
          <>
            {categories.map((category) => (
              <SkillCategoryBlock
                key={category}
                category={category}
                skills={groupedSkills[category]}
              />
            ))}
            <p className="mt-8 text-[10px] text-muted-foreground/60 italic">
              and yes, I&apos;ve Googled all of these
            </p>
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              My skill set is currently a mystery... or I just haven&apos;t added them to Supabase.
              <br />
              <span className="italic">I promise I know more than just Hello World.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
