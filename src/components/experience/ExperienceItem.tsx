import Link from "next/link";
import type { Experience } from "@/lib/types";
import { ExternalLinkIcon } from "@/components/shared/Icons";
import { Tag } from "@/components/shared/Tag";

type ExperienceItemProps = {
  experience: Experience;
};

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <div className="relative border-l border-border pb-12 pl-8 last:pb-0">
      <div className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border border-border bg-background" />
      
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-medium text-foreground">
            {experience.role}
          </h3>
          <span className="font-mono text-xs text-muted-foreground">
            {experience.duration}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm">
          {experience.link ? (
            <Link
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground inline-flex items-center gap-1"
            >
              {experience.company}
              <ExternalLinkIcon className="size-3" />
            </Link>
          ) : (
            <span className="text-muted-foreground">{experience.company}</span>
          )}
        </div>

        {experience.description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {experience.description}
          </p>
        )}

        {experience.skills && experience.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
