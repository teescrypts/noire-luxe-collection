import { Box, Skeleton, Grid } from "@mui/material";

export default function DashboardLoading() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Page title skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={160} height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={240} height={40} />
      </Box>

      {/* Stat cards skeleton */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3, 4].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Skeleton
              variant="rectangular"
              height={120}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Content skeleton */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Skeleton
            variant="rectangular"
            height={360}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Skeleton
            variant="rectangular"
            height={360}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
