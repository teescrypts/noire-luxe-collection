import CategoriesSection from "@/components/store/CategorySection";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import HeroSection from "@/components/store/Hero-section";
import Testimonials from "@/components/store/Testimonials";
import WhyChooseUs from "@/components/store/WhyChooseUs";
import BlogPreview from "@/components/store/BlogPreview";
import Newsletter from "@/components/store/Newsletter";
import { getFeaturedProducts } from "@/actions/product.actions";
import { getBlogPosts } from "@/actions/blog.actions";

export default async function HomePage() {
  const [featuredProducts, blogPosts] = await Promise.all([
    getFeaturedProducts(),
    getBlogPosts(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <CategoriesSection />
      <WhyChooseUs />
      <Testimonials />
      <BlogPreview posts={blogPosts.slice(0, 3)} />
      <Newsletter />
    </>
  );
}
