"use client";

import { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { uploadImage } from "@/actions/upload.actions";

interface Props {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  max?: number;
}

interface UploadingFile {
  id: string;
  name: string;
  progress: number;
  error?: string;
}

export default function ImageUploader({
  values,
  onChange,
  label = "Product Images",
  max = 5,
}: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState<UploadingFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: File[]) => {
    const remaining = max - values.length;
    const toUpload = files.slice(0, remaining);

    if (toUpload.length === 0) return;

    // Add uploading placeholders
    const placeholders: UploadingFile[] = toUpload.map((f) => ({
      id: `${f.name}-${Date.now()}`,
      name: f.name,
      progress: 0,
    }));

    setUploading((prev) => [...prev, ...placeholders]);

    // Upload each file
    const uploadedUrls: string[] = [];

    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i];
      const placeholder = placeholders[i];

      try {
        // Simulate progress while uploading
        setUploading((prev) =>
          prev.map((p) =>
            p.id === placeholder.id ? { ...p, progress: 30 } : p,
          ),
        );

        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadImage(formData);

        setUploading((prev) =>
          prev.map((p) =>
            p.id === placeholder.id ? { ...p, progress: 100 } : p,
          ),
        );

        uploadedUrls.push(result.url);
      } catch (error: any) {
        setUploading((prev) =>
          prev.map((p) =>
            p.id === placeholder.id
              ? { ...p, error: error.message ?? "Upload failed" }
              : p,
          ),
        );
      }
    }

    // Add successfully uploaded URLs
    if (uploadedUrls.length > 0) {
      onChange([...values, ...uploadedUrls]);
    }

    // Clear completed uploads after a short delay
    setTimeout(() => {
      setUploading((prev) =>
        prev.filter(
          (p) => p.error && !uploadedUrls.some((u) => p.progress === 100),
        ),
      );
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    handleFiles(files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    handleFiles(files);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    const updated = [...values];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "text.secondary",
          }}
        >
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {values.length}/{max} images
        </Typography>
      </Box>

      {/* Image previews grid */}
      {values.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: 1.5,
            mb: 2,
          }}
        >
          {values.map((url, i) => (
            <Box
              key={url}
              sx={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: 2,
                overflow: "hidden",
                border: "2px solid",
                borderColor: i === 0 ? "primary.main" : "divider",
              }}
            >
              <Box
                component="img"
                src={url}
                alt={`Product image ${i + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Primary badge */}
              {i === 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    py: 0.3,
                    backgroundColor: "primary.main",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      color: "primary.contrastText",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Main
                  </Typography>
                </Box>
              )}

              {/* Controls */}
              <Box
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => removeImage(i)}
                  sx={{
                    width: 22,
                    height: 22,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(180,80,110,0.9)" },
                  }}
                >
                  <CloseIcon sx={{ fontSize: "0.75rem" }} />
                </IconButton>

                {/* Move left — make primary */}
                {i > 0 && (
                  <IconButton
                    size="small"
                    onClick={() => moveImage(i, 0)}
                    title="Set as main image"
                    sx={{
                      width: 22,
                      height: 22,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      fontSize: "0.6rem",
                      "&:hover": {
                        backgroundColor: "rgba(201,162,39,0.9)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: "0.6rem", lineHeight: 1 }}>
                      1st
                    </Typography>
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Upload progress */}
      {uploading.length > 0 && (
        <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          {uploading.map((u) => (
            <Box
              key={u.id}
              sx={{
                p: 1.5,
                borderRadius: 1,
                border: "1px solid",
                borderColor: u.error ? "error.main" : "divider",
                backgroundColor: u.error
                  ? "rgba(180,80,110,0.04)"
                  : "rgba(201,162,39,0.04)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: u.error ? "rgba(180,80,110,0.9)" : "text.secondary",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "80%",
                  }}
                >
                  {u.error ? `Failed: ${u.error}` : u.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {u.error ? "✗" : `${u.progress}%`}
                </Typography>
              </Box>
              {!u.error && (
                <LinearProgress
                  variant="determinate"
                  value={u.progress}
                  sx={{
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: "rgba(201,162,39,0.15)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "primary.main",
                    },
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Drop zone — only show if under max */}
      {values.length < max && (
        <Box
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          sx={{
            width: "100%",
            height: 140,
            borderRadius: 2,
            border: "2px dashed",
            borderColor: dragging ? "primary.main" : "divider",
            backgroundColor: dragging
              ? "rgba(201,162,39,0.04)"
              : "rgba(201,162,39,0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "rgba(201,162,39,0.04)",
            },
          }}
        >
          {uploading.some((u) => !u.error && u.progress < 100) ? (
            <CircularProgress size={28} sx={{ color: "primary.main" }} />
          ) : (
            <>
              {values.length === 0 ? (
                <CloudUploadOutlinedIcon
                  sx={{
                    fontSize: "2rem",
                    color: dragging ? "primary.main" : "text.secondary",
                    opacity: 0.6,
                  }}
                />
              ) : (
                <AddPhotoAlternateOutlinedIcon
                  sx={{
                    fontSize: "2rem",
                    color: dragging ? "primary.main" : "text.secondary",
                    opacity: 0.6,
                  }}
                />
              )}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontWeight: 500 }}
                >
                  {values.length === 0
                    ? "Drop images or click to browse"
                    : `Add more images (${max - values.length} remaining)`}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", opacity: 0.6 }}
                >
                  JPG, PNG, WebP, HEIC · Max 15MB · Auto-converted to WebP
                </Typography>
              </Box>
            </>
          )}
        </Box>
      )}

      {/* Hidden file input — multiple */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleInputChange}
      />
    </Box>
  );
}
