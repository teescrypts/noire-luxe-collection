"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Drawer,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/lib/authContext";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: <DashboardOutlinedIcon fontSize="small" />,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: <ShoppingBagOutlinedIcon fontSize="small" />,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: <InventoryOutlinedIcon fontSize="small" />,
  },
  {
    label: "Blog",
    href: "/dashboard/blog",
    icon: <ArticleOutlinedIcon fontSize="small" />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <SettingsOutlinedIcon fontSize="small" />,
  },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0A0A0A",
        borderRight: "1px solid rgba(201,162,39,0.15)",
      }}
    >
      {/* Logo area */}
      <Box
        sx={{
          px: 3,
          py: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(201,162,39,0.15)",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "0.8rem",
              color: "rgba(201,162,39,0.7)",
              display: "block",
              lineHeight: 1,
              mb: 0.5,
            }}
          >
            Noire Luxe
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.7rem",
              color: "rgba(250,247,242,0.4)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Owner Dashboard
          </Typography>
        </Box>
        {onClose && (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "rgba(250,247,242,0.5)" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Nav items */}
      <List sx={{ px: 1.5, pt: 2, flex: 1 }}>
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={onClose}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1.2,
                  backgroundColor: isActive
                    ? "rgba(201,162,39,0.12)"
                    : "transparent",
                  border: "1px solid",
                  borderColor: isActive
                    ? "rgba(201,162,39,0.3)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(201,162,39,0.08)",
                    borderColor: "rgba(201,162,39,0.2)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 34,
                    color: isActive
                      ? "rgba(201,162,39,0.9)"
                      : "rgba(250,247,242,0.4)",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: "0.85rem",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive
                          ? "rgba(250,247,242,0.95)"
                          : "rgba(250,247,242,0.5)",
                        letterSpacing: "0.03em",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(201,162,39,0.15)", mx: 2 }} />

      {/* Logout */}
      <Box sx={{ px: 1.5, py: 2 }}>
        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1.2,
            "&:hover": {
              backgroundColor: "rgba(180,80,110,0.1)",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 34, color: "rgba(180,80,110,0.7)" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            slotProps={{
              primary: {
                sx: {
                  fontSize: "0.85rem",
                  color: "rgba(180,80,110,0.7)",
                  letterSpacing: "0.03em",
                },
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}

interface SidebarProps {
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export default function DashboardSidebar({
  mobileOnly,
  desktopOnly,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop sidebar content only
  if (desktopOnly) {
    return <SidebarContent />;
  }

  // Mobile toggle + drawer only
  if (mobileOnly) {
    return (
      <>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            display: { xs: "flex", md: "none" },
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 1200,
            backgroundColor: "#0A0A0A",
            color: "rgba(201,162,39,0.9)",
            width: 40,
            height: 40,
            border: "1px solid rgba(201,162,39,0.2)",
            borderRadius: 2,
            "&:hover": { backgroundColor: "#1a0a0f" },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>

        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          slotProps={{
            paper: {
              sx: { backgroundColor: "transparent", border: "none" },
            },
          }}
        >
          <SidebarContent onClose={() => setMobileOpen(false)} />
        </Drawer>
      </>
    );
  }

  return null;
}
