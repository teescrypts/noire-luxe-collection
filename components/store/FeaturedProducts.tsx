"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { SerializedProduct } from "@/types/serialized";
import { useCart } from "@/lib/cartContext";

interface Props {
  products: SerializedProduct[];
}

export default function FeaturedProducts({ products }: Props) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const { addItem } = useCart();
  const total = products.length;

  const goTo = useCallback(
    (index: number) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 300);
    },
    [fading],
  );

  const prev = useCallback(
    () => goTo(current === 0 ? total - 1 : current - 1),
    [current, total, goTo],
  );

  const next = useCallback(
    () => goTo(current === total - 1 ? 0 : current + 1),
    [current, total, goTo],
  );

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => next(), 6000);
    return () => clearInterval(t);
  }, [next, total]);

  if (!products.length) return null;

  const product = products[current];

  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      {/* Section label row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 3, md: 6 },
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 16,
              height: 1.5,
              backgroundColor: "primary.main",
            }}
          />
          <Typography
            variant="overline"
            sx={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: "text.secondary",
            }}
          >
            Featured Collection
          </Typography>
        </Box>

        {/* Navigation arrows */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={prev}
            size="small"
            sx={{
              width: 32,
              height: 32,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              color: "text.secondary",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                backgroundColor: "transparent",
              },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: "0.7rem" }} />
          </IconButton>
          <IconButton
            onClick={next}
            size="small"
            sx={{
              width: 32,
              height: 32,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              color: "text.secondary",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                backgroundColor: "transparent",
              },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: "0.7rem" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 4fr" },
          minHeight: { xs: "auto", md: 560 },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",
            height: { xs: 420, sm: 500, md: "100%" },
            minHeight: { md: 580 },
            overflow: "hidden",
            backgroundColor: "#EDE8E4",
            order: { xs: 1, md: 1 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: fading ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center center" }}
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </Box>

          {/* Counter pill */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              px: 1.5,
              py: 0.4,
              borderRadius: 10,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "#0A0A0A",
              }}
            >
              {current + 1} / {total}
            </Typography>
          </Box>

          {/* Category pill — mobile only */}
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              position: "absolute",
              bottom: 16,
              left: 16,
              backgroundColor: "primary.main",
              px: 1.5,
              py: 0.4,
              borderRadius: 10,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "primary.contrastText",
                textTransform: "uppercase",
              }}
            >
              {product.category}
            </Typography>
          </Box>
        </Box>

        {/* Info panel */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, sm: 4, md: 6, lg: 8 },
            py: { xs: 4, md: 6 },
            borderLeft: { md: "1px solid" },
            borderColor: { md: "divider" },
            order: { xs: 2, md: 2 },
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* Category — desktop only */}
          <Typography
            variant="overline"
            sx={{
              display: { xs: "none", md: "block" },
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              color: "primary.main",
              mb: 2,
            }}
          >
            {product.category}
          </Typography>

          {/* Name */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              lineHeight: 1.1,
              color: "text.primary",
              mb: { xs: 2, md: 3 },
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "2.6rem",
                lg: "3rem",
              },
            }}
          >
            {product.name}
          </Typography>

          {/* Gold rule */}
          <Box
            sx={{
              width: 32,
              height: 2,
              backgroundColor: "primary.main",
              mb: { xs: 2.5, md: 3 },
              borderRadius: 1,
            }}
          />

          {/* Details grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: { xs: 2, md: 2.5 },
              mb: { xs: 3, md: 4 },
            }}
          >
            {[
              { label: "Length", value: product.length },
              { label: "Hair Type", value: product.hairType },
              {
                label: "Stock",
                value: product.inStock
                  ? product.stockCount <= 2
                    ? `Only ${product.stockCount} left`
                    : "In Stock"
                  : "Sold Out",
                highlight: !product.inStock || product.stockCount <= 2,
              },
              {
                label: "Category",
                value: product.category,
              },
            ].map((detail) => (
              <Box
                key={detail.label}
                sx={{
                  pb: { xs: 2, md: 2.5 },
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.15em",
                    color: "text.secondary",
                    display: "block",
                    mb: 0.5,
                  }}
                >
                  {detail.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: (detail as any).highlight
                      ? "rgba(180,80,110,0.9)"
                      : "text.primary",
                  }}
                >
                  {detail.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Price */}
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
              variant="overline"
              sx={{
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                color: "text.secondary",
                display: "block",
                mb: 0.5,
              }}
            >
              Price
            </Typography>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: { xs: "2.4rem", md: "3rem" },
                  fontWeight: 600,
                  color: "text.primary",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                ${product.price}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  letterSpacing: "0.1em",
                  fontSize: "0.7rem",
                }}
              >
                USD
              </Typography>
            </Box>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Button
              component={Link}
              href={`/products/${product.slug}`}
              variant="contained"
              color="primary"
              sx={{
                flex: { xs: 1, sm: "none" },
                px: { xs: 2, md: 3 },
                py: 1.4,
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                minWidth: 120,
              }}
            >
              View Product
            </Button>
            <Button
              variant="outlined"
              disabled={!product.inStock}
              onClick={() => addItem(product, 1)}
              startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: "1rem" }} />}
              sx={{
                flex: { xs: 1, sm: "none" },
                px: { xs: 2, md: 3 },
                py: 1.4,
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                borderColor: "divider",
                color: "text.primary",
                minWidth: 140,
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  backgroundColor: "transparent",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Bottom dot row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {products.map((_, i) => (
          <Box
            key={i}
            onClick={() => goTo(i)}
            sx={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                i === current ? "primary.main" : "rgba(0,0,0,0.12)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor:
                  i === current ? "primary.dark" : "rgba(0,0,0,0.25)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
