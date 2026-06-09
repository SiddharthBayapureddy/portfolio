"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { SITE, SOCIAL } from "@/lib/constants";
import { useToast } from "@/components/shared/EasterEggProvider";
import { GithubIcon, LinkedinIcon } from "@/components/shared/Icons";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  { href: SOCIAL.github, label: "GitHub", icon: GithubIcon },
  { href: SOCIAL.linkedin, label: "LinkedIn", icon: LinkedinIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const { showToast } = useToast();
  
  // GitHub Hover State
  const [ghHovered, setGhHovered] = useState(false);
  const ghTimeoutRef = useRef<NodeJS.Timeout>(null);

  const handleGhEnter = () => {
    ghTimeoutRef.current = setTimeout(() => {
      setGhHovered(true);
    }, 2000);
  };

  const handleGhLeave = () => {
    if (ghTimeoutRef.current) clearTimeout(ghTimeoutRef.current);
    setGhHovered(false);
  };

  // Scroll to bottom State
  const [reachedBottom, setReachedBottom] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setReachedBottom(true);
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="border-t border-border relative">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-6 py-6 text-center">
        <p 
          onClick={() => showToast("yes, I wrote that myself")}
          className="font-mono text-xs text-muted-foreground cursor-pointer select-none"
        >
          {SITE.name} · {SITE.domain} · {year}
        </p>
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onMouseEnter={label === "GitHub" ? handleGhEnter : undefined}
              onMouseLeave={label === "GitHub" ? handleGhLeave : undefined}
              className={cn(
                "text-muted-foreground transition-colors",
                label === "GitHub" && ghHovered ? "text-green-500" : "hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
            </Link>
          ))}
        </div>
      </div>
      
      {/* Scroll to bottom easter egg */}
      <div ref={bottomRef} className="absolute bottom-0 w-full h-1 pointer-events-none" />
      {reachedBottom && (
        <div className="pb-4 text-center animate-in fade-in duration-1000">
          <p className="font-mono text-[10px] text-muted-foreground/30">
            you&apos;ve reached the end. there&apos;s nothing here. go build something.
          </p>
        </div>
      )}

      {/* Goose Hunt Step 1 */}
      <p className="absolute bottom-1 right-2 text-[10px] text-muted-foreground/20 pointer-events-none select-none">
        if you&apos;re reading this, check the source
      </p>
    </footer>
  );
}
