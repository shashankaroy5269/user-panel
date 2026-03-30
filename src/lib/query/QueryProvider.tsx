"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { initQueryClient } from "./queryClient";

export default function AppQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [client] = useState(() => initQueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}