"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  Chip,
  Divider,
  Breadcrumbs,
  IconButton,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useCart } from "@/lib/cartContext";
import { useRouter } from "next/navigation";

import { SerializedProduct } from "@/types/serialized";

export default function ProductDetail({
  product,
}: {
  product: SerializedProduct;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 4 }}
        >
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            {
              label: product.category,
              href: `/shop?category=${product.category}`,
            },
          ].map((crumb) => (
            <Typography
              key={crumb.href}
              component={Link}
              href={crumb.href}
              variant="caption"
              sx={{
                textDecoration: "none",
                color: "text.secondary",
                letterSpacing: "0.05em",
                "&:hover": { color: "primary.main" },
              }}
            >
              {crumb.label}
            </Typography>
          ))}
          <Typography
            variant="caption"
            sx={{ color: "primary.main", letterSpacing: "0.05em" }}
          >
            {product.name}
          </Typography>
        </Breadcrumbs>

        {/* Main content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Left — Images */}
          <Box>
            {/* Main image */}
            <Box
              sx={{
                position: "relative",
                height: { xs: 380, md: 560 },
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#F8F0F3",
                mb: 2,
              }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
              />

              {/* Stock badge */}
              {product.stockCount <= 2 && product.inStock && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    backgroundColor: "rgba(180,80,110,0.92)",
                    color: "#FAF7F2",
                    px: 2,
                    py: 0.6,
                    borderRadius: 1,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Only {product.stockCount} left
                </Box>
              )}
            </Box>

            {/* Thumbnail strip */}
            <Stack sx={{ flexDirection: "row", gap: 1.5 }}>
              {product.images.map((img, i) => (
                <Box
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  sx={{
                    position: "relative",
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor:
                      selectedImage === i ? "primary.main" : "transparent",
                    opacity: selectedImage === i ? 1 : 0.6,
                    transition: "all 0.2s ease",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="80px"
                  />
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Right — Product info */}
          <Box>
            {/* Category */}
            <Typography
              variant="overline"
              sx={{
                color: "rgba(180,80,110,0.8)",
                letterSpacing: "0.2em",
                display: "block",
                mb: 1,
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
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              {product.name}
            </Typography>

            {/* Rating row */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
              <Rating
                value={product.rating}
                precision={0.1}
                readOnly
                size="small"
                sx={{ "& .MuiRating-iconFilled": { color: "primary.main" } }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.rating} ({product.reviewCount} reviews)
              </Typography>
            </Box>

            {/* Price */}
            <Box
              sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 3 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontFamily: '"Inter", sans-serif',
                  color: "text.primary",
                }}
              >
                ${product.price}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "line-through",
                    fontWeight: 400,
                  }}
                >
                  ${product.originalPrice}
                </Typography>
              )}
              {product.originalPrice && (
                <Chip
                  label={`Save $${product.originalPrice - product.price}`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(180,80,110,0.1)",
                    color: "rgba(180,80,110,0.9)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                  }}
                />
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Product specs */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                mb: 3,
              }}
            >
              {[
                { label: "Hair Type", value: product.hairType },
                { label: "Length", value: product.length },
                { label: "Color", value: product.color },
                {
                  label: "In Stock",
                  value: product.inStock
                    ? `${product.stockCount} available`
                    : "Sold out",
                },
              ].map((spec) => (
                <Box
                  key={spec.label}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(201,162,39,0.04)",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      display: "block",
                      mb: 0.5,
                    }}
                  >
                    {spec.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {spec.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.9,
                mb: 3,
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: "italic",
                fontSize: "1.05rem",
              }}
            >
              {product.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Quantity selector */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  display: "block",
                  mb: 1.5,
                }}
              >
                Quantity
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Box
                  sx={{
                    width: 48,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {quantity}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() =>
                    setQuantity(Math.min(product.stockCount, quantity + 1))
                  }
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", ml: 1 }}
                >
                  {product.stockCount} available
                </Typography>
              </Box>
            </Box>

            {/* CTA Buttons */}
            <Stack
              sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 4 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={!product.inStock}
                onClick={handleAddToCart}
                sx={{ py: 1.8 }}
              >
                {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
                disabled={!product.inStock}
                onClick={() => {
                  addItem(product, quantity);
                  router.push("/checkout");
                }}
                sx={{ py: 1.8 }}
              >
                Buy Now
              </Button>
            </Stack>

            {/* Trust badges */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 3,
                borderRadius: 2,
                backgroundColor: "rgba(201,162,39,0.04)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {[
                {
                  icon: (
                    <VerifiedIcon
                      sx={{ fontSize: "1.1rem", color: "primary.main" }}
                    />
                  ),
                  text: "100% premium human hair — ethically sourced",
                },
                {
                  icon: (
                    <LocalShippingOutlinedIcon
                      sx={{ fontSize: "1.1rem", color: "primary.main" }}
                    />
                  ),
                  text: "Ships within 1–2 business days across the US",
                },
                {
                  icon: (
                    <StorefrontOutlinedIcon
                      sx={{ fontSize: "1.1rem", color: "primary.main" }}
                    />
                  ),
                  text: "Pickup available — contact us to arrange",
                },
              ].map((badge, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                >
                  {badge.icon}
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {badge.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Long description */}
        <Box
          sx={{
            mt: { xs: 6, md: 10 },
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            background: "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              mb: 3,
            }}
          >
            Product Details
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 2,
              maxWidth: 800,
            }}
            dangerouslySetInnerHTML={{ __html: product.longDescription }}
          />
        </Box>
      </Container>
    </Box>
  );
}
