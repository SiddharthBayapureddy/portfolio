import type { Post } from "@/lib/types";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PostCard } from "./PostCard";

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No posts published yet.</p>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((post, i) => (
        <AnimatedSection key={post.id} delay={i * 0.05}>
          <PostCard post={post} />
        </AnimatedSection>
      ))}
    </div>
  );
}
