import { Box, Container, Skeleton } from "@mui/material";

export default function ShopLoading() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}>
      <Container maxWidth="xl">
        {/* Header skeleton */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Skeleton
            variant="text"
            width={120}
            height={20}
            sx={{ mx: "auto", mb: 1 }}
          />
          <Skeleton
            variant="text"
            width={300}
            height={56}
            sx={{ mx: "auto" }}
          />
        </Box>

        {/* Grid skeleton */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
            gap: 4,
          }}
        >
          {/* Filter sidebar skeleton */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Skeleton
              variant="rectangular"
              height={480}
              sx={{ borderRadius: 2 }}
            />
          </Box>

          {/* Products skeleton */}
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
                gap: 3,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Box key={i}>
                  <Skeleton
                    variant="rectangular"
                    height={280}
                    sx={{ borderRadius: 2, mb: 1.5 }}
                  />
                  <Skeleton
                    variant="text"
                    width="50%"
                    height={16}
                    sx={{ mb: 0.5 }}
                  />
                  <Skeleton
                    variant="text"
                    width="75%"
                    height={24}
                    sx={{ mb: 0.5 }}
                  />
                  <Skeleton variant="text" width="35%" height={20} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
