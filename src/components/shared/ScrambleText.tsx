"use client";

import { useState, useEffect } from "react";

export function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isHovering) {
      interval = setInterval(() => {
        setHoverTime((prev) => prev + 100);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isHovering]);

  useEffect(() => {
    if (hoverTime >= 3000) {
      // Decode effect
      const chars = "!<>-_\\\\/[]{}—=+*^?#________";
      let iteration = 0;
      
      const scrambleInterval = setInterval(() => {
        setDisplayText((prev) => 
          prev.split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(scrambleInterval);
          setDisplayText(text);
          setHoverTime(0); // Reset after full cycle
          setIsHovering(false); // Force exit hover state until mouse moves again
        }
        
        iteration += 1 / 3; 
      }, 30);
      
      return () => clearInterval(scrambleInterval);
    }
  }, [hoverTime, text]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverTime(0);
    setDisplayText(text);
  };

  return (
    <span 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {displayText}
    </span>
  );
}

