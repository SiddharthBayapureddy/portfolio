import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex w-full min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-70">
        <Loader2 className="size-8 animate-spin" />
        <p className="text-sm font-mono animate-pulse">Loading module...</p>
      </div>
    </div>
  );
}
