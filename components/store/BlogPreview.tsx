"use client"

import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { blogPosts } from "@/data/blog";

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "background.default" }}>
      <Container maxWidth="xl">
        {/* Section header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 8,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: "0.3em",
                display: "block",
                mb: 2,
              }}
            >
              Hair Tips & Trends
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 700,
              }}
            >
              From The Blog
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/blog"
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            View All Posts
          </Button>
        </Box>

        {/* Blog cards */}
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid key={post.id} size={{ xs: 12, md: index === 0 ? 6 : 3 }}>
              <Card
                component={Link}
                href={`/blog/${post.slug}`}
                sx={{
                  textDecoration: "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover .blog-image": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {/* Image */}
                <CardMedia
                  sx={{
                    position: "relative",
                    height: index === 0 ? 360 : 220,
                    overflow: "hidden",
                    backgroundColor: "grey.100",
                  }}
                >
                  <Box
                    component="img"
                    src={post.coverImage}
                    alt={post.title}
                    className="blog-image"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                </CardMedia>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Category + read time */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={post.category}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(201,162,39,0.1)",
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "text.secondary",
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: "0.85rem" }} />
                      <Typography variant="caption">
                        {post.readTime} min read
                      </Typography>
                    </Box>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant={index === 0 ? "h5" : "h6"}
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 700,
                      mb: 1.5,
                      color: "text.primary",
                      lineHeight: 1.3,
                      fontSize: index === 0 ? "1.6rem" : "1.15rem",
                    }}
                  >
                    {post.title}
                  </Typography>

                  {/* Excerpt — only on large card */}
                  {index === 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.8,
                        mb: 2,
                      }}
                    >
                      {post.excerpt}
                    </Typography>
                  )}

                  {/* Date */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
