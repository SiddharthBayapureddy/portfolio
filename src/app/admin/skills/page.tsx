import { checkAuth, deleteSkill } from "@/app/actions/admin";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminSkills() {
  if (!(await checkAuth())) redirect("/admin/login");

  const supabase = createAdminClient();
  const { data: skills } = await supabase.from("skills").select("*").order("order_index", { ascending: true });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <Link href="/admin/skills/new"><Button>Add Skill</Button></Link>
      </div>
      <div className="space-y-4">
        {skills?.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-lg">{skill.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{skill.category}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/skills/${skill.id}`}><Button variant="outline" size="sm">Edit</Button></Link>
              <DeleteButton id={skill.id} action={deleteSkill} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
