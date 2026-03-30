 "use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import useAppStore from "@/src/store/useAppStore";

import {
  registerUser,
  loginUser,
  verifyOtp,
  sendResetLink,
  updatePassword,
} from "@/src/core/services/auth.service";


// ================= SIGN UP =================
export const useRegisterUser = (config?: { goToOtp?: boolean }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const shouldRedirect = config?.goToOtp ?? true;

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (res: any) => {
      const { status, message, data } = res || {};

      if (status) {
        if (typeof window !== "undefined") {
          if (data?.id) localStorage.setItem("userId", data.id);
          if (data?.email) localStorage.setItem("email", data.email);
        }

        toast.success(message || "Registration successful");

        if (shouldRedirect) {
          router.push("/auth/otp");
        }
      } else {
        toast.error(message || "Registration failed");
      }

      queryClient.invalidateQueries({ queryKey: ["register-user"] });
    },

    onError: (err) => {
      console.log("Register error:", err);
      toast.error("Something went wrong");
    },
  });
};


// ================= OTP VERIFY =================
export const useVerifyOtp = (config?: {
  goToLogin?: boolean;
  onDone?: () => void;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const shouldRedirect = config?.goToLogin ?? true;

  return useMutation({
    mutationFn: verifyOtp,

    onSuccess: (res: any) => {
      const { status, message } = res || {};

      if (status) {
        toast.success(message || "OTP verified");

        config?.onDone?.();

        if (shouldRedirect) {
          router.push("/auth/signIn");
        }
      } else {
        toast.error(message || "Invalid OTP");
      }

      queryClient.invalidateQueries({ queryKey: ["verify-otp"] });
    },

    onError: () => {
      toast.error("OTP verification failed");
    },
  });
};


// ================= LOGIN =================
export const useLoginUser = (config?: {
  redirectHome?: boolean;
  onDone?: () => void;
}) => {
  const router = useRouter();
  const cookies = new Cookies();
  const queryClient = useQueryClient();

  const shouldRedirect = config?.redirectHome ?? false;

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (res: any) => {
      const token = res?.token;
      const status = res?.status;
      const message = res?.message;

      if (status) {
        // save token
        cookies.set("token", token, {
          path: "/",
          maxAge: 60 * 60 * 24,
        });

        // zustand update
        try {
          useAppStore.getState().setSession(token);
        } catch {}

        // save user info
        if (typeof window !== "undefined") {
          const uid =
            res?.userId 
            res?.data?.id 
            res?.data?._id 
            null;

          const email =
            res?.email 
            res?.data?.email 
            null;

          if (uid) localStorage.setItem("userId", uid);
          if (email) localStorage.setItem("email", email);
        }

        toast.success(message || "Login successful");

        router.refresh();
        config?.onDone?.();

        if (shouldRedirect) {
          router.push("/");
        }
      } else {
        toast.error(message || "Login failed");
      }

      queryClient.invalidateQueries({ queryKey: ["login-user"] });
    },

    onError: () => {
      toast.error("Login error");
    },
  });
};


// ================= RESET LINK =================
export const useSendResetLink = () => {
  return useMutation({
    mutationFn: (data: { email: string }) =>
      sendResetLink(data.email),

    onSuccess: (res: any) => {
      toast.success(res?.message || "Reset link sent");
    },
 onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to send reset link"
      );
    },
  });
};


// ================= RESET PASSWORD =================
export const useChangePassword = () => {
  return useMutation({
    mutationFn: updatePassword,

    onSuccess: (res: any) => {
      toast.success(res?.message || "Password updated");
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Password reset failed"
      );
    },
  });
};