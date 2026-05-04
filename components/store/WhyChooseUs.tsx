import { Box, Container, Typography, Grid } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const reasons = [
  {
    icon: <VerifiedIcon sx={{ fontSize: "2rem" }} />,
    title: "100% Human Hair",
    description:
      "Every single piece in our collection is crafted from premium, ethically sourced human hair. No synthetic blends — ever.",
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: "2rem" }} />,
    title: "Luxury Quality",
    description:
      "Each wig is hand-inspected before shipping. We hold ourselves to the highest standard so you always receive perfection.",
  },
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: "2rem" }} />,
    title: "Fast US Shipping",
    description:
      "Orders ship within 1–2 business days. Express options available at checkout for those who just cannot wait.",
  },
  {
    icon: <SecurityOutlinedIcon sx={{ fontSize: "2rem" }} />,
    title: "Secure Payments",
    description:
      "All transactions are encrypted and processed securely via Stripe. Your financial information is always safe with us.",
  },
  {
    icon: <HeadsetMicOutlinedIcon sx={{ fontSize: "2rem" }} />,
    title: "Dedicated Support",
    description:
      "Have a question? Our team is available Monday through Friday to help you find your perfect style.",
  },
];

export default function WhyChooseUs() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(135deg, #FDF5F7 0%, #FDE8EE 50%, #FDF5F7 100%)",
      }}
    >
      <Container maxWidth="xl">
        {/* Section header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              letterSpacing: "0.3em",
              display: "block",
              mb: 2,
            }}
          >
            The Noire Luxe Difference
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Why Choose Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 480,
              mx: "auto",
            }}
          >
            We are not just selling wigs — we are delivering confidence, luxury
            and an experience you will want to repeat.
          </Typography>
        </Box>

        {/* Reasons grid */}
        <Grid container spacing={4}>
          {reasons.map((reason) => (
            <Grid key={reason.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 32px rgba(201,162,39,0.1)",
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    backgroundColor: "rgba(201,162,39,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary.main",
                    mb: 3,
                  }}
                >
                  {reason.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 700,
                    fontSize: "1.3rem",
                    mb: 1.5,
                  }}
                >
                  {reason.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                  }}
                >
                  {reason.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
