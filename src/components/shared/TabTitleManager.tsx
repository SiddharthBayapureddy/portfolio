"use client";

import { useEffect, useRef } from "react";

export function TabTitleManager() {
  const originalTitle = useRef<string>("");
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    originalTitle.current = document.title || "Siddharth Bayapureddy";

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User leaves tab for 5+ seconds
        timeoutRef.current = setTimeout(() => {
          document.title = "psst. still here 👀";
        }, 5000);
      } else {
        // User comes back
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Only show welcome back if the title actually changed
        if (document.title === "psst. still here 👀") {
          document.title = "welcome back :)";
          setTimeout(() => {
            document.title = originalTitle.current;
          }, 3000);
        } else {
          document.title = originalTitle.current;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return null;
}
