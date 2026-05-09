import { getOrderStats, getAllOrders } from '@/actions/order.actions';
import { getProducts, getLowStockProducts } from '@/actions/product.actions';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const [stats, ordersData, productsData, lowStock] = await Promise.all([
    getOrderStats(),
    getAllOrders(undefined, 1, 4),
    getProducts(undefined, 1, 100),
    getLowStockProducts(),
  ]);

  return (
    <DashboardOverview
      stats={stats}
      recentOrders={ordersData.orders}
      totalProducts={productsData.total}
      lowStock={lowStock}
    />
  );
}