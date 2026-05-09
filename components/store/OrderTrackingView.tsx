"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { getOrderByNumber } from "@/actions/order.actions";
import Link from "next/link";
import { SerializedOrder } from "@/types/serialized";

const statusColors: Record<string, { bg: string; color: string }> = {
  pending: { bg: "rgba(201,162,39,0.1)", color: "rgba(201,162,39,0.9)" },
  confirmed: { bg: "rgba(59,139,212,0.1)", color: "rgba(59,139,212,0.9)" },
  shipped: { bg: "rgba(100,180,100,0.1)", color: "rgba(100,180,100,0.9)" },
  delivered: { bg: "rgba(100,180,100,0.1)", color: "rgba(100,180,100,0.9)" },
  cancelled: { bg: "rgba(180,80,110,0.1)", color: "rgba(180,80,110,0.9)" },
};

const deliverySteps = [
  {
    key: "pending",
    label: "Order Placed",
    sub: "We have received your order",
    icon: <PendingOutlinedIcon />,
  },
  {
    key: "confirmed",
    label: "Order Confirmed",
    sub: "Your order is being prepared",
    icon: <InventoryOutlinedIcon />,
  },
  {
    key: "shipped",
    label: "Shipped",
    sub: "Your order is on its way",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    key: "delivered",
    label: "Delivered",
    sub: "Your order has arrived",
    icon: <CheckCircleOutlinedIcon />,
  },
];

const pickupSteps = [
  {
    key: "pending",
    label: "Order Placed",
    sub: "We have received your order",
    icon: <PendingOutlinedIcon />,
  },
  {
    key: "confirmed",
    label: "Order Confirmed",
    sub: "Your order is being prepared",
    icon: <InventoryOutlinedIcon />,
  },
  {
    key: "delivered",
    label: "Ready for Pickup",
    sub: "Your order is ready to collect",
    icon: <StorefrontOutlinedIcon />,
  },
];

const statusOrder = ["pending", "confirmed", "shipped", "delivered"];

function getStepIndex(status: string) {
  return statusOrder.indexOf(status);
}

function TrackingTimeline({ order }: { order: SerializedOrder }) {
  const steps = order.type === "pickup" ? pickupSteps : deliverySteps;
  const currentIndex = getStepIndex(order.status);

  return (
    <Box sx={{ position: "relative" }}>
      {steps.map((step, i) => {
        const stepIndex = getStepIndex(step.key);
        const isComplete = stepIndex < currentIndex;
        const isActive = stepIndex === currentIndex;
        const isPending = stepIndex > currentIndex;

        return (
          <Box
            key={step.key}
            sx={{
              display: "flex",
              gap: 3,
              position: "relative",
            }}
          >
            {/* Line + icon column */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isComplete
                    ? "rgba(100,180,100,0.12)"
                    : isActive
                      ? "rgba(201,162,39,0.12)"
                      : "rgba(0,0,0,0.04)",
                  border: "2px solid",
                  borderColor: isComplete
                    ? "rgba(100,180,100,0.5)"
                    : isActive
                      ? "primary.main"
                      : "divider",
                  color: isComplete
                    ? "rgba(100,180,100,0.9)"
                    : isActive
                      ? "primary.main"
                      : "text.secondary",
                  transition: "all 0.3s ease",
                  zIndex: 1,
                  "& svg": { fontSize: "1.2rem" },
                }}
              >
                {isComplete ? (
                  <CheckCircleOutlinedIcon />
                ) : isPending ? (
                  <RadioButtonUncheckedIcon />
                ) : (
                  step.icon
                )}
              </Box>

              {/* Connecting line */}
              {i < steps.length - 1 && (
                <Box
                  sx={{
                    width: "2px",
                    flex: 1,
                    minHeight: 40,
                    backgroundColor: isComplete
                      ? "rgba(100,180,100,0.3)"
                      : "divider",
                    my: 0.5,
                    transition: "background-color 0.3s ease",
                  }}
                />
              )}
            </Box>

            {/* Content */}
            <Box sx={{ pb: i < steps.length - 1 ? 3 : 0, pt: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isActive ? 700 : 500,
                  color: isPending ? "text.secondary" : "text.primary",
                  mb: 0.4,
                }}
              >
                {step.label}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  opacity: isPending ? 0.6 : 1,
                }}
              >
                {step.sub}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function OrderResult({ order }: { order: SerializedOrder }) {
  const statusStyle = statusColors[order.status];

  return (
    <Box
      sx={{
        mt: 4,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        overflow: "hidden",
      }}
    >
      {/* Order header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          background: "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "text.secondary",
              display: "block",
            }}
          >
            Order ID
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
            }}
          >
            {order._id}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                mt: 0.3,
              }}
            >
              {order.type === "delivery" ? (
                <LocalShippingOutlinedIcon
                  sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                />
              ) : (
                <StorefrontOutlinedIcon
                  sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textTransform: "capitalize",
                }}
              >
                {order.type}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={order.status}
            size="small"
            sx={{
              backgroundColor: statusStyle.bg,
              color: statusStyle.color,
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.05em",
              textTransform: "capitalize",
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 0,
        }}
      >
        {/* Left — tracking timeline */}
        <Box
          sx={{
            p: 3,
            borderRight: { md: "1px solid" },
            borderColor: { md: "divider" },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "text.secondary",
              display: "block",
              mb: 3,
            }}
          >
            Order Status
          </Typography>
          <TrackingTimeline order={order} />
        </Box>

        {/* Right — order details */}
        <Box sx={{ p: 3 }}>
          {/* Items */}
          <Typography
            variant="overline"
            sx={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "text.secondary",
              display: "block",
              mb: 2,
            }}
          >
            Items Ordered
          </Typography>
          <Stack sx={{ gap: 1.5, mb: 3 }}>
            {order.items.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: "rgba(201,162,39,0.03)",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, lineHeight: 1.3 }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {item.product.length} · Qty: {item.quantity}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  ${item.price * item.quantity}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Order Total
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              ${order.total}
            </Typography>
          </Box>

          {/* Shipping address */}
          {order.shippingAddress && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(201,162,39,0.03)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
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
                Shipping To
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {order.customer.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} {order.shippingAddress.zip}
              </Typography>
            </Box>
          )}

          {/* Pickup note */}
          {order.type === "pickup" && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(201,162,39,0.04)",
                border: "1px solid",
                borderColor: "primary.main",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <StorefrontOutlinedIcon
                  sx={{ fontSize: "1rem", color: "primary.main" }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "primary.main" }}
                >
                  Store Pickup
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                We will contact you to arrange a convenient pickup time.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function OrderTrackingView() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<SerializedOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId) return;
    setLoading(true);
    setNotFound(false);
    setOrder(null);

    try {
      const found = await getOrderByNumber(orderId.toUpperCase());
      if (!found) {
        setNotFound(true);
        return;
      }

      // Validate email if provided
      if (email && found.customer.email.toLowerCase() !== email.toLowerCase()) {
        setNotFound(true);
        return;
      }

      setOrder(found);
    } catch (error) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 8, md: 12 },
          background: `
            linear-gradient(160deg,
              #1a0a0f 0%,
              #2d1020 40%,
              #1a0a0f 100%
            )
          `,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(180,80,110,0.25) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 30%, rgba(201,162,39,0.12) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "rgba(201,162,39,0.9)",
              display: "block",
              mb: 2,
            }}
          >
            Stay in the know
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "#FAF7F2",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Track Your Order
          </Typography>

          {/* Decorative divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                height: "1px",
                width: 80,
                background:
                  "linear-gradient(to right, transparent, rgba(201,162,39,0.6))",
              }}
            />
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "rgba(201,162,39,0.8)",
              }}
            />
            <Box
              sx={{
                height: "1px",
                width: 80,
                background:
                  "linear-gradient(to left, transparent, rgba(201,162,39,0.6))",
              }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Search form */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "rgba(180,80,110,0.8)",
              display: "block",
              mb: 1,
            }}
          >
            Enter your details below
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              mb: 3,
            }}
          >
            Find Your Order
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Order ID"
              placeholder="e.g. NLC-001"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              fullWidth
              size="small"
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              helperText="Your order ID was included in your confirmation email"
            />
            <TextField
              label="Email Address"
              type="email"
              placeholder="The email used at checkout"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size="small"
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleTrack}
              disabled={loading || !orderId}
              startIcon={<SearchIcon />}
              sx={{ py: 1.8 }}
            >
              {loading ? "Searching..." : "Track Order"}
            </Button>
          </Box>
        </Box>

        {/* Not found */}
        {notFound && (
          <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
            No order found with ID <strong>{orderId.toUpperCase()}</strong>.
            Please check your confirmation email and try again.
          </Alert>
        )}

        {/* Order result */}
        {order && (
          <Box sx={{ mt: 3 }}>
            <OrderResult order={order} />
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                component={Link}
                href={`/orders/${order.orderNumber}`}
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 5 }}
              >
                View Full Order Details
              </Button>
            </Box>
          </Box>
        )}

        {/* Help note */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Can't find your order? Email us at{" "}
            <Box
              component="a"
              href="mailto:hello@noireluxe.com"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": { opacity: 0.7 },
              }}
            >
              hello@noireluxe.com
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
