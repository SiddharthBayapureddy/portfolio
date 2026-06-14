import { deletePost } from "@/app/actions/admin";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { cookies } from "next/headers";

export default async function AdminDashboard() {


  const supabase = createAdminClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  const cookieStore = await cookies();
  const secret = cookieStore.get("admin_secret")?.value;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Blog Posts</h2>
        <Link href="/admin/posts/new">
          <Button>Create New Post</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts?.length === 0 && (
          <p className="text-muted-foreground text-sm">No posts found. Create one!</p>
        )}
        {posts?.map((post) => (
          <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h3 className="font-medium text-lg flex items-center gap-2">
                {post.title}
                {!post.published && (
                  <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                    Draft
                  </span>
                )}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{post.slug}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/posts/${post.id}`}>
                <Button variant="outline" size="sm">Edit</Button>
              </Link>
              <DeleteButton id={post.id} action={deletePost} adminSecret={secret} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
