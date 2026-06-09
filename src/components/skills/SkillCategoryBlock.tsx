import type { Skill } from "@/lib/types";
import { Tag } from "@/components/shared/Tag";

type SkillCategoryBlockProps = {
  category: string;
  skills: Skill[];
};

export function SkillCategoryBlock({ category, skills }: SkillCategoryBlockProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground font-mono uppercase tracking-wider">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Tag key={skill.id} label={skill.name} />
        ))}
      </div>
    </div>
  );
}
