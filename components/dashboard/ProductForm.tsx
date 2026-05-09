"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  IconButton,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ImageUploader from "./ImageUploader";
import { Product, BundleLength } from "@/types";

const lengths = ['16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'];
const textures = [
  "Luxe Wave",
  "Straight Luxe",
  "Deep Wave",
  "Loose Wave",
  "Kinky Curly",
];
const categories = ['All', 'Bundles', 'Frontal Wigs', 'Closure Wigs'];

type ProductFormData = Omit<Product, "id" | "slug" | "rating" | "reviewCount">;

interface Props {
  value: Partial<ProductFormData>;
  onChange: (val: Partial<ProductFormData>) => void;
}

export default function ProductForm({ value, onChange }: Props) {
  const [bundleType, setBundleType] = useState<"single" | "pack">(
    value.bundleType ?? "pack",
  );
  const [bundleLengths, setBundleLengths] = useState<BundleLength[]>(
    value.bundleLengths ?? [
      { length: '20"', quantity: 1 },
      { length: '20"', quantity: 1 },
      { length: '20"', quantity: 1 },
    ],
  );

  const isBundle = value.category === "Bundles";

  // Auto generate product name based on selections
  useEffect(() => {
    if (!isBundle) return;
    if (bundleType === "single") {
      const texture =
        value.tags?.find((t) =>
          textures.map((tx) => tx.toLowerCase()).includes(t.toLowerCase()),
        ) ?? "";
      const name = [texture, "Bundle", value.length ? value.length : ""]
        .filter(Boolean)
        .join(" ");
      onChange({ ...value, bundleType: "single", bundleLengths: undefined });
    } else {
      const lengthStr = bundleLengths.map((b) => b.length).join(" + ");
      onChange({ ...value, bundleType: "pack", bundleLengths });
    }
  }, [bundleType, bundleLengths, value.category]);

  const update = (field: string, val: unknown) =>
    onChange({ ...value, [field]: val });

  const addBundleRow = () =>
    setBundleLengths((prev) => [...prev, { length: '20"', quantity: 1 }]);

  const removeBundleRow = (i: number) =>
    setBundleLengths((prev) => prev.filter((_, idx) => idx !== i));

  const updateBundleRow = (
    i: number,
    field: keyof BundleLength,
    val: string | number,
  ) =>
    setBundleLengths((prev) =>
      prev.map((b, idx) => (idx === i ? { ...b, [field]: val } : b)),
    );

  const toggleTexture = (texture: string) => {
    const current = value.tags ?? [];
    const filtered = current.filter(
      (t) => !textures.map((tx) => tx.toLowerCase()).includes(t.toLowerCase()),
    );
    const newTags = current
      .map((t) => t.toLowerCase())
      .includes(texture.toLowerCase())
      ? filtered
      : [...filtered, texture.toLowerCase()];
    update("tags", newTags);
  };

  const selectedTexture = (texture: string) =>
    (value.tags ?? [])
      .map((t) => t.toLowerCase())
      .includes(texture.toLowerCase());

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
      {/* Category */}
      <FormControl size="small" fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={value.category ?? "Bundles"}
          label="Category"
          onChange={(e) => update("category", e.target.value)}
        >
          {categories
            .filter((c) => c !== "All")
            .map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Bundle specific options */}
      {isBundle && (
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "primary.main",
            backgroundColor: "rgba(201,162,39,0.03)",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "primary.main",
              display: "block",
              mb: 2,
            }}
          >
            Bundle Configuration
          </Typography>

          {/* Single vs Pack toggle */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Bundle Type
            </Typography>
            <ToggleButtonGroup
              value={bundleType}
              exclusive
              onChange={(_, val) => {
                if (val) setBundleType(val);
              }}
              size="small"
            >
              <ToggleButton
                value="single"
                sx={{
                  px: 3,
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { backgroundColor: "primary.dark" },
                  },
                }}
              >
                Single Bundle
              </ToggleButton>
              <ToggleButton
                value="pack"
                sx={{
                  px: 3,
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": { backgroundColor: "primary.dark" },
                  },
                }}
              >
                Bundle Pack
              </ToggleButton>
            </ToggleButtonGroup>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block", mt: 1 }}
            >
              {bundleType === "single"
                ? "Sell individual bundles — customer buys one at a time"
                : "Sell as a pack — e.g. 3 bundles of mixed lengths"}
            </Typography>
          </Box>

          {/* Single bundle — one length */}
          {bundleType === "single" && (
            <FormControl size="small" fullWidth>
              <InputLabel>Length</InputLabel>
              <Select
                value={value.length ?? '20"'}
                label="Length"
                onChange={(e) => update("length", e.target.value)}
              >
                {lengths.map((l) => (
                  <MenuItem key={l} value={l}>
                    {l}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Pack — multiple lengths */}
          {bundleType === "pack" && (
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>
                Bundle Lengths in Pack
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {bundleLengths.map((bundle, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 80px auto",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <FormControl size="small" fullWidth>
                      <InputLabel>Length {i + 1}</InputLabel>
                      <Select
                        value={bundle.length}
                        label={`Length ${i + 1}`}
                        onChange={(e) =>
                          updateBundleRow(i, "length", e.target.value)
                        }
                      >
                        {lengths.map((l) => (
                          <MenuItem key={l} value={l}>
                            {l}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Qty"
                      type="number"
                      value={bundle.quantity}
                      onChange={(e) =>
                        updateBundleRow(i, "quantity", Number(e.target.value))
                      }
                      size="small"
                      slotProps={{ htmlInput: { min: 1, max: 10 } }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => removeBundleRow(i)}
                      disabled={bundleLengths.length <= 1}
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "rgba(180,80,110,0.8)" },
                      }}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={addBundleRow}
                sx={{
                  mt: 1.5,
                  color: "primary.main",
                  fontSize: "0.75rem",
                }}
              >
                Add Another Length
              </Button>

              {/* Pack summary */}
              {bundleLengths.length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    borderRadius: 1,
                    backgroundColor: "rgba(201,162,39,0.06)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.8,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", mr: 0.5 }}
                  >
                    Pack includes:
                  </Typography>
                  {bundleLengths.map((b, i) => (
                    <Chip
                      key={i}
                      label={`${b.quantity}x ${b.length}`}
                      size="small"
                      sx={{
                        fontSize: "0.65rem",
                        height: 20,
                        borderRadius: 1,
                        backgroundColor: "rgba(201,162,39,0.15)",
                        color: "primary.dark",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}

      {/* Non-bundle length */}
      {!isBundle && (
        <FormControl size="small" fullWidth>
          <InputLabel>Length</InputLabel>
          <Select
            value={value.length ?? '20"'}
            label="Length"
            onChange={(e) => update("length", e.target.value)}
          >
            {lengths.map((l) => (
              <MenuItem key={l} value={l}>
                {l}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Texture */}
      <Box>
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
          Texture
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {textures.map((texture) => (
            <Chip
              key={texture}
              label={texture}
              onClick={() => toggleTexture(texture)}
              sx={{
                borderRadius: 1,
                fontSize: "0.75rem",
                cursor: "pointer",
                backgroundColor: selectedTexture(texture)
                  ? "primary.main"
                  : "transparent",
                color: selectedTexture(texture)
                  ? "primary.contrastText"
                  : "text.secondary",
                border: "1px solid",
                borderColor: selectedTexture(texture)
                  ? "primary.main"
                  : "divider",
                "&:hover": {
                  backgroundColor: selectedTexture(texture)
                    ? "primary.dark"
                    : "rgba(201,162,39,0.06)",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Product name */}
      <TextField
        label="Product Name"
        value={value.name ?? ""}
        onChange={(e) => update("name", e.target.value)}
        fullWidth
        size="small"
        helperText="Give the product a clear descriptive name"
      />

      {/* Price + Stock */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          label="Price ($)"
          type="number"
          value={value.price ?? ""}
          onChange={(e) => update("price", Number(e.target.value))}
          fullWidth
          size="small"
        />
        <TextField
          label="Stock Count"
          type="number"
          value={value.stockCount ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              stockCount: Number(e.target.value),
              inStock: Number(e.target.value) > 0,
            })
          }
          fullWidth
          size="small"
        />
      </Box>

      {/* Image uploader */}
      <ImageUploader
        values={value.images ?? []}
        onChange={(urls) => update("images", urls)}
        label="Product Images"
        max={5}
      />

      {/* Short description */}
      <TextField
        label="Short Description"
        value={value.description ?? ""}
        onChange={(e) => update("description", e.target.value)}
        fullWidth
        size="small"
        multiline
        rows={2}
        helperText="Shown on product cards"
      />

      {/* Long description */}
      <TextField
        label="Full Description"
        value={value.longDescription ?? ""}
        onChange={(e) => update("longDescription", e.target.value)}
        fullWidth
        size="small"
        multiline
        rows={4}
        helperText="Shown on the product detail page"
      />

      {/* Featured toggle */}
      <FormControlLabel
        control={
          <Switch
            checked={value.featured ?? false}
            onChange={(e) => update("featured", e.target.checked)}
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
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Featured on homepage
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Shows this product in the featured collection section
            </Typography>
          </Box>
        }
      />
    </Box>
  );
}
