"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "@/src/api/axios";
import {
  Calendar,
  Clock,
  IndianRupee,
  FileText,
  Loader2,
} from "lucide-react";
import styles from "./History.module.css";

const AppointmentHistory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointmentHistory"],
    queryFn: async () => {
      const res = await AxiosInstance.get("/user/history");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className={styles.loader}>
        <Loader2 className={styles.spinner} size={40} />
        <p>Loading appointment history...</p>
      </div>
    );

  if (isError)
    return <div className={styles.error}>Error fetching history</div>;

  const appointments = data?.data || [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Appointment History</h1>
        <p>Total: {data?.totalAppointments || 0}</p>
      </div>

      <div className={styles.grid}>
        {appointments.length > 0 ? (
          appointments.map((appt: any) => (
            <div key={appt._id} className={styles.card}>
              
              
              <div className={styles.top}>
                <img
                  src={
                    appt.doctorId?.image ||
                    "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                  }
                  alt="doctor"
                  className={styles.avatar}
                />

                <div>
                  <h3>Dr. {appt.doctorId?.name}</h3>
                  <p className={styles.dept}>
                    {appt.doctorId?.departmentId?.name || "General"}
                  </p>
                </div>
              </div>

              
              <div className={styles.details}>
                <p>
                  <Calendar size={16} />{" "}
                  {new Date(appt.date).toLocaleDateString()}
                </p>
                <p>
                  <Clock size={16} /> {appt.timeSlot || appt.time}
                </p>
                <p>
                  <IndianRupee size={16} />{" "}
                  {appt.doctorId?.fees || appt.amount}
                </p>
              </div>

              
              <div className={styles.footer}>
                <span
                  className={`${styles.status} ${
                    styles[appt.status.toLowerCase()]
                  }`}
                >
                  {appt.status}
                </span>

                <button className={styles.btn}>
                  <FileText size={16} /> View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noData}>
            No appointments found 
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;