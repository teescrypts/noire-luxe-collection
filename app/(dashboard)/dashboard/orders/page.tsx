import { getAllOrders } from "@/actions/order.actions";
import DashboardOrders from "@/components/dashboard/DashboardOrders";
import { Suspense } from "react";
import DashboardLoading from "../../loading";

export const metadata = { title: "Orders" };

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const { page: pageParam, status } = await searchParams;
  const page = parseInt(pageParam ?? "1", 10);

  const data = await getAllOrders(status, page);

  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardOrders
        initialOrders={data.orders}
        totalItems={data.total}
        totalPages={data.totalPages}
        currentPage={data.page}
        itemsPerPage={data.limit}
      />
    </Suspense>
  );
}
