"use server";

import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";
import { getCurrentUser } from "@/lib/auth";
import { validateBlogPost } from "@/lib/validation";

function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  return user;
}

// ── Public actions ────────────────────────────────────────

export async function getBlogPosts(category?: string) {
  await connectDB();

  const query: Record<string, any> = { published: true };
  if (category && category !== "All") {
    query.category = category;
  }

  const posts = await BlogPost.find(query).sort({ publishedAt: -1 }).lean();

  return serialize(posts);
}

export async function getFeaturedPost() {
  await connectDB();

  const post = await BlogPost.findOne({ published: true })
    .sort({ publishedAt: -1 })
    .lean();

  if (!post) return null;
  return serialize(post);
}

export async function getBlogPostBySlug(slug: string) {
  await connectDB();

  const post = await BlogPost.findOne({ slug, published: true }).lean();

  if (!post) return null;
  return serialize(post);
}

export async function getRelatedPosts(slug: string, category: string) {
  await connectDB();

  const posts = await BlogPost.find({
    slug: { $ne: slug },
    category,
    published: true,
  })
    .limit(2)
    .lean();

  return serialize(posts);
}

export async function getBlogCategories() {
  await connectDB();

  const categories = await BlogPost.distinct("category", { published: true });
  return ["All", ...categories];
}

// ── Admin actions ─────────────────────────────────────────

export async function getAllBlogPosts() {
  await requireAdmin();
  await connectDB();

  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();

  return serialize(posts);
}

export async function createBlogPost(data: {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readTime: number;
  published?: boolean;
}) {
  await requireAdmin();

  const { valid, errors } = validateBlogPost(data);
  if (!valid) throw new Error(errors[0].message);

  await connectDB();

  const slug = slugify(data.title, { lower: true, strict: true });
  const existing = await BlogPost.findOne({ slug });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const post = await BlogPost.create({
    ...data,
    slug: finalSlug,
    published: data.published ?? true,
  });

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/dashboard/blog");

  return serialize(post);
}

export async function updateBlogPost(
  id: string,
  data: Partial<{
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    tags: string[];
    readTime: number;
    published: boolean;
  }>,
) {
  await requireAdmin();

  if (data.title || data.excerpt || data.content) {
    const { valid, errors } = validateBlogPost({
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      content: data.content ?? "",
    });
    if (!valid) throw new Error(errors[0].message);
  }

  await connectDB();

  if (data.title) {
    const slug = slugify(data.title, { lower: true, strict: true });
    const existing = await BlogPost.findOne({ slug, _id: { $ne: id } });
    (data as any).slug = existing ? `${slug}-${Date.now()}` : slug;
  }

  const post = await BlogPost.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true },
  ).lean();

  if (!post) throw new Error("Post not found");

  revalidatePath("/blog");
  revalidatePath(`/blog/${(post as any).slug}`);
  revalidatePath("/");
  revalidatePath("/dashboard/blog");

  return serialize(post);
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  await connectDB();

  const post = await BlogPost.findByIdAndDelete(id).lean();
  if (!post) throw new Error("Post not found");

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/dashboard/blog");

  return { success: true };
}

export async function togglePublished(id: string, published: boolean) {
  await requireAdmin();
  await connectDB();

  const post = await BlogPost.findByIdAndUpdate(
    id,
    { $set: { published } },
    { new: true },
  ).lean();

  if (!post) throw new Error("Post not found");

  revalidatePath("/blog");
  revalidatePath("/dashboard/blog");

  return serialize(post);
}

export async function searchBlogPosts(query: string) {
  await connectDB();

  const posts = await BlogPost.find({
    published: true,
    $or: [
      { title:    { $regex: query, $options: 'i' } },
      { excerpt:  { $regex: query, $options: 'i' } },
      { content:  { $regex: query, $options: 'i' } },
      { category: { $regex: query, $options: 'i' } },
      { tags:     { $in: [new RegExp(query, 'i')] } },
    ],
  })
    .limit(5)
    .lean();

  return serialize(posts);
}
