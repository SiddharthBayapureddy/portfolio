
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { cookies } from "next/headers";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  let project = null;
  if (id !== "new") {
    const supabase = createAdminClient();
    const { data } = await supabase.from("projects").select("*").eq("id", id).single();
    project = data;
  }
  
  const cookieStore = await cookies();
  const secret = cookieStore.get("admin_secret")?.value;
  
  return <div><ProjectEditor project={project} adminSecret={secret} /></div>;
}
