 "use client";

import React, { useState, useEffect } from "react";
import {
  useGetDoctors,
  useGetSlots,
  useBookAppointment,
} from "@/src/hooks/customHooks/appointment.query.hooks";
import { useGetProfile } from "@/src/hooks/customHooks/user.hooks";

import {
  Search,
  Loader2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import styles from "./Booking.module.css";

export default function BookAppointment() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedDoc, setSelectedDoc] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 6;

 
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);


  const { data: profileData } = useGetProfile();
  const loginUser = profileData?.data;

  const patientName =
    loginUser?.name ||
    `${loginUser?.first_name || ""} ${loginUser?.last_name || ""}`.trim() 
    "Patient";

  /* 📡 API */
  const { data: docRes, isLoading } = useGetDoctors(
    debouncedSearch,
    currentPage,
    doctorsPerPage
  );

  const { data: slotRes, isFetching } = useGetSlots(
    selectedDoc,
    selectedDate
  );

  const { mutate: book, isPending } = useBookAppointment();

  const totalPages = docRes?.totalPages || 1;

  
  const filteredDoctors = docRes?.data?.filter((doc: any) => {
    const keyword = search.toLowerCase();
    return (
      doc.name?.toLowerCase().includes(keyword) ||
      doc.department?.name?.toLowerCase().includes(keyword)
    );
  });

  
  const getDoctorImage = (index: number) => {
    return `/img/doctor${(index % 12) + 1}.jpg`;
  };

  
  const handleBooking = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!storedUser?.id) {
      alert("Please login again");
      return;
    }

    book({
      doctorId: selectedDoc,
      userId: storedUser.id,
      date: selectedDate,
      time: selectedSlot,
      name: patientName,
    });
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1>Book Appointment</h1>
        <p>
          Booking for <b>{patientName}</b>
        </p>
      </div>

     
      <div className={styles.searchBox}>
        <Search size={16} />
        <input
          placeholder="Search doctor or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

    
      <div className={styles.grid}>
        {isLoading ? (
          <Loader2 className={styles.spin} />
        ) : (
          (filteredDoctors || []).map((doc: any, index: number) => (
            <div
              key={doc._id}
              className={`${styles.card} ${
                selectedDoc === doc._id ? styles.active : ""
              }`}
              onClick={() => {
                setSelectedDoc(doc._id);
                setSelectedSlot("");
              }}
            >
              <img
                src={
                  doc.image
                    ? doc.image.startsWith("http")
                      ? doc.image
                      : `/img/${doc.image}`
                    : getDoctorImage(index)
                }
                className={styles.avatar}
              />

              <h3>Dr. {doc.name}</h3>
              <p>{doc.department?.name || "General"}</p>

              {selectedDoc === doc._id && (
                <CheckCircle className={styles.check} />
              )}
            </div>
          ))
        )}
      </div>

     
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
 >
          <ChevronLeft />
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <ChevronRight />
        </button>
      </div>

     
      {selectedDoc && (
        <div className={styles.slotSection}>
          {/* DATE */}
          <div className={styles.dateWrapper}>
            <label>Select Date</label>

            <div className={styles.dateBox}>
              <input
                type="date"
                className={styles.dateInput}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot("");
                }}
              />
            </div>
          </div>

         
          {selectedDate && (
            <div className={styles.slots}>
              {isFetching ? (
                <Loader2 className={styles.spin} />
              ) : (
                slotRes?.data?.map((s: any) => (
                  <button
                    key={s._id}
                    className={`${styles.slotBtn} ${
                      selectedSlot === s.time ? styles.selectedSlot : ""
                    }`}
                    onClick={() => setSelectedSlot(s.time)}
                  >
                    {s.time}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}

      
      {selectedSlot && (
        <button className={styles.confirm} onClick={handleBooking}>
          {isPending ? <Loader2 className={styles.spin} /> : "Confirm Booking"}
        </button>
      )}
    </div>
  );
}