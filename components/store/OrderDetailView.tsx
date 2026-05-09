"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
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
    <Box>
      {steps.map((step, i) => {
        const stepIndex = getStepIndex(step.key);
        const isComplete = stepIndex < currentIndex;
        const isActive = stepIndex === currentIndex;
        const isPending = stepIndex > currentIndex;

        return (
          <Box
            key={step.key}
            sx={{ display: "flex", gap: 2.5, position: "relative" }}
          >
            {/* Icon column */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
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
                  "& svg": { fontSize: "1.1rem" },
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

              {/* Connector line */}
              {i < steps.length - 1 && (
                <Box
                  sx={{
                    width: 2,
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
                  mb: 0.3,
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

export default function OrderDetailView({ order }: { order: SerializedOrder }) {
  const statusStyle = statusColors[order.status];

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        {/* Back button */}
        <Button
          component={Link}
          href="/orders"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "text.secondary",
            mb: 4,
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "transparent",
            },
          }}
        >
          Track Another Order
        </Button>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 6,
          }}
        >
          <Box>
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
              Order details
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 700,
              }}
            >
              {order.orderNumber}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>

          <Chip
            label={order.status}
            sx={{
              backgroundColor: statusStyle.bg,
              color: statusStyle.color,
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.05em",
              textTransform: "capitalize",
              borderRadius: 1,
              px: 1,
              height: 36,
            }}
          />
        </Box>

        {/* Main grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 380px" },
            gap: 4,
            alignItems: "start",
          }}
        >
          {/* Left column */}
          <Stack sx={{ gap: 3 }}>
            {/* Order items */}
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 2.5,
                  background:
                    "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
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
                  Items Ordered
                </Typography>
              </Box>

              <Box sx={{ p: 3 }}>
                <Stack sx={{ gap: 2 }}>
                  {order.items.map((item, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "72px 1fr auto",
                        gap: 2,
                        alignItems: "center",
                        pb: 2,
                        borderBottom:
                          i < order.items.length - 1 ? "1px solid" : "none",
                        borderColor: "divider",
                      }}
                    >
                      {/* Image */}
                      <Box
                        sx={{
                          position: "relative",
                          width: 72,
                          height: 72,
                          borderRadius: 2,
                          overflow: "hidden",
                          backgroundColor: "#F8F0F3",
                          flexShrink: 0,
                        }}
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="72px"
                          />
                        )}
                      </Box>

                      {/* Info */}
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 0.3 }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", display: "block" }}
                        >
                          {item.length}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          Qty: {item.quantity}
                        </Typography>
                      </Box>

                      {/* Price */}
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
                      >
                        ${item.price * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* Tracking timeline */}
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 2.5,
                  background:
                    "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
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
                  Order Status
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <TrackingTimeline order={order} />
              </Box>
            </Box>
          </Stack>

          {/* Right column — summary */}
          <Stack sx={{ gap: 3 }}>
            {/* Order summary */}
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 2.5,
                  background:
                    "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
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
                  Order Summary
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Stack sx={{ gap: 1.5, mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Subtotal
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${order.subtotal}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Shipping
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {order.shippingCost === 0
                        ? "Free"
                        : `$${order.shippingCost}`}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 700,
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontFamily: '"Inter", sans-serif',
                      color: "text.primary",
                    }}
                  >
                    ${order.total}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Customer info */}
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 2.5,
                  background:
                    "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
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
                  Customer Details
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Stack sx={{ gap: 2 }}>
                  {[
                    { label: "Name", value: order.customer.name },
                    { label: "Email", value: order.customer.email },
                    { label: "Phone", value: order.customer.phone },
                  ].map((detail) => (
                    <Box key={detail.label}>
                      <Typography
                        variant="overline"
                        sx={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          color: "text.secondary",
                          display: "block",
                          mb: 0.3,
                        }}
                      >
                        {detail.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {detail.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* Delivery info */}
            <Box
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 2.5,
                  background:
                    "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
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
                  {order.type === "pickup"
                    ? "Pickup Information"
                    : "Shipping Address"}
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  {order.type === "delivery" ? (
                    <LocalShippingOutlinedIcon
                      sx={{ color: "primary.main", fontSize: "1.2rem" }}
                    />
                  ) : (
                    <StorefrontOutlinedIcon
                      sx={{ color: "primary.main", fontSize: "1.2rem" }}
                    />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {order.type}
                  </Typography>
                </Box>

                {order.type === "delivery" && order.shippingAddress ? (
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.8 }}
                  >
                    {order.shippingAddress.street}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zip}
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.8 }}
                  >
                    We will contact you to arrange a convenient pickup time.
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Payment info */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                backgroundColor: "rgba(201,162,39,0.04)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "text.secondary",
                  display: "block",
                  mb: 0.5,
                }}
              >
                Payment Reference
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: '"Inter", monospace',
                  color: "text.secondary",
                  wordBreak: "break-all",
                }}
              >
                {order.paymentRef}
              </Typography>
            </Box>

            {/* Help */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Need help with your order?{" "}
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
                  Contact us
                </Box>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
