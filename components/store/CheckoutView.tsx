"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Divider,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useCart } from "@/lib/cartContext";

const steps = ["Contact", "Delivery", "Payment"];

const shippingRates = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5–7 business days",
    price: 12,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2–3 business days",
    price: 25,
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 45,
  },
];

export default function CheckoutView() {
  const { items, totalPrice } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [selectedShipping, setSelectedShipping] = useState("standard");

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const selectedRate = shippingRates.find((r) => r.id === selectedShipping);
  const shippingCost =
    fulfillmentType === "pickup" ? 0 : (selectedRate?.price ?? 0);
  const orderTotal = totalPrice + shippingCost;

  const handleNext = () => setActiveStep((s) => s + 1);
  const handleBack = () => setActiveStep((s) => s - 1);

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Your cart is empty
          </Typography>
          <Button
            component={Link}
            href="/shop"
            variant="contained"
            color="primary"
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
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Button
            component={Link}
            href="/cart"
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
            Back to Cart
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
            Almost there
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
            }}
          >
            Checkout
          </Typography>
        </Box>

        {/* Stepper */}
        <Stepper
          activeStep={activeStep}
          sx={{
            mb: 6,
            "& .MuiStepLabel-label": {
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
            "& .MuiStepIcon-root.Mui-active": { color: "primary.main" },
            "& .MuiStepIcon-root.Mui-completed": { color: "primary.main" },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Main layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 380px" },
            gap: 4,
            alignItems: "start",
          }}
        >
          {/* Left — Form steps */}
          <Box>
            {/* Step 0 — Contact */}
            {activeStep === 0 && (
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
                    }}
                  >
                    Contact Information
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Stack sx={{ gap: 2.5 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 2,
                      }}
                    >
                      <TextField
                        label="First Name"
                        value={contact.firstName}
                        onChange={(e) =>
                          setContact({ ...contact, firstName: e.target.value })
                        }
                        fullWidth
                        size="small"
                      />
                      <TextField
                        label="Last Name"
                        value={contact.lastName}
                        onChange={(e) =>
                          setContact({ ...contact, lastName: e.target.value })
                        }
                        fullWidth
                        size="small"
                      />
                    </Box>
                    <TextField
                      label="Email Address"
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="Phone Number"
                      type="tel"
                      value={contact.phone}
                      onChange={(e) =>
                        setContact({ ...contact, phone: e.target.value })
                      }
                      fullWidth
                      size="small"
                    />
                  </Stack>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleNext}
                    sx={{ mt: 4, py: 1.8 }}
                    disabled={
                      !contact.firstName ||
                      !contact.lastName ||
                      !contact.email ||
                      !contact.phone
                    }
                  >
                    Continue to Delivery
                  </Button>
                </Box>
              </Box>
            )}

            {/* Step 1 — Delivery */}
            {activeStep === 1 && (
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
                    }}
                  >
                    Delivery Method
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  {/* Fulfillment type toggle */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                      mb: 4,
                    }}
                  >
                    {[
                      {
                        value: "delivery",
                        label: "Ship to Me",
                        icon: <LocalShippingOutlinedIcon />,
                      },
                      {
                        value: "pickup",
                        label: "Store Pickup",
                        icon: <StorefrontOutlinedIcon />,
                      },
                    ].map((opt) => (
                      <Box
                        key={opt.value}
                        onClick={() =>
                          setFulfillmentType(opt.value as "delivery" | "pickup")
                        }
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          border: "2px solid",
                          borderColor:
                            fulfillmentType === opt.value
                              ? "primary.main"
                              : "divider",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                          backgroundColor:
                            fulfillmentType === opt.value
                              ? "rgba(201,162,39,0.04)"
                              : "transparent",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Box
                          sx={{
                            color:
                              fulfillmentType === opt.value
                                ? "primary.main"
                                : "text.secondary",
                          }}
                        >
                          {opt.icon}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color:
                              fulfillmentType === opt.value
                                ? "primary.main"
                                : "text.secondary",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {opt.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Shipping address — delivery only */}
                  {fulfillmentType === "delivery" && (
                    <Stack sx={{ gap: 2.5, mb: 4 }}>
                      <TextField
                        label="Street Address"
                        value={address.street}
                        onChange={(e) =>
                          setAddress({ ...address, street: e.target.value })
                        }
                        fullWidth
                        size="small"
                      />
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr 120px",
                          },
                          gap: 2,
                        }}
                      >
                        <TextField
                          label="City"
                          value={address.city}
                          onChange={(e) =>
                            setAddress({ ...address, city: e.target.value })
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="State"
                          value={address.state}
                          onChange={(e) =>
                            setAddress({ ...address, state: e.target.value })
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label="ZIP"
                          value={address.zip}
                          onChange={(e) =>
                            setAddress({ ...address, zip: e.target.value })
                          }
                          fullWidth
                          size="small"
                        />
                      </Box>

                      {/* Shipping rates */}
                      <Box>
                        <Typography
                          variant="overline"
                          sx={{
                            letterSpacing: "0.15em",
                            fontWeight: 600,
                            display: "block",
                            mb: 2,
                          }}
                        >
                          Shipping Speed
                        </Typography>
                        <FormControl fullWidth>
                          <RadioGroup
                            value={selectedShipping}
                            onChange={(e) =>
                              setSelectedShipping(e.target.value)
                            }
                          >
                            <Stack sx={{ gap: 1.5 }}>
                              {shippingRates.map((rate) => (
                                <Box
                                  key={rate.id}
                                  onClick={() => setSelectedShipping(rate.id)}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    p: 2,
                                    borderRadius: 2,
                                    border: "1.5px solid",
                                    borderColor:
                                      selectedShipping === rate.id
                                        ? "primary.main"
                                        : "divider",
                                    cursor: "pointer",
                                    backgroundColor:
                                      selectedShipping === rate.id
                                        ? "rgba(201,162,39,0.04)"
                                        : "transparent",
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <Radio
                                      value={rate.id}
                                      size="small"
                                      sx={{
                                        p: 0,
                                        color: "divider",
                                        "&.Mui-checked": {
                                          color: "primary.main",
                                        },
                                      }}
                                    />
                                    <Box>
                                      <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        {rate.name}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        sx={{ color: "text.secondary" }}
                                      >
                                        {rate.description}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 700,
                                      color: "text.primary",
                                    }}
                                  >
                                    ${rate.price}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Stack>
                  )}

                  {/* Pickup info */}
                  {fulfillmentType === "pickup" && (
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: "rgba(201,162,39,0.04)",
                        border: "1px solid",
                        borderColor: "divider",
                        mb: 4,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Store Pickup — Free
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", lineHeight: 1.8 }}
                      >
                        We will contact you at the email provided to arrange a
                        convenient pickup time. Orders are typically ready
                        within 1–2 business days.
                      </Typography>
                    </Box>
                  )}

                  {/* Navigation */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleBack}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      onClick={handleNext}
                      sx={{ py: 1.8 }}
                      disabled={
                        fulfillmentType === "delivery" &&
                        (!address.street ||
                          !address.city ||
                          !address.state ||
                          !address.zip)
                      }
                    >
                      Continue to Payment
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Step 2 — Payment */}
            {activeStep === 2 && (
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
                    }}
                  >
                    Payment
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  {/* Stripe will mount here */}
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      border: "2px dashed",
                      borderColor: "divider",
                      textAlign: "center",
                      mb: 3,
                    }}
                  >
                    <LockOutlinedIcon
                      sx={{ color: "primary.main", fontSize: "2rem", mb: 1 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 1 }}
                    >
                      Stripe payment form will be integrated here
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      256-bit SSL encryption
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleBack}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{ py: 1.8 }}
                    >
                      Pay ${orderTotal}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/* Right — Order summary */}
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
              {/* Items */}
              <Stack sx={{ gap: 2, mb: 3 }}>
                {items.map((item) => (
                  <Box
                    key={item.product.id}
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

              {/* Subtotal */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Subtotal
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ${totalPrice}
                </Typography>
              </Box>

              {/* Shipping */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Shipping
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Total */}
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
                  }}
                >
                  ${orderTotal}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
