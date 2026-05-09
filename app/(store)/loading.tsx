import { Box, Container, Skeleton } from "@mui/material";

export default function StoreLoading() {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Hero skeleton */}
      <Skeleton
        variant="rectangular"
        height={560}
        sx={{ backgroundColor: "rgba(0,0,0,0.06)" }}
      />

      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Section heading skeleton */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Skeleton
            variant="text"
            width={120}
            height={20}
            sx={{ mx: "auto", mb: 1 }}
          />
          <Skeleton
            variant="text"
            width={280}
            height={48}
            sx={{ mx: "auto", mb: 1 }}
          />
          <Skeleton
            variant="text"
            width={200}
            height={20}
            sx={{ mx: "auto" }}
          />
        </Box>

        {/* Product cards skeleton */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Box key={i}>
              <Skeleton
                variant="rectangular"
                height={280}
                sx={{ borderRadius: 2, mb: 1.5 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={16}
                sx={{ mb: 0.5 }}
              />
              <Skeleton
                variant="text"
                width="80%"
                height={24}
                sx={{ mb: 0.5 }}
              />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
