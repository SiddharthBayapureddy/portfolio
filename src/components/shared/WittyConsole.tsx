"use client";

import { useEffect } from "react";

export function WittyConsole() {
  useEffect(() => {
    console.log("%c Hi.", "font-size: 32px; font-weight: bold; color: #ededed;");
    console.log("%c You opened DevTools on a developer's portfolio. Bold move.", "font-size: 14px; color: #888;");
    console.log("%c If you're recruiting: siddharthbayapureddy@gmail.com", "font-size: 14px; color: #ededed;");
    console.log("%c If you're just curious: same email, different subject line.", "font-size: 12px; color: #555;");
  }, []);

  return null;
}
