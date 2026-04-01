"use client";

import "@/style/globals.css";
import Navbar from "@/src/shared/layout/Navbar";
import Footer from "@/src/shared/layout/Footer";
import AppQueryProvider from "@/src/lib/query/QueryProvider";



export default function RootLayout({ children }: any) {
  

  return (
    <html lang="en">
      <body>
        <AppQueryProvider>
          <Navbar />
          {children}
          <Footer />
        </AppQueryProvider>
      </body>
    </html>
  );
}