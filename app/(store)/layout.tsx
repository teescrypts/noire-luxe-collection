import { Box } from "@mui/material";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import { CartProvider } from "@/lib/cartContext";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </CartProvider>
  );
}
