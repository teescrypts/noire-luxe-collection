"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Chip,
  Divider,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import BlogPostForm from "./BlogPostForm";
import DeleteDialog from "./DeleteDialog";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { BlogPost } from "@/types";
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  togglePublished,
} from "@/actions/blog.actions";
import { SerializedBlogPost } from "@/types/serialized";

const emptyPost = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "Style Guide",
  tags: [] as string[],
  readTime: 5,
};

export default function DashboardBlog({
  initialPosts,
}: {
  initialPosts: SerializedBlogPost[];
}) {
  const [postList, setPostList] = useState<SerializedBlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editPost, setEditPost] = useState<
    typeof emptyPost & Partial<BlogPost>
  >(emptyPost);

  const filtered = postList.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditPost(emptyPost);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const openEdit = (post: SerializedBlogPost) => {
    setEditPost(post as any);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editPost.title || !editPost.content) return;

    try {
      if (isEditing && "_id" in editPost) {
        const updated = await updateBlogPost(editPost._id as string, editPost);
        setPostList((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p)),
        );
      } else {
        const created = await createBlogPost(editPost as any);
        setPostList((prev) => [...prev, created]);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error("Save blog post error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlogPost(id);
      setPostList((prev) => prev.filter((p) => p._id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error("Delete blog post error:", error);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "rgba(180,80,110,0.8)",
              display: "block",
              mb: 0.5,
            }}
          >
            Manage your content
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
            }}
          >
            Blog Posts
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openAdd}
          sx={{ whiteSpace: "nowrap" }}
        >
          New Post
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            width: { xs: "100%", sm: 320 },
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <SearchIcon
                  sx={{ fontSize: "1rem", color: "text.secondary", mr: 1 }}
                />
              ),
            },
          }}
        />
      </Box>

      {/* Posts list */}
      <Card
        sx={{
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: "1fr 140px 100px 80px 100px",
            gap: 2,
            px: 3,
            py: 1.5,
            backgroundColor: "rgba(201,162,39,0.04)",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {["Post", "Category", "Date", "Read time", "Actions"].map((h) => (
            <Typography
              key={h}
              variant="overline"
              sx={{
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                color: "text.secondary",
              }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {/* Rows */}
        {filtered.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <ArticleOutlinedIcon
              sx={{ fontSize: "3rem", color: "divider", mb: 2 }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              No posts found
            </Typography>
          </Box>
        ) : (
          filtered.map((post, i) => (
            <Box key={post._id}>
              <Box
                sx={{
                  px: 3,
                  py: 2.5,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr auto",
                    md: "1fr 140px 100px 80px 100px",
                  },
                  gap: 2,
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "rgba(201,162,39,0.02)",
                  },
                }}
              >
                {/* Title + excerpt */}
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 0.4,
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: "1rem",
                    }}
                    noWrap
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {post.excerpt}
                  </Typography>

                  {/* Mobile meta */}
                  <Box
                    sx={{
                      display: { xs: "flex", md: "none" },
                      gap: 1,
                      mt: 1,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      label={post.category}
                      size="small"
                      sx={{
                        fontSize: "0.6rem",
                        height: 18,
                        borderRadius: 1,
                        backgroundColor: "rgba(201,162,39,0.08)",
                        color: "text.secondary",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.4,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {post.readTime} min
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Category — desktop */}
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Chip
                    label={post.category}
                    size="small"
                    sx={{
                      fontSize: "0.68rem",
                      borderRadius: 1,
                      backgroundColor: "rgba(201,162,39,0.08)",
                      color: "primary.dark",
                      fontWeight: 500,
                    }}
                  />
                </Box>

                {/* Date — desktop */}
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>

                {/* Read time — desktop */}
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <AccessTimeIcon
                    sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {post.readTime} min
                  </Typography>
                </Box>

                {/* Actions */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    justifyContent: { xs: "flex-end", md: "flex-start" },
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={async () => {
                      const updated = await togglePublished(
                        post._id,
                        !post.published,
                      );
                      setPostList((prev) =>
                        prev.map((p) => (p._id === updated._id ? updated : p)),
                      );
                    }}
                    sx={{
                      color: post.published
                        ? "rgba(100,180,100,0.8)"
                        : "text.secondary",
                      "&:hover": {
                        color: post.published
                          ? "rgba(180,80,110,0.8)"
                          : "rgba(100,180,100,0.8)",
                      },
                    }}
                  >
                    {post.published ? (
                      <VisibilityOutlinedIcon fontSize="small" />
                    ) : (
                      <VisibilityOffOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => openEdit(post)}
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setDeleteId(post._id)}
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "rgba(180,80,110,0.8)" },
                    }}
                  >
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              {i < filtered.length - 1 && <Divider sx={{ mx: 3 }} />}
            </Box>
          ))
        )}
      </Card>

      {/* Add / Edit dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 3 } },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
            fontSize: "1.3rem",
            pb: 1,
          }}
        >
          {isEditing ? "Edit Post" : "New Blog Post"}
          <IconButton size="small" onClick={() => setDialogOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <BlogPostForm value={editPost} onChange={setEditPost} />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!editPost.title || !editPost.content}
          >
            {isEditing ? "Save Changes" : "Publish Post"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation */}
      <DeleteDialog
        open={!!deleteId}
        title="Delete Post?"
        message="This action cannot be undone. The post will be permanently removed from the blog."
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && handleDelete(deleteId)}
      />
    </Box>
  );
}
