"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useVerifyOtp } from "@/src/hooks/customHooks/auth.query.hooks";
import styles from "./otp.module.css";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import SweetAlert from "@/src/SweetAlert/SweetAlert";

function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [otp, setOtp] = useState("");
  const { mutate, isPending } = useVerifyOtp();

  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info" as "success" | "error" | "warning" | "info",
    title: "",
    message: "",
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("VERIFY CLICK 👉", userId, otp);

    if (!userId) {
      setAlert({
        isOpen: true,
        type: "error",
        title: "Invalid Request",
        message: "User ID missing. Please register again.",
      });
      return;
    }

    if (!otp || otp.length !== 6) {
      setAlert({
        isOpen: true,
        type: "warning",
        title: "Invalid OTP",
        message: "Enter valid 6-digit OTP",
      });
      return;
    }

    mutate({ userId, otp });
  };

  return (
    <div className={styles.wrapper}>
      <SweetAlert
        isOpen={alert.isOpen}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, isOpen: false })}
      />

      <div className={styles.container}>
        <form className={styles.card} onSubmit={handleVerify}>
          <div className={styles.header}>
            <ShieldCheck size={48} color="#3b82f6" />
            <h2>Verify OTP</h2>
            <p>Enter the 6-digit code sent to your email.</p>

            {userId && (
              <span className={styles.userIdTag}>
                ID: {userId.slice(-6)}
              </span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              value={otp}
              className={styles.otpInput}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className={styles.spin} size={20} />
            ) : (
              <>
                Verify Account <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function VerifyOtp() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyOtpContent />
    </Suspense>
  );
}