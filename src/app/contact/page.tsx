import { createMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${SITE.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
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
    </div>
  );
}
