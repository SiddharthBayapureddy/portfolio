import { deleteProject } from "@/app/actions/admin";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminProjects() {


  const supabase = createAdminClient();
  const { data: projects } = await supabase.from("projects").select("*").order("order_index", { ascending: true });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Link href="/admin/projects/new"><Button>Create New Project</Button></Link>
      </div>
      <div className="space-y-4">
        {projects?.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-lg flex items-center gap-2">
                {project.title}
                {!project.published && <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Draft</span>}
                {project.pinned && <span className="text-[10px] bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Pinned</span>}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{project.slug}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/projects/${project.id}`}><Button variant="outline" size="sm">Edit</Button></Link>
              <DeleteButton id={project.id} action={deleteProject} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
