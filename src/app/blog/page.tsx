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

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <AnimatedSection>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Blog
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Notes from building things, mostly for my future self.
        </p>
      </AnimatedSection>
      <div className="mt-12">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
