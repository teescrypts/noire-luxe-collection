"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";

const shopLinks = [
  { label: "All Wigs", href: "/shop" },
  { label: "Lace Front", href: "/shop?category=Lace+Front" },
  { label: "Full Lace", href: "/shop?category=Full+Lace" },
  { label: "HD Lace", href: "/shop?category=HD+Lace" },
  { label: "Closure Wigs", href: "/shop?category=Closure" },
];

const helpLinks = [
  { label: "Track My Order", href: "/orders" },
  { label: "Shipping Info", href: "/#shipping" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.main",
        color: "background.default",
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: "0.05em",
                mb: 2,
              }}
            >
              Noire Luxe Collection
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
                mb: 3,
                maxWidth: 320,
              }}
            >
              Premium human hair wigs crafted for the modern woman. Luxury you
              can feel, confidence you can wear.
            </Typography>

            {/* Social icons */}
            <Stack direction="row" spacing={1}>
              {[
                {
                  icon: <InstagramIcon />,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  icon: <FacebookIcon />,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  icon: <PinterestIcon />,
                  href: "https://pinterest.com",
                  label: "Pinterest",
                },
              ].map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  size="small"
                  sx={{
                    color: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": {
                      color: "primary.main",
                      borderColor: "primary.main",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Shop links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                letterSpacing: "0.15em",
                display: "block",
                mb: 2,
              }}
            >
              Shop
            </Typography>
            <Stack spacing={1.5}>
              {shopLinks.map((link) => (
                <Typography
                  key={link.href}
                  component={Link}
                  href={link.href}
                  variant="body2"
                  sx={{
                    color: "background.default",
                    textDecoration: "none",
                    opacity: 0.8,
                    "&:hover": {
                      opacity: 1,
                      color: "primary.main",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Help links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                letterSpacing: "0.15em",
                display: "block",
                mb: 2,
              }}
            >
              Help
            </Typography>
            <Stack spacing={1.5}>
              {helpLinks.map((link) => (
                <Typography
                  key={link.href}
                  component={Link}
                  href={link.href}
                  variant="body2"
                  sx={{
                    color: "background.default",
                    textDecoration: "none",
                    opacity: 0.8,
                    "&:hover": {
                      opacity: 1,
                      color: "primary.main",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Contact info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                letterSpacing: "0.15em",
                display: "block",
                mb: 2,
              }}
            >
              Get In Touch
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: "Email", value: "hello@noireluxe.com" },
                { label: "Phone", value: "+1 (555) 000-0000" },
                { label: "Hours", value: "Mon–Fri, 9am–6pm EST" },
              ].map((item) => (
                <Box key={item.label}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "primary.main",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "background.default", opacity: 0.8 }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "divider", my: 6 }} />

        {/* Bottom bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "background.default", opacity: 0.5 }}
          >
            © {new Date().getFullYear()} Noire Luxe Collection. All rights
            reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Typography
                key={item}
                variant="caption"
                sx={{
                  color: "background.default",
                  opacity: 0.5,
                  cursor: "pointer",
                  "&:hover": { opacity: 1, color: "primary.main" },
                  transition: "all 0.2s ease",
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
