"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#C9A227",
      light: "#E2C06A",
      dark: "#9A7A1A",
      contrastText: "#0A0A0A",
    },
    secondary: {
      main: "#0A0A0A",
      light: "#2C2C2C",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FDF5F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A0A0F",
      secondary: "#6B4C55",
    },
    divider: "#F0D9DF",
  },

  typography: {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    h1: { fontSize: "3.5rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontSize: "2.5rem", fontWeight: 600, letterSpacing: "-0.01em" },
    h3: { fontSize: "2rem", fontWeight: 600 },
    h4: { fontSize: "1.5rem", fontWeight: 600 },
    h5: { fontSize: "1.25rem", fontWeight: 500 },
    h6: { fontSize: "1rem", fontWeight: 500 },
    body1: {
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
    },
  },

  shape: {
    borderRadius: 2,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: "10px 28px",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
          "&.MuiButton-containedPrimary": {
            background:
              "linear-gradient(135deg, #C9A227 0%, #E2C06A 50%, #C9A227 100%)",
            color: "#0A0A0A",
            fontWeight: 600,
            "&:hover": {
              background:
                "linear-gradient(135deg, #9A7A1A 0%, #C9A227 50%, #9A7A1A 100%)",
            },
          },
          "&.MuiButton-outlinedPrimary": {
            borderColor: "#C9A227",
            borderWidth: "1.5px",
            color: "#C9A227",
            "&:hover": {
              borderWidth: "1.5px",
              backgroundColor: "rgba(201,162,39,0.06)",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(201,162,39,0.15)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C9A227",
              borderWidth: "1.5px",
            },
          },
          "& label.Mui-focused": { color: "#C9A227" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 2 },
      },
    },
  },
});

export default theme;
