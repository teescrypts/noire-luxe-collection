"use client";

import { Box, IconButton, Typography, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  label?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  label = "items",
}: Props) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  // Build page numbers to show
  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        mt: 4,
        pt: 4,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Count */}
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Showing {start}–{end} of {totalItems} {label}
      </Typography>

      {/* Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {/* Prev */}
        <IconButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          size="small"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            width: 34,
            height: 34,
            "&:hover:not(:disabled)": {
              borderColor: "primary.main",
              color: "primary.main",
              backgroundColor: "transparent",
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "0.7rem" }} />
        </IconButton>

        {/* Page numbers */}
        {getPages().map((page, i) =>
          page === "..." ? (
            <Typography
              key={`ellipsis-${i}`}
              variant="body2"
              sx={{ px: 1, color: "text.secondary" }}
            >
              ...
            </Typography>
          ) : (
            <Button
              key={page}
              onClick={() => onPageChange(page as number)}
              variant={currentPage === page ? "contained" : "text"}
              color="primary"
              size="small"
              sx={{
                minWidth: 34,
                height: 34,
                borderRadius: 1,
                fontSize: "0.8rem",
                fontWeight: currentPage === page ? 700 : 400,
                border: currentPage === page ? "none" : "1px solid",
                borderColor: "divider",
                color:
                  currentPage === page
                    ? "primary.contrastText"
                    : "text.secondary",
                "&:hover": {
                  backgroundColor:
                    currentPage === page ? "primary.dark" : "transparent",
                  borderColor: "primary.main",
                  color:
                    currentPage === page
                      ? "primary.contrastText"
                      : "primary.main",
                },
              }}
            >
              {page}
            </Button>
          ),
        )}

        {/* Next */}
        <IconButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="small"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            width: 34,
            height: 34,
            "&:hover:not(:disabled)": {
              borderColor: "primary.main",
              color: "primary.main",
              backgroundColor: "transparent",
            },
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: "0.7rem" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
