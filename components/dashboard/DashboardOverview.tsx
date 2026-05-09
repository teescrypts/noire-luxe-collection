"use client";

import Link from "next/link";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  SerializedOrder,
  SerializedProduct,
  OrderStats,
} from "@/types/serialized";

const statusColors: Record<string, string> = {
  pending: "rgba(201,162,39,0.9)",
  confirmed: "rgba(59,139,212,0.9)",
  shipped: "rgba(100,180,100,0.9)",
  delivered: "rgba(100,180,100,0.9)",
  cancelled: "rgba(180,80,110,0.9)",
};

export default function DashboardOverview({
  stats,
  recentOrders,
  totalProducts,
  lowStock,
}: {
  stats: OrderStats;
  recentOrders: SerializedOrder[];
  totalProducts: number;
  lowStock: SerializedProduct[];
}) {
  const statCards = [
    {
      label: "Total Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      icon: <AttachMoneyIcon />,
      color: "rgba(201,162,39,0.1)",
      iconColor: "rgba(201,162,39,0.9)",
      sub: `${stats.total} orders`,
    },
    {
      label: "Total Orders",
      value: stats.total,
      icon: <ShoppingBagOutlinedIcon />,
      color: "rgba(180,80,110,0.08)",
      iconColor: "rgba(180,80,110,0.8)",
      sub: `${stats.delivered} delivered`,
    },
    {
      label: "Pending Orders",
      value: stats.pending,
      icon: <PendingOutlinedIcon />,
      color: "rgba(201,162,39,0.08)",
      iconColor: "rgba(201,162,39,0.8)",
      sub: "Needs attention",
    },
    {
      label: "Products",
      value: totalProducts,
      icon: <InventoryOutlinedIcon />,
      color: "rgba(59,139,212,0.08)",
      iconColor: "rgba(59,139,212,0.8)",
      sub: `${lowStock.length} low stock`,
    },
  ];
  // const recentOrders = orders.slice(0, 4);
  // const lowStock = products.filter((p) => p.stockCount <= 2);

  return (
    <Box>
      {/* Welcome */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "rgba(180,80,110,0.8)",
            display: "block",
            mb: 0.5,
          }}
        >
          Good to see you
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
          }}
        >
          Here's what's happening today
        </Typography>
      </Box>

      {/* Stat cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card
              sx={{
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      backgroundColor: stat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: stat.iconColor,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <TrendingUpIcon
                    sx={{ fontSize: "1rem", color: "rgba(100,180,100,0.7)" }}
                  />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontFamily: '"Inter", sans-serif',
                    mb: 0.5,
                    fontSize: "1.8rem",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", opacity: 0.7 }}
                >
                  {stat.sub}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent orders + Low stock */}
      <Grid container spacing={3}>
        {/* Recent orders */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            sx={{
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                Recent Orders
              </Typography>
              <Button
                component={Link}
                href="/dashboard/orders"
                endIcon={<ArrowForwardIcon sx={{ fontSize: "0.85rem" }} />}
                size="small"
                sx={{
                  color: "primary.main",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                }}
              >
                View All
              </Button>
            </Box>

            <Box>
              {recentOrders.map((order, i) => (
                <Box key={order._id}>
                  <Box
                    sx={{
                      px: 3,
                      py: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      "&:hover": {
                        backgroundColor: "rgba(201,162,39,0.02)",
                      },
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 0.3 }}
                      >
                        {order.customer.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {order._id} · {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: "center" }}>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          backgroundColor: `${statusColors[order.status]}20`,
                          color: statusColors[order.status],
                          fontWeight: 600,
                          fontSize: "0.65rem",
                          letterSpacing: "0.05em",
                          textTransform: "capitalize",
                          borderRadius: 1,
                        }}
                      />
                    </Box>

                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        ${order.total}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {order.type}
                      </Typography>
                    </Box>
                  </Box>
                  {i < recentOrders.length - 1 && <Divider sx={{ mx: 3 }} />}
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Low stock */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
              height: "100%",
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                Low Stock Alert
              </Typography>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "rgba(180,80,110,0.9)",
                }}
              />
            </Box>

            <Box sx={{ p: 2 }}>
              {lowStock.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", p: 2, textAlign: "center" }}
                >
                  All products are well stocked
                </Typography>
              ) : (
                lowStock.map((product, i) => (
                  <Box key={product._id}>
                    <Box
                      sx={{
                        px: 1,
                        py: 1.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "rgba(201,162,39,0.04)",
                        },
                      }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            lineHeight: 1.3,
                          }}
                          noWrap
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {product.category}
                        </Typography>
                      </Box>
                      <Chip
                        label={
                          product.stockCount === 0
                            ? "Out of stock"
                            : `${product.stockCount} left`
                        }
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor:
                            product.stockCount === 0
                              ? "rgba(180,80,110,0.1)"
                              : "rgba(201,162,39,0.1)",
                          color:
                            product.stockCount === 0
                              ? "rgba(180,80,110,0.9)"
                              : "rgba(201,162,39,0.9)",
                          fontWeight: 700,
                          fontSize: "0.62rem",
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                    {i < lowStock.length - 1 && <Divider sx={{ my: 0.5 }} />}
                  </Box>
                ))
              )}
            </Box>

            <Box
              sx={{
                px: 3,
                pb: 3,
                pt: 1,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Button
                component={Link}
                href="/dashboard/products"
                variant="outlined"
                color="primary"
                fullWidth
                size="small"
                sx={{ fontSize: "0.75rem" }}
              >
                Manage Inventory
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
