import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "404 - Not Found",
  description: "You've wandered off the map.",
});

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-mono text-6xl font-bold text-muted-foreground/20">404</h1>
      <h2 className="mt-4 text-2xl font-medium tracking-tight text-foreground">
        You&apos;ve ventured further than my Git commits go.
      </h2>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">
        This page doesn&apos;t exist. Neither does my free time.
      </p>
      <div className="mt-8">
        <Button nativeButton={false} render={<Link href="/" />}>
          Take me somewhere that works
        </Button>
      </div>
    </div>
  );
}
