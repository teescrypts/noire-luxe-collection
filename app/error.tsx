"use client";

import { useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(180,80,110,0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 30%, rgba(201,162,39,0.05) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          {/* Icon */}
          <Typography
            sx={{
              fontSize: "5rem",
              mb: 2,
              lineHeight: 1,
            }}
          >
            ✦
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "rgba(180,80,110,0.8)",
              display: "block",
              mb: 1,
            }}
          >
            Something went wrong
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Unexpected Error
          </Typography>

          {/* Decorative divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <Box
              sx={{
                height: "1px",
                width: 60,
                background:
                  "linear-gradient(to right, transparent, rgba(201,162,39,0.6))",
              }}
            />
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "rgba(201,162,39,0.8)",
              }}
            />
            <Box
              sx={{
                height: "1px",
                width: 60,
                background:
                  "linear-gradient(to left, transparent, rgba(201,162,39,0.6))",
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              mb: 4,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
            }}
          >
            We apologize for the inconvenience. An unexpected error occurred.
            Please try again or contact us if the problem persists.
          </Typography>

          {process.env.NODE_ENV === "development" && error.message && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(180,80,110,0.06)",
                border: "1px solid rgba(180,80,110,0.2)",
                textAlign: "left",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontFamily: '"Inter", monospace',
                  color: "rgba(180,80,110,0.8)",
                  display: "block",
                  wordBreak: "break-word",
                }}
              >
                {error.message}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              onClick={reset}
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 5 }}
            >
              Try Again
            </Button>
            <Button
              component="a"
              href="/"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ px: 5 }}
            >
              Go Home
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
