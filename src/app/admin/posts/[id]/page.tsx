import { checkAuth } from "@/app/actions/admin";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { PostEditor } from "@/components/admin/PostEditor";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAuth())) {
    redirect("/admin/login");
  }
  
  const { id } = await params;

  let post = null;
  
  if (id !== "new") {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();
      
    if (error) {
      return <div>Error loading post: {error.message}</div>;
    }
    post = data;
  }

  return (
    <div>
      <PostEditor post={post} />
    </div>
  );
}
