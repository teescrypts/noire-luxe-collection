"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Card,
  Chip,
  Divider,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { Product } from "@/types";
import ProductForm from "./ProductForm";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/actions/product.actions";
import { SerializedProduct } from "@/types/serialized";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PaginationControl from "@/components/ui/Pagination";

const categories = ['All', 'Bundles', 'Frontal Wigs', 'Closure Wigs'];

const emptyProduct: Omit<Product, "_id" | "slug" | "rating" | "reviewCount"> = {
  name: "",
  price: 0,
  description: "",
  longDescription: "",
  images: [],
  category: "Bundles",
  tags: [],
  inStock: true,
  stockCount: 1,
  featured: false,
  hairType: "Human Hair",
  length: '20"',
  color: "Natural Black",
};

const stockColor = (count: number) => {
  if (count === 0)
    return { bg: "rgba(180,80,110,0.1)", color: "rgba(180,80,110,0.9)" };
  if (count <= 2)
    return { bg: "rgba(201,162,39,0.1)", color: "rgba(201,162,39,0.9)" };
  return { bg: "rgba(100,180,100,0.1)", color: "rgba(100,180,100,0.9)" };
};

export default function DashboardProducts({
  initialProducts,
  totalItems,
  totalPages,
  currentPage,
  itemsPerPage,
}: {
  initialProducts: SerializedProduct[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const [productList, setProductList] = useState<any[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<
    Partial<Product> & typeof emptyProduct
  >(emptyProduct);
  const [isEditing, setIsEditing] = useState(false);

  // Sync when server sends new page data
  useEffect(() => {
    setProductList(initialProducts);
  }, [initialProducts]);

  const filtered = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openAdd = () => {
    setEditProduct(emptyProduct);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editProduct.name || !editProduct.price) return;

    try {
      if (isEditing && editProduct._id) {
        const updated = await updateProduct(
          editProduct._id as string,
          editProduct,
        );
        setProductList((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p)),
        );
      } else {
        const created = await createProduct(editProduct as any);
        setProductList((prev) => [...prev, created]);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error("Save product error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProductList((prev) => prev.filter((p) => p._id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error("Delete product error:", error);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
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
            Manage your inventory
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 700,
            }}
          >
            Products
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openAdd}
          sx={{ whiteSpace: "nowrap" }}
        >
          Add Product
        </Button>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            flex: 1,
            minWidth: 200,
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <SearchIcon
                  sx={{ fontSize: "1rem", color: "text.secondary", mr: 1 }}
                />
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c} sx={{ fontSize: "0.85rem" }}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </Typography>
      </Box>

      {/* Products table */}
      <Card
        sx={{
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: "60px 1fr 120px 100px 80px 100px",
            gap: 2,
            px: 3,
            py: 1.5,
            backgroundColor: "rgba(201,162,39,0.04)",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {["", "Product", "Category", "Price", "Stock", "Actions"].map((h) => (
            <Typography
              key={h}
              variant="overline"
              sx={{
                fontSize: "0.62rem",
                letterSpacing: "0.15em",
                color: "text.secondary",
              }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {/* Rows */}
        {filtered.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <InventoryOutlinedIcon
              sx={{ fontSize: "3rem", color: "divider", mb: 2 }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              No products found
            </Typography>
          </Box>
        ) : (
          filtered.map((product, i) => {
            const stock = stockColor(product.stockCount);
            return (
              <Box key={product._id}>
                <Box
                  sx={{
                    px: 3,
                    py: 2,
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "60px 1fr auto",
                      md: "60px 1fr 120px 100px 80px 100px",
                    },
                    gap: 2,
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "rgba(201,162,39,0.02)",
                    },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2,
                      overflow: "hidden",
                      backgroundColor: "#F8F0F3",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="52px"
                      />
                    )}
                  </Box>

                  {/* Name + details */}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        mb: 0.3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {product.length} · {product.hairType}
                    </Typography>
                    {/* Mobile chips */}
                    <Box
                      sx={{
                        display: { xs: "flex", md: "none" },
                        gap: 1,
                        mt: 0.5,
                        flexWrap: "wrap",
                      }}
                    >
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          fontSize: "0.6rem",
                          height: 18,
                          borderRadius: 1,
                          backgroundColor: "rgba(201,162,39,0.08)",
                          color: "text.secondary",
                        }}
                      />
                      <Chip
                        label={`$${product.price}`}
                        size="small"
                        sx={{
                          fontSize: "0.6rem",
                          height: 18,
                          borderRadius: 1,
                          backgroundColor: "rgba(180,80,110,0.06)",
                          color: "text.secondary",
                        }}
                      />
                      <Chip
                        label={
                          product.stockCount === 0
                            ? "Out of stock"
                            : `${product.stockCount} left`
                        }
                        size="small"
                        sx={{
                          fontSize: "0.6rem",
                          height: 18,
                          borderRadius: 1,
                          backgroundColor: stock.bg,
                          color: stock.color,
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Category — desktop */}
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {product.category}
                    </Typography>
                  </Box>

                  {/* Price — desktop */}
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      ${product.price}
                    </Typography>
                  </Box>

                  {/* Stock — desktop */}
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Chip
                      label={
                        product.stockCount === 0 ? "Out" : product.stockCount
                      }
                      size="small"
                      sx={{
                        backgroundColor: stock.bg,
                        color: stock.color,
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        borderRadius: 1,
                        minWidth: 40,
                      }}
                    />
                  </Box>

                  {/* Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      justifyContent: { xs: "flex-end", md: "flex-start" },
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEdit(product)}
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteId(product._id)}
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "rgba(180,80,110,0.8)" },
                      }}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                {i < filtered.length - 1 && <Divider sx={{ mx: 3 }} />}
              </Box>
            );
          })
        )}
      </Card>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        label="products"
      />

      {/* Add / Edit dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: { borderRadius: 3 },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700,
            fontSize: "1.3rem",
          }}
        >
          {isEditing ? "Edit Product" : "Add New Product"}
          <IconButton size="small" onClick={() => setDialogOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <ProductForm
            value={editProduct}
            onChange={(val) => setEditProduct((prev) => ({ ...prev, ...val }))}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!editProduct.name || !editProduct.price}
          >
            {isEditing ? "Save Changes" : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
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
          Delete Product?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            This action cannot be undone. The product will be permanently
            removed from your inventory.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDeleteId(null)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => deleteId && handleDelete(deleteId)}
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
    </Box>
  );
}
