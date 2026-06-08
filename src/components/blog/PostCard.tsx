import Link from "next/link";
import type { Post } from "@/lib/types";
import { estimateReadTime } from "@/lib/read-time";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const readTime = post.content ? estimateReadTime(post.content) : 1;
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-muted-foreground/30"
    >
      <time className="font-mono text-xs text-muted-foreground">{date}</time>
      <h3 className="mt-2 text-base font-medium text-foreground group-hover:text-foreground">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      )}
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        {readTime} min read
      </p>
    </Link>
  );
}
