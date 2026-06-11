import { createStaticClient } from "@/lib/supabase/static";
import type { Post, Project, Experience, Skill } from "@/lib/types";

export async function getProjects(): Promise<Project[]> {
  const supabase = createStaticClient();
  
  if (!supabase) {
    console.error("Supabase client could not be initialized. Check environment variables.");
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch projects from Supabase:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getPinnedProjects(limit = 3): Promise<Project[]> {
  const supabase = createStaticClient();
  
  if (!supabase) {
    console.error("Supabase client could not be initialized. Check environment variables.");
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("pinned", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch pinned projects from Supabase:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getPosts(): Promise<Post[]> {
  const supabase = createStaticClient();
  if (!supabase) {
    console.error("Supabase client could not be initialized.");
    return [];
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch posts from Supabase:", error.message);
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
    .eq("slug", decodeURIComponent(slug))
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error(`Failed to fetch post "${slug}" from Supabase:`, error.message);
    return null;
  }

  return data;
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch experiences from Supabase:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getPinnedExperiences(limit = 3): Promise<Experience[]> {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("published", true)
    .eq("pinned", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch pinned experiences from Supabase:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Failed to fetch skills from Supabase:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getSettings(): Promise<Record<string, string>> {
  const supabase = createStaticClient();
  if (!supabase) return {};

  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) {
    console.error("Failed to fetch settings from Supabase:", error.message);
    return {};
  }

  const settings: Record<string, string> = {};
  data?.forEach((row) => {
    settings[row.key] = row.value;
  });
  return settings;
}
