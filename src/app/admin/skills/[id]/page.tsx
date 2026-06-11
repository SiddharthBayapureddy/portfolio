
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { SkillEditor } from "@/components/admin/SkillEditor";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  let skill = null;
  if (id !== "new") {
    const supabase = createAdminClient();
    const { data } = await supabase.from("skills").select("*").eq("id", id).single();
    skill = data;
  }
  return <div><SkillEditor skill={skill} /></div>;
}
