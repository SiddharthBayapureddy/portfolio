"use client";

import { cn } from "@/lib/utils";

type TagFilterProps = {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
};

export function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onTagChange(null)}
        className={cn(
          "rounded border px-2.5 py-1 font-mono text-xs transition-colors",
          activeTag === null
            ? "border-foreground text-foreground"
            : "border-border text-muted-foreground hover:text-foreground"
        )}
      >
        all
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onTagChange(tag === activeTag ? null : tag)}
          className={cn(
            "rounded border px-2.5 py-1 font-mono text-xs transition-colors",
            activeTag === tag
              ? "border-foreground text-foreground"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
