"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

export default function ResetPasswordView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      setError("Invalid reset link. Please request a new one.");
    }
  }, [token, email]);

  const handleSubmit = async () => {
    setError("");

    if (!password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => router.push("/auth"), 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        px: 3,
      }}
    >
      <Container maxWidth="xs">
        {/* Icon */}
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: success
              ? "rgba(100,180,100,0.1)"
              : "rgba(201,162,39,0.08)",
            border: "1px solid",
            borderColor: success ? "rgba(100,180,100,0.5)" : "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            transition: "all 0.3s ease",
          }}
        >
          {success ? (
            <CheckCircleOutlinedIcon
              sx={{ color: "rgba(100,180,100,0.9)", fontSize: "1.8rem" }}
            />
          ) : (
            <LockOutlinedIcon
              sx={{ color: "primary.main", fontSize: "1.8rem" }}
            />
          )}
        </Box>

        <Typography
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "rgba(180,80,110,0.8)",
            display: "block",
            mb: 1,
          }}
        >
          {success ? "All done!" : "Almost there"}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
            mb: 1,
          }}
        >
          {success ? "Password Reset!" : "Set New Password"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
          {success
            ? "Your password has been updated. Redirecting you to login..."
            : "Choose a strong password for your account."}
        </Typography>

        {success ? (
          <Button
            component={Link}
            href="/auth"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ py: 1.8 }}
          >
            Go to Login
          </Button>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {error && (
              <Alert
                severity="error"
                sx={{ borderRadius: 2 }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}

            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              size="small"
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

            <TextField
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              fullWidth
              size="small"
              error={!!confirm && password !== confirm}
              helperText={
                !!confirm && password !== confirm
                  ? "Passwords do not match"
                  : ""
              }
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />

            {/* Password strength hint */}
            <Box>
              {[
                { label: "At least 8 characters", met: password.length >= 8 },
                { label: "Contains a number", met: /\d/.test(password) },
                {
                  label: "Passwords match",
                  met: !!confirm && password === confirm,
                },
              ].map((rule) => (
                <Box
                  key={rule.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: rule.met
                        ? "rgba(100,180,100,0.8)"
                        : "rgba(0,0,0,0.15)",
                      transition: "background-color 0.2s ease",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: rule.met
                        ? "rgba(100,180,100,0.9)"
                        : "text.secondary",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {rule.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={
                loading ||
                !token ||
                !email ||
                password.length < 8 ||
                password !== confirm
              }
              sx={{ py: 1.8 }}
            >
              {loading ? "Updating..." : "Reset Password"}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
