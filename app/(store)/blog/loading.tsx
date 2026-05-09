import { Box, Container, Skeleton, Grid } from "@mui/material";

export default function BlogLoading() {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Hero skeleton */}
      <Skeleton
        variant="rectangular"
        height={300}
        sx={{ backgroundColor: "rgba(0,0,0,0.08)" }}
      />

      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Category chips skeleton */}
        <Box sx={{ display: "flex", gap: 1, mb: 6 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={80}
              height={32}
              sx={{ borderRadius: 10 }}
            />
          ))}
        </Box>

        {/* Featured post skeleton */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            mb: 4,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Skeleton variant="rectangular" height={360} />
          <Skeleton
            variant="rectangular"
            height={360}
            sx={{ ml: { md: 0.5 } }}
          />
        </Box>

        {/* Posts grid skeleton */}
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton
                variant="rectangular"
                height={220}
                sx={{ borderRadius: 2, mb: 1.5 }}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={16}
                sx={{ mb: 0.5 }}
              />
              <Skeleton
                variant="text"
                width="85%"
                height={24}
                sx={{ mb: 0.5 }}
              />
              <Skeleton variant="text" width="60%" height={16} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
