"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "@/lib/cartContext";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
 const { totalItems } = useCart();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "secondary.main",
          borderBottom: "1px solid",
          borderColor: "rgba(201,162,39,0.2)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: "64px", md: "80px" },
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 120, md: 160 },
                  height: { xs: 48, md: 64 },
                }}
              >
                <Image
                  src="/images/noire-logo.png"
                  alt="Noire Luxe Collection"
                  width={160}
                  height={64}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  priority
                />
              </Box>
            </Link>

            {/* Desktop nav links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: "background.default",
                    fontFamily: "body1.fontFamily",
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    px: 2,
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            {/* Right side icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Cart */}
              <IconButton
                component={Link}
                href="/cart"
                sx={{
                  color: "background.default",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Badge
                  badgeContent={totalItems}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: 700,
                      fontSize: "0.65rem",
                    },
                  }}
                >
                  <ShoppingBagOutlinedIcon />
                </Badge>
              </IconButton>

              {/* Login — desktop only */}
              <Button
                component={Link}
                href="/auth"
                variant="outlined"
                size="small"
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  px: 2,
                }}
              >
                Login
              </Button>

              {/* Mobile menu icon */}
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "background.default",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: "secondary.main",
              borderLeft: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: "background.default" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ px: 2, pt: 2 }}>
          {navLinks.map((link) => (
            <ListItem
              key={link.href}
              component={Link}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(201,162,39,0.08)",
                },
              }}
            >
              <ListItemText
                primary={link.label}
                slotProps={{
                  primary: {
                    sx: {
                      color: "background.default",
                      fontSize: "0.85rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2, mt: 2 }} />

        <Box sx={{ px: 3, pt: 3 }}>
          <Button
            component={Link}
            href="/auth"
            variant="outlined"
            fullWidth
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
