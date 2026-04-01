"use client";

import React, { useState, useEffect, useCallback } from "react";
import AxiosInstance from "@/src/api/axios";
import {
  MapPin,
  Phone,
  Navigation,
  Loader2,
  LocateFixed,
  Search,
} from "lucide-react";
import styles from "./Nearby.module.css";

const NearbyCenters = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [distance, setDistance] = useState(5000);

  const fetchNearbyCenters = useCallback(() => {
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const res = await AxiosInstance.get(`/diagnostic/nearby`, {
            params: { lat: latitude, lng: longitude, distance },
          });

          setCenters(res.data?.data || []);
        } catch (err: any) {
          setError("Failed to fetch centers");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  }, [distance]);

  useEffect(() => {
    fetchNearbyCenters();
  }, [fetchNearbyCenters]);

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>Find Nearby Labs</h1>
        <p>Discover trusted diagnostic centers around you</p>

        <div className={styles.controls}>
          <select
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          >
            <option value={2000}>2 KM</option>
            <option value={5000}>5 KM</option>
            <option value={10000}>10 KM</option>
          </select>

          <button onClick={fetchNearbyCenters}>
            <LocateFixed size={16} /> Refresh
          </button>
        </div>
      </div>

      
      <div className={styles.main}>
        
        <div className={styles.list}>
          {loading ? (
            <div className={styles.loader}>
              <Loader2 className={styles.spin} />
              <p>Searching...</p>
            </div>
          ) : centers.length > 0 ? (
            centers.map((c: any) => (
              <div key={c._id} className={styles.card}>
                <div className={styles.top}>
                  <h3>{c.name}</h3>
                  <span>{(c.distance / 1000).toFixed(1)} KM</span>
                </div>

                <p className={styles.address}>
                  <MapPin size={14} /> {c.address}
                </p>

                <p className={styles.phone}>
                  <Phone size={14} /> {c.phone}
                </p>

                <div className={styles.actions}>
                  <button className={styles.primary}>
                    Book Test
                  </button>
                  <button className={styles.secondary}>
                    <Navigation size={14} /> Direction
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.empty}>
              <Search size={40} />
              <p>No centers found</p>
            </div>
          )}
        </div>

        
        <div className={styles.mapBox}>
          <h3>Map View</h3>
          <p>📍 Your nearby results will appear here</p>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default NearbyCenters;