// import { Box, Container, Typography, Grid } from "@mui/material";
// import ShopFilters from "@/components/store/ShopFilters";
// import ShopGrid from "@/components/store/ShopGrid";

// export const metadata = {
//   title: "Shop",
// };

// export default function ShopPage() {
//   return (
//     <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}>
//       <Container maxWidth="xl">
//         {/* Page header */}
//         <Box sx={{ textAlign: "center", mb: 8 }}>
//           <Typography
//             sx={{
//               fontFamily: '"Cormorant Garamond", serif',
//               fontStyle: "italic",
//               fontSize: { xs: "1.2rem", md: "1.5rem" },
//               color: "rgba(180,80,110,0.8)",
//               display: "block",
//               mb: 1,
//             }}
//           >
//             100% Human Hair
//           </Typography>
//           <Typography
//             variant="h2"
//             sx={{
//               fontFamily: '"Cormorant Garamond", serif',
//               fontWeight: 700,
//               color: "text.primary",
//               mb: 2,
//             }}
//           >
//             The Full Collection
//           </Typography>

//           {/* Decorative divider */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 2,
//               mt: 2,
//             }}
//           >
//             <Box
//               sx={{
//                 height: "1px",
//                 width: 80,
//                 background:
//                   "linear-gradient(to right, transparent, rgba(201,162,39,0.6))",
//               }}
//             />
//             <Box
//               sx={{
//                 width: 6,
//                 height: 6,
//                 borderRadius: "50%",
//                 backgroundColor: "rgba(201,162,39,0.8)",
//               }}
//             />
//             <Box
//               sx={{
//                 height: "1px",
//                 width: 80,
//                 background:
//                   "linear-gradient(to left, transparent, rgba(201,162,39,0.6))",
//               }}
//             />
//           </Box>
//         </Box>

//         {/* Filters + Grid */}
//         <Grid container spacing={4}>
//           <Grid size={{ xs: 12, md: 3 }}>
//             <ShopFilters />
//           </Grid>
//           <Grid size={{ xs: 12, md: 9 }}>
//             <ShopGrid />
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
