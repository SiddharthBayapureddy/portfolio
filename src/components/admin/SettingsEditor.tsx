"use client";

import { useActionState } from "react";
import { saveSettings } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SettingsEditor({ settings }: { settings: Record<string, string> }) {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        await saveSettings(formData);
        return { success: true };
      } catch (err: any) {
        return { error: err.message };
      }
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Homepage Settings</h2>
        <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save Settings"}</Button>
      </div>
      
      {state?.error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{state.error}</div>}
      {state?.success && <div className="bg-green-500/10 text-green-500 p-3 rounded-md text-sm">Settings saved successfully!</div>}
      
      <div className="space-y-2">
        <Label htmlFor="hero_name">Hero Name (use newlines for line breaks)</Label>
        <Textarea id="hero_name" name="hero_name" defaultValue={settings.hero_name || "Siddharth\nBayapureddy"} rows={2} className="font-mono text-sm" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="hero_tagline">Hero Tagline (Glitch Text)</Label>
        <Textarea id="hero_tagline" name="hero_tagline" defaultValue={settings.hero_tagline || "CS undergrad at BITS Pilani · MLOps, LLMs, Agentic Systems\nMaking models production-ready."} rows={2} className="font-mono text-sm" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hero_description">Hero Description</Label>
        <Textarea id="hero_description" name="hero_description" defaultValue={settings.hero_description || "CS undergrad at BITS Pilani · MLOps, LLMs, Agentic Systems\nMaking models production-ready."} rows={3} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="about_text">About Me Text (Shows below Hero)</Label>
        <Textarea id="about_text" name="about_text" defaultValue={settings.about_text || "I'm a computer science undergraduate specializing in AI and distributed systems.\nI build resilient backends and scalable machine learning pipelines, bringing research closer to production."} rows={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="about_page_bio">About Page Main Bio</Label>
        <Textarea id="about_page_bio" name="about_page_bio" defaultValue={settings.about_page_bio || "I'm Siddharth Bayapureddy, a CS third-year at BITS Pilani, Hyderabad.\nI build at the intersection of artificial intelligence, machine learning, and real-world problems — turning messy ideas into working software.\n\nWhen I'm not writing code or exploring new ML architectures, I'm usually participating in ACM BPHC initiatives or finding ways to make complex systems intuitive and fast."} rows={5} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="more_about_me">More About Me (Hobbies, interests, etc.)</Label>
        <Textarea id="more_about_me" name="more_about_me" defaultValue={settings.more_about_me || "I watch a lot of movies and TV shows. I'm currently learning German on Duolingo, and I'm very fond of puzzles and strategic games."} rows={4} />
      </div>
    </form>
  );
}
