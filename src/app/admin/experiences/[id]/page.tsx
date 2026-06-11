
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ExperienceEditor } from "@/components/admin/ExperienceEditor";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  let experience = null;
  if (id !== "new") {
    const supabase = createAdminClient();
    const { data } = await supabase.from("experiences").select("*").eq("id", id).single();
    experience = data;
  }
  return <div><ExperienceEditor experience={experience} /></div>;
}
