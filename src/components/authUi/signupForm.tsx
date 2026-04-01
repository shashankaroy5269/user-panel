 "use client";

import React, { useState } from "react";
import { useRegister } from "@/src/hooks/customHooks/auth.query.hooks";
import styles from "./signup.module.css";
import { User, Mail, MapPin, Lock, ArrowRight } from "lucide-react";
import SweetAlert from "@/src/SweetAlert/SweetAlert";

export default function RegisterForm() {
  const { mutate, isPending } = useRegister();

  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info" as "success" | "error" | "warning" | "info",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("FORM DATA ", formData);

    // ✅ Validation
    if (!formData.first_name) {
      setAlert({
        isOpen: true,
        type: "warning",
        title: "Validation Error",
        message: "First name is required",
      });
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setAlert({
        isOpen: true,
        type: "warning",
        title: "Password Mismatch",
        message: "Passwords do not match",
      });
      return;
    }

    
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      address: formData.address,
      password: formData.password,
      confirm_password: formData.confirm_password,
    };

    console.log("FINAL PAYLOAD 👉", payload);

    mutate(payload, {
      onSuccess: (data) => {
        const userId = data?.data?.id;

        if (!userId) {
          setAlert({
            isOpen: true,
            type: "error",
            title: "Error",
            message: "User ID not found from server",
          });
          return;
        }

        setAlert({
          isOpen: true,
          type: "success",
          title: "Registration Success!",
          message: "OTP sent! Redirecting...",
        });

        
        setTimeout(() => {
          window.location.href = `/auth/otp?userId=${userId}`;
        }, 1500);
      },

      onError: (err: any) => {
        setAlert({
          isOpen: true,
          type: "error",
          title: "Registration Failed",
          message:
            err?.response?.data?.message || "Please try again",
        });
      },
    });
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
        <form className={styles.card} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h2>Create Account</h2>
            <p>Join our healthcare community today</p>
          </div>

         
          <div className={styles.inputGroupRow}>
            <div className={styles.inputWrapper}>
              <User className={styles.icon} size={18} />
              <input
                type="text"
                placeholder="First Name"
                required
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    first_name: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Last Name"
                required
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    last_name: e.target.value,
                  })
                }
              />
            </div>
          </div>

          
<div className={styles.inputWrapper}>
            <Mail className={styles.icon} size={18} />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>

          
          <div className={styles.inputWrapper}>
            <MapPin className={styles.icon} size={18} />
            <input
              type="text"
              placeholder="Your Address"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
            />
          </div>

          
          <div className={styles.inputWrapper}>
            <Lock className={styles.icon} size={18} />
            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </div>

          
          <div className={styles.inputWrapper}>
            <Lock className={styles.icon} size={18} />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirm_password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isPending}
          >
            {isPending ? (
              <span className={styles.loader}></span>
            ) : (
              <>
                Register Now  
              </>
            )}
          </button>

          <p className={styles.footerText}>
            Already have an account?{" "}
            <a href="/auth/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}