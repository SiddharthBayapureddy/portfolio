import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function AboutSummary() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection>
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            About
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground/90 md:text-lg">
            <p>
              My work lives at the intersection of ML engineering and systems thinking. I care about the full pipeline: not just whether a model learns something interesting, but whether it can detect drift, retrain itself, fail gracefully, and explain what's happening in plain English.
            </p>
            <p className="text-muted-foreground text-sm font-mono">
              // When I'm not pushing code, I'm justifying rewatching GOT for the third time, keeping up with AI research, and aggressively recommending music to people who didn't ask.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
