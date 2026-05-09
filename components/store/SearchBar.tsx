"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
  Modal,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { globalSearch, SearchResults } from "@/actions/search.actions";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchBar({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults(null);
    }
  }, [open]);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const data = await globalSearch(q);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter" && query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const hasResults =
    results && (results.products.length > 0 || results.posts.length > 0);

  const isEmpty =
    results &&
    results.products.length === 0 &&
    results.posts.length === 0 &&
    query.length >= 2;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{ zIndex: 1400 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "background.paper",
            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            maxHeight: "85vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search input */}
          <Box
            sx={{
              px: { xs: 2, md: 4 },
              py: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <SearchIcon sx={{ color: "text.secondary", flexShrink: 0 }} />
            <TextField
              inputRef={inputRef}
              fullWidth
              variant="standard"
              placeholder="Search products, blog posts..."
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              slotProps={{
                input: {
                  disableUnderline: true,
                  sx: {
                    fontSize: "1.1rem",
                    fontFamily: '"Cormorant Garamond", serif',
                  },
                },
              }}
            />
            {loading && (
              <CircularProgress
                size={18}
                sx={{ color: "primary.main", flexShrink: 0 }}
              />
            )}
            <IconButton onClick={onClose} size="small" sx={{ flexShrink: 0 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Results */}
          <Box sx={{ overflowY: "auto", flex: 1 }}>
            {/* Empty state */}
            {isEmpty && (
              <Box sx={{ px: 4, py: 6, textAlign: "center" }}>
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "text.secondary",
                  }}
                >
                  No results found for "{query}"
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block", mt: 1 }}
                >
                  Try searching with different keywords
                </Typography>
              </Box>
            )}

            {/* Default state */}
            {!query && (
              <Box sx={{ px: 4, py: 6, textAlign: "center" }}>
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "text.secondary",
                  }}
                >
                  Start typing to search the collection...
                </Typography>
              </Box>
            )}

            {/* Products results */}
            {hasResults && results.products.length > 0 && (
              <Box>
                <Box
                  sx={{
                    px: { xs: 2, md: 4 },
                    py: 1.5,
                    backgroundColor: "rgba(201,162,39,0.04)",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      color: "primary.main",
                    }}
                  >
                    Products ({results.products.length})
                  </Typography>
                </Box>

                {results.products.map((product) => (
                  <Box
                    key={product._id}
                    component={Link}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2.5,
                      px: { xs: 2, md: 4 },
                      py: 2,
                      textDecoration: "none",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      transition: "background-color 0.15s ease",
                      "&:hover": {
                        backgroundColor: "rgba(201,162,39,0.04)",
                      },
                    }}
                  >
                    {/* Thumbnail */}
                    <Box
                      sx={{
                        position: "relative",
                        width: 52,
                        height: 52,
                        borderRadius: 1.5,
                        overflow: "hidden",
                        backgroundColor: "#F8F0F3",
                        flexShrink: 0,
                      }}
                    >
                      {product.images?.[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="52px"
                        />
                      )}
                    </Box>

                    {/* Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {product.category} · {product.length}
                      </Typography>
                    </Box>

                    {/* Price */}
                    <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "text.primary",
                          fontFamily: '"Inter", sans-serif',
                        }}
                      >
                        ${product.price}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: product.inStock
                            ? "rgba(100,180,100,0.8)"
                            : "rgba(180,80,110,0.8)",
                          fontWeight: 600,
                          fontSize: "0.62rem",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {product.inStock ? "In Stock" : "Sold Out"}
                      </Typography>
                    </Box>

                    <ArrowForwardIcon
                      sx={{
                        fontSize: "0.9rem",
                        color: "text.secondary",
                        flexShrink: 0,
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* Blog results */}
            {hasResults && results.posts.length > 0 && (
              <Box>
                <Box
                  sx={{
                    px: { xs: 2, md: 4 },
                    py: 1.5,
                    backgroundColor: "rgba(180,80,110,0.04)",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      color: "rgba(180,80,110,0.8)",
                    }}
                  >
                    Blog Posts ({results.posts.length})
                  </Typography>
                </Box>

                {results.posts.map((post) => (
                  <Box
                    key={post._id}
                    component={Link}
                    href={`/blog/${post.slug}`}
                    onClick={onClose}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2.5,
                      px: { xs: 2, md: 4 },
                      py: 2,
                      textDecoration: "none",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      transition: "background-color 0.15s ease",
                      "&:hover": {
                        backgroundColor: "rgba(180,80,110,0.04)",
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 1.5,
                        backgroundColor: "rgba(180,80,110,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ArticleOutlinedIcon
                        sx={{
                          color: "rgba(180,80,110,0.7)",
                          fontSize: "1.4rem",
                        }}
                      />
                    </Box>

                    {/* Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          mb: 0.3,
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          display: "block",
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                    </Box>

                    <ArrowForwardIcon
                      sx={{
                        fontSize: "0.9rem",
                        color: "text.secondary",
                        flexShrink: 0,
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* View all results */}
            {hasResults && query && (
              <Box
                component={Link}
                href={`/shop?search=${encodeURIComponent(query)}`}
                onClick={onClose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  px: 4,
                  py: 2.5,
                  textDecoration: "none",
                  borderTop: "1px solid",
                  borderColor: "divider",
                  transition: "background-color 0.15s ease",
                  "&:hover": {
                    backgroundColor: "rgba(201,162,39,0.04)",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  View all results for "{query}"
                </Typography>
                <ArrowForwardIcon
                  sx={{ fontSize: "0.9rem", color: "primary.main" }}
                />
              </Box>
            )}
          </Box>

          {/* Keyboard hint */}
          <Box
            sx={{
              px: { xs: 2, md: 4 },
              py: 1.5,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              gap: 3,
            }}
          >
            {[
              { key: "↵", label: "to search all products" },
              { key: "ESC", label: "to close" },
            ].map((hint) => (
              <Box
                key={hint.key}
                sx={{ display: "flex", alignItems: "center", gap: 0.8 }}
              >
                <Box
                  sx={{
                    px: 1,
                    py: 0.2,
                    borderRadius: 0.5,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "rgba(0,0,0,0.03)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      fontFamily: '"Inter", monospace',
                      color: "text.secondary",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {hint.key}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {hint.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
