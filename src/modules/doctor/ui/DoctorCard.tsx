"use client";

import { useRouter } from "next/navigation";

const fallbackImages = [
  "/img/doctor1.jpg",
  "/img/doctor2.jpg",
  "/img/doctor3.jpg",
];

export default function DoctorCard({ doctor, index }: any) {
  const router = useRouter();

  const image =
    doctor?.image 
    fallbackImages[index % fallbackImages.length];

  return (
    <div className="doctor-card">
      <img src={image} alt="doctor" />

      <div className="doctor-info">
        <h3>{doctor.name}</h3>
        <p>{doctor?.department?.name || "Specialist"}</p>

        <button
          className="btn"
          onClick={() =>
            router.push(`/find-doctor?doctorId=${doctor.id}`)
          }
        >
          Book
        </button>
      </div>
    </div>
  );
}