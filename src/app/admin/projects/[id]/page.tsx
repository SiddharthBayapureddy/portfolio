import { checkAuth } from "@/app/actions/admin";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAuth())) redirect("/admin/login");
  const { id } = await params;
  let project = null;
  if (id !== "new") {
    const supabase = createAdminClient();
    const { data } = await supabase.from("projects").select("*").eq("id", id).single();
    project = data;
  }
  return <div><ProjectEditor project={project} /></div>;
}
