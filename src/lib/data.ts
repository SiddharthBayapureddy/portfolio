import { createStaticClient } from "@/lib/supabase/static";
import type { Post, Project } from "@/lib/types";

export async function getProjects(): Promise<Project[]> {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getPinnedProjects(limit = 3): Promise<Project[]> {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("pinned", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch pinned projects:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getPosts(): Promise<Post[]> {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch posts:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createStaticClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Failed to fetch post:", error.message);
    return null;
  }

  return data;
}
