import { Box } from "@mui/material";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import { CartProvider } from "@/lib/cartContext";
import { AuthProvider } from "@/lib/authContext";
import { getPublicSettings } from "@/actions/settings.actions";
import { SerializedSettings } from "@/types/serialized";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings: SerializedSettings = await getPublicSettings();

  return (
    <AuthProvider>
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
          <Footer storeInfo={settings.storeInfo} />
        </Box>
      </CartProvider>
    </AuthProvider>
  );
}
