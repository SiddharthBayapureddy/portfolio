"use client";

import { useEffect } from "react";

export function WittyConsole() {
  useEffect(() => {
    console.log(
      "%c🚀 Welcome to the Source Code!",
      "color: #3b82f6; font-size: 20px; font-weight: bold; font-family: monospace;"
    );
    console.log(
      "%cCuriosity killed the cat, but it built the web. Feel free to poke around!",
      "color: #6b7280; font-size: 12px; font-family: monospace;"
    );
    console.log(
      "%c(P.S. This site was 90% vibecoded until the tokens ran out.)",
      "color: #9ca3af; font-size: 10px; font-style: italic; font-family: monospace;"
    );
  }, []);

  return null;
}
