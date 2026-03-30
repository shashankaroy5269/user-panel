"use client";

import "@/style/globals.css";
import Navbar from "@/src/shared/layout/Navbar";
import Footer from "@/src/shared/layout/Footer";
import AppQueryProvider from "@/src/lib/query/QueryProvider";
import { useEffect } from "react";
import useAppStore from "@/src/store/useAppStore";

export default function RootLayout({ children }: any) {
  const loadToken = useAppStore((s) => s.loadToken);

  useEffect(() => {
    loadToken();
  }, []);

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