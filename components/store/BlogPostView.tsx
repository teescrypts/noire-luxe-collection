import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BlogPost } from "@/types";

interface Props {
  post: BlogPost;
  related: BlogPost[];
}

export default function BlogPostView({ post, related }: Props) {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, md: 480 },
          overflow: "hidden",
          backgroundColor: "#1a0a0f",
        }}
      >
        <Box
          component="img"
          src={post.coverImage}
          alt={post.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.45,
          }}
        />

        {/* Overlay gradient */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(to top, rgba(26,10,15,0.95) 0%, rgba(26,10,15,0.3) 100%),
              radial-gradient(ellipse at 30% 50%, rgba(180,80,110,0.2) 0%, transparent 60%)
            `,
          }}
        />

        {/* Hero content */}
        <Container
          maxWidth="md"
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            pb: { xs: 4, md: 6 },
            width: "100%",
          }}
        >
          <Chip
            label={post.category}
            size="small"
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              fontWeight: 700,
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              borderRadius: 1,
              mb: 2,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "#FAF7F2",
              lineHeight: 1.2,
              mb: 3,
              fontSize: { xs: "1.8rem", md: "2.8rem" },
            }}
          >
            {post.title}
          </Typography>

          {/* Meta row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <CalendarTodayOutlinedIcon
                sx={{ fontSize: "0.85rem", color: "rgba(201,162,39,0.8)" }}
              />
              <Typography
                variant="caption"
                sx={{ color: "rgba(250,247,242,0.7)" }}
              >
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <AccessTimeIcon
                sx={{ fontSize: "0.85rem", color: "rgba(201,162,39,0.8)" }}
              />
              <Typography
                variant="caption"
                sx={{ color: "rgba(250,247,242,0.7)" }}
              >
                {post.readTime} min read
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Article body */}
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        {/* Back link */}
        <Button
          component={Link}
          href="/blog"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "text.secondary",
            mb: 5,
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "transparent",
            },
          }}
        >
          Back to Journal
        </Button>

        {/* Excerpt */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            fontSize: "1.3rem",
            color: "rgba(180,80,110,0.85)",
            lineHeight: 1.7,
            mb: 4,
            pb: 4,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {post.excerpt}
        </Typography>

        {/* Article content */}
        <Box
          dangerouslySetInnerHTML={{ __html: post.content }}
          sx={{
            "& h2": {
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              color: "text.primary",
              mt: 5,
              mb: 2,
              lineHeight: 1.3,
            },
            "& p": {
              fontFamily: '"Inter", sans-serif',
              fontSize: "1rem",
              color: "text.secondary",
              lineHeight: 1.9,
              mb: 2.5,
            },
            "& h2:first-of-type": {
              mt: 0,
            },
          }}
        />

        {/* Tags */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mt: 6,
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {post.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                borderRadius: 1,
                fontSize: "0.7rem",
                backgroundColor: "rgba(201,162,39,0.06)",
                color: "text.secondary",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  backgroundColor: "rgba(201,162,39,0.12)",
                  borderColor: "primary.main",
                },
              }}
            />
          ))}
        </Box>

        {/* CTA box */}
        <Box
          sx={{
            mt: 6,
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            background: "linear-gradient(135deg, #2d1020 0%, #1a0a0f 100%)",
            border: "1px solid rgba(201,162,39,0.2)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 50% 50%, rgba(180,80,110,0.15) 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "rgba(201,162,39,0.8)",
              display: "block",
              mb: 1,
              position: "relative",
              zIndex: 1,
            }}
          >
            Ready to elevate your look?
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "#FAF7F2",
              mb: 3,
              position: "relative",
              zIndex: 1,
            }}
          >
            Shop The Collection
          </Typography>
          <Button
            component={Link}
            href="/shop"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 5, position: "relative", zIndex: 1 }}
          >
            Browse All Wigs
          </Button>
        </Box>
      </Container>

      {/* Related posts */}
      {related.length > 0 && (
        <Box
          sx={{
            py: { xs: 6, md: 8 },
            background: "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 700,
                mb: 4,
              }}
            >
              You Might Also Like
            </Typography>

            <Grid container spacing={3}>
              {related.map((r) => (
                <Grid key={r.id} size={{ xs: 12, sm: 6 }}>
                  <Card
                    component={Link}
                    href={`/blog/${r.slug}`}
                    sx={{
                      textDecoration: "none",
                      height: "100%",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(180,80,110,0.1)",
                      },
                      "&:hover .related-image": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 180,
                        overflow: "hidden",
                        backgroundColor: "#F8F0F3",
                      }}
                    >
                      <Box
                        component="img"
                        src={r.coverImage}
                        alt={r.title}
                        className="related-image"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Chip
                        label={r.category}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(201,162,39,0.08)",
                          color: "primary.dark",
                          fontWeight: 600,
                          fontSize: "0.62rem",
                          borderRadius: 1,
                          mb: 1.5,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          lineHeight: 1.3,
                          color: "text.primary",
                        }}
                      >
                        {r.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      <Divider />
    </Box>
  );
}
