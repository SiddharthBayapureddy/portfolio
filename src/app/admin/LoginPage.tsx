"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await login(formData);
      return res || null;
    },
    null
  );

  return (
    <div 
      className="min-h-[80vh] flex flex-col items-center justify-center cursor-default select-none"
      onClick={() => document.getElementById('secret')?.focus()}
    >
      <div className="text-center space-y-4">
        <h1 className="text-xl font-mono text-muted-foreground">Admin System Configuration</h1>
        <p className="text-xs text-muted-foreground/60 font-mono">Status: Offline / Maintenance Mode</p>
        <p className="text-xs text-muted-foreground/60 font-mono animate-pulse">ERR_CONNECTION_REFUSED: Backend services are currently unavailable.</p>
      </div>

      <form action={formAction}>
        <input 
          id="secret"
          name="secret" 
          type="password" 
          autoFocus 
          className="opacity-0 absolute -z-50 w-px h-px overflow-hidden cursor-default"
          autoComplete="off"
        />
        <button type="submit" className="hidden" disabled={isPending} />
      </form>

      {state?.error && (
        <p className="fixed bottom-4 right-4 text-[10px] font-mono text-destructive/40">
          sys_err: auth_failure
        </p>
      )}
    </div>
  );
}
