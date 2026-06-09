import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { FileTextIcon, DownloadIcon } from "lucide-react";

export const metadata = createMetadata({
  title: "Resume",
  description: "View or download my professional resume.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <AnimatedSection>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-foreground">
              Resume
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              The formal version of everything on this site.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<a href={SITE.resumePath} download />}
            >
              <DownloadIcon className="size-3.5" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-border bg-muted/30">
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
            <div className="flex items-center gap-2">
              <FileTextIcon className="size-4 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">
                resume.pdf
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-border" />
              <div className="size-2 rounded-full bg-border" />
              <div className="size-2 rounded-full bg-border" />
            </div>
          </div>
          <div className="aspect-[1/1.414] w-full">
            <iframe
              src={`${SITE.resumePath}#toolbar=0&navpanes=0&scrollbar=0`}
              className="size-full border-none"
              title="Resume PDF"
            />
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          PDF not loading? <a href={SITE.resumePath} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Open it directly</a>. 
          <br />
          <span className="italic mt-2 block">Resume updated regularly. Free tier tokens exhausted even more regularly.</span>
        </p>
      </AnimatedSection>
    </div>
  );
}
