import CategoriesSection from "@/components/store/CategorySection";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import HeroSection from "@/components/store/Hero-section";
import Testimonials from "@/components/store/Testimonials";
import WhyChooseUs from "@/components/store/WhyChooseUs";
import BlogPreview from "@/components/store/BlogPreview";
import Newsletter from "@/components/store/Newsletter";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <WhyChooseUs />
      <Testimonials />
      <BlogPreview />
      <Newsletter />
    </div>
  );
}
