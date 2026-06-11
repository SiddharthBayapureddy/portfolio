"use client";

import { useActionState } from "react";
import { savePost } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PostEditor({ post }: { post?: any }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        await savePost(formData);
        return { success: true };
      } catch (err: any) {
        return { error: err.message };
      }
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={post?.id || "new"} />
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {post ? "Edit Post" : "Create New Post"}
        </h2>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Post"}
        </Button>
      </div>

      {state?.error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            name="title" 
            defaultValue={post?.title} 
            required 
            placeholder="e.g. Building a custom CMS" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input 
            id="slug" 
            name="slug" 
            defaultValue={post?.slug} 
            required 
            placeholder="e.g. building-custom-cms" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea 
          id="excerpt" 
          name="excerpt" 
          defaultValue={post?.excerpt} 
          rows={3} 
          placeholder="A short summary of the post..." 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea 
          id="content" 
          name="content" 
          defaultValue={post?.content} 
          required 
          rows={15} 
          className="font-mono text-sm"
          placeholder="# Hello World&#10;&#10;Write your post content here in Markdown..." 
        />
      </div>

      <div className="flex gap-6 pt-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="published" 
            name="published" 
            defaultChecked={post?.published ?? true} 
            className="h-4 w-4"
          />
          <Label htmlFor="published">Published</Label>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="featured" 
            name="featured" 
            defaultChecked={post?.featured ?? false} 
            className="h-4 w-4"
          />
          <Label htmlFor="featured">Featured Post</Label>
        </div>
      </div>
    </form>
  );
}
