"use client";

import { create } from "zustand";
import AxiosInstance from "../api/axios";
import { toast } from "sonner";

type StoreState = {
  authToken: string | null;
  setSession: (token: string) => void;
  clearSession: () => Promise<void>;
  loadToken: () => void;
};

const useAppStore = create<StoreState>((set) => ({
  authToken: null,

  
  setSession: (token) => {
    if (!token) return;

   
    localStorage.setItem("token", token);

    set({ authToken: token });
  },

  
  clearSession: async () => {
    try {
     
      await AxiosInstance.post("/user/logout");
    } catch (err) {
      console.log("Logout API failed");
    }

    
    localStorage.removeItem("token");

    
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "refreshToken=; path=/; max-age=0";
    document.cookie = "userid=; path=/; max-age=0";

    
    set({ authToken: null });

    toast.success("Logged out successfully");

    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  },

  
  loadToken: () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        set({ authToken: token });
      } else {
        set({ authToken: null });
      }
    } catch (err) {
      console.log("Token load error:", err);
      set({ authToken: null });
    }
  },
}));

export default useAppStore;