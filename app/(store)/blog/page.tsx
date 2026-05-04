import { Box, Container, Typography } from "@mui/material";
import BlogGrid from "@/components/store/BlogGrid";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
          background: `
            linear-gradient(160deg,
              #1a0a0f 0%,
              #2d1020 40%,
              #1a0a0f 100%
            )
          `,
        }}
      >
        {/* Background glow */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(180,80,110,0.2) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 30%, rgba(201,162,39,0.12) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center" }}>
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
              Tips, trends & hair care
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 700,
                color: "#FAF7F2",
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              The Noire Luxe Journal
            </Typography>

            {/* Decorative divider */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mt: 3,
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
          </Box>
        </Container>
      </Box>

      {/* Blog content */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <BlogGrid />
      </Container>
    </Box>
  );
}
