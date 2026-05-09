import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOrderByNumber } from "@/actions/order.actions";
import OrderDetailView from "@/components/store/OrderDetailView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order ${id}`,
    description: `View details for order ${id}`,
  };
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderByNumber(id.toUpperCase());
  if (!order) notFound();

  return <OrderDetailView order={order} />;
}
