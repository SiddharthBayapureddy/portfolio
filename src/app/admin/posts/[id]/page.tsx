import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { PostEditor } from "@/components/admin/PostEditor";
import { cookies } from "next/headers";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {

  
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

  const cookieStore = await cookies();
  const secret = cookieStore.get("admin_secret")?.value;

  return (
    <div>
      <PostEditor post={post} adminSecret={secret} />
    </div>
  );
}
