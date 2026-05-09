"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Chip,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { updateOrderStatus } from "@/actions/order.actions";
import { SerializedOrder } from "@/types/serialized";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PaginationControl from "@/components/ui/Pagination";

const statusColors: Record<string, { bg: string; color: string }> = {
  pending: { bg: "rgba(201,162,39,0.1)", color: "rgba(201,162,39,0.9)" },
  confirmed: { bg: "rgba(59,139,212,0.1)", color: "rgba(59,139,212,0.9)" },
  shipped: { bg: "rgba(100,180,100,0.1)", color: "rgba(100,180,100,0.9)" },
  delivered: { bg: "rgba(100,180,100,0.1)", color: "rgba(100,180,100,0.9)" },
  cancelled: { bg: "rgba(180,80,110,0.1)", color: "rgba(180,80,110,0.9)" },
};

const allStatuses = [
  "all",
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

// ── Order row ─────────────────────────────────────────────

function OrderRow({
  order,
  onStatusUpdate,
}: {
  order: SerializedOrder;
  onStatusUpdate: (id: string, status: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (
    newStatus: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
  ) => {
    setUpdating(true);
    setStatus(newStatus);
    await onStatusUpdate(order._id, newStatus);
    setUpdating(false);
  };

  return (
    <Box>
      {/* Main row */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr auto",
            sm: "1fr 1fr auto",
            md: "200px 1fr 120px 80px 100px",
          },
          gap: 2,
          alignItems: "center",
          cursor: "pointer",
          "&:hover": { backgroundColor: "rgba(201,162,39,0.02)" },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Customer */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.3 }}>
            {order.customer.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {order.customer.email}
          </Typography>
        </Box>

        {/* Order number + date */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.3 }}>
            {order.orderNumber}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>

        {/* Status selector — desktop */}
        <Box
          sx={{ display: { xs: "none", md: "block" } }}
          onClick={(e) => e.stopPropagation()}
        >
          <FormControl size="small" fullWidth disabled={updating}>
            <Select
              value={status}
              onChange={(e) =>
                handleStatusChange(
                  e.target.value as
                    | "pending"
                    | "confirmed"
                    | "shipped"
                    | "delivered"
                    | "cancelled",
                )
              }
              sx={{
                fontSize: "0.75rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: statusColors[status].color,
                },
                "& .MuiSelect-select": {
                  color: statusColors[status].color,
                  fontWeight: 600,
                  py: 0.8,
                },
              }}
            >
              {allStatuses
                .filter((s) => s !== "all")
                .map((s) => (
                  <MenuItem key={s} value={s} sx={{ fontSize: "0.8rem" }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        {/* Total */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            ${order.total}
          </Typography>
        </Box>

        {/* Expand + mobile chip */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Chip
            label={status}
            size="small"
            sx={{
              display: { xs: "flex", md: "none" },
              backgroundColor: statusColors[status].bg,
              color: statusColors[status].color,
              fontWeight: 600,
              fontSize: "0.62rem",
              textTransform: "capitalize",
              borderRadius: 1,
            }}
          />
          <IconButton size="small">
            {expanded ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>

      {/* Expanded detail */}
      <Collapse in={expanded}>
        <Box
          sx={{
            mx: 3,
            mb: 2,
            p: 3,
            borderRadius: 2,
            backgroundColor: "rgba(201,162,39,0.03)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
              gap: 3,
              mb: 3,
            }}
          >
            {/* Contact */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.15em",
                  color: "text.secondary",
                  display: "block",
                  mb: 1,
                }}
              >
                Contact
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {order.customer.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                {order.customer.email}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {order.customer.phone}
              </Typography>
            </Box>

            {/* Fulfillment */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.15em",
                  color: "text.secondary",
                  display: "block",
                  mb: 1,
                }}
              >
                Fulfillment
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {order.type === "delivery" ? (
                  <LocalShippingOutlinedIcon
                    sx={{ fontSize: "1rem", color: "primary.main" }}
                  />
                ) : (
                  <StorefrontOutlinedIcon
                    sx={{ fontSize: "1rem", color: "primary.main" }}
                  />
                )}
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, textTransform: "capitalize" }}
                >
                  {order.type}
                </Typography>
              </Box>
              {order.shippingAddress && (
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
                >
                  {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} {order.shippingAddress.zip}
                </Typography>
              )}
            </Box>

            {/* Payment */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.15em",
                  color: "text.secondary",
                  display: "block",
                  mb: 1,
                }}
              >
                Payment
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                ${order.total}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                Ref: {order.paymentRef}
              </Typography>
            </Box>
          </Box>

          {/* Items */}
          <Typography
            variant="overline"
            sx={{
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              color: "text.secondary",
              display: "block",
              mb: 1.5,
            }}
          >
            Items Ordered
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {order.items.map((item: any, i: number) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  borderRadius: 1,
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {item.length} · Qty: {item.quantity}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  ${item.price * item.quantity}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Mobile status update */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              gap: 2,
              mt: 3,
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Update status:
            </Typography>
            <FormControl
              size="small"
              sx={{ minWidth: 140 }}
              disabled={updating}
            >
              <Select
                value={status}
                onChange={(e) =>
                  handleStatusChange(
                    e.target.value as
                      | "pending"
                      | "confirmed"
                      | "shipped"
                      | "delivered"
                      | "cancelled",
                  )
                }
                sx={{ fontSize: "0.8rem" }}
              >
                {allStatuses
                  .filter((s) => s !== "all")
                  .map((s) => (
                    <MenuItem key={s} value={s} sx={{ fontSize: "0.8rem" }}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Collapse>

      <Divider />
    </Box>
  );
}

// ── Main component ────────────────────────────────────────

export default function DashboardOrders({
  initialOrders,
  totalItems,
  totalPages,
  currentPage,
  itemsPerPage,
}: {
  initialOrders: SerializedOrder[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState<SerializedOrder[]>(initialOrders);
  const [search, setSearch] = useState("");

  const currentStatus = searchParams.get("status") ?? "all";

  // Sync when server sends new page data
  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  // ── Handlers ────────────────────────────────────────────

  // Changes the STATUS FILTER in the URL → triggers server refetch
  const handleFilterChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", newStatus);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Changes a SINGLE ORDER's status → updates local state only
  const handleOrderStatusUpdate = async (id: string, status: string) => {
    try {
      const validStatus = status as SerializedOrder["status"];
      await updateOrderStatus(id, validStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: validStatus } : o)),
      );
    } catch (error) {
      console.error("Update order status error:", error);
    }
  };

  // Changes the PAGE in the URL → triggers server refetch
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // ── Filter locally by search only ───────────────────────
  const filtered = orders.filter(
    (o) =>
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box>
      {/* Header */}
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
          Manage and track
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
          }}
        >
          Orders
        </Typography>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search by name, email or order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            flex: 1,
            minWidth: 220,
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <SearchIcon
                  sx={{ fontSize: "1rem", color: "text.secondary", mr: 1 }}
                />
              ),
            },
          }}
        />

        {/* Status filter — drives URL */}
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={currentStatus}
            label="Status"
            onChange={(e) => handleFilterChange(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            {allStatuses.map((s) => (
              <MenuItem key={s} value={s} sx={{ fontSize: "0.85rem" }}>
                {s === "all"
                  ? "All Orders"
                  : s.charAt(0).toUpperCase() + s.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {filtered.length} {filtered.length === 1 ? "order" : "orders"}
        </Typography>
      </Box>

      {/* Orders table */}
      <Card
        sx={{
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: "200px 1fr 120px 80px 100px",
            gap: 2,
            px: 3,
            py: 1.5,
            backgroundColor: "rgba(201,162,39,0.04)",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {["Customer", "Order", "Status", "Total", ""].map((h) => (
            <Typography
              key={h}
              variant="overline"
              sx={{
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                color: "text.secondary",
              }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {/* Rows */}
        {filtered.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              No orders found
            </Typography>
          </Box>
        ) : (
          filtered.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
              onStatusUpdate={handleOrderStatusUpdate}
            />
          ))
        )}
      </Card>

      {/* Pagination */}
      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        label="orders"
      />
    </Box>
  );
}
