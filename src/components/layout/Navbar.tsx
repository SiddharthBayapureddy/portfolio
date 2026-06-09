"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, useRef } from "react";
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
  const [, setLogoClicks] = useState(0);
  const clickTimeout = useRef<NodeJS.Timeout>(null);

  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      const newCount = prev + 1;
      if (newCount === 5) {
        window.dispatchEvent(new CustomEvent("trigger-supernova"));
        return 0; // reset
      }
      return newCount;
    });

    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => setLogoClicks(0), 1000);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-[#0a0a0a]/80 backdrop-blur-sm transition-all duration-300">
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

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

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
      </nav>
    </header>
  );
}
