"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sun } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useToast } from "@/components/shared/EasterEggProvider";

const BlackholeEasterEgg = dynamic(
  () => import("@/components/shared/BlackholeEasterEgg").then((m) => ({ default: m.BlackholeEasterEgg })),
  { ssr: false }
);

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const { showToast } = useToast();
  
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  let tooltip: string | undefined;
  if (label === "Resume") tooltip = "Warning: may cause unsolicited hiring attempts";
  if (label === "Blog") tooltip = "coming soon™";

  const handleClick = () => {
    if (onClick) onClick();
    if (label === "Resume") showToast("Warning: may cause unsolicited hiring attempts");
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      title={tooltip}
      className={cn(
        "relative text-sm transition-colors",
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 h-px w-full bg-foreground" />
      )}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  // Easter Egg State
  const [easterEggActive, setEasterEggActive] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    if (easterEggActive) return;

    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      // Start the 1.5s window on first click
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1500);
    }

    if (clickCountRef.current >= 5) {
      // Trigger!
      clickCountRef.current = 0;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      setEasterEggActive(true);
    }
  };

  const handleEasterEggComplete = useCallback(() => {
    setEasterEggActive(false);
  }, []);

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-[#0a0a0a]/80 backdrop-blur-sm transition-all duration-300">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="group relative">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="font-mono text-sm text-foreground transition-colors hover:text-muted-foreground select-none"
            >
              SB
            </Link>
            <div className="pointer-events-none absolute left-0 top-full mt-2 w-max opacity-0 transition-opacity delay-1000 group-hover:opacity-100">
              <span className="rounded border border-border bg-background px-2 py-1 font-mono text-[10px] text-muted-foreground">
                not the sandwich
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ul className="hidden items-center gap-8 md:flex mr-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>

            <button
              onClick={() => showToast("who even uses light mode bruh 💀")}
              className="inline-flex size-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
              aria-label="Toggle light mode"
            >
              <Sun className="size-5" />
            </button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>
            <SheetContent side="right" className="w-64 border-border bg-[#0a0a0a]">
              <SheetHeader>
                <SheetTitle className="font-mono text-sm text-left text-foreground">
                  {SITE.name}
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-8 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      href={link.href}
                      label={link.label}
                      onClick={() => setOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
          </div>
        </nav>
      </header>

      {/* Blackhole Easter Egg */}
      <BlackholeEasterEgg active={easterEggActive} onComplete={handleEasterEggComplete} />
    </>
  );
}

