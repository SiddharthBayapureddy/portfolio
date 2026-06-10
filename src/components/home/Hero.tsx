'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SITE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ScrambleText } from '@/components/shared/ScrambleText';
import { GlitchName } from '@/components/shared/GlitchName';

const BlackHole = dynamic(() => import('./BlackHole'), { ssr: false });

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

export function Hero() {
  return (
    <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden md:min-h-[calc(100vh-3.5rem)]">
      {/* Black Hole Background */}
      <BlackHole />

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
                    Siddharth
                    <br />
                    Bayapureddy
                  </>
                }
              />
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 font-mono text-sm text-foreground sm:text-base font-semibold"
            >
              <ScrambleText text={SITE.tagline} />
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              CS undergrad at BITS Pilani · MLOps, LLMs, Agentic Systems
              <br className="hidden sm:block" />
              Making models production-ready.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-4"
            >
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
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
