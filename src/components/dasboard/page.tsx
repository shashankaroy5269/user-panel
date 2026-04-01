"use client";

import React from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Activity,
  Plus,
  MapPin,
  LogOut,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "@/src/api/axios";
import { useGetProfile } from "@/src/hooks/customHooks/user.hooks";
import styles from "./dashboard.module.css";

export default function UserDashboard() {
  const router = useRouter();

  
  const { data: profileData } = useGetProfile();
  const user = profileData?.data;

  
  const { data: historyRes, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const storedUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (!storedUser?.id) {
        throw new Error("User not found");
      }

      const res = await AxiosInstance.get(
        `/user/history?userId=${storedUser.id}` 
      );

      return res.data;
    },
  });

  
  const appointments = historyRes?.data || [];

  return (
    <div className={styles.wrapper}>
     
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Doctor+</h2>
        <nav>
          <p>
            <LayoutDashboard size={18} /> Dashboard
          </p>
          <p onClick={() => router.push("/booking")}>
            <Users size={18} /> Doctors
          </p>
          <p onClick={() => router.push("/diagonist")}>
            <Calendar size={18} /> Diagonist center
          </p>
        </nav>
        <button className={styles.logout}>
          <LogOut size={16} /> Logout
        </button>
      </aside>

     
      <main className={styles.main}>
       
        <div className={styles.topbar}>
          <h1>Hi, {user?.name || "User"} </h1>
          <button onClick={() => router.push("/booking")}>
            <Plus size={16} /> New Booking
          </button>
        </div>

       
        <div className={styles.cards}>
          <div className={styles.card}>
            <Calendar />
            <div>
              <p>Total</p>
              <h3>{appointments.length}</h3>
            </div>
          </div>

          <div className={styles.card}>
            <Activity />
            <div>
              <p>Completed</p>
              <h3>
                {
                  appointments.filter(
                    (a: any) => a.status === "completed"
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>

      
        <div className={styles.content}>
        
          <div className={styles.left}>
            <h2>Recent Activity</h2>

            {isLoading ? (
              <div className={styles.loader}>
                <Loader2 className={styles.spin} />
              </div>
            ) : appointments.length === 0 ? (
              <p>No appointments yet</p>
            ) : (
              appointments.slice(0, 5).map((a: any) => (
                <div key={a._id} className={styles.item}>
                  <div>
                    <h4>Dr. {a.doctorId?.name || "Doctor"}</h4>
                    <p>
                      {new Date(a.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span>{a.status}</span>
                </div>
              ))
            )}
          </div>

         
          <div className={styles.right}>
            <div className={styles.box}>
              <h3>Nearby Lab</h3>
              <div className={styles.lab}>
                <MapPin />
                <p>City Lab • 2km</p>
              </div>
            </div>

            <div className={styles.box}>
              <h3>Tip</h3>
              <p>Exercise 30 min daily 🏃</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}