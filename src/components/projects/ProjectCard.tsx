import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { ExternalLinkIcon, GithubIcon } from "@/components/shared/Icons";
import { Tag } from "@/components/shared/Tag";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-muted-foreground/30",
        className
      )}
    >
      {project.thumbnail_url && (
        <div className="relative aspect-[16/9] w-full border-b border-border bg-background">
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-medium text-foreground">
              {project.title}
            </h3>
            {project.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {project.github_url && (
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </Link>
            )}
            {project.live_url && (
              <Link
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLinkIcon className="size-4" />
              </Link>
            )}
          </div>
        </div>
        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
