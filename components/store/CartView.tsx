"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Divider,
  Stack,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useCart } from "@/lib/cartContext";
import { SerializedProduct } from "@/types/serialized";
import { validateCart } from "@/actions/cart.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartView() {
  const [validating, setValidating] = useState(false);
  const [cartErrors, setCartErrors] = useState<string[]>([]);

  const router = useRouter();
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart();

  const handleCheckout = async () => {
    setValidating(true);
    setCartErrors([]);

    try {
      const { validated, errors } = await validateCart(
        items.map((i) => ({
          productId: (i.product as SerializedProduct)._id,
          quantity: i.quantity,
        })),
      );

      if (errors.length > 0) {
        setCartErrors(errors);
        // Update cart quantities if needed
        validated.forEach((v) => {
          if (
            v.quantity !==
            items.find(
              (i) => (i.product as SerializedProduct)._id === v.productId,
            )?.quantity
          ) {
            updateQty(v.productId, v.quantity);
          }
        });
      }

      if (validated.length > 0 && errors.length === 0) {
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Cart validation error:", error);
    } finally {
      setValidating(false);
    }
  };

  if (items.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <Box sx={{ textAlign: "center", px: 3 }}>
          <ShoppingBagOutlinedIcon
            sx={{
              fontSize: "4rem",
              color: "divider",
              mb: 3,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Your cart is empty
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 4,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
            }}
          >
            Discover our luxury collection and find your perfect style.
          </Typography>
          <Button
            component={Link}
            href="/shop"
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 5 }}
          >
            Shop The Collection
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Button
            component={Link}
            href="/shop"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "text.secondary",
              mb: 3,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "transparent",
              },
            }}
          >
            Continue Shopping
          </Button>

          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "1.2rem",
              color: "rgba(180,80,110,0.8)",
              display: "block",
              mb: 1,
            }}
          >
            Review your selection
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
            }}
          >
            Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </Typography>
        </Box>

        {/* Cart layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 380px" },
            gap: 4,
            alignItems: "start",
          }}
        >
          {/* Cart items */}
          <Box>
            <Stack sx={{ gap: 2 }}>
              {items.map((item) => (
                <Box
                  key={(item.product as SerializedProduct)._id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "100px 1fr", sm: "140px 1fr" },
                    gap: 3,
                    p: { xs: 2, sm: 3 },
                    backgroundColor: "background.paper",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "border-color 0.2s ease",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 100, sm: 140 },
                      borderRadius: 2,
                      overflow: "hidden",
                      backgroundColor: "#F8F0F3",
                    }}
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="140px"
                    />
                  </Box>

                  {/* Info */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "rgba(180,80,110,0.8)",
                          fontSize: "0.62rem",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {item.product.category}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontWeight: 700,
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                          lineHeight: 1.3,
                          mb: 0.5,
                        }}
                      >
                        {item.product.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.product.length} · {item.product.hairType}
                      </Typography>
                    </Box>

                    {/* Bottom row */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      {/* Qty control */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            updateQty(
                              (item.product as SerializedProduct)._id,
                              item.quantity - 1,
                            )
                          }
                          size="small"
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            width: 28,
                            height: 28,
                            "&:hover": { borderColor: "primary.main" },
                          }}
                        >
                          <RemoveIcon sx={{ fontSize: "0.8rem" }} />
                        </IconButton>
                        <Box
                          sx={{
                            width: 36,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, fontSize: "0.85rem" }}
                          >
                            {item.quantity}
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() =>
                            updateQty(
                              (item.product as SerializedProduct)._id,
                              item.quantity + 1,
                            )
                          }
                          size="small"
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            width: 28,
                            height: 28,
                            "&:hover": { borderColor: "primary.main" },
                          }}
                        >
                          <AddIcon sx={{ fontSize: "0.8rem" }} />
                        </IconButton>
                      </Box>

                      {/* Price + delete */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontFamily: '"Inter", sans-serif',
                            fontSize: "1.1rem",
                          }}
                        >
                          ${item.product.price * item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            removeItem((item.product as SerializedProduct)._id)
                          }
                          size="small"
                          sx={{
                            color: "text.secondary",
                            "&:hover": { color: "rgba(180,80,110,0.8)" },
                          }}
                        >
                          <DeleteOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Order summary */}
          <Box
            sx={{
              position: { lg: "sticky" },
              top: { lg: 100 },
              backgroundColor: "background.paper",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            {/* Summary header */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                background: "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  fontSize: "1.2rem",
                }}
              >
                Order Summary
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
              {/* Line items */}
              <Stack sx={{ gap: 2, mb: 3 }}>
                {items.map((item) => (
                  <Box
                    key={(item.product as SerializedProduct)._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", flex: 1, pr: 2 }}
                    >
                      {item.product.name}{" "}
                      <Box component="span" sx={{ opacity: 0.6 }}>
                        x{item.quantity}
                      </Box>
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${item.product.price * item.quantity}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ mb: 3 }} />

              {/* Shipping note */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(201,162,39,0.04)",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <LocalShippingOutlinedIcon
                  sx={{ color: "primary.main", fontSize: "1.1rem" }}
                />
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Shipping calculated at checkout
                </Typography>
              </Box>

              {/* Total */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 700,
                  }}
                >
                  Subtotal
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontFamily: '"Inter", sans-serif',
                    color: "text.primary",
                  }}
                >
                  ${totalPrice}
                </Typography>
              </Box>

              {/* Checkout button */}
              {/* Errors */}
              {cartErrors.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  {cartErrors.map((error, i) => (
                    <Alert
                      key={i}
                      severity="warning"
                      sx={{ mb: 1, borderRadius: 2, fontSize: "0.8rem" }}
                    >
                      {error}
                    </Alert>
                  ))}
                </Box>
              )}

              <Button
                onClick={handleCheckout}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={validating}
                sx={{ py: 1.8, mb: 2 }}
              >
                {validating ? "Validating..." : "Proceed to Checkout"}
              </Button>

              {/* Secure badge */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <LockOutlinedIcon
                  sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", letterSpacing: "0.05em" }}
                >
                  Secure checkout powered by Stripe
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
