// "use client";

// import { Box } from "@mui/material";
// // import Navbar from "@/shared/layout/navbar/Navbar";
// // import Footer from "@/shared/layout/footer/Footer";
// import { CookiesProvider } from "react-cookie";
// import { usePathname } from "next/navigation";

// export default function LayoutWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   // 👉 auth pages e navbar hide
//   const hideNavbar =
//     pathname?.startsWith("/auth") ||
//     pathname?.includes("reset-password");

//   return (
//     <CookiesProvider>
//       <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
//         {!hideNavbar && <Navbar />}

//         {/* MAIN CONTENT */}
//         <Box sx={{ flex: 1 }}>{children}</Box>

//         {/* FOOTER */}
//         <Footer />
//       </Box>
//     </CookiesProvider>
//   );
// }