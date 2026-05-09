import { getProducts, searchProducts } from "@/actions/product.actions";
import { ShopProvider } from "@/lib/shopContext";
import ShopFilters from "@/components/store/ShopFilters";
import ShopGrid from "@/components/store/ShopGrid";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { Suspense } from "react";

export const metadata = { title: "Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}) {
  const { search, category, page: pageParam } = await searchParams;
  const page = parseInt(pageParam ?? "1", 10);

  const data = search
    ? await searchProducts(search, page)
    : await getProducts(category, page);

  // const products = search
  //   ? await searchProducts(search)
  //   : await getProducts(category);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}>
      <Container maxWidth="xl">
        {/* Page header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          {search ? (
            <>
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
                Search results for
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 2,
                }}
              >
                "{search}"
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {data.total}{" "}
                {data.total === 1 ? "product" : "products"} found
              </Typography>
            </>
          ) : (
            <>
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
                100% Human Hair
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 2,
                }}
              >
                The Full Collection
              </Typography>
            </>
          )}

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

        <ShopProvider>
          {/* Mobile sticky filter */}
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              position: "sticky",
              top: 64,
              zIndex: 100,
              backgroundColor: "background.default",
              py: 1.5,
              mb: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <ShopFilters mobileOnly />
          </Box>

          {/* Filters + Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
              gap: 4,
              alignItems: "start",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <ShopFilters desktopOnly />
            </Box>
            <Suspense
              fallback={
                <Box sx={{ py: 4, textAlign: "center" }}>
                  <CircularProgress sx={{ color: "primary.main" }} />
                </Box>
              }
            >
              <ShopGrid
                initialProducts={data.products}
                totalItems={data.total}
                totalPages={data.totalPages}
                currentPage={data.page}
                itemsPerPage={data.limit}
              />
            </Suspense>
          </Box>
        </ShopProvider>
      </Container>
    </Box>
  );
}
