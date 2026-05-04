import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Rating,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  {
    id: 1,
    name: "Jasmine Williams",
    location: "Atlanta, GA",
    avatar: "J",
    rating: 5,
    product: "Body Wave Frontal Wig",
    comment:
      "I have tried so many wig companies and Noire Luxe is on a completely different level. The hair is incredibly soft, the lace is undetectable and it has lasted me over six months with proper care. I will never shop anywhere else.",
  },
  {
    id: 2,
    name: "Aisha Thompson",
    location: "Houston, TX",
    avatar: "A",
    rating: 5,
    product: "Straight Bundles",
    comment:
      "The straight bundles exceeded every expectation I had. Minimal shedding, zero tangling and the shine is absolutely gorgeous. I get compliments every single day. Fast shipping too — arrived in two days!",
  },
  {
    id: 3,
    name: "Brianna Carter",
    location: "Chicago, IL",
    avatar: "B",
    rating: 5,
    product: "Body Wave Closure Wig",
    comment:
      "As someone who is very particular about her hair, I was nervous ordering online. But the quality blew me away. The closure lays perfectly flat and the body wave pattern is everything. Highly recommend!",
  },
  {
    id: 4,
    name: "Destiny Monroe",
    location: "New York, NY",
    avatar: "D",
    rating: 5,
    product: "Straight Frontal Wig",
    comment:
      "The customer service alone deserves five stars. They helped me pick the right length and density for my head size. The wig arrived beautifully packaged and looks even better in person. A luxury experience from start to finish.",
  },
];

export default function Testimonials() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "secondary.main",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 80% 50%, rgba(201,162,39,0.08) 0%, transparent 60%),
                  radial-gradient(circle at 20% 30%, rgba(180,80,110,0.1) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
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
            Real Women, Real Results
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "background.default",
              mb: 2,
            }}
          >
            What Our Clients Say
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "background.default",
              opacity: 0.6,
              maxWidth: 480,
              mx: "auto",
            }}
          >
            Do not just take our word for it. Here is what our community of
            confident women have to say.
          </Typography>
        </Box>

        {/* Testimonials grid */}
        <Grid container spacing={3}>
          {testimonials.map((t) => (
            <Grid key={t.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "rgba(201,162,39,0.2)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(201,162,39,0.04)",
                  },
                }}
              >
                {/* Quote icon */}
                <FormatQuoteIcon
                  sx={{
                    color: "primary.main",
                    fontSize: "2.5rem",
                    opacity: 0.6,
                    mb: 2,
                    transform: "rotate(180deg)",
                  }}
                />

                {/* Rating */}
                <Rating
                  value={t.rating}
                  readOnly
                  size="small"
                  sx={{
                    mb: 2,
                    "& .MuiRating-iconFilled": { color: "primary.main" },
                  }}
                />

                {/* Comment */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "background.default",
                    opacity: 0.8,
                    lineHeight: 1.9,
                    flexGrow: 1,
                    mb: 3,
                    fontStyle: "italic",
                  }}
                >
                  "{t.comment}"
                </Typography>

                {/* Product tag */}
                <Typography
                  variant="caption"
                  sx={{
                    color: "primary.main",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "block",
                    mb: 2,
                  }}
                >
                  {t.product}
                </Typography>

                {/* Author */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 700,
                      fontSize: "1.1rem",
                    }}
                  >
                    {t.avatar}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "background.default",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {t.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "background.default",
                        opacity: 0.5,
                      }}
                    >
                      {t.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
