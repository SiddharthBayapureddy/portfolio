"use client";

import { useActionState } from "react";
import { saveExperience } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ExperienceEditor({ experience }: { experience?: any }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        const res = await saveExperience(formData);
        if (res?.error) return { error: res.error };
        return { success: true };
      } catch (err: any) {
        if (err?.message === "NEXT_REDIRECT") throw err;
        return { error: err.message };
      }
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={experience?.id || "new"} />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{experience ? "Edit Experience" : "Add Experience"}</h2>
        <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save"}</Button>
      </div>
      {state?.error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{state.error}</div>}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="role">Role</Label><Input id="role" name="role" defaultValue={experience?.role} required /></div>
        <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" name="company" defaultValue={experience?.company} required /></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="duration">Duration</Label><Input id="duration" name="duration" defaultValue={experience?.duration} required placeholder="Jan 2023 - Present" /></div>
        <div className="space-y-2"><Label htmlFor="link">Company Link</Label><Input id="link" name="link" defaultValue={experience?.link} /></div>
      </div>
      <div className="space-y-2"><Label htmlFor="description">Description (Markdown)</Label><Textarea id="description" name="description" defaultValue={experience?.description} rows={4} className="font-mono text-sm" /></div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="skills">Skills (comma separated)</Label><Input id="skills" name="skills" defaultValue={experience?.skills?.join(", ")} /></div>
        <div className="space-y-2"><Label htmlFor="order_index">Order Index</Label><Input id="order_index" name="order_index" type="number" defaultValue={experience?.order_index || 0} /></div>
      </div>
      <div className="flex gap-6 pt-4">
        <div className="flex items-center gap-2"><input type="checkbox" id="published" name="published" defaultChecked={experience ? experience.published : true} className="h-4 w-4"/><Label htmlFor="published">Published</Label></div>
        <div className="flex items-center gap-2"><input type="checkbox" id="pinned" name="pinned" defaultChecked={experience ? experience.pinned : false} className="h-4 w-4"/><Label htmlFor="pinned">Pinned</Label></div>
      </div>
    </form>
  );
}
