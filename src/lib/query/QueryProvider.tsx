"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "./queryClient"
import { Toaster } from "sonner"
import { CookiesProvider } from "react-cookie" 

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()
    
    return (
        <CookiesProvider> 
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster richColors closeButton position="top-right" />
            </QueryClientProvider>
        </CookiesProvider>
    )
}