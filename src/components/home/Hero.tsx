"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { SpaceAnimation } from "./SpaceAnimation";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { GlitchName } from "@/components/shared/GlitchName";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center px-6 pt-20 md:pt-0">
      <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            <GlitchName text={SITE.name} />
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 font-mono text-sm text-muted-foreground"
          >
            <ScrambleText text={SITE.tagline} />
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            CS sophomore at BITS Pilani, Hyderabad.
            <br className="hidden sm:block" />
            I build at the intersection of AI, ML, and real-world problems —
            turning messy ideas into working software.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex gap-4">
            <Button nativeButton={false} render={<Link href="/projects" />}>
              View Projects
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/contact" />}
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        <div className="relative h-64 w-full md:h-[500px]">
          <SpaceAnimation />
        </div>
      </div>
    </section>
  );
}
