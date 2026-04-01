"use client";

import React, { useState } from "react";
import { useLogin } from "@/src/hooks/customHooks/auth.query.hooks";
import styles from "./login.module.css";
import { Mail, Lock, Eye, EyeOff, LogIn, Building2 } from "lucide-react";

import SweetAlert from "@/src/SweetAlert/SweetAlert";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info" as "success" | "error" | "warning" | "info",
    title: "",
    message: "",
  });

  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    mutate(formData);
  };

  return (
    <div className={styles.authWrapper}>
      <SweetAlert
        isOpen={alert.isOpen}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, isOpen: false })}
      />

      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Building2 size={32} color="#2563eb" />
            
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <div className={styles.inputField}>
              <Mail className={styles.icon} size={18} />
              <input
                type="email"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.inputField}>
              <Lock className={styles.icon} size={18} />
              <input
                type={showPass ? "text" : "password"}
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isPending}>
            {isPending ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}