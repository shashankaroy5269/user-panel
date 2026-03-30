 "use client";

import { useState } from "react";
import { registerUser } from "../../../core/services/auth.service";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
    address: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ validation
    if (!form.firstName || !form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPass) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPass,
        address: form.address,
      };

      const res = await registerUser(payload);

      console.log("REGISTER SUCCESS:", res);

      // 🔥 SAVE ALL REQUIRED DATA (6 fields)
      localStorage.setItem("email", form.email);
      localStorage.setItem("password", form.password);
      localStorage.setItem("confirm_password", form.confirmPass);
      localStorage.setItem("first_name", form.firstName);
      localStorage.setItem("last_name", form.lastName);
      localStorage.setItem("address", form.address);
      localStorage.setItem("userId", res?.data?.id);

      alert("Signup successful 🎉 OTP sent to your email");

      // 👉 OTP page e jao
      router.push("/auth/otp");

      // reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPass: "",
        address: "",
      });
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2>Create Account 🚀</h2>
        <p>Join us today</p>

        {error && <span className="error">{error}</span>}

        {/* NAME */}
        <div className="row">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

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

        {/* CONFIRM PASSWORD */}
        <input
          name="confirmPass"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPass}
          onChange={handleChange}
        />

        {/* ADDRESS */}
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Sign Up"}
        </button>

        {/* LOGIN REDIRECT */}
        <div className="bottom">
          Already have an account?{" "}
 <span onClick={() => router.push("/auth/login")}>
            Login
          </span>
        </div>
      </form>
    </div>
  );
}