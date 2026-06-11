import { AnimatedSection } from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSummary({ settings }: { settings?: Record<string, string> }) {
  const aboutText = settings?.about_text || "I'm a computer science undergraduate specializing in AI and distributed systems.\nI build resilient backends and scalable machine learning pipelines, bringing research closer to production.";

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <AnimatedSection>
          <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            About
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg whitespace-pre-line">
            {aboutText}
          </p>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-muted-foreground"
            >
              Read more <ArrowRight className="size-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
