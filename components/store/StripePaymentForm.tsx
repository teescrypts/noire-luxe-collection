"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface Props {
  orderTotal: number;
  onSuccess: (paymentIntentId: string) => void;
}

export default function StripePaymentForm({ orderTotal, onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    // Validate elements first
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Payment validation failed");
      setLoading(false);
      return;
    }

    // Confirm payment
    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      onSuccess(paymentIntent.id);
    }

    setLoading(false);
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={handleSubmit}
        disabled={!stripe || !elements || loading}
        sx={{ mt: 3, py: 1.8 }}
      >
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CircularProgress size={18} sx={{ color: "inherit" }} />
            Processing...
          </Box>
        ) : (
          `Pay $${orderTotal}`
        )}
      </Button>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mt: 2,
        }}
      >
        <LockOutlinedIcon
          sx={{ fontSize: "0.85rem", color: "text.secondary" }}
        />
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Secured by Stripe — 256-bit SSL encryption
        </Typography>
      </Box>
    </Box>
  );
}
