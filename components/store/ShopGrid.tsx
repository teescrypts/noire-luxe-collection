"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Typography,
  Grid,
  Button,
  Rating,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { SerializedProduct } from "@/types/serialized";
import { useShop } from "@/lib/shopContext";
import { useCart } from "@/lib/cartContext";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PaginationControl from "@/components/ui/Pagination";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

interface ShopGridProps {
  initialProducts: SerializedProduct[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export default function ShopGrid({
  initialProducts,
  totalItems,
  totalPages,
  currentPage,
  itemsPerPage,
}: ShopGridProps) {
  const { sortBy, setSortBy, filterProducts } = useShop();
  const { addItem } = useCart();

  const filtered = filterProducts(initialProducts);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      {/* Toolbar */}
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </Typography>

        {/* Sort */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Sort:
          </Typography>
          <FormControl size="small">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{
                fontSize: "0.85rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "divider",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
            >
              {sortOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Results count */}
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
      </Typography>

      {/* Products grid */}
      <Grid container spacing={3}>
        {filtered.map((product: SerializedProduct) => (
          <Grid key={product._id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.35s ease",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: "0 12px 40px rgba(180,80,110,0.12)",
                  transform: "translateY(-4px)",
                },
                "&:hover .product-actions": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
                "&:hover .product-image": {
                  transform: "scale(1.06)",
                },
              }}
            >
              {/* Stock badge */}
              {product.stockCount <= 2 && product.inStock && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    zIndex: 2,
                    backgroundColor: "rgba(180,80,110,0.92)",
                    color: "#FAF7F2",
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 1,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Only {product.stockCount} left
                </Box>
              )}

              {/* Sold out overlay */}
              {!product.inStock && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(255,255,255,0.75)",
                    zIndex: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: "0.25em",
                      color: "text.secondary",
                      fontSize: "0.8rem",
                    }}
                  >
                    Sold Out
                  </Typography>
                </Box>
              )}

              {/* Image container */}
              {/* Image container — no Link wrapper to avoid nested <a> */}
              <Box
                sx={{
                  display: "block",
                  position: "relative",
                  height: 280,
                  overflow: "hidden",
                  backgroundColor: "#F8F0F3",
                  cursor: "pointer",
                }}
                onClick={() =>
                  (window.location.href = `/products/${product.slug}`)
                }
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="product-image"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />

                {/* Hover overlay — Add to Cart only, no link button */}
                <Box
                  className="product-actions"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    display: "flex",
                    gap: 1,
                    background:
                      "linear-gradient(to top, rgba(26,10,15,0.85), transparent)",
                    opacity: 0,
                    transform: "translateY(8px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    disabled={!product.inStock}
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(product, 1);
                    }}
                    sx={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.08em",
                      py: 0.8,
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>

              {/* Product info */}
              <Box
                sx={{
                  p: 2.5,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Category + length row */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "rgba(180,80,110,0.8)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.15em",
                      lineHeight: 1,
                    }}
                  >
                    {product.category}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "rgba(201,162,39,0.1)",
                      px: 1,
                      py: 0.3,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.65rem",
                        color: "primary.dark",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {product.length}
                    </Typography>
                  </Box>
                </Box>

                {/* Name */}
                <Typography
                  component={Link}
                  href={`/products/${product.slug}`}
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    textDecoration: "none",
                    color: "text.primary",
                    lineHeight: 1.3,
                    mb: 1,
                    display: "block",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s ease",
                  }}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
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
                </Box>

                {/* Price row */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "auto",
                    pt: 1.5,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        fontFamily: '"Inter", sans-serif',
                        color: "text.primary",
                      }}
                    >
                      ${product.price}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          textDecoration: "line-through",
                        }}
                      >
                        ${product.originalPrice}
                      </Typography>
                    )}
                  </Box>

                  {/* Mobile buttons — visible always on mobile, hidden on desktop */}
                  <Box
                    sx={{
                      display: { xs: "flex", md: "none" },
                      gap: 1,
                    }}
                  >
                    <Button
                      component={Link}
                      href={`/products/${product.slug}`}
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{
                        fontSize: "0.65rem",
                        py: 0.6,
                        px: 1.2,
                        minWidth: "auto",
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      disabled={!product.inStock}
                      onClick={() => addItem(product, 1)}
                      sx={{
                        fontSize: "0.65rem",
                        py: 0.6,
                        px: 1.2,
                        minWidth: "auto",
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        label="products"
      />
    </Box>
  );
}
