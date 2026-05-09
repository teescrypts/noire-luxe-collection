import { getAllBlogPosts } from "@/actions/blog.actions";
import DashboardBlog from "@/components/dashboard/DashboardBlog";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return <DashboardBlog initialPosts={posts} />;
}
