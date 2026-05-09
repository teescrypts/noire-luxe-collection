'use client';

import Link from "next/link";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

const values = [
  {
    icon: <VerifiedIcon sx={{ fontSize: "1.8rem" }} />,
    title: "Uncompromising Quality",
    description:
      "Every piece in our collection is made from 100% premium human hair. We inspect each wig before it ever reaches your hands.",
  },
  {
    icon: <FavoriteOutlinedIcon sx={{ fontSize: "1.8rem" }} />,
    title: "Made With Love",
    description:
      "We genuinely care about every customer. From your first order to your tenth, we treat every woman like she deserves — with warmth and attention.",
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: "1.8rem" }} />,
    title: "Luxury For Every Woman",
    description:
      "Luxury should not be a privilege for a few. We curate premium hair at prices that make you feel like royalty without the guilt.",
  },
  {
    icon: <GroupsOutlinedIcon sx={{ fontSize: "1.8rem" }} />,
    title: "Community First",
    description:
      "Noire Luxe was built by a woman who understands the power of a great hair day. We celebrate every woman who wears her crown with confidence.",
  },
];

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "100%", label: "Human Hair" },
  { value: "4.9★", label: "Average Rating" },
  { value: "2+", label: "Years in Business" },
];

export default function AboutView() {
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 10, md: 16 },
          background: `
            linear-gradient(160deg,
              #1a0a0f 0%,
              #2d1020 40%,
              #1a0a0f 100%
            )
          `,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 15% 50%, rgba(180,80,110,0.3) 0%, transparent 60%),
              radial-gradient(ellipse at 85% 30%, rgba(201,162,39,0.15) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Decorative circles */}
        {[
          {
            size: 400,
            top: "-15%",
            right: "-8%",
            color: "rgba(201,162,39,0.08)",
          },
          { size: 260, top: "5%", right: "5%", color: "rgba(180,80,110,0.1)" },
          {
            size: 300,
            bottom: "-20%",
            left: "-8%",
            color: "rgba(201,162,39,0.06)",
          },
        ].map((c, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: c.size,
              height: c.size,
              top: c.top,
              right: c.right,
              bottom: c.bottom,
              left: c.left,
              borderRadius: "50%",
              border: "1px solid",
              borderColor: c.color,
              pointerEvents: "none",
            }}
          />
        ))}

        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
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
            Our Story
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "#FAF7F2",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.8rem" },
              lineHeight: 1.1,
            }}
          >
            Born From a Passion
            <Box
              component="span"
              sx={{
                display: "block",
                fontStyle: "italic",
                background: `linear-gradient(135deg, #C9A227 0%, #E2C06A 40%, #B4547A 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              For Beautiful Hair
            </Box>
          </Typography>

          {/* Decorative divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 4,
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

          <Typography
            variant="body1"
            sx={{
              color: "#FAF7F2",
              opacity: 0.75,
              lineHeight: 1.9,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "1.15rem",
            }}
          >
            Noire Luxe Collection was founded with a single belief — every woman
            deserves to wear her crown with confidence. We exist to make luxury
            hair accessible, beautiful and personal.
          </Typography>
        </Container>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {stats.map((stat) => (
              <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 700,
                      background: `linear-gradient(135deg, #C9A227, #E2C06A)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="overline"
                    sx={{
                      letterSpacing: "0.15em",
                      color: "text.secondary",
                      fontSize: "0.7rem",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our story */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: 'center' }}>
            {/* Text */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: "italic",
                  fontSize: "1.2rem",
                  color: "rgba(180,80,110,0.8)",
                  display: "block",
                  mb: 2,
                }}
              >
                How it all started
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                A Dream Turned Into a Collection
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 2,
                  mb: 3,
                }}
              >
                Noire Luxe Collection started as a personal mission to find wigs
                that actually looked and felt like real hair. After years of
                frustration with low quality products that tangled, shed, and
                lost their shine within weeks, our founder decided to source
                directly from premium suppliers.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 2,
                  mb: 4,
                }}
              >
                What began as a personal collection quickly became a movement.
                Friends wanted in. Then friends of friends. Today, Noire Luxe
                Collection serves hundreds of women across the United States who
                refuse to compromise on quality.
              </Typography>
              <Button
                component={Link}
                href="/shop"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ px: 5 }}
              >
                Shop The Collection
              </Button>
            </Grid>

            {/* Decorative right panel */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 320, md: 480 },
                  borderRadius: 4,
                  overflow: "hidden",
                  background: `
                    linear-gradient(160deg,
                      #2d1020 0%,
                      #1a0a0f 100%
                    )
                  `,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: `
                      radial-gradient(ellipse at 30% 40%, rgba(180,80,110,0.25) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 70%, rgba(201,162,39,0.15) 0%, transparent 50%)
                    `,
                  }}
                />

                {/* Decorative rings */}
                {[280, 200, 120].map((size, i) => (
                  <Box
                    key={i}
                    sx={{
                      position: "absolute",
                      width: size,
                      height: size,
                      borderRadius: "50%",
                      border: "1px solid",
                      borderColor:
                        i === 0
                          ? "rgba(201,162,39,0.15)"
                          : i === 1
                            ? "rgba(180,80,110,0.2)"
                            : "rgba(201,162,39,0.3)",
                    }}
                  />
                ))}

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                    px: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontStyle: "italic",
                      fontSize: "1.1rem",
                      color: "rgba(201,162,39,0.8)",
                      display: "block",
                      mb: 1,
                    }}
                  >
                    Our promise to you
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 700,
                      color: "#FAF7F2",
                      lineHeight: 1.3,
                    }}
                  >
                    "Every strand, curated with love."
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background:
            "linear-gradient(160deg, #FDF0F3 0%, #FAE8EE 50%, #FDF5F7 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8 }}>
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
              What drives us
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 700,
              }}
            >
              Our Core Values
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {values.map((val) => (
              <Grid key={val.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 3,
                    backgroundColor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 32px rgba(201,162,39,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      backgroundColor: "rgba(201,162,39,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.main",
                      mb: 3,
                    }}
                  >
                    {val.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      mb: 1.5,
                    }}
                  >
                    {val.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.8 }}
                  >
                    {val.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
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
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 50%, rgba(180,80,110,0.2) 0%, transparent 65%)`,
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "1.2rem",
              color: "rgba(201,162,39,0.9)",
              display: "block",
              mb: 2,
            }}
          >
            Ready to wear your crown?
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "#FAF7F2",
              mb: 4,
            }}
          >
            Explore the Collection
          </Typography>
          <Button
            component={Link}
            href="/shop"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 6, py: 1.8 }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
