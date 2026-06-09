import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
