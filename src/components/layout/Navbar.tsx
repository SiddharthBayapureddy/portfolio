"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
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
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm text-muted-foreground transition-colors hover:text-foreground",
        isActive && "text-foreground"
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

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm text-foreground transition-colors hover:text-muted-foreground"
        >
          SB
        </Link>

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
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle className="font-mono text-sm">{SITE.name}</SheetTitle>
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
              <li>
                <a
                  href={SITE.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Resume
                </a>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
