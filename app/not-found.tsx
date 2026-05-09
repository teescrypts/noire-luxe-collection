'use client';

import Link from "next/link";
import { Box, Container, Typography, Button } from "@mui/material";

export default function NotFound() {
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
          {/* Large 404 */}
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: "7rem", md: "10rem" },
              fontWeight: 700,
              lineHeight: 1,
              background: `linear-gradient(135deg, #C9A227 0%, #E2C06A 40%, #B4547A 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 2,
            }}
          >
            404
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
            Oops, this page got lost
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Page Not Found
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
            The page you are looking for may have been moved, deleted or never
            existed. Let us help you find your way back.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              component={Link}
              href="/"
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 5 }}
            >
              Go Home
            </Button>
            <Button
              component={Link}
              href="/shop"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ px: 5 }}
            >
              Shop Collection
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
