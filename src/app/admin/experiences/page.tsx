import { checkAuth, deleteExperience } from "@/app/actions/admin";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminExperiences() {
  if (!(await checkAuth())) redirect("/admin/login");

  const supabase = createAdminClient();
  const { data: experiences } = await supabase.from("experiences").select("*").order("order_index", { ascending: true });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Experiences</h2>
        <Link href="/admin/experiences/new"><Button>Add Experience</Button></Link>
      </div>
      <div className="space-y-4">
        {experiences?.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-lg flex items-center gap-2">
                {exp.role} at {exp.company}
                {!exp.published && <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Draft</span>}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{exp.duration}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/experiences/${exp.id}`}><Button variant="outline" size="sm">Edit</Button></Link>
              <DeleteButton id={exp.id} action={deleteExperience} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
