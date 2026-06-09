"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function WellActuallyPage() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center bg-background">
      <div className="max-w-md space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          There&apos;s no job here. No prize. No secret.
        </p>
        <p>
          Just the fact that you followed a trail on a stranger&apos;s portfolio 
          at {new Date().toLocaleTimeString()}.
        </p>
        <p>
          That&apos;s either impressive or concerning. Possibly both.
        </p>
        <p className="pt-4">— Siddharth</p>

        <div className="pt-12">
          {!showEmail ? (
            <Button 
              variant="outline" 
              onClick={() => setShowEmail(true)}
              className="text-xs font-mono"
            >
              okay fine, here&apos;s my email →
            </Button>
          ) : (
            <p className="font-mono text-xs text-foreground animate-in fade-in">
              siddharthbayapureddy@gmail.com
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
