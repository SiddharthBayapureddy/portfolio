'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE, SOCIAL } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ScrambleText } from '@/components/shared/ScrambleText';
import { GlitchName } from '@/components/shared/GlitchName';
import { GithubIcon, LinkedinIcon } from '@/components/shared/Icons';

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 1, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
};

export function Hero({ settings }: { settings?: Record<string, string> }) {
  const heroName = settings?.hero_name || "Siddharth\nBayapureddy";
  const heroTagline = settings?.hero_tagline || SITE.tagline;
  const heroDescription = settings?.hero_description || "CS undergrad at BITS Pilani · MLOps, LLMs, Agentic Systems\nMaking models production-ready.";

  return (
    <section className="relative flex min-h-[500px] items-center justify-center md:min-h-[calc(100vh-3.5rem)]">
      {/* Hero content */}
      <div className="relative z-10 flex w-full flex-col md:flex-row md:items-center">
        <div className="flex w-full justify-center px-6 py-20 md:w-1/2 md:justify-end md:py-0 lg:px-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="w-full max-w-xl md:pr-12 lg:pr-20"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <GlitchName
                text={
                  <>
                    {heroName.split("\n").map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </>
                }
              />
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 font-mono text-sm text-foreground sm:text-base font-semibold whitespace-pre-line"
            >
              <ScrambleText text={heroTagline} />
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg whitespace-pre-line"
            >
              {heroDescription}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-8"
            >
              <div className="flex flex-wrap gap-4">
                <Button nativeButton={false} size="lg" render={<Link href="/projects" />}>
                  View Projects
                </Button>
                <Button
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  render={<Link href="/contact" />}
                >
                  Contact Me
                </Button>
              </div>
              <div className="flex items-center gap-6 px-2">
                <Link
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground dark:hover:text-white"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="size-6" />
                </Link>
                <Link
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-[#0A66C2]"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="size-6" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
