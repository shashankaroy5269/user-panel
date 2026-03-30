 "use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useOtpVerify, useRegister } from "../hooks/useAuth";

type Props = {
  onDone?: () => void;
};

export default function OtpForm({ onDone }: Props) {
  const { handleSubmit } = useForm();

  const { mutate: verifyOtpFn, isPending } = useOtpVerify();
  const { mutate: resendFn, isPending: resendLoading } = useRegister();

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(20);

  const storedUser =
    typeof window !== "undefined"
      ? localStorage.getItem("userId")
      : null;

  const userEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("email")
      : null;

  // 🔢 input handler
  const handleInput = (e: any, idx: number) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    e.target.value = val;

    if (val && otpRefs.current[idx + 1]) {
      otpRefs.current[idx + 1]?.focus();
    }
  };

  // ⬅️ backspace
  const handleBack = (e: any, idx: number) => {
    if (e.key === "Backspace" && !e.target.value) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  // 📋 paste
  const handlePaste = (e: any) => {
    e.preventDefault();
    const data = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    data.split("").forEach((char: string, i: number) => {
      if (otpRefs.current[i]) {
        otpRefs.current[i]!.value = char;
      }
    });
  };

  // ⏳ TIMER
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ✅ VERIFY OTP
  const submitOtp = () => {
    const code = otpRefs.current.map((el) => el?.value || "").join("");

    if (!storedUser) {
      toast.error("Session expired");
      return;
    }

    verifyOtpFn(
      {
        userId: storedUser,
        otp: code,
      } as any,
      {
        onSuccess: () => {
          toast.success("OTP Verified ✅");
          router.push("/auth/login");
          onDone?.();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Invalid OTP ❌"
          );
        },
      }
    );
  };

  // 🔁 RESEND OTP (register API reuse)
  const handleResend = () => {
    const email = localStorage.getItem("email");
    const first_name = localStorage.getItem("first_name");
    const last_name = localStorage.getItem("last_name");
    const address = localStorage.getItem("address");
    const password = localStorage.getItem("password");
    const confirm_password = localStorage.getItem("confirm_password");

    if (!email || !password) {
      toast.error("Missing user data");
      return;
    }

    resendFn(
      {
        email,
        first_name,
        last_name,
        address,
        password,
        confirm_password: password,
      } as any,
      {
        onSuccess: (res: any) => {
          toast.success(res?.message || "OTP resent 🔁");
          setTimer(30);
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Failed to resend"
          );
        },
      }
    );
  };
const router= useRouter();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          width: 350,
          textAlign: "center",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={700}>
            Verify OTP
          </Typography>

          <Typography variant="body2">
            Sent to <strong>{userEmail}</strong>
          </Typography>

          {/* OTP INPUT */}

          <form onSubmit={handleSubmit(submitOtp)}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} justifyContent="center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <TextField
                    key={i}
                    inputRef={(el) => (otpRefs.current[i] = el)}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: "18px",
                      },
                    }}
                    onChange={(e) => handleInput(e, i)}
                    onKeyDown={(e) => handleBack(e, i)}
                    onPaste={handlePaste}
                    sx={{ width: 45 }}
                  />
                ))}
              </Stack>

              {/* VERIFY BUTTON */}
              <Button
                type="submit"
                fullWidth
                disabled={isPending}
                sx={{
                  background: "#000",
                  color: "#fff",
                  borderRadius: "999px",
                }}
              >
                {isPending ? "Verifying..." : "Confirm"}
              </Button>
            </Stack>
          </form>

          {/* RESEND */}
          <Button
            onClick={handleResend}
            disabled={timer > 0 || resendLoading}
          >
            {timer > 0
              ? `Resend in ${timer}s`
              : resendLoading
              ? "Sending..."
              : "Resend OTP"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}