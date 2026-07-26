"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import type { Project } from "@/lib/types";
import { ExternalLinkIcon, GithubIcon } from "@/components/shared/Icons";
import { Tag } from "@/components/shared/Tag";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [easterEggActive, setEasterEggActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handlePointerDown = () => {
    timeoutRef.current = setTimeout(() => {
      setEasterEggActive(true);
      setTimeout(() => setEasterEggActive(false), 2000);
    }, 1500);
  };

  const handlePointerUp = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <article
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded border bg-card transition-colors",
        easterEggActive ? "border-amber-600/50" : "border-border hover:border-foreground/30",
        className
      )}
    >
      <div className="relative aspect-[16/9] w-full border-b border-border bg-background">
          <Image
            src={project.thumbnail_url || "/placeholder-project.svg"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      <div className="p-5 flex-1 flex flex-col">
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
                className="group/live text-muted-foreground transition-colors hover:text-foreground relative"
              >
                <ExternalLinkIcon className="size-4" />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-max opacity-0 transition-opacity delay-500 group-hover/live:opacity-100 rounded border border-border bg-background px-2 py-1 font-mono text-[10px]">
                  optimistically labeled
                </span>
              </Link>
            )}
          </div>
        </div>
        
        <div className="mt-auto">
          {project.tags && project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          )}
          {easterEggActive && (
            <p className="mt-4 text-xs font-mono text-amber-600/80 animate-in fade-in duration-300">
              good taste
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
