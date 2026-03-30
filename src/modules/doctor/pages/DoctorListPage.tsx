"use client";

import { useState, useMemo } from "react";
import { useDoctors } from "../hooks/useDoctor";
import BookingModal from "../../booking/ui/BookingModal";

export default function DoctorListPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  const { data, isLoading } = useDoctors();
  const doctors = data?.data || [];

  const departments = useMemo(() => {
    return [
      ...new Set(
        doctors
          .map((d: any) => d?.department?.name)
          .filter(Boolean)
      ),
    ];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc: any) => {
      const matchSearch = doc?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchDept = department
        ? doc?.department?.name === department
        : true;

      return matchSearch && matchDept;
    });
  }, [search, department, doctors]);

  return (
    <section className="doctor-page">
      <h1>Our Doctors</h1>

      {/* FILTER */}
      <div className="filter-box">
        <input
          type="text"
          placeholder="Search doctor..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map((dept: string, i: number) => (
            <option key={i} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* LIST */}
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="doctor-grid">
          {filteredDoctors.map((doc: any, i: number) => (
            <div key={doc._id} className="doctor-card">
              <img src={`/img/doctor${(i % 3) + 1}.jpg`} />

              <div className="doctor-info">
                <h3>{doc.name}</h3>
                <p>{doc?.department?.name}</p>

                <button
                  className="hero-btn"
                  onClick={() => setSelectedDoctor(doc)}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 MODAL */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </section>
  );
}