import { createMetadata } from "@/lib/metadata";
import { getPosts } from "@/lib/data";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PostList } from "@/components/blog/PostList";

export const metadata = createMetadata({
  title: "Blog",
  description: "Writing on software, systems, and things I learn along the way.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();
  
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <AnimatedSection>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Blog
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Notes from building things, mostly for my future self.
        </p>
      </AnimatedSection>
      
      {featuredPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-medium tracking-tight text-foreground mb-6 border-b border-border pb-2">
            Featured Posts
          </h2>
          <PostList posts={featuredPosts} />
        </div>
      )}

      <div className="mt-12">
        {featuredPosts.length > 0 && (
          <h2 className="text-xl font-medium tracking-tight text-foreground mb-6 border-b border-border pb-2">
            All Posts
          </h2>
        )}
        {regularPosts.length > 0 ? (
          <PostList posts={regularPosts} />
        ) : (
          <div className="rounded-lg border border-dashed border-border p-8 text-center mt-6">
            <p className="text-sm text-muted-foreground italic">
              Nothing here yet. I&apos;m either thinking deeply or procrastinating. Probably latter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
