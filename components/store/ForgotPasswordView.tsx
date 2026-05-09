"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        px: 3,
      }}
    >
      <Container maxWidth="xs">
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            href="/auth"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "text.secondary",
              mb: 3,
              "&:hover": {
                color: "primary.main",
                backgroundColor: "transparent",
              },
            }}
          >
            Back to Login
          </Button>

          {/* Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(201,162,39,0.08)",
              border: "1px solid",
              borderColor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <EmailOutlinedIcon
              sx={{ color: "primary.main", fontSize: "1.8rem" }}
            />
          </Box>

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
            No worries
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              mb: 1,
            }}
          >
            Forgot Password?
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Enter your email and we will send you a reset link.
          </Typography>
        </Box>

        {submitted ? (
          <Alert
            severity="success"
            sx={{
              borderRadius: 2,
              backgroundColor: "rgba(201,162,39,0.08)",
              color: "primary.dark",
              border: "1px solid",
              borderColor: "primary.main",
              "& .MuiAlert-icon": { color: "primary.main" },
            }}
          >
            Check your inbox! If an account exists with <strong>{email}</strong>
            , a reset link has been sent. The link expires in 1 hour.
          </Alert>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {error && (
              <Alert
                severity="error"
                sx={{ borderRadius: 2 }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}

            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size="small"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={loading || !email}
              sx={{ py: 1.8 }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
