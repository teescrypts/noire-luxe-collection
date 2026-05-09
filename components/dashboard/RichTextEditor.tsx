"use client";

import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: 240,
        border: "1px solid rgba(0,0,0,0.23)",
        borderRadius: "0 0 8px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        Loading editor...
      </Typography>
    </Box>
  ),
});

import "react-quill-new/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = ["header", "bold", "italic", "underline", "list", "link"];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  return (
    <Box
      sx={{
        "& .ql-toolbar": {
          borderColor: "rgba(0,0,0,0.23)",
          borderRadius: "8px 8px 0 0",
          backgroundColor: "rgba(201,162,39,0.03)",
        },
        "& .ql-container": {
          borderColor: "rgba(0,0,0,0.23)",
          borderRadius: "0 0 8px 8px",
          fontSize: "0.95rem",
          fontFamily: '"Inter", sans-serif',
          minHeight: 240,
        },
        "& .ql-editor": {
          minHeight: 240,
          lineHeight: 1.8,
        },
        "& .ql-editor.ql-blank::before": {
          fontStyle: "italic",
          color: "rgba(0,0,0,0.38)",
        },
      }}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={quillModules}
        formats={quillFormats}
        placeholder="Write your blog post content here..."
      />
    </Box>
  );
}
