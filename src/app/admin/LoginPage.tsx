"use client";

import { useActionState, useEffect, useState, startTransition } from "react";
import { login } from "@/app/actions/admin";

export default function LoginPage() {
  const [state, action] = useActionState(login, undefined);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (buffer.length > 0) {
          const formData = new FormData();
          formData.append("secret", buffer);
          startTransition(() => {
            action(formData);
          });
          setBuffer("");
        }
      } else if (e.key === "Backspace") {
        setBuffer((b) => b.slice(0, -1));
      } else if (e.key === "Escape") {
        setBuffer("");
      } else if (e.key.length === 1) {
        setBuffer((b) => b + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buffer, action]);

  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-background">
      <div className="max-w-md w-full space-y-4 text-muted-foreground font-mono text-sm opacity-70">
        <p>🚧 Module incomplete</p>
        <p>Failed to load requested page components. The route is currently disabled or under construction.</p>
        <p>Return to <a href="/" className="underline hover:text-foreground">home</a>.</p>
      </div>
    </div>
  );
}
