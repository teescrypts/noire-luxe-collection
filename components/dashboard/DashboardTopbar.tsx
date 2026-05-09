"use client";

import { usePathname } from "next/navigation";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/orders": "Orders",
  "/dashboard/products": "Products",
  "/dashboard/blog": "Blog",
  "/dashboard/settings": "Settings",
};

export default function DashboardTopbar({
  pendingCount = 0,
}: {
  pendingCount?: number;
}) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <Box
      sx={{
        height: 64,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Page title */}
      <Box sx={{ pl: { xs: 5, md: 0 } }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
            fontSize: "1.3rem",
            lineHeight: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", letterSpacing: "0.05em" }}
        >
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Box>

      {/* Right side */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {/* Notification bell */}
        <IconButton
          size="small"
          sx={{
            position: "relative",
            color: "text.secondary",
            "&:hover": { color: "primary.main" },
          }}
        >
          <NotificationsNoneOutlinedIcon fontSize="small" />
          {pendingCount > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "rgba(180,80,110,0.9)",
              }}
            />
          )}
        </IconButton>

        {/* Owner avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: "0.85rem" }}
            >
              Store Owner
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.72rem" }}
            >
              Admin
            </Typography>
          </Box>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #C9A227 0%, #B4547A 100%)",
              fontSize: "0.85rem",
              fontWeight: 700,
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            N
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}
