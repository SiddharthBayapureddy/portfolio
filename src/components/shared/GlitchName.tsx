"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function GlitchName({ text, className }: { text: string; className?: string }) {
  const [clickCount, setClickCount] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3 && !isGlitching) {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
        setClickCount(0); // reset
      }, 1000);
    } else if (newCount > 3) {
      setClickCount(1); // reset cycle
    }
  };

  return (
    <span 
      onClick={handleClick}
      className={cn("hero-name cursor-default select-none", isGlitching && "glitch-active", className)}
    >
      {text}
    </span>
  );
}
