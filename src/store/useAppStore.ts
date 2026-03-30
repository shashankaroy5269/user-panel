"use client";

import { create } from "zustand";
import { AxiosInstance } from "@/src/core/http/axios";
import { toast } from "sonner";

type StoreState = {
  authToken: string | null;
  setSession: (token: string) => void;
  clearSession: () => Promise<void>;
  loadToken: () => void;
};

const useAppStore = create<StoreState>((set) => ({
  authToken: null,

  // 🔐 LOGIN
  setSession: (token) => {
    localStorage.setItem("token", token);
    set({ authToken: token });
  },

  // 🔥 LOGOUT (BACKEND CONNECTED)
  clearSession: async () => {
    try {
      await AxiosInstance.post("/user/logout");
    } catch (err) {
      console.log("Logout API failed");
    }

    // ❌ remove frontend token
    localStorage.removeItem("token");

    set({ authToken: null });

    toast.success("Logged out successfully");

    window.location.href = "/auth/login";
  },

  // 🔄 LOAD TOKEN (refresh e)
  loadToken: () => {
    const token = localStorage.getItem("token");
    set({ authToken: token });
  },
}));

export default useAppStore;