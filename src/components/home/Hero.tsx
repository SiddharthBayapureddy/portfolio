"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { ABOUT } from "@/lib/portfolio-content";
import { Button } from "@/components/ui/button";
import { HeroAnimation } from "./HeroAnimation";

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
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col justify-center px-6">
      <HeroAnimation />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-3xl"
      >
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-medium tracking-tight text-foreground md:text-5xl"
        >
          {SITE.name}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-3 font-mono text-sm text-muted-foreground"
        >
          {SITE.tagline}
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          {ABOUT.bio}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex gap-3">
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
    </section>
  );
}
