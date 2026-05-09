"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useAuth } from "@/lib/authContext";
import Link from "next/link";
import {
  validateLogin,
  validateRegister,
  getFieldError,
  ValidationError,
} from "@/lib/validation";

type Mode = "login" | "register";

export default function AuthView() {
  const [fieldErrors, setFieldErrors] = useState<ValidationError[]>([]);
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setError("");
    setFieldErrors([]);

    if (mode === "login") {
      const { valid, errors } = validateLogin({
        email: form.email,
        password: form.password,
      });
      if (!valid) {
        setFieldErrors(errors);
        return;
      }
    } else {
      const { valid, errors } = validateRegister({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      if (!valid) {
        setFieldErrors(errors);
        return;
      }
      if (form.password !== form.confirmPassword) {
        setFieldErrors([
          {
            field: "confirmPassword",
            message: "Passwords do not match.",
          },
        ]);
        return;
      }
    }

    setLoading(true);

    if (mode === "login") {
      const result = await login(form.email, form.password);
      if (result.error) setError(result.error);
    } else {
      const result = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      if (result.error) setError(result.error);
    }

    setLoading(false);
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "background.default",
      }}
    >
      {/* Left panel — decorative */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
          position: "relative",
          overflow: "hidden",
          background: `
            linear-gradient(160deg,
              #1a0a0f 0%,
              #2d1020 40%,
              #1a0a0f 100%
            )
          `,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background glows */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(180,80,110,0.3) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 30%, rgba(201,162,39,0.15) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Decorative circles */}
        {[
          {
            size: 400,
            top: "-10%",
            right: "-10%",
            color: "rgba(201,162,39,0.08)",
          },
          { size: 280, top: "5%", right: "5%", color: "rgba(180,80,110,0.1)" },
          {
            size: 350,
            bottom: "-15%",
            left: "-10%",
            color: "rgba(201,162,39,0.06)",
          },
        ].map((c, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: c.size,
              height: c.size,
              top: c.top,
              right: c.right,
              bottom: c.bottom,
              left: c.left,
              borderRadius: "50%",
              border: "1px solid",
              borderColor: c.color,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            px: 6,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontSize: "1.4rem",
              color: "rgba(201,162,39,0.9)",
              display: "block",
              mb: 2,
            }}
          >
            Welcome back
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
              color: "#FAF7F2",
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Your Crown
            <Box
              component="span"
              sx={{
                display: "block",
                fontStyle: "italic",
                background: `linear-gradient(135deg, #C9A227 0%, #E2C06A 40%, #B4547A 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Awaits
            </Box>
          </Typography>

          {/* Decorative divider */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <Box
              sx={{
                height: "1px",
                width: 60,
                background:
                  "linear-gradient(to right, transparent, rgba(201,162,39,0.6))",
              }}
            />
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "rgba(201,162,39,0.8)",
              }}
            />
            <Box
              sx={{
                height: "1px",
                width: 60,
                background:
                  "linear-gradient(to left, transparent, rgba(201,162,39,0.6))",
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "#FAF7F2",
              opacity: 0.6,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              lineHeight: 1.9,
              maxWidth: 320,
              mx: "auto",
            }}
          >
            Sign in to track your orders, save your favourites and enjoy a
            seamless luxury experience.
          </Typography>
        </Box>
      </Box>

      {/* Right panel — form */}
      <Box
        sx={{
          flex: { xs: 1, md: "0 0 480px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="xs" disableGutters>
          {/* Mobile header */}
          <Box sx={{ display: { md: "none" }, textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: "italic",
                fontSize: "1.2rem",
                color: "rgba(180,80,110,0.8)",
                display: "block",
                mb: 1,
              }}
            >
              Noire Luxe Collection
            </Typography>
          </Box>

          {/* Form header */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 700,
                mb: 1,
              }}
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {mode === "login"
                ? "Welcome back! Please enter your details."
                : "Join us and start your luxury hair journey."}
            </Typography>
          </Box>

          {/* Error alert */}
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}

          {/* Form fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {/* Name fields — register only */}
            {mode === "register" && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                }}
              >
                <TextField
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  fullWidth
                  size="small"
                  error={!!getFieldError(fieldErrors, "firstName")}
                  helperText={getFieldError(fieldErrors, "firstName")}
                />
                <TextField
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  fullWidth
                  size="small"
                  error={!!getFieldError(fieldErrors, "lastName")}
                  helperText={getFieldError(fieldErrors, "lastName")}
                />
              </Box>
            )}

            <TextField
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              fullWidth
              size="small"
              error={!!getFieldError(fieldErrors, "email")}
              helperText={getFieldError(fieldErrors, "email")}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              fullWidth
              size="small"
              error={!!getFieldError(fieldErrors, "password")}
              helperText={getFieldError(fieldErrors, "password")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        ) : (
                          <VisibilityOutlinedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {mode === "register" && (
              <TextField
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                fullWidth
                size="small"
                error={!!getFieldError(fieldErrors, "confirmPassword")}
                helperText={getFieldError(fieldErrors, "confirmPassword")}
              />
            )}

            {/* Forgot password — login only */}
            {mode === "login" && (
              <Box sx={{ textAlign: "right", mt: -1 }}>
                <Link
                  href="/auth/forgot-password"
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "primary.main",
                      cursor: "pointer",
                      "&:hover": { opacity: 0.7 },
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Box>
            )}

            {/* Submit */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ py: 1.8, mt: 1 }}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", px: 1 }}
            >
              or
            </Typography>
          </Divider>

          {/* Switch mode */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Box
                component="span"
                onClick={switchMode}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                {mode === "login" ? "Create one" : "Sign in"}
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
