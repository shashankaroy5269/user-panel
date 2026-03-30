"use client";

import { useState } from "react";
import { useSlots, useBookAppointment } from "../hooks/useBooking";
import { toast } from "react-toastify";
import "./BookingModal.module.css";

export default function BookingModal({ doctor, onClose }: any) {
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const { data, isLoading } = useSlots(doctor?._id, date);
  const { mutate, isPending } = useBookAppointment();

  
  // ✅ FIX: grouped object → array
const slots = data?.data
  ? Object.values(data.data).flat()
  : [];

  console.log("FULL DATA:", data);
  console.log("SLOTS:", slots);

  const handleBook = () => {
    if (!date) return toast.error("Select date ❌");
    if (!selectedSlot) return toast.error("Select slot ❌");

    mutate(
      {
        doctorId: doctor._id,
        date,
        time: selectedSlot.time,
      },
      {
        onSuccess: () => {
          toast.success("Appointment Confirmed 🎉");
          setSelectedSlot(null);
          onClose();
        },
      }
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Book Appointment</h2>

        <p className="doc-name">{doctor?.name}</p>

        {/* DATE */}
        <input
          type="date"
          className="date-input"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setSelectedSlot(null);
          }}
        />

        {/* SLOTS */}
        <div className="all-slots">
          {isLoading ? (
            <p>Loading...</p>
          ) : slots.length === 0 ? (
            <p>No slots available</p>
          ) : (
            <div className="day-block">
              <p className="date-title">{date}</p>

              <div className="slot-grid">
                {slots.map((slot: any) => (
                  <button
                    key={slot._id} // ✅ FIX
                    className={`slot-btn ${
                      selectedSlot?._id === slot._id ? "active" : ""
                    }`} // ✅ FIX
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ACTION */}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="book-btn"
            onClick={handleBook}
            disabled={isPending}
          >
            {isPending ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}