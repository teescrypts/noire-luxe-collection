"use client"

import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const categories = [
  {
    label: "Bundles",
    href: "/shop?category=Bundles",
    description: "Mix and match lengths for a fuller, more natural look.",
    cursive: "Pure Luxury",
    gradient: "linear-gradient(135deg, #2d1020 0%, #1a0a0f 100%)",
    accent: "rgba(201,162,39,0.15)",
  },
  {
    label: "Frontal Wigs",
    href: "/shop?category=Frontal+Wigs",
    description: "Ear to ear lace for the most undetectable hairline.",
    cursive: "Effortlessly You",
    gradient: "linear-gradient(135deg, #1f0d1a 0%, #2d1020 50%, #1a0a0f 100%)",
    accent: "rgba(180,80,110,0.15)",
  },
  {
    label: "Closure Wigs",
    href: "/shop?category=Closure+Wigs",
    description: "Perfect parting with a natural crown finish.",
    cursive: "Crown Perfection",
    gradient: "linear-gradient(135deg, #1a0a0f 0%, #1f0d1a 100%)",
    accent: "rgba(201,162,39,0.12)",
  },
];

export default function CategoriesSection() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background: `
          linear-gradient(160deg,
            #FDF0F3 0%,
            #FAE8EE 30%,
            #FDF5F7 60%,
            #FDE8EE 100%
          )
        `,
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,80,110,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
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
            Find your perfect style
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "#1A0A0F",
              mb: 2,
            }}
          >
            Shop The Collection
          </Typography>

          {/* Decorative divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mt: 2,
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

        {/* Category cards */}
        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid key={cat.label} size={{ xs: 12, md: 4 }}>
              <Card
                component={Link}
                href={cat.href}
                sx={{
                  textDecoration: "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  background: cat.gradient,
                  border: "1px solid rgba(201,162,39,0.15)",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 20px 60px rgba(180,80,110,0.2)",
                    border: "1px solid rgba(201,162,39,0.4)",
                  },
                  "&:hover .cat-arrow": {
                    transform: "translateX(6px)",
                  },
                  "&:hover .cat-accent": {
                    opacity: 1,
                  },
                }}
              >
                {/* Inner glow accent */}
                <Box
                  className="cat-accent"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: cat.accent,
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    pointerEvents: "none",
                  }}
                />

                {/* Decorative circle */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "-30%",
                    right: "-15%",
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    border: "1px solid rgba(201,162,39,0.1)",
                    pointerEvents: "none",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "-15%",
                    right: "-5%",
                    width: 130,
                    height: 130,
                    borderRadius: "50%",
                    border: "1px solid rgba(180,80,110,0.15)",
                    pointerEvents: "none",
                  }}
                />

                <CardContent
                  sx={{
                    p: { xs: 4, md: 5 },
                    flexGrow: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Cursive label */}
                  <Typography
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontStyle: "italic",
                      fontSize: "1.1rem",
                      color: "rgba(201,162,39,0.7)",
                      display: "block",
                      mb: 2,
                    }}
                  >
                    {cat.cursive}
                  </Typography>

                  {/* Category name */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 700,
                      color: "#FAF7F2",
                      mb: 2,
                      lineHeight: 1.2,
                    }}
                  >
                    {cat.label}
                  </Typography>

                  {/* Divider */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        height: "1px",
                        width: 40,
                        background:
                          "linear-gradient(to right, rgba(201,162,39,0.6), transparent)",
                      }}
                    />
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: "rgba(201,162,39,0.6)",
                      }}
                    />
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#FAF7F2",
                      opacity: 0.6,
                      lineHeight: 1.9,
                      mb: 5,
                      fontFamily: '"Cormorant Garamond", serif',
                      fontStyle: "italic",
                      fontSize: "1rem",
                    }}
                  >
                    {cat.description}
                  </Typography>

                  {/* Shop now */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(201,162,39,0.9)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    >
                      Shop Now
                    </Typography>
                    <ArrowForwardIcon
                      className="cat-arrow"
                      sx={{
                        fontSize: "0.85rem",
                        color: "rgba(201,162,39,0.9)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
