"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function DeleteButton({ 
  id, 
  action 
}: { 
  id: string; 
  action: (id: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  const [confirmLevel, setConfirmLevel] = useState(0);

  // Automatically reset the button if they don't click within 4 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (confirmLevel > 0 && confirmLevel < 3) {
      timeout = setTimeout(() => {
        setConfirmLevel(0);
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [confirmLevel]);

  const handleDelete = () => {
    if (confirmLevel === 0) {
      setConfirmLevel(1);
    } else if (confirmLevel === 1) {
      setConfirmLevel(2);
    } else if (confirmLevel === 2) {
      setConfirmLevel(3);
      startTransition(async () => {
        try {
          await action(id);
        } catch (err) {
          console.error(err);
          setConfirmLevel(0);
        }
      });
    }
  };

  let buttonText = "Delete";
  if (isPending) buttonText = "Deleting...";
  else if (confirmLevel === 1) buttonText = "Sure?";
  else if (confirmLevel === 2) buttonText = "REALLY delete?!";

  // Dynamic styling based on danger level
  let dynamicClass = "";
  if (confirmLevel === 1) dynamicClass = "bg-orange-600 hover:bg-orange-700";
  if (confirmLevel === 2) dynamicClass = "bg-red-700 font-bold hover:bg-red-800 scale-105 transition-all";

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete} 
      disabled={isPending}
      className={dynamicClass}
    >
      {buttonText}
    </Button>
  );
}
