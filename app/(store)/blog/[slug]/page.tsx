"use client"


import { notFound } from "next/navigation";
import { getPostBySlug, blogPosts } from "@/data/blog";
import BlogPostView from "@/components/store/BlogPostView";

// export function generateStaticParams() {
//   return blogPosts.map((p) => ({ slug: p.slug }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const post = getPostBySlug(slug);
//   if (!post) return {};
//   return {
//     title: post.title,
//     description: post.excerpt,
//   };
// }

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  return <BlogPostView post={post} related={related} />;
}
