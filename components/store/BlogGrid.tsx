"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { SerializedBlogPost } from "@/types/serialized";

interface Props {
  initialPosts: SerializedBlogPost[];
  categories: string[];
}

export default function BlogGrid({ initialPosts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const posts =
    activeCategory === "All"
      ? initialPosts
      : initialPosts.filter((p) => p.category === activeCategory);

  const featured = initialPosts[0];

  return (
    <Box>
      {/* Category filter */}
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1, mb: 6 }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => setActiveCategory(cat)}
            sx={{
              borderRadius: 1,
              fontWeight: 500,
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              backgroundColor:
                activeCategory === cat ? "primary.main" : "transparent",
              color:
                activeCategory === cat
                  ? "primary.contrastText"
                  : "text.secondary",
              border: "1px solid",
              borderColor: activeCategory === cat ? "primary.main" : "divider",
              "&:hover": {
                backgroundColor:
                  activeCategory === cat
                    ? "primary.dark"
                    : "rgba(201,162,39,0.06)",
              },
            }}
          />
        ))}
      </Stack>

      {/* Featured post */}
      {activeCategory === "All" && featured && (
        <Card
          component={Link}
          href={`/blog/${featured.slug}`}
          sx={{
            textDecoration: "none",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            mb: 4,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "primary.main",
              boxShadow: "0 12px 40px rgba(180,80,110,0.1)",
            },
            "&:hover .featured-image": {
              transform: "scale(1.04)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: { xs: 260, md: 420 },
              overflow: "hidden",
              backgroundColor: "#F8F0F3",
            }}
          >
            <Box
              component="img"
              src={featured.coverImage}
              alt={featured.title}
              className="featured-image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Featured
            </Box>
          </Box>

          <CardContent
            sx={{
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
            }}
          >
            <Chip
              label={featured.category}
              size="small"
              sx={{
                alignSelf: "flex-start",
                backgroundColor: "rgba(180,80,110,0.1)",
                color: "rgba(180,80,110,0.9)",
                fontWeight: 600,
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                borderRadius: 1,
                mb: 3,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 700,
                lineHeight: 1.25,
                mb: 2,
                color: "text.primary",
                fontSize: { xs: "1.6rem", md: "2rem" },
              }}
            >
              {featured.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.9,
                mb: 3,
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: "italic",
                fontSize: "1.05rem",
              }}
            >
              {featured.excerpt}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <CalendarTodayOutlinedIcon
                  sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                />
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <AccessTimeIcon
                  sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                />
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {featured.readTime} min read
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Posts grid */}
      <Grid container spacing={3}>
        {posts
          .filter((p) =>
            activeCategory === "All" ? p._id !== featured?._id : true,
          )
          .map((post) => (
            <Grid key={post._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                component={Link}
                href={`/blog/${post.slug}`}
                sx={{
                  textDecoration: "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: "0 8px 32px rgba(180,80,110,0.1)",
                    transform: "translateY(-4px)",
                  },
                  "&:hover .post-image": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 220,
                    overflow: "hidden",
                    backgroundColor: "#F8F0F3",
                  }}
                >
                  <Box
                    component="img"
                    src={post.coverImage}
                    alt={post.title}
                    className="post-image"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={post.category}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(201,162,39,0.08)",
                        color: "primary.dark",
                        fontWeight: 600,
                        fontSize: "0.62rem",
                        letterSpacing: "0.08em",
                        borderRadius: 1,
                      }}
                    />
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <AccessTimeIcon
                        sx={{ fontSize: "0.8rem", color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {post.readTime} min
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      mb: 1.5,
                      fontSize: "1.15rem",
                      color: "text.primary",
                      flexGrow: 1,
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                      pt: 2,
                      borderTop: "1px solid",
                      borderColor: "divider",
                      mt: "auto",
                    }}
                  >
                    <CalendarTodayOutlinedIcon
                      sx={{ fontSize: "0.8rem", color: "text.secondary" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
