import { getOrderStats } from "@/actions/order.actions";
import { Box } from "@mui/material";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { AuthProvider } from "@/lib/authContext";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stats = await getOrderStats();

  return (
    <AuthProvider>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#F8F4F0",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 240,
            flexShrink: 0,
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 200,
          }}
        >
          <DashboardSidebar desktopOnly />
        </Box>

        <DashboardSidebar mobileOnly />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            ml: { xs: 0, md: "240px" },
          }}
        >
          <DashboardTopbar pendingCount={stats.pending} />
          <Box
            component="main"
            sx={{
              flex: 1,
              p: { xs: 2, md: 4 },
              overflowY: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </AuthProvider>
  );
}
