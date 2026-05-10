"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { sendContactFormEmail } from "@/actions/email.actions";
import {
  validateContact,
  getFieldError,
  ValidationError,
} from "@/lib/validation";

import { SerializedStoreInfo } from "@/types/serialized";

interface Props {
  storeInfo: SerializedStoreInfo;
}

export default function ContactView({ storeInfo }: Props) {
  const [fieldErrors, setFieldErrors] = useState<ValidationError[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setFieldErrors([]);

    const { valid, errors } = validateContact({
      name: form.name,
      email: form.email,
      message: form.message,
    });

    if (!valid) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      await sendContactFormEmail({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: <EmailOutlinedIcon sx={{ fontSize: "1.4rem" }} />,
      label: "Email Us",
      value: storeInfo.email,
      sub: "We reply within 24 hours",
    },
    {
      icon: <PhoneOutlinedIcon sx={{ fontSize: "1.4rem" }} />,
      label: "Call Us",
      value: storeInfo.phone || "Contact us by email",
      sub: storeInfo.supportHours,
    },
    {
      icon: <AccessTimeOutlinedIcon sx={{ fontSize: "1.4rem" }} />,
      label: "Business Hours",
      value: storeInfo.supportHours,
      sub: "Closed on weekends",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 8, md: 12 },
          background: `
            linear-gradient(160deg,
              #1a0a0f 0%,
              #2d1020 40%,
              #1a0a0f 100%
            )
          `,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(180,80,110,0.25) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 30%, rgba(201,162,39,0.12) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "rgba(201,162,39,0.9)",
              display: "block",
              mb: 2,
            }}
          >
            We would love to hear from you
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "#FAF7F2",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Get In Touch
          </Typography>

          {/* Decorative divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                height: "1px",
                width: 80,
                background:
                  "linear-gradient(to right, transparent, rgba(201,162,39,0.6))",
              }}
            />
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "rgba(201,162,39,0.8)",
              }}
            />
            <Box
              sx={{
                height: "1px",
                width: 80,
                background:
                  "linear-gradient(to left, transparent, rgba(201,162,39,0.6))",
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Main content */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6}>
          {/* Left — Contact info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  color: "rgba(180,80,110,0.8)",
                  display: "block",
                  mb: 1,
                }}
              >
                Reach out anytime
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Contact Details
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.9 }}
              >
                Whether you have a question about a product, your order, or just
                want to say hello — we are always happy to help.
              </Typography>
            </Box>

            {/* Contact cards */}
            <Stack sx={{ gap: 2, mb: 5 }}>
              {contactDetails.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: "0 4px 16px rgba(201,162,39,0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      backgroundColor: "rgba(201,162,39,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.main",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        color: "text.secondary",
                        display: "block",
                        lineHeight: 1,
                        mb: 0.5,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, mb: 0.3 }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {item.sub}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            {/* Social links */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "text.secondary",
                  display: "block",
                  mb: 2,
                }}
              >
                Follow Us
              </Typography>
              <Stack sx={{ flexDirection: "row", gap: 1.5 }}>
                {[
                  {
                    icon: <InstagramIcon />,
                    label: "Instagram",
                    href: storeInfo.instagram || "https://instagram.com",
                  },
                  {
                    icon: <FacebookIcon />,
                    label: "Facebook",
                    href: storeInfo.facebook || "https://facebook.com",
                  },
                ].map((social) => (
                  <Box
                    key={social.label}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "text.secondary",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        color: "primary.main",
                        backgroundColor: "rgba(201,162,39,0.04)",
                      },
                    }}
                  >
                    {social.icon}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Right — Contact form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  color: "rgba(180,80,110,0.8)",
                  display: "block",
                  mb: 1,
                }}
              >
                Send us a message
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                  mb: 4,
                }}
              >
                We'll Get Back to You
              </Typography>

              {submitted ? (
                <Alert
                  severity="success"
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "rgba(201,162,39,0.08)",
                    color: "primary.dark",
                    border: "1px solid",
                    borderColor: "primary.main",
                    "& .MuiAlert-icon": { color: "primary.main" },
                  }}
                >
                  Thank you for reaching out! We will get back to you within 24
                  hours.
                </Alert>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2.5,
                    }}
                  >
                    <TextField
                      label="Your Name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      fullWidth
                      size="small"
                      error={!!getFieldError(fieldErrors, "name")}
                      helperText={getFieldError(fieldErrors, "name")}
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      fullWidth
                      size="small"
                      error={!!getFieldError(fieldErrors, "email")}
                      helperText={getFieldError(fieldErrors, "email")}
                    />
                  </Box>

                  <TextField
                    label="Subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    fullWidth
                    size="small"
                    placeholder="e.g. Question about my order"
                  />

                  <TextField
                    label="Message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    fullWidth
                    multiline
                    rows={6}
                    error={!!getFieldError(fieldErrors, "message")}
                    helperText={getFieldError(fieldErrors, "message")}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleSubmit}
                      disabled={loading}
                      sx={{ px: 6, py: 1.8 }}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
