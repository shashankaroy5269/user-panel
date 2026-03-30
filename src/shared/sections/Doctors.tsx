"use client";

import { useRouter } from "next/navigation";

const doctorsData = [
  { _id: "1", name: "Dr. Rahul Roy", department: { name: "Cardiology" } },
  { _id: "2", name: "Dr. Sneha Paul", department: { name: "Neurology" } },
  { _id: "3", name: "Dr. Arijit Sen", department: { name: "Orthopedic" } },
  { _id: "4", name: "Dr. Priya Das", department: { name: "Dermatology" } },
  { _id: "5", name: "Dr. Ankit Sharma", department: { name: "Pediatrics" } },
];

export default function Doctors() {
  const router = useRouter();

  return (
    <section className="doctor-section">
      {/* 🔥 TITLE */}
      <div className="header">
        <h2>Our Doctors</h2>
      </div>

      {/* 🔥 CAROUSEL */}
      <div className="carousel">
        <div className="carousel-track">
          {[...doctorsData, ...doctorsData].map((doc, i) => (
            <div key={i} className="doctor-card">
              <img src={`/img/doctor${(i % 3) + 1}.jpg`} alt="doctor" />

              <div className="doctor-info">
                <h3>{doc.name}</h3>
                <p>{doc.department.name}</p>

                {/* 🔥 SMALL CENTER BUTTON */}
                <button
                  onClick={() => router.push("/findDoctor")}
                  className="book-btn small"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 CENTER BIG BUTTON */}
        <div className="view-wrapper">
          <button
            onClick={() => router.push("/findDoctor")}
            className="view-btn"
          >
            View All Doctors
          </button>
        </div>
      </div>
    </section>
  );
}