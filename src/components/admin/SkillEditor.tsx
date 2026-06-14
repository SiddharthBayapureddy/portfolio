"use client";

import { useActionState } from "react";
import { saveSkill } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SkillEditor({ skill }: { skill?: any }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        await saveSkill(formData);
        return { success: true };
      } catch (err: any) {
        if (err?.message === "NEXT_REDIRECT") throw err;
        return { error: err.message };
      }
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6 max-w-md">
      <input type="hidden" name="id" value={skill?.id || "new"} />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{skill ? "Edit Skill" : "Add Skill"}</h2>
        <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</Button>
      </div>
      {state?.error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{state.error}</div>}
      <div className="space-y-2">
        <Label htmlFor="name">Skill Name</Label>
        <Input id="name" name="name" defaultValue={skill?.name} required placeholder="e.g. React" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" defaultValue={skill?.category} required placeholder="e.g. Frontend" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="order_index">Order Index</Label>
        <Input id="order_index" name="order_index" type="number" defaultValue={skill?.order_index || 0} />
      </div>
    </form>
  );
}
