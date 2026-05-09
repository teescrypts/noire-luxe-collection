"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { validateNewsletterEmail } from "@/lib/validation";
import { sendNewsletterWelcomeEmail } from "@/actions/email.actions";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const { valid, errors } = validateNewsletterEmail(email);
    if (!valid) {
      setError(errors[0].message);
      return;
    }
    try {
      await sendNewsletterWelcomeEmail({ email });
      setSubmitted(true);
      setError("");
    } catch (error: any) {
      setError(error.message ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "secondary.main",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(201,162,39,0.07) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          {/* Icon */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(201,162,39,0.1)",
              border: "1px solid",
              borderColor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 4,
            }}
          >
            <EmailOutlinedIcon
              sx={{ color: "primary.main", fontSize: "1.8rem" }}
            />
          </Box>

          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              letterSpacing: "0.3em",
              display: "block",
              mb: 2,
            }}
          >
            Join The Inner Circle
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "background.default",
              mb: 2,
            }}
          >
            Get 10% Off Your First Order
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "background.default",
              opacity: 0.6,
              mb: 5,
              lineHeight: 1.8,
            }}
          >
            Subscribe to receive exclusive offers, new arrivals, and expert hair
            care tips delivered straight to your inbox.
          </Typography>

          {/* Form */}
          {submitted ? (
            <Alert
              severity="success"
              sx={{
                backgroundColor: "rgba(201,162,39,0.1)",
                color: "primary.main",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 2,
                "& .MuiAlert-icon": { color: "primary.main" },
              }}
            >
              Welcome to the inner circle! Check your inbox for your 10%
              discount code.
            </Alert>
          ) : (
            <Stack
              sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 1.5 }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "background.default",
                    "& fieldset": { borderColor: "rgba(201,162,39,0.3)" },
                    "&:hover fieldset": { borderColor: "primary.main" },
                    "&.Mui-focused fieldset": { borderColor: "primary.main" },
                  },
                  "& input::placeholder": {
                    color: "rgba(250,247,242,0.4)",
                    opacity: 1,
                  },
                  "& .MuiFormHelperText-root": {
                    color: "error.light",
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  whiteSpace: "nowrap",
                  px: 4,
                  minWidth: { xs: "100%", sm: "auto" },
                }}
              >
                Subscribe
              </Button>
            </Stack>
          )}

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 2,
              color: "background.default",
              opacity: 0.4,
            }}
          >
            No spam, ever. Unsubscribe at any time.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
