"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { categories } from "@/data/products";

const lengths = ['20"', '22"', '24"', '26"'];
const textures = ["Body Wave", "Straight"];
interface ShopFiltersProps {
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export default function ShopFilters({
  mobileOnly,
  desktopOnly,
}: ShopFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedTextures, setSelectedTextures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);

  const toggleItem = (
    value: string,
    selected: string[],
    setSelected: (v: string[]) => void,
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedLengths([]);
    setSelectedTextures([]);
    setPriceRange([0, 500]);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedLengths.length +
    selectedTextures.length;

  const filterContent = (
    <Box>
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(135deg, #FDF0F3 0%, #FAE8EE 100%)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
            fontSize: "1.2rem",
          }}
        >
          Filter By
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            onClick={clearAll}
            size="small"
            sx={{
              color: "rgba(180,80,110,0.8)",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              minWidth: "auto",
              p: 0,
              "&:hover": { backgroundColor: "transparent", opacity: 0.7 },
            }}
          >
            Clear All
          </Button>
          <IconButton
            onClick={() => setMobileOpen(false)}
            size="small"
            sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Category */}
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
          sx={{ px: 3, "& .MuiAccordionSummary-content": { my: 1.5 } }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.15em", fontWeight: 600 }}
          >
            Category
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 3, pt: 0, pb: 2 }}>
          <FormGroup>
            {categories
              .filter((c) => c !== "All")
              .map((cat) => (
                <FormControlLabel
                  key={cat}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(cat)}
                      onChange={() =>
                        toggleItem(
                          cat,
                          selectedCategories,
                          setSelectedCategories,
                        )
                      }
                      size="small"
                      sx={{
                        color: "divider",
                        "&.Mui-checked": { color: "primary.main" },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {cat}
                    </Typography>
                  }
                />
              ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Length */}
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
          sx={{ px: 3, "& .MuiAccordionSummary-content": { my: 1.5 } }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.15em", fontWeight: 600 }}
          >
            Length
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 3, pt: 0, pb: 2 }}>
          <FormGroup>
            {lengths.map((length) => (
              <FormControlLabel
                key={length}
                control={
                  <Checkbox
                    checked={selectedLengths.includes(length)}
                    onChange={() =>
                      toggleItem(length, selectedLengths, setSelectedLengths)
                    }
                    size="small"
                    sx={{
                      color: "divider",
                      "&.Mui-checked": { color: "primary.main" },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {length}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Texture */}
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
          sx={{ px: 3, "& .MuiAccordionSummary-content": { my: 1.5 } }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.15em", fontWeight: 600 }}
          >
            Texture
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 3, pt: 0, pb: 2 }}>
          <FormGroup>
            {textures.map((texture) => (
              <FormControlLabel
                key={texture}
                control={
                  <Checkbox
                    checked={selectedTextures.includes(texture)}
                    onChange={() =>
                      toggleItem(texture, selectedTextures, setSelectedTextures)
                    }
                    size="small"
                    sx={{
                      color: "divider",
                      "&.Mui-checked": { color: "primary.main" },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {texture}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Price range */}
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
          sx={{ px: 3, "& .MuiAccordionSummary-content": { my: 1.5 } }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.15em", fontWeight: 600 }}
          >
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 3, pt: 0, pb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ${priceRange[0]}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ${priceRange[1]}
            </Typography>
          </Box>
          <Slider
            value={priceRange}
            onChange={(_, val) => setPriceRange(val as number[])}
            min={0}
            max={500}
            step={10}
            sx={{
              color: "primary.main",
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                "&:hover": { boxShadow: "0 0 0 6px rgba(201,162,39,0.15)" },
              },
              "& .MuiSlider-track": { height: 3 },
              "& .MuiSlider-rail": { height: 3, opacity: 0.2 },
            }}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  // Mobile only — just the trigger button + drawer
  if (mobileOnly) {
    return (
      <>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<FilterListIcon />}
          onClick={() => setMobileOpen(true)}
          sx={{
            justifyContent: "flex-start",
            borderRadius: 2,
            py: 1.2,
            letterSpacing: "0.1em",
          }}
        >
          Filter Products
          {activeFilterCount > 0 && (
            <Box
              component="span"
              sx={{
                ml: "auto",
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                borderRadius: "50%",
                width: 22,
                height: 22,
                fontSize: "0.7rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {activeFilterCount}
            </Box>
          )}
        </Button>

        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          slotProps={{
            paper: {
              sx: {
                width: 300,
                backgroundColor: "background.paper",
              },
            },
          }}
        >
          {filterContent}
        </Drawer>
      </>
    );
  }

  // Desktop only — sticky sidebar
  if (desktopOnly) {
    return (
      <Box
        sx={{
          position: "sticky",
          top: 100,
          backgroundColor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        {filterContent}
      </Box>
    );
  }

  return null;
}
