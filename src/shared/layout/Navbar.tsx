"use client";

import Link from "next/link";
import { useState } from "react";
import useAppStore from "@/src/store/useAppStore";

export default function Navbar() {
  const { authToken, clearSession } = useAppStore();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1 className="nav-logo">Doctor<span>+</span></h1>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/findDoctor">Doctors</Link>
        <Link href="/contact">Contact</Link>
      </div>

      {/* RIGHT SIDE */}
      {!authToken ? (
        <div className="nav-auth">
          <Link href="/auth/login" className="nav-btn-outline">
            Login
          </Link>
          <Link href="/auth/signup" className="nav-btn">
            Register
          </Link>
        </div>
      ) : (
        <div className="nav-profile">
          <img
            src="/img/user.png"
            className="nav-avatar"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="nav-dropdown">
              <p>User</p>

              <Link href="/profile">Profile</Link>
              <Link href="/dashboard">Dashboard</Link>

              <button onClick={clearSession}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}