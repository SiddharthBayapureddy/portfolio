import { createMetadata } from "@/lib/metadata";
import { SITE, SOCIAL } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/shared/Icons";

export const metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${SITE.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <AnimatedSection>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Contact
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Send a message — I read everything.
        </p>
      </AnimatedSection>
      <AnimatedSection className="mt-12" delay={0.05}>
        <ContactForm />
      </AnimatedSection>

      <AnimatedSection className="mt-16 border-t border-border pt-10" delay={0.1}>
        <h2 className="text-lg font-medium text-foreground">
          Elsewhere
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You can also find me on these platforms.
        </p>
        <div className="mt-8 flex gap-6">
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-6" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-6" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}
