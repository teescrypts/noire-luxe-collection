"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: { sx: { borderRadius: 3 } },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 700,
          fontSize: "1.3rem",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button variant="outlined" color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{
            backgroundColor: "rgba(180,80,110,0.9)",
            color: "#FAF7F2",
            "&:hover": { backgroundColor: "rgba(180,80,110,1)" },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
