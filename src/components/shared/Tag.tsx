import { cn } from "@/lib/utils";

type TagProps = {
  label: string;
  className?: string;
};

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded border border-border bg-card px-2 py-0.5 font-mono text-xs text-muted-foreground",
        className
      )}
    >
      {label}
    </span>
  );
}
