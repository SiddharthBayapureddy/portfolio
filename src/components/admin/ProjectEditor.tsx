"use client";

import { useActionState } from "react";
import { isRedirectError } from "next/navigation";
import { saveProject } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProjectEditor({ project }: { project?: any }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        await saveProject(formData);
        return { success: true };
      } catch (err: any) {
        if (isRedirectError(err)) throw err;
        return { error: err.message };
      }
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={project?.id || "new"} />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{project ? "Edit Project" : "Create Project"}</h2>
        <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Project"}</Button>
      </div>
      {state?.error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{state.error}</div>}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" name="title" defaultValue={project?.title} required /></div>
        <div className="space-y-2"><Label htmlFor="slug">Slug</Label><Input id="slug" name="slug" defaultValue={project?.slug} required /></div>
      </div>
      <div className="space-y-2"><Label htmlFor="description">Short Description</Label><Textarea id="description" name="description" defaultValue={project?.description} rows={2} /></div>
      <div className="space-y-2"><Label htmlFor="long_description">Long Description (Markdown)</Label><Textarea id="long_description" name="long_description" defaultValue={project?.long_description} rows={6} className="font-mono text-sm" /></div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="github_url">GitHub URL</Label><Input id="github_url" name="github_url" defaultValue={project?.github_url} /></div>
        <div className="space-y-2"><Label htmlFor="live_url">Live URL</Label><Input id="live_url" name="live_url" defaultValue={project?.live_url} /></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="thumbnail_url">Thumbnail URL (or upload below)</Label><Input id="thumbnail_url" name="thumbnail_url" defaultValue={project?.thumbnail_url} /></div>
        <div className="space-y-2"><Label htmlFor="image_file">Upload Thumbnail Image</Label><Input id="image_file" name="image_file" type="file" accept="image/*" className="cursor-pointer" /></div>
      </div>
      <div className="space-y-2"><Label htmlFor="order_index">Order Index</Label><Input id="order_index" name="order_index" type="number" defaultValue={project?.order_index || 0} /></div>
      <div className="space-y-2"><Label htmlFor="tags">Tags (comma separated)</Label><Input id="tags" name="tags" defaultValue={project?.tags?.join(", ")} placeholder="React, Next.js, Supabase" /></div>
      <div className="flex gap-6 pt-4">
        <div className="flex items-center gap-2"><input type="checkbox" id="published" name="published" defaultChecked={project ? project.published : true} className="h-4 w-4"/><Label htmlFor="published">Published</Label></div>
        <div className="flex items-center gap-2"><input type="checkbox" id="pinned" name="pinned" defaultChecked={project ? project.pinned : false} className="h-4 w-4"/><Label htmlFor="pinned">Pinned (shows on home)</Label></div>
      </div>
    </form>
  );
}
