import { Suspense } from "react";
import { getProducts } from "@/actions/product.actions";
import DashboardProducts from "@/components/dashboard/DashboardProducts";

export const metadata = { title: "Products" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam ?? "1", 10);
  const data = await getProducts(undefined, page, 10);

  return (
    <Suspense fallback={null}>
      <DashboardProducts
        initialProducts={data.products}
        totalItems={data.total}
        totalPages={data.totalPages}
        currentPage={data.page}
        itemsPerPage={data.limit}
      />
    </Suspense>
  );
}
