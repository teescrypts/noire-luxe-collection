"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  Stack,
} from "@mui/material";
import { getFeaturedProducts } from "@/data/products";

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "background.default" }}>
      <Container maxWidth="xl">
        {/* Section header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              letterSpacing: "0.3em",
              display: "block",
              mb: 2,
            }}
          >
            Handpicked For You
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Featured Collection
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 480,
              mx: "auto",
            }}
          >
            Our most loved styles, crafted from 100% premium human hair.
          </Typography>
        </Box>

        {/* Products grid */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {/* Sale badge */}
                {product.originalPrice && (
                  <Chip
                    label="Sale"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      zIndex: 1,
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      letterSpacing: "0.05em",
                    }}
                  />
                )}

                {/* Product image */}
                <CardMedia
                  component={Link}
                  href={`/products/${product.slug}`}
                  sx={{
                    position: "relative",
                    height: 320,
                    overflow: "hidden",
                    display: "block",
                    backgroundColor: "grey.100",
                  }}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                  />
                </CardMedia>

                {/* Product info */}
                <CardContent sx={{ flexGrow: 1, pt: 2.5 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.main",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {product.category}
                  </Typography>

                  <Typography
                    variant="h6"
                    component={Link}
                    href={`/products/${product.slug}`}
                    sx={{
                      display: "block",
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 600,
                      fontSize: "1.2rem",
                      textDecoration: "none",
                      color: "text.primary",
                      mt: 0.5,
                      mb: 1,
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s ease",
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* Rating */}
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <Rating
                      value={product.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                      sx={{
                        "& .MuiRating-iconFilled": { color: "primary.main" },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      ({product.reviewCount})
                    </Typography>
                  </Stack>

                  {/* Price */}
                  <Stack
                    sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      ${product.price}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          textDecoration: "line-through",
                        }}
                      >
                        ${product.originalPrice}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2.5 }}>
                  <Button
                    component={Link}
                    href={`/products/${product.slug}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="small"
                  >
                    View Product
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* View all button */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            component={Link}
            href="/shop"
            variant="outlined"
            color="primary"
            size="large"
            sx={{ px: 6 }}
          >
            View Full Collection
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
