"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import useAppStore from "@/src/store/useAppStore";
import styles from "./Navbar.module.css"
export default function Navbar() {
  const { authToken, clearSession, loadToken } = useAppStore();
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    loadToken();
  }, []);

  return (
    <nav className="navbar">
      <h1 className="nav-logo">Doctor<span>+</span></h1>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/booking">Doctors</Link>
        <Link href="/contact">Contact</Link>
      </div>

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
        <div className={styles.navProfile}>
          <img
            src="/img/doctor3.jpg"
            className={styles.navAvatar}
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className={styles.navDropdown}>
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