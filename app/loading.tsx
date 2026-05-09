import { Box } from "@mui/material";

export default function GlobalLoading() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        {/* Animated logo mark */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 3,
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "primary.main",
                animation: "pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
                "@keyframes pulse": {
                  "0%, 100%": {
                    opacity: 0.3,
                    transform: "scale(0.8)",
                  },
                  "50%": {
                    opacity: 1,
                    transform: "scale(1.2)",
                  },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
