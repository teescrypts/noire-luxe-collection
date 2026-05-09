"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
} from "@mui/material";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  updateStoreInfo,
  updateShippingRates,
  updatePickupSettings,
  updateNotificationSettings,
  updatePassword,
} from "@/actions/settings.actions";

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Box
      sx={{
        px: 3,
        py: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        background: "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          backgroundColor: "rgba(201,162,39,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "primary.main",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
            fontSize: "1.1rem",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

export default function DashboardSettings({
  initialSettings,
}: {
  initialSettings: any;
}) {
  const [saved, setSaved] = useState<string | null>(null);

  const [storeInfo, setStoreInfo] = useState({
    storeName: initialSettings.storeInfo?.storeName ?? "Noire Luxe Collection",
    email: initialSettings.storeInfo?.email ?? "hello@noireluxe.com",
    phone: initialSettings.storeInfo?.phone ?? "",
    instagram: initialSettings.storeInfo?.instagram ?? "",
    facebook: initialSettings.storeInfo?.facebook ?? "",
    supportHours:
      initialSettings.storeInfo?.supportHours ?? "Mon–Fri, 9am–6pm EST",
  });

  const [shipping, setShipping] = useState({
    rates: initialSettings.shippingRates ?? [],
    freeShipping: initialSettings.freeShipping ?? {
      enabled: false,
      threshold: 0,
    },
  });

  const [pickup, setPickup] = useState({
    enabled: initialSettings.pickup?.enabled ?? true,
    address: initialSettings.pickup?.address ?? "",
    city: initialSettings.pickup?.city ?? "",
    state: initialSettings.pickup?.state ?? "",
    zip: initialSettings.pickup?.zip ?? "",
    instructions: initialSettings.pickup?.instructions ?? "",
  });

  const [notifications, setNotifications] = useState({
    newOrder: initialSettings.notifications?.newOrder ?? true,
    lowStock: initialSettings.notifications?.lowStock ?? true,
    orderUpdate: initialSettings.notifications?.orderUpdate ?? false,
    newsletter: initialSettings.notifications?.newsletter ?? true,
  });

  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const handleSave = async (section: string) => {
    try {
      if (section === "store") {
        await updateStoreInfo(storeInfo);
      } else if (section === "shipping") {
        await updateShippingRates({
          rates: shipping.rates,
          freeShipping: shipping.freeShipping,
        });
      } else if (section === "pickup") {
        await updatePickupSettings(pickup);
      } else if (section === "notifications") {
        await updateNotificationSettings(notifications);
      } else if (section === "password") {
        await updatePassword({
          currentPassword: password.current,
          newPassword: password.next,
        });
        setPassword({ current: "", next: "", confirm: "" });
      }
      setSaved(section);
      setTimeout(() => setSaved(null), 3000);
    } catch (error: any) {
      console.error(`Save ${section} error:`, error);
      setSaved(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 780 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
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
          Manage your store
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
          }}
        >
          Settings
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Store Info */}
        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <SectionHeader
            icon={<StoreOutlinedIcon fontSize="small" />}
            title="Store Information"
            description="Basic details shown to customers across the site"
          />
          <Box sx={{ p: 3 }}>
            {saved === "store" && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                Store information saved successfully.
              </Alert>
            )}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2.5,
              }}
            >
              <TextField
                label="Store Name"
                value={storeInfo.storeName}
                onChange={(e) =>
                  setStoreInfo({ ...storeInfo, storeName: e.target.value })
                }
                fullWidth
                size="small"
              />
              <TextField
                label="Support Email"
                value={storeInfo.email}
                onChange={(e) =>
                  setStoreInfo({ ...storeInfo, email: e.target.value })
                }
                fullWidth
                size="small"
              />
              <TextField
                label="Phone Number"
                value={storeInfo.phone}
                onChange={(e) =>
                  setStoreInfo({ ...storeInfo, phone: e.target.value })
                }
                fullWidth
                size="small"
              />
              <TextField
                label="Support Hours"
                value={storeInfo.supportHours}
                onChange={(e) =>
                  setStoreInfo({ ...storeInfo, supportHours: e.target.value })
                }
                fullWidth
                size="small"
              />
              <TextField
                label="Instagram URL"
                value={storeInfo.instagram}
                onChange={(e) =>
                  setStoreInfo({ ...storeInfo, instagram: e.target.value })
                }
                fullWidth
                size="small"
              />
              <TextField
                label="Facebook URL"
                value={storeInfo.facebook}
                onChange={(e) =>
                  setStoreInfo({ ...storeInfo, facebook: e.target.value })
                }
                fullWidth
                size="small"
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave("store")}
              sx={{ mt: 3 }}
            >
              Save Store Info
            </Button>
          </Box>
        </Card>

        {/* Shipping Rates */}
        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <SectionHeader
            icon={<LocalShippingOutlinedIcon fontSize="small" />}
            title="Shipping Rates"
            description="Configure delivery options shown at checkout"
          />
          <Box sx={{ p: 3 }}>
            {saved === "shipping" && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                Shipping rates saved successfully.
              </Alert>
            )}

            {/* Free shipping toggle */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: shipping.freeShipping ? "primary.main" : "divider",
                backgroundColor: shipping.freeShipping
                  ? "rgba(201,162,39,0.04)"
                  : "transparent",
                mb: 3,
                transition: "all 0.2s ease",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={shipping.freeShipping.enabled}
                    onChange={(e) =>
                      setShipping({
                        ...shipping,
                        freeShipping: {
                          ...shipping.freeShipping,
                          enabled: e.target.checked,
                        },
                      })
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "primary.main",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "primary.main",
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Enable Free Shipping
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      Offer free shipping on all orders or above a minimum
                    </Typography>
                  </Box>
                }
              />
              {shipping.freeShipping.enabled && (
                <TextField
                  label="Free Shipping Minimum ($) — 0 for all orders"
                  type="number"
                  value={shipping.freeShipping.threshold}
                  onChange={(e) =>
                    setShipping({
                      ...shipping,
                      freeShipping: {
                        ...shipping.freeShipping,
                        threshold: Number(e.target.value),
                      },
                    })
                  }
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
              )}
            </Box>

            {/* Rate rows */}
            {shipping.rates.map((rate: any, i: number) => (
              <Box key={rate.id} sx={{ mb: 2.5 }}>
                <Typography
                  variant="overline"
                  sx={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "text.secondary",
                    display: "block",
                    mb: 1.5,
                  }}
                >
                  {rate.name}
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr 80px",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Price ($)"
                    type="number"
                    value={rate.price}
                    onChange={(e) => {
                      const updated = [...shipping.rates];
                      updated[i] = {
                        ...updated[i],
                        price: Number(e.target.value),
                      };
                      setShipping({ ...shipping, rates: updated });
                    }}
                    size="small"
                  />
                  <TextField
                    label="Estimated Time"
                    value={rate.description}
                    onChange={(e) => {
                      const updated = [...shipping.rates];
                      updated[i] = {
                        ...updated[i],
                        description: e.target.value,
                      };
                      setShipping({ ...shipping, rates: updated });
                    }}
                    size="small"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={rate.enabled}
                        onChange={(e) => {
                          const updated = [...shipping.rates];
                          updated[i] = {
                            ...updated[i],
                            enabled: e.target.checked,
                          };
                          setShipping({ ...shipping, rates: updated });
                        }}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "primary.main",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "primary.main",
                            },
                        }}
                      />
                    }
                    label={
                      <Typography variant="caption">
                        {rate.enabled ? "On" : "Off"}
                      </Typography>
                    }
                  />
                </Box>
                <Divider sx={{ mt: 2.5 }} />
              </Box>
            ))}

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave("shipping")}
              sx={{ mt: 1 }}
            >
              Save Shipping Rates
            </Button>
          </Box>
        </Card>

        {/* Pickup Settings */}
        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <SectionHeader
            icon={<StorefrontOutlinedIcon fontSize="small" />}
            title="Store Pickup"
            description="Configure in-store pickup options for local customers"
          />
          <Box sx={{ p: 3 }}>
            {saved === "pickup" && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                Pickup settings saved successfully.
              </Alert>
            )}

            <FormControlLabel
              control={
                <Switch
                  checked={pickup.enabled}
                  onChange={(e) =>
                    setPickup({ ...pickup, enabled: e.target.checked })
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "primary.main",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "primary.main",
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Enable Store Pickup
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            {pickup.enabled && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                <TextField
                  label="Street Address"
                  value={pickup.address}
                  onChange={(e) =>
                    setPickup({ ...pickup, address: e.target.value })
                  }
                  fullWidth
                  size="small"
                />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 100px",
                    gap: 2,
                  }}
                >
                  <TextField
                    label="City"
                    value={pickup.city}
                    onChange={(e) =>
                      setPickup({ ...pickup, city: e.target.value })
                    }
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="State"
                    value={pickup.state}
                    onChange={(e) =>
                      setPickup({ ...pickup, state: e.target.value })
                    }
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="ZIP"
                    value={pickup.zip}
                    onChange={(e) =>
                      setPickup({ ...pickup, zip: e.target.value })
                    }
                    fullWidth
                    size="small"
                  />
                </Box>
                <TextField
                  label="Pickup Instructions"
                  value={pickup.instructions}
                  onChange={(e) =>
                    setPickup({ ...pickup, instructions: e.target.value })
                  }
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  helperText="Shown to customers who choose pickup at checkout"
                />
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave("pickup")}
              sx={{ mt: 3 }}
            >
              Save Pickup Settings
            </Button>
          </Box>
        </Card>

        {/* Notifications */}
        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <SectionHeader
            icon={<NotificationsNoneOutlinedIcon fontSize="small" />}
            title="Email Notifications"
            description="Choose which events trigger an email to you"
          />
          <Box sx={{ p: 3 }}>
            {saved === "notifications" && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                Notification preferences saved.
              </Alert>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                {
                  key: "newOrder" as const,
                  label: "New order placed",
                  sub: "Get notified every time a customer places an order",
                },
                {
                  key: "lowStock" as const,
                  label: "Low stock alert",
                  sub: "Get notified when a product has 2 or fewer units left",
                },
                {
                  key: "orderUpdate" as const,
                  label: "Order status updates",
                  sub: "Get notified when an order status changes",
                },
                {
                  key: "newsletter" as const,
                  label: "Newsletter signups",
                  sub: "Get notified when someone subscribes to the newsletter",
                },
              ].map((item, i, arr) => (
                <Box key={item.key}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications[item.key]}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            [item.key]: e.target.checked,
                          })
                        }
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "primary.main",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            { backgroundColor: "primary.main" },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {item.sub}
                        </Typography>
                      </Box>
                    }
                    sx={{ alignItems: "flex-start", py: 1 }}
                  />
                  {i < arr.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave("notifications")}
              sx={{ mt: 3 }}
            >
              Save Preferences
            </Button>
          </Box>
        </Card>

        {/* Change Password */}
        <Card
          sx={{
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <SectionHeader
            icon={<LockOutlinedIcon fontSize="small" />}
            title="Change Password"
            description="Update your dashboard login password"
          />
          <Box sx={{ p: 3 }}>
            {saved === "password" && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                Password updated successfully.
              </Alert>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                maxWidth: 400,
              }}
            >
              <TextField
                label="Current Password"
                type="password"
                value={password.current}
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
                fullWidth
                size="small"
              />
              <TextField
                label="New Password"
                type="password"
                value={password.next}
                onChange={(e) =>
                  setPassword({ ...password, next: e.target.value })
                }
                fullWidth
                size="small"
              />
              <TextField
                label="Confirm New Password"
                type="password"
                value={password.confirm}
                onChange={(e) =>
                  setPassword({ ...password, confirm: e.target.value })
                }
                fullWidth
                size="small"
                error={!!password.confirm && password.next !== password.confirm}
                helperText={
                  !!password.confirm && password.next !== password.confirm
                    ? "Passwords do not match"
                    : ""
                }
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave("password")}
              disabled={
                !password.current ||
                !password.next ||
                password.next !== password.confirm
              }
              sx={{ mt: 3 }}
            >
              Update Password
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
