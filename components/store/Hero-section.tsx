"use client"

import Link from "next/link";
import { Box, Container, Typography, Button, Stack } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "90vh", md: "95vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: `
          linear-gradient(135deg,
            #1a0a0f 0%,
            #2d1020 25%,
            #1a0a0f 50%,
            #0f0508 100%
          )
        `,
      }}
    >
      {/* Romantic layered gradients */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 10% 50%, rgba(180,80,110,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 20%, rgba(201,162,39,0.2) 0%, transparent 45%),
            radial-gradient(ellipse at 70% 80%, rgba(180,80,110,0.2) 0%, transparent 40%),
            radial-gradient(ellipse at 30% 10%, rgba(201,162,39,0.15) 0%, transparent 35%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Decorative circles */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: "50%",
          border: "1px solid rgba(201,162,39,0.15)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          right: "5%",
          width: { xs: 200, md: 350 },
          height: { xs: 200, md: 350 },
          borderRadius: "50%",
          border: "1px solid rgba(180,80,110,0.2)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          left: "-8%",
          width: { xs: 250, md: 450 },
          height: { xs: 250, md: 450 },
          borderRadius: "50%",
          border: "1px solid rgba(201,162,39,0.1)",
          pointerEvents: "none",
        }}
      />

      {/* Floating decorative dots */}
      {[
        { top: "20%", left: "15%", size: 4, opacity: 0.4 },
        { top: "60%", left: "8%", size: 3, opacity: 0.3 },
        { top: "35%", right: "12%", size: 5, opacity: 0.3 },
        { top: "75%", right: "20%", size: 3, opacity: 0.4 },
        { top: "10%", left: "40%", size: 4, opacity: 0.2 },
      ].map((dot, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: dot.top,
            left: dot.left,
            right: dot.right,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            backgroundColor: "rgba(201,162,39,0.6)",
            opacity: dot.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "65%" },
            py: { xs: 8, md: 0 },
          }}
        >
          {/* Cursive overline */}
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              color: "rgba(201,162,39,0.9)",
              display: "block",
              mb: 2,
              letterSpacing: "0.05em",
            }}
          >
            Welcome to Noire Luxe Collection
          </Typography>

          {/* Main headline */}
          <Typography
            variant="h1"
            sx={{
              color: "#FAF7F2",
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: "3rem", sm: "4rem", md: "5.8rem" },
              fontWeight: 700,
              lineHeight: 1.0,
              mb: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Wear Your
          </Typography>

          {/* Italic cursive accent word */}
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: { xs: "3.8rem", sm: "5rem", md: "7rem" },
              fontWeight: 700,
              lineHeight: 1.0,
              mb: 1,
              background: `linear-gradient(135deg, #C9A227 0%, #E2C06A 40%, #B4547A 80%, #C9A227 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Crown
          </Typography>

          <Typography
            variant="h1"
            sx={{
              color: "#FAF7F2",
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: "3rem", sm: "4rem", md: "5.8rem" },
              fontWeight: 700,
              lineHeight: 1.0,
              mb: 4,
              letterSpacing: "-0.02em",
            }}
          >
            With Confidence
          </Typography>

          {/* Decorative divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 4,
            }}
          >
            <Box
              sx={{
                height: "1px",
                width: 60,
                background:
                  "linear-gradient(to right, transparent, rgba(201,162,39,0.7))",
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
                width: 60,
                background:
                  "linear-gradient(to left, transparent, rgba(201,162,39,0.7))",
              }}
            />
          </Box>

          {/* Subheading */}
          <Typography
            variant="body1"
            sx={{
              color: "#FAF7F2",
              opacity: 0.75,
              maxWidth: 480,
              mb: 5,
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.9,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              letterSpacing: "0.02em",
            }}
          >
            Discover our curated collection of luxury wigs crafted from 100%
            premium human hair. Every strand tells a story of elegance.
          </Typography>

          {/* CTA Buttons */}
          <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            <Button
              component={Link}
              href="/shop"
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 5, py: 1.8 }}
            >
              Shop The Collection
            </Button>
            <Button
              component={Link}
              href="/blog"
              variant="outlined"
              size="large"
              sx={{
                px: 5,
                py: 1.8,
                borderColor: "rgba(201,162,39,0.5)",
                color: "#FAF7F2",
                "&:hover": {
                  borderColor: "rgba(201,162,39,0.9)",
                  backgroundColor: "rgba(201,162,39,0.08)",
                },
              }}
            >
              Hair Care Tips
            </Button>
          </Stack>

          {/* Stats row */}
          <Stack
            sx={{
              flexDirection: "row",
              gap: 4,
              mt: 8,
              pt: 6,
              borderTop: "1px solid rgba(201,162,39,0.15)",
            }}
          >
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "100%", label: "Human Hair" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <Box key={stat.label}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 700,
                    background: `linear-gradient(135deg, #C9A227, #E2C06A)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#FAF7F2",
                    opacity: 0.55,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontSize: "0.65rem",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>

      {/* Bottom fade */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background:
            "linear-gradient(to top, rgba(253,245,247,0.08), transparent)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
