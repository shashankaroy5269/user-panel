"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosInstance } from "@/src/core/http/axios";
import useAppStore from "@/src/store/useAppStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAppStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await AxiosInstance.post("/auth/login", form);

      console.log("LOGIN RES:", res.data);

      const token =
        res?.data?.token 
        res?.data?.accessToken 
        res?.data?.data?.token;

      if (!token) {
        toast.error("Token not found ❌");
        return;
      }

      // ✅ Zustand + localStorage
      setSession(token);

      toast.success("Login successful 🎉");

      router.push("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <ToastContainer position="top-right" />

      <form className="login-card" onSubmit={handleLogin}>
        <h2>Welcome Back 👋</h2>
        <p>Login to continue</p>

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <div className="password-box">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <span onClick={() => setShowPass(!showPass)}>
            {showPass ? "🙈" : "👁"}
          </span>
        </div>

        {/* BUTTON */}
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>

        {/* BOTTOM */}
        <div className="bottom">
          Don’t have an account?{" "}
          <span onClick={() => router.push("/auth/signup")}>
            Register
          </span>
        </div>
      </form>
    </div>
  );
}