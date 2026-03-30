"use client";

import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  verifyOtp,
  sendResetLink,
  updatePassword,
} from "../../../core/services/auth.service";

// 🔐 LOGIN
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

// 🆕 REGISTER
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

// 📲 OTP VERIFY
export const useOtpVerify = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};

// 📧 SEND RESET LINK
export const useSendResetLink = () => {
  return useMutation({
    mutationFn: sendResetLink,
  });
};

// 🔄 RESET PASSWORD
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  });
};