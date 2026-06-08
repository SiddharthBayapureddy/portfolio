import { notFound } from "next/navigation";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug } from "@/lib/data";
import { createStaticClient } from "@/lib/supabase/static";
import { estimateReadTime } from "@/lib/read-time";
import { SITE } from "@/lib/constants";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { ProgressBar } from "@/components/blog/ProgressBar";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);

  return (data ?? []).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return createMetadata({ title: "Post not found" });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt ?? undefined,
    path: `/blog/${post.slug}`,
    ogImage: `${SITE.url}/og-default.png`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readTime = post.content ? estimateReadTime(post.content) : 1;
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ProgressBar />
      <article className="mx-auto max-w-3xl px-6 py-24">
        <Link
          href="/blog"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to blog
        </Link>
        <header className="mt-8">
          <time className="font-mono text-xs text-muted-foreground">
            {date}
          </time>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {readTime} min read
          </p>
        </header>
        {post.content && (
          <div className="mt-12">
            <MarkdownContent content={post.content} />
          </div>
        )}
      </article>
    </>
  );
}
