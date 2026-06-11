"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

// A simple auth check
export async function checkAuth() {
  const cookieStore = await cookies();
  const secret = cookieStore.get("admin_secret")?.value;
  const envSecret = process.env.ADMIN_SECRET;

  if (!envSecret || secret !== envSecret) {
    return false;
  }
  return true;
}

export async function login(formData: FormData) {
  const secret = formData.get("secret") as string;
  const envSecret = process.env.ADMIN_SECRET;

  if (envSecret && secret === envSecret) {
    const cookieStore = await cookies();
    cookieStore.set("admin_secret", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    redirect("/admin");
  } else {
    return { error: "Invalid secret" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_secret");
  redirect("/admin/login");
}

export async function savePost(formData: FormData) {
  if (!(await checkAuth())) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";
  const featured = formData.get("featured") === "on";

  const supabase = createAdminClient();

  const postData = {
    title,
    slug,
    excerpt,
    content,
    published,
    featured,
    updated_at: new Date().toISOString(),
  };

  if (id && id !== "new") {
    // Update existing
    const { error } = await supabase.from("posts").update(postData).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    // Create new
    const { error } = await supabase.from("posts").insert([postData]);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePost(id: string) {
  if (!(await checkAuth())) throw new Error("Unauthorized");
  const supabase = createAdminClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/blog");
  revalidatePath("/admin");
}

export async function saveProject(formData: FormData) {
  if (!(await checkAuth())) throw new Error("Unauthorized");
  
  const id = formData.get("id") as string | null;
  const tagsString = formData.get("tags") as string;
  const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean) : [];
  
  const projectData: any = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description") || null,
    long_description: formData.get("long_description") || null,
    tags,
    github_url: formData.get("github_url") || null,
    live_url: formData.get("live_url") || null,
    pinned: formData.get("pinned") === "on",
    published: formData.get("published") === "on",
    order_index: parseInt(formData.get("order_index") as string) || 0,
  };

  const imageFile = formData.get("image_file") as File | null;
  const supabase = createAdminClient();

  // If there's an existing thumbnail_url provided as text, set it initially
  const manualThumbnail = formData.get("thumbnail_url");
  if (manualThumbnail) {
    projectData.thumbnail_url = manualThumbnail;
  }

  // If a file was uploaded, handle the upload
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${projectData.slug}-${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("project_images")
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      throw new Error("Image upload failed: " + uploadError.message);
    }

    const { data: { publicUrl } } = supabase.storage
      .from("project_images")
      .getPublicUrl(fileName);

    projectData.thumbnail_url = publicUrl;
  }

  if (id && id !== "new") {
    const { error } = await supabase.from("projects").update(projectData).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("projects").insert([projectData]);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  if (!(await checkAuth())) throw new Error("Unauthorized");
  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function saveExperience(formData: FormData) {
  if (!(await checkAuth())) throw new Error("Unauthorized");
  
  const id = formData.get("id") as string | null;
  const skillsString = formData.get("skills") as string;
  const skills = skillsString ? skillsString.split(",").map(t => t.trim()).filter(Boolean) : [];

  const expData = {
    role: formData.get("role"),
    company: formData.get("company"),
    duration: formData.get("duration"),
    description: formData.get("description") || null,
    skills,
    link: formData.get("link") || null,
    pinned: formData.get("pinned") === "on",
    published: formData.get("published") === "on",
    order_index: parseInt(formData.get("order_index") as string) || 0,
  };

  const supabase = createAdminClient();
  if (id && id !== "new") {
    const { error } = await supabase.from("experiences").update(expData).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("experiences").insert([expData]);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/experience");
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function deleteExperience(id: string) {
  if (!(await checkAuth())) throw new Error("Unauthorized");
  const supabase = createAdminClient();
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/experience");
  revalidatePath("/admin/experiences");
}

export async function saveSkill(formData: FormData) {
  if (!(await checkAuth())) throw new Error("Unauthorized");
  
  const id = formData.get("id") as string | null;
  const skillData = {
    name: formData.get("name"),
    category: formData.get("category"),
    order_index: parseInt(formData.get("order_index") as string) || 0,
  };

  const supabase = createAdminClient();
  if (id && id !== "new") {
    const { error } = await supabase.from("skills").update(skillData).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("skills").insert([skillData]);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/skills");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  if (!(await checkAuth())) throw new Error("Unauthorized");
  const supabase = createAdminClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/skills");
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

export async function saveSettings(formData: FormData) {
  if (!(await checkAuth())) throw new Error("Unauthorized");
  const supabase = createAdminClient();
  
  const settings = {
    hero_name: formData.get("hero_name")?.toString() || "",
    hero_tagline: formData.get("hero_tagline")?.toString() || "",
    hero_description: formData.get("hero_description")?.toString() || "",
    about_text: formData.get("about_text")?.toString() || "",
    about_page_bio: formData.get("about_page_bio")?.toString() || "",
    more_about_me: formData.get("more_about_me")?.toString() || "",
  };

  for (const [key, value] of Object.entries(settings)) {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value }, { onConflict: "key" });
    if (error) throw new Error(`Failed to save ${key}: ` + error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
