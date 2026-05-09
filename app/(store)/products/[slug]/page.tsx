import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/actions/product.actions";
import ProductDetail from "@/components/store/ProductDetail";
import { Metadata } from "next/types";

export async function generateStaticParams() {
  const { products } = await getProducts();
  return products.map((p: any) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      title: `${product.name} | Noire Luxe Collection`,
      description: product.description,
      images: product.images[0]
        ? [
            {
              url: product.images[0],
              width: 1200,
              height: 1200,
              alt: product.name,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
