"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

const appTheme = createTheme({
  typography: {
    fontFamily: "var(--font-montserrat), sans-serif",
  },
  palette: {
    mode: "light",
  },
});

export default function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}