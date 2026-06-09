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
        You&apos;ve wandered too far.
      </h2>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">
        The bugs live here. It&apos;s dark, damp, and my free tier tokens are exhausted. 
        Let&apos;s get you back to safety.
      </p>
      <div className="mt-8">
        <Button nativeButton={false} render={<Link href="/" />}>
          Return to Civilization
        </Button>
      </div>
      <p className="mt-12 font-mono text-[10px] text-muted-foreground/50">
        (Or stay here and ponder why you typed that URL. We don&apos;t judge.)
      </p>
    </div>
  );
}
