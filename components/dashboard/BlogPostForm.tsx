"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Typography,
} from "@mui/material";
import RichTextEditor from "./RichTextEditor";
import ImageUploader from "./ImageUploader";
import { BlogPost } from "@/types";

type PostForm = Partial<BlogPost> & {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readTime: number;
};

interface Props {
  value: PostForm;
  onChange: (val: PostForm) => void;
}

const blogCategories = ['All', 'Style Guide', 'Hair Care', 'Education'];

export default function BlogPostForm({ value, onChange }: Props) {
  const [tagInput, setTagInput] = useState("");

  const update = (field: string, val: unknown) =>
    onChange({ ...value, [field]: val });

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !value.tags.includes(tag)) {
      update("tags", [...value.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    update(
      "tags",
      value.tags.filter((t) => t !== tag),
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
      {/* Title */}
      <TextField
        label="Post Title"
        value={value.title}
        onChange={(e) => update("title", e.target.value)}
        fullWidth
        size="small"
      />

      {/* Category + read time */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={value.category}
            label="Category"
            onChange={(e) => update("category", e.target.value)}
          >
            {blogCategories
              .filter((c) => c !== "All")
              .map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          label="Read Time (minutes)"
          type="number"
          value={value.readTime}
          onChange={(e) => update("readTime", Number(e.target.value))}
          fullWidth
          size="small"
        />
      </Box>

      {/* Cover image uploader */}
      <ImageUploader
        values={value.coverImage ? [value.coverImage] : []}
        onChange={(urls) => update("coverImage", urls[0] ?? "")}
        label="Cover Image"
        max={1}
      />

      {/* Excerpt */}
      <TextField
        label="Excerpt"
        value={value.excerpt}
        onChange={(e) => update("excerpt", e.target.value)}
        fullWidth
        size="small"
        multiline
        rows={2}
        helperText="A short summary shown on the blog listing page"
      />

      {/* Tags */}
      <Box>
        <Typography
          variant="overline"
          sx={{
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "text.secondary",
            display: "block",
            mb: 1,
          }}
        >
          Tags
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
          {value.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => removeTag(tag)}
              sx={{
                borderRadius: 1,
                fontSize: "0.7rem",
                backgroundColor: "rgba(201,162,39,0.08)",
                color: "text.secondary",
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            placeholder="Add a tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            size="small"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            sx={{ flex: 1 }}
          />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={addTag}
            sx={{ whiteSpace: "nowrap" }}
          >
            Add Tag
          </Button>
        </Box>
      </Box>

      {/* Rich text content */}
      <Box>
        <Typography
          variant="overline"
          sx={{
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "text.secondary",
            display: "block",
            mb: 1,
          }}
        >
          Content
        </Typography>
        <RichTextEditor
          value={value.content}
          onChange={(val) => update("content", val)}
        />
      </Box>
    </Box>
  );
}
