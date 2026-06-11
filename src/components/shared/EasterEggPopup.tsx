"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useToast } from "@/components/shared/EasterEggProvider";

const EASTER_EGGS = [
  { name: "The Void", description: "Rapidly click the 'SB' logo 5 times (homepage only)." },
  { name: "Konami Code", description: "↑ ↑ ↓ ↓ ← → ← → B A. You know what to do." },
  { name: "The Matrix", description: "Type 'matrix' anywhere on the screen." },
  { name: "The Sudoers File", description: "Type 'sudo' anywhere." },
  { name: "Barrel Roll", description: "Type 'barrelroll' anywhere." },
  { name: "Chaos Mode", description: "Type 'chaos' anywhere." },
  { name: "Hold The Line", description: "Press and hold any Project Card for 1.5 seconds." },
  { name: "Light Mode", description: "Try switching to light mode." },
  { name: "The Truth", description: "Hover over the 'SB' logo for a bit." },
  { name: "Live Demo", description: "Hover over the external link icon on a project." },
  { name: "Self Written", description: "Click the copyright text in the footer." },
  { name: "The Bottom", description: "Scroll to the absolute bottom of the page and stare." },
  { name: "Resume Warning", description: "Click the Resume link in the navbar." },
];

export function EasterEggPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { showToast } = useToast();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  useEffect(() => {
    // Show the small badge after 20 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  // Matrix, BarrelRoll, Chaos Implementations
  useEffect(() => {
    const codes = {
      matrix: "matrix",
      barrel: "barrelroll",
      chaos: "chaos"
    };
    
    let matrixIdx = 0;
    let barrelIdx = 0;
    let chaosIdx = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();

      // Matrix
      if (key === codes.matrix[matrixIdx]) {
        matrixIdx++;
        if (matrixIdx === codes.matrix.length) {
          showToast("Wake up, Neo... 🐇");
          document.body.classList.toggle("matrix-mode");
          matrixIdx = 0;
        }
      } else { matrixIdx = 0; }

      // Barrel Roll
      if (key === codes.barrel[barrelIdx]) {
        barrelIdx++;
        if (barrelIdx === codes.barrel.length) {
          showToast("Do a barrel roll!");
          document.body.classList.remove("barrel-roll");
          void document.body.offsetWidth;
          document.body.classList.add("barrel-roll");
          barrelIdx = 0;
        }
      } else { barrelIdx = 0; }

      // Chaos
      if (key === codes.chaos[chaosIdx]) {
        chaosIdx++;
        if (chaosIdx === codes.chaos.length) {
          showToast("Let chaos reign.");
          const isChaos = document.body.getAttribute("data-chaos") === "true";
          document.body.setAttribute("data-chaos", isChaos ? "false" : "true");
          chaosIdx = 0;
        }
      } else { chaosIdx = 0; }

    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showToast]);

  if (!isVisible) return null;

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-in slide-in-from-bottom-10 fade-in duration-500">
      {isExpanded && (
        <div className="w-80 overflow-hidden rounded-md border border-border bg-[#0a0a0a]/95 p-4 shadow-xl backdrop-blur-md animate-in zoom-in-95 origin-bottom-right">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🥚</span>
              <h3 className="font-mono text-sm font-semibold text-foreground">Easter Eggs</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="flex flex-col gap-3">
              {EASTER_EGGS.map((egg, index) => (
                <li key={index} className="flex flex-col gap-1 border-b border-border/50 pb-2 last:border-0 last:pb-0">
                  <span className="text-xs font-medium text-foreground">{egg.name}</span>
                  <span className="text-xs text-muted-foreground">{egg.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-lg hover:bg-muted transition-colors"
        >
          <span className="text-base">🥚</span>
          <span className="font-mono">Easter Eggs</span>
        </button>
      )}
    </div>
  );
}
